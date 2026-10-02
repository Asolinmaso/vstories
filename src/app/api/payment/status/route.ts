import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { supabaseAdmin } from '@/lib/supabase';
import { reconcileOrderWithRazorpay } from '@/lib/payment-orders';
import { isUuid } from '@/lib/uuid';

// Current status of one of the caller's orders (used by the order
// confirmation page). An online order that is still unpaid is first checked
// against Razorpay, so a payment whose browser callback was lost still
// confirms the order.
export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Not configured' }, { status: 500 });
    }

    const body = await request.json().catch(() => null);
    const orderId = body?.orderId;
    if (!isUuid(orderId)) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) throw error;
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const status = await reconcileOrderWithRazorpay(supabaseAdmin, order, {
      email: user.email,
      name: user.user_metadata?.full_name,
    });

    return NextResponse.json({
      order: {
        id: order.id,
        status,
        amount: order.amount,
        payment_method: order.payment_method,
      },
    });
  } catch (error: any) {
    console.error('Payment status error:', error);
    return NextResponse.json({ error: 'Could not load the order' }, { status: 500 });
  }
}
