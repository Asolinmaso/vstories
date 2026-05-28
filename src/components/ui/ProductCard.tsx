"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingBag, Eye } from "lucide-react";
import { Product } from "@/lib/services/product.service";
import { useCartStore } from "@/lib/store";
import { toast } from "sonner";
import AddToWishlistButton from "../products/AddToWishlistButton";

import FadeIn from "./FadeIn";

interface ProductCardProps {
    product: Product;
    titleClassName?: string;
    titleStyle?: React.CSSProperties;
}

export default function ProductCard({ product, titleClassName, titleStyle }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);
    const router = useRouter();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            size: product.sizes?.[0]?.label,
        });

        toast.success("Added to Cart", {
            description: `${product.name} has been added to your cart.`
        });
    };

    const handleBuyNow = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            size: product.sizes?.[0]?.label,
        });
        router.push("/checkout");
    };

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

                        {/* Gradient Overlay on Hover (optional, kept for polish) */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />


                    </div>

                    {/* Product Info */}
                    <div className="relative p-4 md:p-5 flex flex-col flex-1">
                        <div className="flex items-start justify-between gap-2 mb-2">
                            <h3
                                className={`font-semibold text-[#2E2E2E] leading-tight line-clamp-1 font-inter flex-1 pt-1 ${titleClassName || ''}`}
                                style={{ ...titleStyle, fontSize: titleStyle?.fontSize || "20px" }}
                            >
                                {product.name}
                            </h3>
                            <AddToWishlistButton
                                product={{
                                    id: product.id,
                                    name: product.name,
                                    price: product.price,
                                    image: product.images[0],
                                    slug: product.slug
                                }}
                                className="text-gray-400 hover:text-[var(--primary)] -mr-2"
                            />
                        </div>

                        <div className="mb-5 flex-shrink-0">
                            <p className="text-[13px] md:text-[14px] text-[#4B5563] line-clamp-2 leading-[20px] min-h-[40px] font-inter">
                                {product.short_description}
                            </p>
                        </div>

                        {/* Price & Rating */}
                        <div className="flex flex-col gap-5 mt-auto">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-[18px] md:text-[20px] font-semibold text-[#1D3B29] font-inter">
                                        ₹{product.price}
                                    </span>
                                    {product.original_price && (
                                        <span className="text-[13px] md:text-[14px] text-[#878787] line-through font-inter">
                                            ₹{product.original_price}
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center gap-1.5">
                                    <span className="text-[#E8BF72] text-[14px]">★</span>
                                    <span className="text-[13px] md:text-[14px] font-semibold text-[#2E2E2E]">{product.rating || "4.8"}</span>
                                    <span className="text-[12px] md:text-[13px] text-[#878787]">({product.reviews_count || "120"})</span>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-row items-center gap-3">
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 font-inter font-medium text-[#1D3B29] transition-all hover:bg-[#1D3B29]/5"
                                    style={{
                                        height: "36px",
                                        border: "1px solid #1D3B29",
                                        borderRadius: "4px",
                                        fontSize: "13px",
                                    }}
                                >
                                    Add to cart
                                </button>
                                <button
                                    onClick={handleBuyNow}
                                    className="flex-1 font-inter font-medium text-white transition-all hover:opacity-90 flex items-center justify-center"
                                    style={{
                                        height: "36px",
                                        background: "#1D3B29",
                                        borderRadius: "4px",
                                        fontSize: "13px",
                                    }}
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
