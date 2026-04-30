"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { Product } from "@/lib/services/product.service";

export default function ComboOffer() {
    // Hardcoded combo for display if no props passed, or we can fetch real ones.
    // Ideally this component should receive products as props, but for now we'll create a static promo section
    // that links to the combo category.

    return (
        <section className="py-20 bg-[var(--background-warm)] relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--primary)]/5 skew-x-12 translate-x-1/4" />

            <div className="container-premium relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
                    <div>
                        <span className="text-[var(--highlight)] text-sm font-bold tracking-widest uppercase mb-2 block">
                            Limited Time Offers
                        </span>
                        <h2
                            className="text-4xl md:text-5xl font-medium text-[var(--primary)]"
                            style={{ fontFamily: "var(--font-peachi)" }}
                        >
                            Save Big on <span className="italic relative inline-block">
                                Combos
                                <span className="absolute bottom-1 left-0 w-full h-3 bg-[var(--secondary-light)]/30 -z-10 skew-x-6"></span>
                            </span>
                        </h2>
                    </div>
                    <Link
                        href="/shop/combos"
                        className="group flex items-center gap-2 text-[var(--primary)] font-medium hover:text-[var(--highlight)] transition-colors"
                    >
                        View All Combos
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Combo Spotlight Card */}
                <div className="grid lg:grid-cols-2 gap-8 md:gap-0 bg-white rounded-3xl p-6 md:p-12 shadow-xl border border-[var(--primary)]/5 items-center">

                    {/* Content */}
                    <div className="order-2 lg:order-1 space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--highlight)]/10 text-[var(--highlight)] rounded-full text-sm font-bold">
                            <Sparkles className="w-4 h-4" />
                            <span>Ultimate Value</span>
                        </div>

                        <h3
                            className="text-3xl md:text-4xl font-medium text-[var(--primary)]"
                            style={{ fontFamily: "var(--font-peachi)" }}
                        >
                            Complete Hair Care Trio
                        </h3>

                        <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                            The comprehensive hair solution: V Herbal Hair Oil, Hibiscus Shampoo, and Rosemary Hair Mask. Restore, cleanse, and condition in one go.
                        </p>

                        <div className="flex items-end gap-3">
                            <div className="text-3xl font-bold text-[var(--primary)]">₹600</div>
                            <div className="text-lg text-[var(--text-muted)] line-through mb-1">₹680</div>
                            <div className="text-sm font-bold text-green-600 bg-green-100 px-2 py-1 rounded mb-1">
                                Save 12%
                            </div>
                        </div>

                        <div className="pt-4 flex flex-col sm:flex-row gap-4">
                            <Link href="/shop/combos" className="btn-primary w-full sm:w-auto text-center">
                                Shop This Combo
                            </Link>
                            <Link href="/shop/combos" className="btn-outline w-full sm:w-auto text-center">
                                Explore All Kits
                            </Link>
                        </div>
                    </div>

                    {/* Image Area */}
                    <div className="order-1 lg:order-2 relative h-[300px] md:h-[400px] w-full bg-[#fce7f3] rounded-2xl overflow-hidden group flex items-center justify-center p-4">
                        {/* Using the new product image as a centered image instead of background cover for better visibility */}
                        <div className="relative w-full h-full">
                            <Image
                                src="/images/products/combo-hair-trio.png"
                                alt="Complete Hair Care Trio"
                                fill
                                className="object-contain transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>

                        {/* Floating 'Combo' badge */}
                        <div className="absolute top-6 right-6 w-20 h-20 bg-white/90 backdrop-blur rounded-full flex flex-col items-center justify-center shadow-lg transform rotate-12 z-10">
                            <span className="text-xs font-bold text-[var(--primary)] uppercase">Save</span>
                            <span className="text-xl font-bold text-[var(--highlight)]">12%</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
