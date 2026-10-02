"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useLoginModal } from "@/context/LoginModalContext";
import { useCartStore, CartItem } from "@/lib/store";
import { isUuid } from "@/lib/uuid";

/**
 * "Buy Now": make sure the product is in the cart, then go to checkout.
 * Signed-out shoppers get the login popup right where they are and continue
 * to checkout as soon as they sign in.
 */
export function useBuyNow() {
    const router = useRouter();
    const { user, loading } = useAuth();
    const { open: openLoginModal } = useLoginModal();

    return (item: Omit<CartItem, "quantity">) => {
        if (!isUuid(item.id)) {
            toast.error("This product is unavailable. Please refresh and try again.");
            return;
        }

        // Tapping Buy Now twice must not double the quantity
        const { items, addItem } = useCartStore.getState();
        const alreadyInCart = items.some((i) => i.id === item.id && i.size === item.size);
        if (!alreadyInCart) void addItem(item);

        if (!loading && !user) {
            toast.info("Please login to complete your purchase");
            openLoginModal("login", "/checkout");
            return;
        }

        router.push("/checkout");
    };
}
