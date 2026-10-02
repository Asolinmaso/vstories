import { after } from 'next/server';
import type { SupabaseClient } from '@supabase/supabase-js';
import { sendEmail, getOrderConfirmationHTML } from '@/lib/email-order';
import { isUuid } from '@/lib/uuid';
import { fetchOrderPayments, toPaise } from '@/lib/razorpay';

// Server-only helpers shared by the payment API routes. Every write goes
// through the service-role client passed in by the caller.

export interface PricedItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: string | null;
}

type PricingResult =
  | { ok: true; items: PricedItem[]; subtotal: number }
  | { ok: false; error: string };

/**
 * Re-price the cart from the database. The client only tells us *what* it
 * wants (product id, size, quantity) — never how much it costs.
 */
export async function priceOrderItems(db: SupabaseClient, rawItems: unknown): Promise<PricingResult> {
  if (!Array.isArray(rawItems) || rawItems.length === 0) {
    return { ok: false, error: 'Cart is empty' };
  }
  if (rawItems.length > 50) {
    return { ok: false, error: 'Too many items in cart' };
  }

  const requested: { id: string; quantity: number; size: string | null }[] = [];
  for (const raw of rawItems) {
    const id = (raw as any)?.id;
    const quantity = Number((raw as any)?.quantity);
    if (!isUuid(id) || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      return { ok: false, error: 'Your cart has an invalid item. Please remove it and try again.' };
    }
    const size = typeof (raw as any)?.size === 'string' ? (raw as any).size : null;
    requested.push({ id, quantity, size });
  }

  const ids = [...new Set(requested.map((item) => item.id))];
  const { data: products, error } = await db
    .from('products')
    .select('id, name, price, images, stock, sizes:product_sizes(label, price)')
    .in('id', ids);

  if (error) {
    console.error('Failed to load products for pricing:', error);
    return { ok: false, error: 'Could not verify product prices. Please try again.' };
  }

  const byId = new Map((products || []).map((p: any) => [p.id, p]));
  const items: PricedItem[] = [];

  for (const item of requested) {
    const product: any = byId.get(item.id);
    if (!product) {
      return { ok: false, error: 'A product in your cart is no longer available. Please update your cart.' };
    }
    if (typeof product.stock === 'number' && product.stock < item.quantity) {
      return {
        ok: false,
        error: product.stock > 0
          ? `Only ${product.stock} left of ${product.name}. Please reduce the quantity.`
          : `${product.name} is out of stock.`,
      };
    }

    const matchedSize = (product.sizes || []).find((s: any) => s.label === item.size);
    items.push({
      id: product.id,
      name: product.name,
      price: Number(matchedSize?.price ?? product.price),
      quantity: item.quantity,
      image: product.images?.[0] || '',
      size: matchedSize?.label ?? item.size,
    });
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { ok: true, items, subtotal };
}

/** Stock, cart and confirmation email — run exactly once per confirmed order. */
export async function runOrderConfirmedSideEffects(
  db: SupabaseClient,
  order: any,
  customer: { email?: string | null; name?: string | null }
) {
  for (const item of order.items || []) {
    const { error } = await db.rpc('decrement_stock', {
      product_id: item.id,
      quantity: item.quantity,
    });
    if (error) console.error('Failed to decrement stock:', { productId: item.id, error: error.message });
  }

  const { error: cartError } = await db.from('cart_items').delete().eq('user_id', order.user_id);
  if (cartError) console.error('Failed to clear cart after order:', cartError.message);

  // The email is sent after the response has gone out, so a slow or broken
  // mail server can never delay or fail an order.
  if (customer.email) {
    const sendConfirmation = async () => {
      try {
        const result = await sendEmail({
          to: customer.email!,
          subject: `Order Confirmation - ${order.id}`,
          html: getOrderConfirmationHTML(order, customer),
        });
        if (!result.success) console.error('Order confirmation email not sent:', result.reason, result.error);
      } catch (error) {
        console.error('Order confirmation email error:', error);
      }
    };
    try {
      after(sendConfirmation);
    } catch {
      void sendConfirmation(); // not inside a request (should not happen)
    }
  }
}

/**
 * Mark an order as paid. Safe to call more than once for the same payment
 * (browser callback + webhook): only the call that actually flips the status
 * runs the side effects.
 */
export async function markOrderPaid(
  db: SupabaseClient,
  order: any,
  payment: { id: string; method?: string | null; signature?: string | null },
  customer: { email?: string | null; name?: string | null }
): Promise<{ ok: true; alreadyPaid: boolean } | { ok: false; error: string }> {
  if (order.status === 'paid') return { ok: true, alreadyPaid: true };

  const update: Record<string, unknown> = {
    status: 'paid',
    razorpay_payment_id: payment.id,
    payment_method: payment.method || 'razorpay',
    paid_at: new Date().toISOString(),
  };
  if (payment.signature) update.razorpay_signature = payment.signature;

  // A retry inside the Razorpay popup can succeed after an earlier attempt
  // was recorded as failed/cancelled, so those may still move to paid.
  const { data: updated, error } = await db
    .from('orders')
    .update(update)
    .eq('id', order.id)
    .in('status', ['pending', 'failed', 'cancelled'])
    .select()
    .maybeSingle();

  if (error) {
    console.error('Failed to mark order paid:', error);
    return { ok: false, error: 'Failed to update order status' };
  }
  if (!updated) return { ok: true, alreadyPaid: true };

  await runOrderConfirmedSideEffects(db, updated, customer);
  return { ok: true, alreadyPaid: false };
}

/**
 * Record a failed or abandoned online payment. Never touches a paid order.
 */
export async function markOrderUnpaid(
  db: SupabaseClient,
  razorpayOrderId: string,
  status: 'failed' | 'cancelled',
  userId?: string
) {
  let query = db
    .from('orders')
    .update({ status })
    .eq('razorpay_order_id', razorpayOrderId)
    // "cancelled" only applies to an untouched order; a real failed attempt wins.
    .in('status', status === 'failed' ? ['pending', 'cancelled'] : ['pending']);
  if (userId) query = query.eq('user_id', userId);

  const { error } = await query;
  if (error) console.error(`Failed to mark order ${status}:`, error.message);
  return !error;
}

/**
 * Ask Razorpay whether an unpaid online order has in fact been paid, and
 * confirm it if so. Covers the cases where the browser never reports back
 * (tab closed, UPI app switch on mobile, network drop after paying).
 * Returns the order's status after reconciling.
 */
export async function reconcileOrderWithRazorpay(
  db: SupabaseClient,
  order: any,
  customer: { email?: string | null; name?: string | null }
): Promise<string> {
  const razorpayOrderId: string = order.razorpay_order_id || '';
  if (order.status === 'paid' || !razorpayOrderId.startsWith('order_')) return order.status;

  const result = await fetchOrderPayments(razorpayOrderId);
  if (!result.success) return order.status;

  const captured = result.payments.find(
    (payment: any) => payment.status === 'captured' && Number(payment.amount) === toPaise(order.amount)
  );
  if (!captured) return order.status;

  const paid = await markOrderPaid(db, order, { id: captured.id, method: captured.method }, customer);
  return paid.ok ? 'paid' : order.status;
}
