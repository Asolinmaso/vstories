import { NextResponse } from 'next/server';
import { verifyPaymentSignature, fetchPaymentDetails, capturePayment, toPaise } from '@/lib/razorpay';
import { supabaseAdmin } from '@/lib/supabase';
import { markOrderPaid, markOrderUnpaid } from '@/lib/payment-orders';

// Razorpay redirect-mode callback (used on phones). After the payment page
// finishes, Razorpay POSTs the result to this URL and the browser lands here
// as a full page navigation — this survives UPI app switches and in-app
// browsers, where the popup's JavaScript callback can be lost.
//
// Razorpay's POST carries no login cookies (cross-site), so authenticity comes
// from the HMAC signature, which only someone holding our secret can produce.
// The customer is then redirected (GET, cookies included) to /order-success,
// which only shows orders belonging to the signed-in user.

function redirectTo(request: Request, path: string) {
  return NextResponse.redirect(new URL(path, request.url), 303);
}

function failureOrderId(form: FormData): string | null {
  const direct = form.get('razorpay_order_id');
  if (typeof direct === 'string' && direct) return direct;
  try {
    const metadata = JSON.parse(String(form.get('error[metadata]') || '{}'));
    return metadata.order_id || null;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  if (!supabaseAdmin) return redirectTo(request, '/checkout');

  try {
    const form = await request.formData();
    const paymentId = String(form.get('razorpay_payment_id') || '');
    const signature = String(form.get('razorpay_signature') || '');
    const razorpayOrderId = failureOrderId(form);

    if (!razorpayOrderId || !razorpayOrderId.startsWith('order_')) {
      return redirectTo(request, '/shop');
    }

    const { data: order } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('razorpay_order_id', razorpayOrderId)
      .maybeSingle();

    if (!order) return redirectTo(request, '/shop');

    const successPage = `/order-success?orderId=${order.id}`;

    // Failed / abandoned payment: Razorpay sends error[...] fields instead of a signature
    if (!paymentId || !signature) {
      await markOrderUnpaid(supabaseAdmin, razorpayOrderId, 'failed');
      return redirectTo(request, successPage);
    }

    if (!verifyPaymentSignature(razorpayOrderId, paymentId, signature)) {
      console.error('Callback: invalid payment signature', { razorpayOrderId, paymentId });
      return redirectTo(request, successPage);
    }

    if (order.status !== 'paid') {
      const fetched = await fetchPaymentDetails(paymentId);
      // If Razorpay can't be reached the order stays pending; the confirmation
      // page re-checks with Razorpay by itself.
      if (fetched.success) {
        let payment = fetched.payment;
        const amount = toPaise(order.amount);

        if (payment.order_id === razorpayOrderId && Number(payment.amount) === amount) {
          if (payment.status === 'authorized') {
            const captured = await capturePayment(paymentId, amount, order.currency || 'INR');
            if (captured.success) payment = captured.payment;
          }

          if (payment.status === 'captured') {
            const { data: userData } = await supabaseAdmin.auth.admin.getUserById(order.user_id);
            await markOrderPaid(
              supabaseAdmin,
              order,
              { id: paymentId, method: payment.method, signature },
              { email: userData?.user?.email, name: userData?.user?.user_metadata?.full_name }
            );
          }
        } else {
          console.error('Callback: payment does not match order', { razorpayOrderId, paymentId });
        }
      }
    }

    return redirectTo(request, successPage);
  } catch (error) {
    console.error('Payment callback error:', error);
    return redirectTo(request, '/profile/orders');
  }
}
