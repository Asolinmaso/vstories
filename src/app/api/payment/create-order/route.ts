import { NextResponse } from 'next/server';
import { createRazorpayOrder } from '@/lib/razorpay';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { createClient } from '@supabase/supabase-js';

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
    const { amount, currency = 'INR', items, shippingAddress } = body;

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

    // Verify amount matches items (prevent client-side tampering)
    const calculatedAmount = items.reduce((total: number, item: any) => {
      return total + (item.price * item.quantity);
    }, 0);

    if (Math.abs(calculatedAmount - amount) > 1) {
      return NextResponse.json(
        { error: 'Amount mismatch - possible tampering detected' },
        { status: 400 }
      );
    }

    // Create Razorpay order
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
        user_id: user.id,
        razorpay_order_id: result.order.id,
        amount,
        currency,
        status: 'pending',
        items,
        shipping_address: shippingAddress,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error creating order:', JSON.stringify(dbError));
      // Surface the actual DB error in dev for easier debugging
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
