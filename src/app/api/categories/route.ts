import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function GET() {
    try {
        const supabase = await createSupabaseServerClient();
        const { data, error } = await supabase
            .from("categories")
            .select("id, name, slug, image, description")
            .order("name", { ascending: true });

        if (error) throw error;

        return NextResponse.json(data || [], { status: 200 });
    } catch (error: any) {
        console.error("Error fetching categories:", error);
        return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
    }
}
