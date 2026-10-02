import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { supabaseAdmin } from '@/lib/supabase';
import { markOrderUnpaid, reconcileOrderWithRazorpay } from '@/lib/payment-orders';

// Called by the checkout page when a Razorpay payment attempt fails or the
// customer closes the payment popup, so the order doesn't sit in "pending".
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
    const razorpayOrderId = body?.razorpay_order_id;
    const status = body?.reason === 'cancelled' ? 'cancelled' : 'failed';

    if (typeof razorpayOrderId !== 'string' || !razorpayOrderId.startsWith('order_')) {
      return NextResponse.json({ error: 'Missing order id' }, { status: 400 });
    }

    const { data: order } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('razorpay_order_id', razorpayOrderId)
      .eq('user_id', user.id)
      .maybeSingle();

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // The browser thinks the payment didn't happen — make sure Razorpay agrees
    // before recording that. A captured payment always wins.
    const reconciled = await reconcileOrderWithRazorpay(supabaseAdmin, order, {
      email: user.email,
      name: user.user_metadata?.full_name,
    });
    if (reconciled === 'paid') {
      return NextResponse.json({ success: true, status: 'paid', orderId: order.id });
    }

    await markOrderUnpaid(supabaseAdmin, razorpayOrderId, status, user.id);

    return NextResponse.json({ success: true, status, orderId: order.id });
  } catch (error: any) {
    console.error('Payment failure handler error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
