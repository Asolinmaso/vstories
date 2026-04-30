"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { Product } from "@/lib/services/product.service";
import { useCartStore } from "@/lib/store";

interface BestsellerCardProps {
    product: Product;
}

export default function BestsellerCard({ product }: BestsellerCardProps) {
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
        });
    };

    const discount = product.original_price
        ? Math.round(
            ((product.original_price - product.price) / product.original_price) * 100
        )
        : null;

    return (
        <motion.article
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col"
        >
            {/* Image Link */}
            <Link href={`/product/${product.slug}`} className="block relative aspect-square overflow-hidden bg-[#f0f0f0]">
                {/* Discount Ribbon - Full Width Top */}
                {discount && (
                    <div className="absolute top-0 left-0 right-0 z-20 bg-[#9eb666] text-white text-center py-2 font-bold uppercase tracking-wider text-[13px] shadow-md font-sans">
                        FLAT {discount}% off
                    </div>
                )}

                {/* Limited Time Deal / Best Seller Badge */}
                {!discount && product.is_bestseller && (
                    <div className="absolute top-0 left-0 z-20 bg-[#7a2e2e] text-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider shadow-sm rounded-br-lg font-sans">
                        Best Seller
                    </div>
                )}

                {/* Product Image */}
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover object-center"
                    />
                </div>
            </Link>

            {/* Content */}
            <div className="p-2 md:p-4 flex flex-col flex-1">
                {/* Title and Subtitle Link */}
                <Link href={`/product/${product.slug}`} className="block">
                    {/* Title */}
                    <span
                        className="font-semibold text-[var(--primary)] text-base md:text-xl mb-1 md:mb-2 line-clamp-2 md:h-12 group-hover:text-[var(--highlight)] transition-colors duration-300"
                        style={{ fontFamily: "var(--font-fira-sans)" }}
                    >
                        {product.name}
                    </span>

                    {/* Subtitle / Benefit - truncated specifically like reference */}
                    <p className="hidden md:block text-[13px] text-[#555] mb-2 md:mb-4.5 line-clamp-1 font-medium">
                        {product.short_description?.split(".")[0]}
                    </p>
                </Link>

                {/* Price and Rating Row (Non-linked for clarity, or could be linked) */}
                <div className="mt-auto mb-2 md:mb-5 flex flex-col md:flex-row md:items-center justify-between gap-1">
                    <div className="flex items-baseline gap-1 md:gap-2">
                        <span className="text-[12px] md:text-[17px] font-bold text-black" style={{ fontFamily: "var(--font-fira-sans)" }}>
                            ₹{product.price}
                        </span>
                        {product.original_price && (
                            <span className="text-[10px] md:text-[13px] text-[#888] line-through decoration-gray-400 font-normal">
                                ₹{product.original_price}
                            </span>
                        )}
                    </div>

                    {/* Rating */}
                    <div className="hidden md:block flex items-center gap-1">
                        <div className="flex items-center gap-0.5">
                            <Star className="w-3 h-3 md:w-3.5 md:h-3.5 fill-[#FFA800] text-[#FFA800]" />
                            <span className="text-[10px] md:text-[13px] font-bold text-[#333]">
                                4.8
                            </span>
                        </div>
                        <span className="hidden md:inline text-[11px] text-[#777] font-medium pt-0.5">
                            (120)
                        </span>
                    </div>
                </div>

                {/* Add to Cart Button - Outside Link */}
                <button
                    onClick={handleAddToCart}
                    className="w-full py-1.5 md:py-3 text-white font-bold rounded-[4px] shadow-sm transition-all duration-300 active:scale-95 uppercase tracking-wide text-[10px] md:text-[13px] cursor-pointer mt-1 md:mt-4 truncate px-1"
                    style={{
                        fontFamily: "var(--font-fira-sans)",
                        backgroundColor: "#9eb666",
                        color: "#ffffff"
                    }}
                >
                    ADD
                </button>
            </div>
        </motion.article>
    );
}
