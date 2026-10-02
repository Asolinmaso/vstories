import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

// Postgres / PostgREST codes for "the addresses table does not exist".
// Run database/addresses_table.sql in the Supabase SQL editor to create it.
const MISSING_TABLE_CODES = ["PGRST205", "42P01"];
const isMissingTable = (error: any) => MISSING_TABLE_CODES.includes(error?.code);

const TEXT_FIELDS = ["label", "full_name", "phone", "address_line1", "address_line2", "city", "state", "postal_code", "country"] as const;
const REQUIRED_FIELDS = ["full_name", "phone", "address_line1", "city", "postal_code"] as const;

// The checkout form sends name/pincode, the profile page sends
// full_name/postal_code. Both are stored in the same columns.
function toRow(body: any): Record<string, any> {
    const source = {
        ...body,
        full_name: body?.full_name || body?.name,
        postal_code: body?.postal_code || body?.pincode,
    };
    const row: Record<string, any> = {};
    for (const field of TEXT_FIELDS) {
        if (typeof source[field] === "string") row[field] = source[field].trim().slice(0, 200);
    }
    if (typeof body?.is_default === "boolean") row.is_default = body.is_default;
    return row;
}

// Expose both naming styles so either form can read what it saved
function toResponse(row: any) {
    return { ...row, name: row.full_name, pincode: row.postal_code };
}

function missingField(row: Record<string, any>): string | null {
    return REQUIRED_FIELDS.find((field) => !row[field]) ?? null;
}

export async function GET() {
    try {
        const supabase = await createSupabaseServerClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { data: addresses, error } = await supabase
            .from("addresses")
            .select("*")
            .eq("user_id", user.id)
            .order("is_default", { ascending: false })
            .order("created_at", { ascending: false });

        if (error) {
            if (isMissingTable(error)) {
                console.error("addresses table is missing — run database/addresses_table.sql");
                return NextResponse.json({ addresses: [], storageUnavailable: true });
            }
            throw error;
        }

        return NextResponse.json({ addresses: (addresses || []).map(toResponse) });
    } catch (error: any) {
        console.error("GET addresses error:", error);
        return NextResponse.json({ error: "Could not load your addresses" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const supabase = await createSupabaseServerClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const row = toRow(await request.json().catch(() => null));
        const missing = missingField(row);
        if (missing) {
            return NextResponse.json({ error: `Please fill in ${missing.replace(/_/g, " ")}` }, { status: 400 });
        }

        if (row.is_default) {
            await supabase.from("addresses").update({ is_default: false }).eq("user_id", user.id);
        }

        const { data, error } = await supabase
            .from("addresses")
            .insert({ ...row, user_id: user.id })
            .select()
            .single();

        if (error) {
            console.error("POST address Supabase error:", error);
            if (isMissingTable(error)) {
                return NextResponse.json(
                    { error: "Saved addresses are not available right now", code: "ADDRESS_BOOK_UNAVAILABLE" },
                    { status: 503 }
                );
            }
            throw error;
        }

        return NextResponse.json({ success: true, address: toResponse(data) });
    } catch (error: any) {
        console.error("POST address caught error:", error);
        return NextResponse.json({ error: "Could not save the address. Please try again." }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const supabase = await createSupabaseServerClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json().catch(() => null);
        const id = body?.id;

        if (!id) {
            return NextResponse.json({ error: "Address ID required" }, { status: 400 });
        }

        const updates = toRow(body);

        if (updates.is_default) {
            await supabase.from("addresses").update({ is_default: false }).eq("user_id", user.id);
        }

        const { data, error } = await supabase
            .from("addresses")
            .update(updates)
            .eq("id", id)
            .eq("user_id", user.id)
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json({ success: true, address: toResponse(data) });
    } catch (error: any) {
        console.error("PUT address error:", error);
        return NextResponse.json({ error: "Could not update the address. Please try again." }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const supabase = await createSupabaseServerClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Address ID required" }, { status: 400 });
        }

        const { error } = await supabase
            .from("addresses")
            .delete()
            .eq("id", id)
            .eq("user_id", user.id);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("DELETE address error:", error);
        return NextResponse.json({ error: "Could not delete the address. Please try again." }, { status: 500 });
    }
}
