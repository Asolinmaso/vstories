import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

const PENDING_VISIBLE_MS = 60 * 60 * 1000;

export async function GET() {
    try {
        const supabase = await createSupabaseServerClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { data: orders, error } = await supabase
            .from("orders")
            .select("*")
            .eq("user_id", user.id)
            // Abandoned / failed payment attempts are not orders
            .not("status", "in", "(failed,cancelled)")
            .order("created_at", { ascending: false });

        if (error) throw error;

        // An unpaid attempt is only worth showing while the payment may still
        // be confirming; older ones were simply abandoned.
        const cutoff = Date.now() - PENDING_VISIBLE_MS;
        const visible = (orders || []).filter(
            (order) => order.status !== "pending" || new Date(order.created_at).getTime() > cutoff
        );

        return NextResponse.json({ orders: visible });
    } catch (error: any) {
        console.error("User orders error:", error);
        return NextResponse.json({ error: "Could not load your orders" }, { status: 500 });
    }
}
