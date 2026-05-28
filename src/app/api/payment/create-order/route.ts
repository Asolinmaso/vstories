import { NextResponse } from 'next/server';
import { createRazorpayOrder } from '@/lib/razorpay';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { createClient } from '@supabase/supabase-js';
import { sendEmail, getOrderConfirmationHTML } from '@/lib/email-order';

// Admin client for DB writes — bypasses RLS and works reliably in API routes
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    // Verify user is authenticated using SSR client (reads cookies)
    const supabase = await createSupabaseServerClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized - Please login' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      amount,
      currency = 'INR',
      items,
      shippingAddress,
      paymentMethod = 'razorpay',
      shippingFee = 0,
      discount = 0,
    } = body;

    // Validate amount
    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Validate shipping address
    if (!shippingAddress?.name || !shippingAddress?.phone) {
      return NextResponse.json({ error: 'Shipping address is required' }, { status: 400 });
    }

    // Verify amount matches items + shipping - discount (prevent client-side tampering)
    const subtotal = items.reduce((total: number, item: any) => {
      return total + (item.price * item.quantity);
    }, 0);

    const expectedTotal = subtotal + Number(shippingFee || 0) - Number(discount || 0);

    if (Math.abs(expectedTotal - amount) > 1) {
      return NextResponse.json(
        { error: 'Amount mismatch - possible tampering detected' },
        { status: 400 }
      );
    }

    const orderPayload = {
      user_id: user.id,
      amount,
      currency,
      status: paymentMethod === 'cod' ? 'confirmed' : 'pending',
      items,
      shipping_address: shippingAddress,
      created_at: new Date().toISOString(),
    };

    // Cash on Delivery — skip Razorpay, create order directly
    if (paymentMethod === 'cod') {
      const { data: order, error: dbError } = await supabaseAdmin
        .from('orders')
        .insert({
          ...orderPayload,
          razorpay_order_id: null,
        })
        .select()
        .single();

      if (dbError) {
        console.error('Database error creating COD order:', JSON.stringify(dbError));
        const msg = process.env.NODE_ENV === 'development'
          ? `DB error: ${dbError.message} (code: ${dbError.code})`
          : 'Failed to save order — please try again';
        return NextResponse.json({ error: msg }, { status: 500 });
      }

      for (const item of items) {
        await supabaseAdmin.rpc('decrement_stock', {
          product_id: item.id,
          quantity: item.quantity,
        });
      }

      await supabaseAdmin.from('cart_items').delete().eq('user_id', user.id);

      try {
        await sendEmail({
          to: user.email!,
          subject: `Order Confirmation - ${order.id}`,
          html: getOrderConfirmationHTML(order, user),
        });
      } catch (emailError) {
        console.error('Failed to send COD confirmation email:', emailError);
      }

      return NextResponse.json({
        success: true,
        orderId: order.id,
        dbOrderId: order.id,
        paymentMethod: 'cod',
      });
    }

    // Create Razorpay order for online payment
    const result = await createRazorpayOrder(amount, currency);

    if (!result.success || !result.order) {
      console.error('Razorpay error:', result.error);
      return NextResponse.json(
        { error: `Failed to create payment order: ${result.error || 'Unknown error'}` },
        { status: 500 }
      );
    }

    // Store order in database using admin client (reliable, no RLS issues)
    const { data: order, error: dbError } = await supabaseAdmin
      .from('orders')
      .insert({
        ...orderPayload,
        razorpay_order_id: result.order.id,
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error creating order:', JSON.stringify(dbError));
      const msg = process.env.NODE_ENV === 'development'
        ? `DB error: ${dbError.message} (code: ${dbError.code})`
        : 'Failed to save order — please try again';
      return NextResponse.json({ error: msg }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      orderId: result.order.id,
      amount: result.order.amount,
      currency: result.order.currency,
      dbOrderId: order.id,
    });

  } catch (error: any) {
    console.error('Create order unhandled error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
