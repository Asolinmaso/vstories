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
    removeItem: (itemKey: string) => Promise<void>;
    updateQuantity: (itemKey: string, quantity: number) => Promise<void>;
    clearCart: () => Promise<void>;
    getTotal: () => number;
    setUserId: (id: string | null) => void;
    syncCart: () => Promise<void>;
}

export function getCartItemKey(item: Pick<CartItem, "id" | "size" | "cartItemId">): string {
    return item.cartItemId || `${item.id}::${item.size || "default"}`;
}

function findCartItem(items: CartItem[], itemKey: string): CartItem | undefined {
    return items.find(
        (item) =>
            item.cartItemId === itemKey || getCartItemKey(item) === itemKey
    );
}

function mapRemoteCartItem(ri: any): CartItem {
    return {
        id: ri.product_id,
        name: ri.product?.name || "Unknown Product",
        price: ri.product?.price || 0,
        quantity: Math.min(99, Math.max(1, ri.quantity || 1)),
        image: ri.product?.images?.[0] || "",
        size: ri.size_label === 'default' ? undefined : (ri.size_label || undefined),
        cartItemId: ri.id,
    };
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            userId: null,

            setUserId: (id) => set({ userId: id }),

            syncCart: async () => {
                const { userId, items: localItems } = get();
                if (!userId) return;

                // Push guest/local items to Supabase before fetching remote cart
                for (const item of localItems) {
                    const { data: existingRows } = await supabase
                        .from("cart_items")
                        .select("id")
                        .eq("user_id", userId)
                        .eq("product_id", item.id)
                        .eq("size_label", item.size || 'default')
                        .limit(1);

                    const existing = existingRows?.[0];
                    let data;
                    let error;

                    if (existing) {
                        const res = await supabase
                            .from("cart_items")
                            .update({ quantity: item.quantity })
                            .eq("id", existing.id)
                            .select("id")
                            .single();
                        data = res.data;
                        error = res.error;
                    } else {
                        const res = await supabase
                            .from("cart_items")
                            .insert({
                                user_id: userId,
                                product_id: item.id,
                                size_label: item.size || 'default',
                                quantity: item.quantity,
                            })
                            .select("id")
                            .single();
                        data = res.data;
                        error = res.error;
                    }

                    if (!error && data?.id) {
                        set((state) => ({
                            items: state.items.map((i) =>
                                i.id === item.id && i.size === item.size
                                    ? { ...i, cartItemId: data.id }
                                    : i
                            ),
                        }));
                    }
                }

                const { data: remoteItems } = await supabase
                    .from("cart_items")
                    .select("id, product_id, quantity, size_label, product:products(name, price, images)")
                    .eq("user_id", userId);

                if (remoteItems && remoteItems.length > 0) {
                    // Self-healing: Merge duplicate rows that were created due to previous NULL constraint bug
                    const mergedItems: Record<string, any> = {};
                    const toDelete: string[] = [];

                    remoteItems.forEach(row => {
                        const key = `${row.product_id}-${row.size_label || 'default'}`;
                        if (mergedItems[key]) {
                            mergedItems[key].quantity += row.quantity;
                            toDelete.push(row.id);
                        } else {
                            mergedItems[key] = row;
                        }
                    });

                    const finalItems = Object.values(mergedItems).map(mapRemoteCartItem);
                    set({ items: finalItems });

                    // Background cleanup of duplicates
                    if (toDelete.length > 0) {
                        supabase.from("cart_items").delete().in("id", toDelete).then(() => {
                            finalItems.forEach(item => {
                                if (item.cartItemId) {
                                    supabase.from("cart_items")
                                        .update({ quantity: item.quantity, size_label: item.size || 'default' })
                                        .eq("id", item.cartItemId).then();
                                }
                            });
                        });
                    }
                }
            },

            addItem: async (item) => {
                set((state) => {
                    const existingItem = state.items.find(
                        (i) => i.id === item.id && i.size === item.size
                    );
                    if (existingItem) {
                        return {
                            items: state.items.map((i) =>
                                i.id === item.id && i.size === item.size
                                    ? { ...i, quantity: Math.min(99, i.quantity + 1) }
                                    : i
                            ),
                        };
                    }
                    return { items: [...state.items, { ...item, quantity: 1 }] };
                });

                const { userId, items } = get();
                if (userId) {
                    const currentItem = items.find(
                        (i) => i.id === item.id && i.size === item.size
                    );
                    if (currentItem) {
                        const { data: existingRows } = await supabase
                            .from("cart_items")
                            .select("id")
                            .eq("user_id", userId)
                            .eq("product_id", item.id)
                            .eq("size_label", item.size || 'default')
                            .limit(1);
                        
                        const existing = existingRows?.[0];
                        let data;

                        if (existing) {
                            const res = await supabase
                                .from("cart_items")
                                .update({ quantity: currentItem.quantity })
                                .eq("id", existing.id)
                                .select("id")
                                .single();
                            data = res.data;
                        } else {
                            const res = await supabase
                                .from("cart_items")
                                .insert({
                                    user_id: userId,
                                    product_id: item.id,
                                    size_label: item.size || 'default',
                                    quantity: currentItem.quantity,
                                })
                                .select("id")
                                .single();
                            data = res.data;
                        }

                        if (data) {
                            set((state) => ({
                                items: state.items.map((i) =>
                                    i.id === item.id && i.size === item.size
                                        ? { ...i, cartItemId: data.id }
                                        : i
                                ),
                            }));
                        }
                    }
                }
            },

            removeItem: async (itemKey) => {
                const itemToRemove = findCartItem(get().items, itemKey);

                set((state) => ({
                    items: state.items.filter(
                        (i) => getCartItemKey(i) !== itemKey && i.cartItemId !== itemKey
                    ),
                }));

                const { userId } = get();
                if (userId && itemToRemove?.cartItemId) {
                    await supabase
                        .from("cart_items")
                        .delete()
                        .eq("id", itemToRemove.cartItemId);
                }
            },

            updateQuantity: async (itemKey, quantity) => {
                const safeQuantity = Math.min(99, Math.max(1, quantity));
                const targetItem = findCartItem(get().items, itemKey);

                set((state) => ({
                    items: state.items.map((i) =>
                        getCartItemKey(i) === itemKey || i.cartItemId === itemKey
                            ? { ...i, quantity: safeQuantity }
                            : i
                    ),
                }));

                const { userId } = get();
                if (userId && targetItem?.cartItemId) {
                    await supabase
                        .from("cart_items")
                        .update({ quantity: safeQuantity })
                        .eq("id", targetItem.cartItemId);
                }
            },

            clearCart: async () => {
                const { userId } = get();
                set({ items: [] });

                if (userId) {
                    await supabase.from("cart_items").delete().eq("user_id", userId);
                }
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
