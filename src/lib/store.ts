"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "@/lib/supabase-browser";

export interface CartItem {
    id: string; // product_id
    name: string;
    price: number;
    quantity: number;
    image?: string;
    size?: string;
    cartItemId?: string; // Unique identifier for cart_items table row
}

interface CartStore {
    items: CartItem[];
    userId: string | null;
    addItem: (item: Omit<CartItem, "quantity">) => Promise<void>;
    removeItem: (id: string) => Promise<void>;
    updateQuantity: (id: string, quantity: number) => Promise<void>;
    clearCart: () => void;
    getTotal: () => number;
    setUserId: (id: string | null) => void;
    syncCart: () => Promise<void>;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            userId: null,

            setUserId: (id) => set({ userId: id }),

            syncCart: async () => {
                const { userId, items } = get();
                if (!userId) return;

                // Fetch remote cart
                const { data: remoteItems } = await supabase
                    .from("cart_items")
                    .select("id, product_id, quantity, size_label, product:products(name, price, images)")
                    .eq("user_id", userId);

                if (remoteItems && remoteItems.length > 0) {
                    // Transform remote to CartItem with cartItemId
                    const mappedRemote: CartItem[] = remoteItems.map((ri: any) => ({
                        id: ri.product_id,
                        name: ri.product?.name || "Unknown Product",
                        price: ri.product?.price || 0,
                        quantity: ri.quantity,
                        image: ri.product?.images?.[0] || "",
                        size: ri.size_label,
                        cartItemId: ri.id, // Store the cart_items.id
                    }));

                    set({ items: mappedRemote });
                }
            },

            addItem: async (item) => {
                // Generate a unique key for this product+size combination
                const itemKey = `${item.id}-${item.size || 'default'}`;
                
                // Optimistic Update
                set((state) => {
                    const existingItem = state.items.find((i) => 
                        i.id === item.id && i.size === item.size
                    );
                    if (existingItem) {
                        return {
                            items: state.items.map((i) =>
                                (i.id === item.id && i.size === item.size) 
                                    ? { ...i, quantity: i.quantity + 1 } 
                                    : i
                            ),
                        };
                    }
                    return { items: [...state.items, { ...item, quantity: 1 }] };
                });

                // Supabase Sync
                const { userId, items } = get();
                if (userId) {
                    const currentItem = items.find(i => i.id === item.id && i.size === item.size);
                    if (currentItem) {
                        const { data } = await supabase
                            .from("cart_items")
                            .upsert({
                                user_id: userId,
                                product_id: item.id,
                                size_label: item.size || null,
                                quantity: currentItem.quantity
                            }, { 
                                onConflict: 'user_id, product_id, size_label',
                                ignoreDuplicates: false 
                            })
                            .select('id')
                            .single();
                        
                        // Update cartItemId in local state
                        if (data) {
                            set((state) => ({
                                items: state.items.map((i) =>
                                    (i.id === item.id && i.size === item.size)
                                        ? { ...i, cartItemId: data.id }
                                        : i
                                ),
                            }));
                        }
                    }
                }
            },

            removeItem: async (cartItemId) => {
                set((state) => ({
                    items: state.items.filter((i) => i.cartItemId !== cartItemId),
                }));

                const { userId } = get();
                if (userId && cartItemId) {
                    await supabase
                        .from("cart_items")
                        .delete()
                        .eq("id", cartItemId);
                }
            },

            updateQuantity: async (cartItemId, quantity) => {
                const safeQuantity = Math.max(1, quantity);
                
                set((state) => ({
                    items: state.items.map((i) =>
                        i.cartItemId === cartItemId ? { ...i, quantity: safeQuantity } : i
                    ),
                }));

                const { userId } = get();
                if (userId && cartItemId) {
                    await supabase
                        .from("cart_items")
                        .update({ quantity: safeQuantity })
                        .eq("id", cartItemId);
                }
            },

            clearCart: () => {
                set({ items: [] });
            },

            getTotal: () => {
                return get().items.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                );
            },
        }),
        {
            name: "vstories-cart",
        }
    )
);
