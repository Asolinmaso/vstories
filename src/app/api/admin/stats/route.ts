import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
    const { isAdmin } = await getAdminUser();
    if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    if (!supabaseAdmin) return NextResponse.json({ error: "SUPABASE_SERVICE_ROLE_KEY is not configured" }, { status: 500 });

    const [products, users, orders, paid, pending, recent, lowStock] = await Promise.all([
        supabaseAdmin.from("products").select("*", { count: "exact", head: true }),
        supabaseAdmin.from("profiles").select("*", { count: "exact", head: true }),
        supabaseAdmin.from("orders").select("*", { count: "exact", head: true }),
        supabaseAdmin.from("orders").select("amount").eq("status", "paid"),
        supabaseAdmin.from("orders").select("*", { count: "exact", head: true }).eq("status", "pending"),
        supabaseAdmin.from("orders").select("id, amount, status, created_at, shipping_address").order("created_at", { ascending: false }).limit(8),
        supabaseAdmin.from("products").select("id, name, stock").lte("stock", 10).order("stock", { ascending: true }).limit(6),
    ]);

    const revenue = (paid.data || []).reduce((sum, o) => sum + Number(o.amount || 0), 0);

    return NextResponse.json({
        products: products.count || 0,
        users: users.count || 0,
        orders: orders.count || 0,
        pendingOrders: pending.count || 0,
        revenue,
        recentOrders: recent.data || [],
        lowStock: lowStock.data || [],
    });
}
