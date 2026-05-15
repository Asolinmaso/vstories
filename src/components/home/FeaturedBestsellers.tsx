"use client";

import Link from "next/link";
import BestsellerCard from "@/components/ui/BestsellerCard";
import { Product } from "@/lib/services/product.service";
import FadeIn from "@/components/ui/FadeIn";

interface FeaturedBestsellersProps {
    dbProducts: Product[];
}

export default function FeaturedBestsellers({ dbProducts = [] }: FeaturedBestsellersProps) {
    // Filter for bestsellers if property exists, or just take first 4 for now
    const bestsellerProducts = dbProducts.filter(p => p.is_bestseller).slice(0, 4);
    // Fallback if no bestsellers marked
    const products = bestsellerProducts.length > 0 ? bestsellerProducts : dbProducts.slice(0, 4);

    return (
        <section className="section-padding bg-[var(--background)]">
            <div className="container-premium">
                {/* Section Header */}
                <FadeIn className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
                    <div>
                        <h2
                            className="text-3xl md:text-4xl font-semibold text-[var(--primary)]"
                            style={{ fontFamily: "var(--font-peachi)" }}
                        >
                            Our Bestsellers
                        </h2>
                    </div>
                    <Link
                        href="/shop"
                        className="mt-4 md:mt-0 text-[var(--primary)] hover:text-[var(--highlight)] font-medium flex items-center gap-2 transition-colors group"
                    >
                        View All Products
                        <span className="group-hover:translate-x-1 transition-transform">
                            →
                        </span>
                    </Link>
                </FadeIn>

                {/* Products Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {products.map((product, index) => (
                        <FadeIn
                            key={product.id}
                            delay={index * 0.1}
                            className="h-full"
                        >
                            <BestsellerCard product={product} />
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
