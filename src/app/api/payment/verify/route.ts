import { NextResponse } from 'next/server';
import { verifyPaymentSignature, fetchPaymentDetails, capturePayment, toPaise } from '@/lib/razorpay';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { supabaseAdmin } from '@/lib/supabase';
import { markOrderPaid, markOrderUnpaid } from '@/lib/payment-orders';

export async function POST(request: Request) {
  try {
    // Use getUser() — cryptographically verified, not just cookie-based
    const supabase = await createSupabaseServerClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!supabaseAdmin) {
      console.error('SUPABASE_SERVICE_ROLE_KEY is not configured');
      return NextResponse.json({ error: 'Payment verification is temporarily unavailable' }, { status: 500 });
    }

    const body = await request.json().catch(() => null);
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body || {};

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: 'Missing payment details' }, { status: 400 });
    }

    // CRITICAL: Verify HMAC signature server-side (prevents payment fraud)
    const isValid = verifyPaymentSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);

    if (!isValid) {
      console.error('Invalid payment signature:', {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        userId: user.id,
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json(
        { error: 'Payment verification failed - Invalid signature' },
        { status: 400 }
      );
    }

    // Look up order — only allow the owning user's order
    const { data: order, error: fetchError } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('razorpay_order_id', razorpay_order_id)
      .eq('user_id', user.id)
      .maybeSingle();

    if (fetchError || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Already confirmed (e.g. by the webhook, or a repeated callback)
    if (order.status === 'paid') {
      return NextResponse.json({
        success: true,
        message: 'Payment already verified',
        orderId: order.id,
        status: 'paid',
      });
    }

    // Fetch payment details from Razorpay to cross-verify
    const paymentResult = await fetchPaymentDetails(razorpay_payment_id);
    if (!paymentResult.success) {
      // We could not reach Razorpay — the order stays pending, nothing is lost
      return NextResponse.json(
        { error: 'We could not confirm your payment yet. If money was deducted, your order will be updated shortly.' },
        { status: 502 }
      );
    }

    let payment = paymentResult.payment;
    const orderAmount = toPaise(order.amount);

    if (payment.order_id !== razorpay_order_id || Number(payment.amount) !== orderAmount) {
      console.error('Payment does not match order:', {
        expectedOrder: razorpay_order_id,
        paymentOrder: payment.order_id,
        expectedAmount: orderAmount,
        paymentAmount: payment.amount,
      });
      return NextResponse.json({ error: 'Payment does not match this order' }, { status: 400 });
    }

    // With auto-capture off, the money is only held until we capture it
    if (payment.status === 'authorized') {
      const captured = await capturePayment(razorpay_payment_id, orderAmount, order.currency || 'INR');
      if (captured.success) {
        payment = captured.payment;
      } else {
        const refetched = await fetchPaymentDetails(razorpay_payment_id);
        if (refetched.success) payment = refetched.payment;
      }
    }

    if (payment.status !== 'captured') {
      if (payment.status === 'failed') {
        await markOrderUnpaid(supabaseAdmin, razorpay_order_id, 'failed', user.id);
      }
      return NextResponse.json(
        { error: `Payment was not completed (status: ${payment.status}). You have not been charged for this order.` },
        { status: 400 }
      );
    }

    const result = await markOrderPaid(
      supabaseAdmin,
      order,
      { id: razorpay_payment_id, method: payment.method, signature: razorpay_signature },
      { email: user.email, name: user.user_metadata?.full_name }
    );

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      orderId: order.id,
      status: 'paid',
    });

  } catch (error: any) {
    console.error('Payment verification unhandled error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
