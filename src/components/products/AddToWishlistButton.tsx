"use client";

import { useWishlistStore, WishlistItem } from "@/lib/wishlistStore";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { toast } from "sonner";

export default function AddToWishlistButton({ product, className = "" }: { product: WishlistItem, className?: string }) {
    const addItem = useWishlistStore((state) => state.addItem);
    const removeItem = useWishlistStore((state) => state.removeItem);
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    const isWishlisted = useWishlistStore((state) => !!state.items.find(i => i.id === product.id));

    const toggleWishlist = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isWishlisted) {
            await removeItem(product.id);
            toast.success("Removed from Wishlist");
        } else {
            await addItem(product);
            toast.success("Added to Wishlist");
        }
    };

    if (!mounted) return <div className={`w-[30px] h-[30px] flex items-center justify-center p-1 rounded-full ${className}`} />;

    return (
        <button
            onClick={toggleWishlist}
            className={`flex items-center justify-center p-1 rounded-full transition-all duration-300 ${isWishlisted
                ? "text-[var(--primary)]"
                : "text-gray-400 hover:text-[var(--primary)]"
                } ${className}`}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={isWishlisted ? "filled" : "outline"}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <Heart className={`w-[22px] h-[22px] ${isWishlisted ? "fill-current" : ""}`} strokeWidth={1.5} />
                </motion.div>
            </AnimatePresence>
        </button>
    );
}
