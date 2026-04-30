import Razorpay from 'razorpay';
import crypto from 'crypto';

// Server-side Razorpay instance (never expose key_secret to client)
export const razorpayInstance = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

/**
 * Verify Razorpay payment signature
 * This is CRITICAL for security - always verify on server side
 */
export function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  try {
    const text = `${orderId}|${paymentId}`;
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(text)
      .digest('hex');

    return generated_signature === signature;
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
}

/**
 * Create Razorpay order
 */
export async function createRazorpayOrder(amount: number, currency: string = 'INR') {
  try {
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt: `receipt_${Date.now()}`,
      notes: {
        created_at: new Date().toISOString(),
      },
    };

    const order = await razorpayInstance.orders.create(options);
    return { success: true, order };
  } catch (error: any) {
    console.error('Razorpay order creation error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Fetch payment details (for verification)
 */
export async function fetchPaymentDetails(paymentId: string) {
  try {
    const payment = await razorpayInstance.payments.fetch(paymentId);
    return { success: true, payment };
  } catch (error: any) {
    console.error('Fetch payment error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Refund payment
 */
export async function refundPayment(paymentId: string, amount?: number) {
  try {
    const refund = await razorpayInstance.payments.refund(paymentId, {
      amount: amount ? amount * 100 : undefined, // Partial or full refund
    });
    return { success: true, refund };
  } catch (error: any) {
    console.error('Refund error:', error);
    return { success: false, error: error.message };
  }
}
