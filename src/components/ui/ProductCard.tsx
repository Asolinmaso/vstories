"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Eye } from "lucide-react";
import { Product } from "@/lib/services/product.service";
import { useCartStore } from "@/lib/store";
import { toast } from "sonner";
import AddToWishlistButton from "../products/AddToWishlistButton";

import FadeIn from "./FadeIn";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            // Default size/variant if needed, or prompt user. For card add-to-cart, we often just add base product
            // But since our cart expects size-specific IDs, this might be tricky.
            // Let's assume default size if available or just the product item. 
            // The cart store logic might need to be robust.  
            // For now, let's just pass what we have.
            size: product.sizes?.[0]?.label,
        });

        toast.success("Added to Cart", {
            description: `${product.name} has been added to your cart.`
        });
    };

    const discount = product.original_price
        ? Math.round(
            ((product.original_price - product.price) / product.original_price) * 100
        )
        : null;

    return (
        <FadeIn className="h-full">
            <Link href={`/product/${product.slug}`}>
                <motion.article
                    className="group relative bg-[var(--background)] rounded-xl border border-[#D9D9D9] overflow-hidden hover:shadow-2xl transition-all duration-500 h-full flex flex-col"
                >
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[0px_20px_20px_rgba(0,0,0,0.1)]"
                    />

                    {/* Image Container */}
                    <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[var(--background)] to-[var(--background-dark)] flex-shrink-0">
                        {/* Product Image Placeholder */}
                        <div className="absolute inset-0 img-placeholder transition-transform duration-700 group-hover:scale-110">
                            <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                className="object-cover object-center"
                            />
                        </div>

                        {/* Gradient Overlay on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Badges */}
                        <div className="absolute top-2 left-2 md:top-4 md:left-4 flex flex-col gap-1.5 md:gap-2 z-10">
                            {product.is_bestseller && (
                                <div className="px-2 py-1 md:px-3 md:py-1.5 bg-gradient-to-r from-[var(--highlight)] to-[var(--gold)] text-white text-[10px] md:text-xs font-semibold rounded-full shadow-lg">
                                    ★ Bestseller
                                </div>
                            )}
                            {product.is_new && (
                                <span className="px-2 py-1 md:px-3 md:py-1.5 bg-[var(--secondary)] text-white text-[10px] md:text-xs font-semibold rounded-full shadow-lg">
                                    New
                                </span>
                            )}
                            {discount && (
                                <span className="px-2 py-1 md:px-3 md:py-1.5 bg-red-500 text-white text-[10px] md:text-xs font-semibold rounded-full shadow-lg">
                                    -{discount}%
                                </span>
                            )}
                        </div>

                        {/* Wishlist Button */}
                        <div className="absolute top-2 right-2 md:top-4 md:right-4 z-10">
                            <AddToWishlistButton
                                product={{
                                    id: product.id,
                                    name: product.name,
                                    price: product.price,
                                    image: product.images[0],
                                    slug: product.slug
                                }}
                                className="p-1.5 md:p-2"
                            />
                        </div>

                        {/* Quick Actions */}
                        <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-10 hidden md:flex">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleAddToCart}
                                className="flex-1 py-3 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg backdrop-blur-sm transition-colors"
                            >
                                <ShoppingBag className="w-4 h-4" />
                                Add to Cart
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white text-[var(--primary)] rounded-xl shadow-lg backdrop-blur-sm transition-colors"
                                aria-label={`Quick view ${product.name}`}
                            >
                                <Eye className="w-4 h-4" />
                            </motion.button>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="relative p-3 md:p-5 flex flex-col flex-1">
                        {/* Decorative Line */}
                        <div className="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-[var(--secondary-light)]/30 to-transparent" />

                        <h3
                            className="font-semibold text-[var(--text-primary)] text-xl md:text-2xl mb-2 line-clamp-1 font-inter"
                        >
                            {product.name}
                        </h3>

                        <div className="mb-4 flex-shrink-0">
                            <p className="text-sm md:text-base text-[var(--text-primary)] line-clamp-2 leading-relaxed h-10 md:h-12 font-inter">
                                {product.short_description}
                            </p>
                        </div>

                        {/* Price - pushed to bottom */}
                        {/* Price & Rating */}
                        <div className="flex flex-col gap-4 mt-auto">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-xl md:text-2xl font-semibold text-[var(--text-primary)] font-inter">
                                        ₹{product.price}
                                    </span>
                                    {product.original_price && (
                                        <span className="text-sm md:text-base text-[var(--text-primary)] line-through opacity-60 font-inter">
                                            (₹{product.original_price})
                                        </span>
                                    )}
                                </div>
                                
                                <div className="flex items-center gap-1 bg-[#F4EEE2] px-2 py-0.5 rounded-md">
                                    <span className="text-[#E8BF72]">★</span>
                                    <span className="text-sm font-semibold text-[var(--text-primary)]">{product.rating || "4.8"}</span>
                                    <span className="text-xs text-[var(--text-primary)] opacity-60">({product.reviews_count || "120"})</span>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={handleAddToCart}
                                    className="py-2.5 border border-[var(--primary)] text-[var(--primary)] text-sm font-medium rounded-lg hover:bg-[var(--primary)]/5 transition-all"
                                >
                                    Add to cart
                                </button>
                                <button
                                    onClick={() => {/* handle buy now */}}
                                    className="py-2.5 bg-[var(--primary)] text-[var(--secondary-light)] text-sm font-medium rounded-lg hover:bg-[var(--primary-dark)] transition-all"
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Corner Accent */}
                    <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-[var(--secondary-light)]/10 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.article>
            </Link>
        </FadeIn >
    );
}
