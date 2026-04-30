import { NextResponse } from 'next/server';
import { verifyPaymentSignature, fetchPaymentDetails } from '@/lib/razorpay';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { createClient } from '@supabase/supabase-js';
import { sendEmail, getOrderConfirmationHTML } from '@/lib/email-order';

// Admin client for reliable DB writes (bypasses RLS, works in API routes)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    // Use getUser() — cryptographically verified, not just cookie-based
    const supabase = await createSupabaseServerClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

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

    // Fetch payment details from Razorpay to cross-verify
    const paymentResult = await fetchPaymentDetails(razorpay_payment_id);
    if (!paymentResult.success || !paymentResult.payment) {
      return NextResponse.json({ error: 'Failed to fetch payment details' }, { status: 500 });
    }

    const payment = paymentResult.payment;

    if (payment.status !== 'captured' && payment.status !== 'authorized') {
      return NextResponse.json(
        { error: `Payment not successful. Status: ${payment.status}` },
        { status: 400 }
      );
    }

    // Look up order — only allow the owning user's order (admin client for reliability)
    const { data: order, error: fetchError } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('razorpay_order_id', razorpay_order_id)
      .eq('user_id', user.id) // ensures user owns this order
      .single();

    if (fetchError || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Amount double-check (paise)
    const orderAmount = order.amount * 100;
    if (payment.amount !== orderAmount) {
      console.error('Amount mismatch:', { expected: orderAmount, received: payment.amount, orderId: razorpay_order_id });
      return NextResponse.json({ error: 'Amount mismatch - possible fraud' }, { status: 400 });
    }

    // Mark order as paid
    const { error: updateError } = await supabaseAdmin
      .from('orders')
      .update({
        status: 'paid',
        razorpay_payment_id,
        razorpay_signature,
        payment_method: payment.method,
        paid_at: new Date().toISOString(),
      })
      .eq('id', order.id);

    if (updateError) {
      console.error('Failed to update order:', updateError);
      return NextResponse.json({ error: 'Failed to update order status' }, { status: 500 });
    }

    // Decrement stock for each item
    for (const item of order.items) {
      await supabaseAdmin.rpc('decrement_stock', {
        product_id: item.id,
        quantity: item.quantity,
      });
    }

    // Clear user's DB cart
    await supabaseAdmin.from('cart_items').delete().eq('user_id', user.id);

    // Send order confirmation email (non-blocking)
    try {
      await sendEmail({
        to: user.email!,
        subject: `Order Confirmation - ${order.id}`,
        html: getOrderConfirmationHTML(order, user),
      });
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
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
