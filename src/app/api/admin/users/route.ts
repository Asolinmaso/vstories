import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
    const { isAdmin } = await getAdminUser();
    if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    if (!supabaseAdmin) return NextResponse.json({ error: "SUPABASE_SERVICE_ROLE_KEY is not configured" }, { status: 500 });

    const { data, error } = await supabaseAdmin
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // Attach emails from auth (best effort)
    const emails = new Map<string, string>();
    try {
        const { data: list } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
        list?.users.forEach((u) => u.email && emails.set(u.id, u.email));
    } catch { /* ignore */ }

    return NextResponse.json({
        users: (data || []).map((p) => ({ ...p, email: emails.get(p.id) || null })),
    });
}

export async function PATCH(req: NextRequest) {
    const { user, isAdmin } = await getAdminUser();
    if (!isAdmin || !user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    if (!supabaseAdmin) return NextResponse.json({ error: "SUPABASE_SERVICE_ROLE_KEY is not configured" }, { status: 500 });

    const { id, role } = await req.json();
    if (!id || !["user", "admin"].includes(role)) {
        return NextResponse.json({ error: "Invalid id or role" }, { status: 400 });
    }
    if (id === user.id) {
        return NextResponse.json({ error: "You cannot change your own role" }, { status: 400 });
    }
    const { error } = await supabaseAdmin.from("profiles").update({ role }).eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
}
