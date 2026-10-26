import { NextResponse } from 'next/server';
import { createRazorpayOrder } from '@/lib/razorpay';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { supabaseAdmin } from '@/lib/supabase';
import { calculateOrderTotal } from '@/lib/order-pricing';
import { priceOrderItems } from '@/lib/payment-orders';

const ADDRESS_FIELDS = ['label', 'name', 'phone', 'address_line1', 'address_line2', 'city', 'state', 'pincode', 'country'] as const;

function cleanShippingAddress(raw: any): Record<string, string> | null {
  if (!raw || typeof raw !== 'object') return null;
  const source = {
    ...raw,
    name: raw.name || raw.full_name,
    pincode: raw.pincode || raw.postal_code,
  };
  const address: Record<string, string> = {};
  for (const field of ADDRESS_FIELDS) {
    const value = source[field];
    if (typeof value === 'string' && value.trim()) address[field] = value.trim().slice(0, 200);
  }
  const complete = address.name && address.phone && address.address_line1 && address.city && address.pincode;
  return complete ? address : null;
}

export async function POST(request: Request) {
  try {
    // Verify user is authenticated using SSR client (reads cookies)
    const supabase = await createSupabaseServerClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Please login to place your order' },
        { status: 401 }
      );
    }

    if (!supabaseAdmin) {
      console.error('SUPABASE_SERVICE_ROLE_KEY is not configured');
      return NextResponse.json({ error: 'Checkout is temporarily unavailable' }, { status: 500 });
    }

    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const shippingAddress = cleanShippingAddress(body.shippingAddress);
    if (!shippingAddress) {
      return NextResponse.json({ error: 'Please provide a complete shipping address' }, { status: 400 });
    }

    // Prices, shipping and the total are computed here from the database —
    // amounts sent by the browser are never trusted.
    const priced = await priceOrderItems(supabaseAdmin, body.items);
    if (!priced.ok) {
      return NextResponse.json({ error: priced.error }, { status: 400 });
    }

    const { shippingFee, total } = calculateOrderTotal(priced.subtotal);

    // The customer must be charged exactly what the checkout page displayed
    if (body.amount !== undefined && Math.abs(Number(body.amount) - total) > 0.01) {
      return NextResponse.json(
        {
          error: 'Prices in your cart have changed. Please review your cart and try again.',
          code: 'AMOUNT_MISMATCH',
          expectedAmount: total,
        },
        { status: 409 }
      );
    }

    const orderPayload = {
      user_id: user.id,
      amount: total,
      currency: 'INR',
      status: 'pending',
      items: priced.items,
      shipping_address: { ...shippingAddress, shipping_fee: shippingFee },
    };

    // Create Razorpay order for online payment
    const result = await createRazorpayOrder(total, 'INR', { user_id: user.id });

    if (!result.success) {
      return NextResponse.json(
        { error: 'Could not start the payment. Please try again in a moment.' },
        { status: 502 }
      );
    }

    // The order only becomes "paid" once /api/payment/verify (or the webhook)
    // confirms the payment with Razorpay.
    const { data: order, error: dbError } = await supabaseAdmin
      .from('orders')
      .insert({
        ...orderPayload,
        razorpay_order_id: result.order.id,
      })
      .select()
      .single();

    if (dbError || !order) {
      console.error('Database error creating order:', JSON.stringify(dbError));
      const msg = process.env.NODE_ENV === 'development'
        ? `DB error: ${dbError?.message} (code: ${dbError?.code})`
        : 'Failed to save order — please try again';
      return NextResponse.json({ error: msg }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      orderId: result.order.id,
      amount: result.order.amount,
      currency: result.order.currency,
      dbOrderId: order.id,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });

  } catch (error: any) {
    console.error('Create order unhandled error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
