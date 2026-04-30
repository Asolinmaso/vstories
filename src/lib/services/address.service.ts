import { supabase } from "@/lib/supabase-browser";

export interface Address {
    id: string;
    user_id: string;
    name: string; // "Home", "Work"
    full_name: string;
    phone: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    is_default: boolean;
    created_at?: string;
}

export type NewAddress = Omit<Address, "id" | "user_id" | "created_at">;

export class AddressService {
    static async getAddresses() {
        const { data, error } = await supabase
            .from("addresses")
            .select("*")
            .order("is_default", { ascending: false })
            .order("created_at", { ascending: false });

        if (error) throw error;
        return data as Address[];
    }

    static async addAddress(address: NewAddress) {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        // If this is the first address, make it default automatically
        const { count } = await supabase.from("addresses").select("*", { count: 'exact', head: true });
        const isFirst = count === 0;

        const { data, error } = await supabase
            .from("addresses")
            .insert([{
                ...address,
                user_id: user.id,
                is_default: address.is_default || isFirst
            }])
            .select()
            .single();

        if (error) throw error;
        return data as Address;
    }

    static async updateAddress(id: string, updates: Partial<NewAddress>) {
        const { data, error } = await supabase
            .from("addresses")
            .update(updates)
            .eq("id", id)
            .select()
            .single();

        if (error) throw error;
        return data as Address;
    }

    static async deleteAddress(id: string) {
        const { error } = await supabase
            .from("addresses")
            .delete()
            .eq("id", id);

        if (error) throw error;
    }

    static async setDefaultAddress(id: string) {
        // First, unset current default
        await supabase
            .from("addresses")
            .update({ is_default: false })
            .eq("is_default", true);

        // Then set new default
        const { data, error } = await supabase
            .from("addresses")
            .update({ is_default: true })
            .eq("id", id)
            .select()
            .single();

        if (error) throw error;
        return data as Address;
    }
}
