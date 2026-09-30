import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const STATUSES = ["pending", "paid", "failed", "refunded", "cancelled"];

export async function GET() {
    const { isAdmin } = await getAdminUser();
    if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    if (!supabaseAdmin) return NextResponse.json({ error: "SUPABASE_SERVICE_ROLE_KEY is not configured" }, { status: 500 });

    const { data, error } = await supabaseAdmin
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(500);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ orders: data });
}

export async function PATCH(req: NextRequest) {
    const { isAdmin } = await getAdminUser();
    if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    if (!supabaseAdmin) return NextResponse.json({ error: "SUPABASE_SERVICE_ROLE_KEY is not configured" }, { status: 500 });

    const { id, status } = await req.json();
    if (!id || !STATUSES.includes(status)) {
        return NextResponse.json({ error: "Invalid id or status" }, { status: 400 });
    }
    const { error } = await supabaseAdmin.from("orders").update({ status }).eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
}
