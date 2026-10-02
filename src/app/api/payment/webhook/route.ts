import { NextResponse } from 'next/server';
import { verifyWebhookSignature, toPaise } from '@/lib/razorpay';
import { supabaseAdmin } from '@/lib/supabase';
import { markOrderPaid, markOrderUnpaid } from '@/lib/payment-orders';

// Razorpay webhook: confirms payments even when the customer's browser never
// returns to the site (closed tab, UPI app switch on mobile, lost connection).
// Enable it in Razorpay Dashboard → Settings → Webhooks with the events
// payment.captured, order.paid and payment.failed, and set the same secret in
// RAZORPAY_WEBHOOK_SECRET.
export async function POST(request: Request) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret || !supabaseAdmin) {
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get('x-razorpay-signature') || '';

  if (!verifyWebhookSignature(rawBody, signature, secret)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    const event = JSON.parse(rawBody);
    const payment = event?.payload?.payment?.entity;
    const razorpayOrderId: string | undefined = payment?.order_id;

    if (!payment || !razorpayOrderId) {
      return NextResponse.json({ received: true });
    }

    if (event.event === 'payment.failed') {
      await markOrderUnpaid(supabaseAdmin, razorpayOrderId, 'failed');
      return NextResponse.json({ received: true });
    }

    if (event.event === 'payment.captured' || event.event === 'order.paid') {
      const { data: order } = await supabaseAdmin
        .from('orders')
        .select('*')
        .eq('razorpay_order_id', razorpayOrderId)
        .maybeSingle();

      if (!order) {
        console.error('Webhook: no order for', razorpayOrderId);
        return NextResponse.json({ received: true });
      }
      if (payment.status !== 'captured' || Number(payment.amount) !== toPaise(order.amount)) {
        console.error('Webhook: payment does not match order', { razorpayOrderId, status: payment.status, amount: payment.amount });
        return NextResponse.json({ received: true });
      }

      const { data: userData } = await supabaseAdmin.auth.admin.getUserById(order.user_id);
      const result = await markOrderPaid(
        supabaseAdmin,
        order,
        { id: payment.id, method: payment.method },
        { email: userData?.user?.email || payment.email, name: userData?.user?.user_metadata?.full_name }
      );

      // A non-2xx response makes Razorpay retry the delivery later
      if (!result.ok) {
        return NextResponse.json({ error: result.error }, { status: 500 });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook handler error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
