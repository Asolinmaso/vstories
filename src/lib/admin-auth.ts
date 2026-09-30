import { createSupabaseServerClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase";

/**
 * Verifies the current request is from an admin. Uses getUser() (validated
 * against Supabase) and reads the role with the service key when available so
 * RLS quirks can never lock a real admin out.
 */
export async function getAdminUser() {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { user: null, isAdmin: false as const };

    const db = supabaseAdmin ?? supabase;
    const { data: profile } = await db
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

    return { user, isAdmin: profile?.role === "admin" };
}
