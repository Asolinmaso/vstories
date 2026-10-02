import Razorpay from 'razorpay';
import crypto from 'crypto';

// Server-side Razorpay instance (never expose key_secret to client).
// Created lazily so a missing key surfaces as a clear API error instead of
// crashing the module (and the build) at import time.
let instance: Razorpay | null = null;

function getRazorpay(): Razorpay {
  if (!instance) {
    const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    if (!key_id || !key_secret) {
      throw new Error('Razorpay keys are not configured');
    }
    instance = new Razorpay({ key_id, key_secret });
  }
  return instance;
}

/** Rupees -> paise, rounded so float maths can never produce a fractional paise */
export function toPaise(amount: number): number {
  return Math.round(Number(amount) * 100);
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && crypto.timingSafeEqual(bufA, bufB);
}

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
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) return false;
    const generated_signature = crypto
      .createHmac('sha256', secret)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    return safeEqual(generated_signature, String(signature));
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
}

/**
 * Verify a Razorpay webhook signature (HMAC of the raw request body)
 */
export function verifyWebhookSignature(rawBody: string, signature: string, secret: string): boolean {
  try {
    const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
    return safeEqual(expected, String(signature));
  } catch (error) {
    console.error('Webhook signature verification error:', error);
    return false;
  }
}

/**
 * Create Razorpay order
 */
export async function createRazorpayOrder(
  amount: number,
  currency: string = 'INR',
  notes: Record<string, string> = {}
) {
  try {
    const order = await getRazorpay().orders.create({
      amount: toPaise(amount), // Razorpay expects amount in paise
      currency,
      receipt: `receipt_${Date.now()}`,
      notes: {
        created_at: new Date().toISOString(),
        ...notes,
      },
    });
    return { success: true as const, order };
  } catch (error: any) {
    console.error('Razorpay order creation error:', error);
    return { success: false as const, error: error?.error?.description || error?.message || 'Unknown error' };
  }
}

/**
 * Fetch payment details (for verification)
 */
export async function fetchPaymentDetails(paymentId: string) {
  try {
    const payment = await getRazorpay().payments.fetch(paymentId);
    return { success: true as const, payment };
  } catch (error: any) {
    console.error('Fetch payment error:', error);
    return { success: false as const, error: error?.error?.description || error?.message || 'Unknown error' };
  }
}

/**
 * List every payment attempt made against a Razorpay order
 */
export async function fetchOrderPayments(razorpayOrderId: string) {
  try {
    const result = await getRazorpay().orders.fetchPayments(razorpayOrderId);
    return { success: true as const, payments: result.items || [] };
  } catch (error: any) {
    console.error('Fetch order payments error:', error);
    return { success: false as const, error: error?.error?.description || error?.message || 'Unknown error' };
  }
}

/**
 * Capture an authorized payment (only needed when auto-capture is off)
 */
export async function capturePayment(paymentId: string, amountInPaise: number, currency: string = 'INR') {
  try {
    const payment = await getRazorpay().payments.capture(paymentId, amountInPaise, currency);
    return { success: true as const, payment };
  } catch (error: any) {
    console.error('Capture payment error:', error);
    return { success: false as const, error: error?.error?.description || error?.message || 'Unknown error' };
  }
}

/**
 * Refund payment
 */
export async function refundPayment(paymentId: string, amount?: number) {
  try {
    const refund = await getRazorpay().payments.refund(paymentId, {
      amount: amount ? toPaise(amount) : undefined, // Partial or full refund
    });
    return { success: true as const, refund };
  } catch (error: any) {
    console.error('Refund error:', error);
    return { success: false as const, error: error?.error?.description || error?.message || 'Unknown error' };
  }
}
