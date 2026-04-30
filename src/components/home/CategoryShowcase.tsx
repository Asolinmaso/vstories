"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Product } from "@/lib/services/product.service";
import BestsellerCard from "@/components/ui/BestsellerCard";
import Link from "next/link";

const categories = [
    { id: "hair", label: "Hair Care" },
    { id: "face", label: "Skin Care" },
    { id: "combo", label: "Combos" },
];

interface CategoryShowcaseProps {
    dbProducts: Product[];
}

export default function CategoryShowcase({ dbProducts = [] }: CategoryShowcaseProps) {
    const [activeCategory, setActiveCategory] = useState("hair");
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const filteredProducts = dbProducts.filter(
        // Allow flexible matching for slug or name since DB 'category_id' might be an ID. 
        // But seed script used slugs? Let's assume we mapped correctly. 
        // Ideally we check `product.category_id`.
        // Let's assume passed products are enriched or we filter loosely.
        // Actually, let's look at how BestsellerCard works or the Product Type.
        // The service returns `Product` which has `category_id`.
        // The tabs use 'hair', 'face', 'combo'.
        // We need to map or just check if the product category matches.
        (product) => {
            const term = activeCategory.toLowerCase();
            const isCombo = product.combo_product_ids && product.combo_product_ids.length > 0;
            const pSlug = product.slug.toLowerCase();
            const pName = product.name.toLowerCase();

            // 1. Combo Category Logic
            if (activeCategory === 'combo' || activeCategory === 'combos') {
                return isCombo || pSlug.includes('combo') || pName.includes('combo') || pSlug.includes('kit');
            }

            // 2. Exclude combos from other categories
            if (isCombo) return false;

            // 3. Check for Category Association via Joined Data (if available)
            const cat = (product as any).categories;
            if (cat && cat.slug) return cat.slug === activeCategory;

            // 4. Fallback: Loose Matching (excluding combos)
            const catTerm = activeCategory === 'face' ? 'skin' : activeCategory;
            // map 'face' tab to 'skin' keyword if needed, or keep 'face' if slugs use 'face'

            if (activeCategory === 'hair') {
                return pSlug.includes('hair') || pName.includes('hair') || pSlug.includes('shampoo') || pSlug.includes('oil');
            }
            if (activeCategory === 'face') {
                return pSlug.includes('face') || pName.includes('face') || pSlug.includes('skin') || pName.includes('skin') || pSlug.includes('cream') || pSlug.includes('serum');
            }

            return product.slug.includes(term) || (product as any).images?.[0]?.includes(term);
        }
    );

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = 320; // Approx card width + gap
            scrollContainerRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="section-padding bg-[var(--background)]">
            <div className="container-premium !px-4 md:!px-8">
                {/* Header */}
                <div className="text-center mb-10">
                    <h2
                        className="text-3xl md:text-5xl font-semibold text-[var(--primary)] mb-8"
                        style={{ fontFamily: "var(--font-peachi)" }}
                    >
                        Shop By Category
                    </h2>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`px-8 py-3 rounded-full text-[15px] font-bold tracking-wide transition-all duration-300 ${activeCategory === category.id
                                    ? "bg-[#9eb666] text-white shadow-lg transform scale-105"
                                    : "bg-white text-gray-500 border border-gray-200 hover:border-[#9eb666] hover:text-[#9eb666]"
                                    }`}
                                style={{
                                    fontFamily: "var(--font-fira-sans)",
                                    ...(activeCategory === category.id
                                        ? { backgroundColor: "#9eb666", color: "#ffffff", borderColor: "#9eb666" }
                                        : {})
                                }}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Products Slider */}
                <div className="relative group">
                    {/* Navigation Buttons - Hidden on Mobile, Visible on Desktop Group Hover */}
                    <button
                        onClick={() => scroll("left")}
                        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center text-[var(--primary)] transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 hover:bg-[#9eb666] hover:text-white"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={() => scroll("right")}
                        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center text-[var(--primary)] transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 hover:bg-[#9eb666] hover:text-white"
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Scroll Container */}
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-4 md:gap-6 overflow-x-auto pb-8 pt-4 scrollbar-hide px-2 snap-x w-fit mx-auto max-w-full"
                    >
                        {filteredProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="w-[280px] md:w-[320px] flex-none snap-start h-auto"
                            >
                                <BestsellerCard product={product} />
                            </motion.div>
                        ))}
                    </div>

                    {/* Progress Bar (Visual indicator based on reference) */}
                    <div className="w-full h-1 bg-[#9eb666]/20 mt-4 rounded-full overflow-hidden max-w-2xl mx-auto">
                        <div className="h-full bg-[#9eb666] w-1/3 rounded-full" />
                    </div>
                </div>

                {/* View All Button */}
                <div className="text-center mt-12">
                    <Link
                        href={`/shop/${activeCategory}`}
                        className="inline-flex items-center gap-2 px-8 py-3 border border-[#9eb666] text-[#5e6e3d] font-medium rounded-full hover:bg-[#9eb666] hover:text-white transition-all duration-300"
                    >
                        View all <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
