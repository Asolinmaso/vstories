"use client";

import { useWishlistStore, WishlistItem } from "@/lib/wishlistStore";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AddToWishlistButton({ product, className = "" }: { product: WishlistItem, className?: string }) {
    const { hasItem, addItem, removeItem } = useWishlistStore();
    const [isWishlisted, setIsWishlisted] = useState(false);

    // Sync state with store
    useEffect(() => {
        setIsWishlisted(hasItem(product.id));
    }, [hasItem, product.id, useWishlistStore().items]); // React to store changes

    const toggleWishlist = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isWishlisted) {
            await removeItem(product.id);
            setIsWishlisted(false);
        } else {
            await addItem(product);
            setIsWishlisted(true);
        }
    };

    return (
        <button
            onClick={toggleWishlist}
            className={`flex items-center justify-center p-2 rounded-full transition-all duration-300 ${isWishlisted
                ? "bg-red-50 text-red-500 hover:bg-red-100"
                : "bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-red-400"
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
                    <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                </motion.div>
            </AnimatePresence>
        </button>
    );
}
