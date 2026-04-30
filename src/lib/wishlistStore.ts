"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "@/lib/supabase-browser";

export interface WishlistItem {
    id: string; // product_id
    name: string;
    price: number;
    image?: string;
    slug: string;
}

interface WishlistStore {
    items: WishlistItem[];
    userId: string | null;
    addItem: (item: WishlistItem) => Promise<void>;
    removeItem: (id: string) => Promise<void>;
    hasItem: (id: string) => boolean;
    clearWishlist: () => void;
    setUserId: (id: string | null) => void;
    syncWishlist: () => Promise<void>;
}

export const useWishlistStore = create<WishlistStore>()(
    persist(
        (set, get) => ({
            items: [],
            userId: null,

            setUserId: (id) => set({ userId: id }),

            syncWishlist: async () => {
                const { userId } = get();
                if (!userId) return;

                const { data: remoteItems } = await supabase
                    .from("wishlist")
                    .select("*, product:products(id, name, price, images, slug)")
                    .eq("user_id", userId);

                if (remoteItems) {
                    const mappedRemote: WishlistItem[] = remoteItems.map((ri: any) => ({
                        id: ri.product_id,
                        name: ri.product?.name || "Unknown Product",
                        price: ri.product?.price || 0,
                        image: ri.product?.images?.[0] || "",
                        slug: ri.product?.slug || ""
                    }));

                    if (mappedRemote.length > 0) {
                        set({ items: mappedRemote });
                    }
                }
            },

            addItem: async (item) => {
                set((state) => {
                    if (state.items.find((i) => i.id === item.id)) return state;
                    return { items: [...state.items, item] };
                });

                const { userId } = get();
                if (userId) {
                    await supabase
                        .from("wishlist")
                        .upsert({
                            user_id: userId,
                            product_id: item.id
                        }, { onConflict: 'user_id, product_id' });
                }
            },

            removeItem: async (id) => {
                set((state) => ({
                    items: state.items.filter((i) => i.id !== id),
                }));

                const { userId } = get();
                if (userId) {
                    await supabase
                        .from("wishlist")
                        .delete()
                        .eq("user_id", userId)
                        .eq("product_id", id);
                }
            },

            hasItem: (id) => {
                return !!get().items.find((i) => i.id === id);
            },

            clearWishlist: () => {
                set({ items: [] });
            },
        }),
        {
            name: "vstories-wishlist",
        }
    )
);
