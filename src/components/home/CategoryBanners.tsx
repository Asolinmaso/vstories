"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CategoryBanners() {
    const categories = [
        {
            id: "hair",
            name: "Hair Care",
            slug: "hair",
            image: "/images/banner_hair_care.png",
            bgColor: "bg-[#FFF0F0]", // Soft pink/peach fallback
            showLabel: false,
        },
        {
            id: "face",
            name: "Skin Care", // Renamed to match image text
            slug: "face",
            image: "/images/banner_face_care.png",
            bgColor: "bg-[#FFFCE0]", // Soft yellow/cream fallback
            showLabel: false, // Image has text
        },
        {
            id: "combo",
            name: "Combos",
            slug: "combos",
            image: "/images/banner_combos.png",
            bgColor: "bg-[#F4E0FF]", // Soft lavender fallback
            showLabel: false,
        },
        {
            id: "bestseller",
            name: "Bestsellers",
            slug: "bestsellers",
            image: "/images/banner_bestsellers.png",
            bgColor: "bg-[#E0FFEE]", // Soft mint fallback
            showLabel: false,
        },
    ];

    return (
        <section className="py-2 pb-8 bg-[var(--background)]">
            <div className="container-premium !px-4 md:!px-4">
                {/* Scrollable Banner Row -> Converted to Mobile Grid */}
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="w-full"
                        >
                            <Link
                                href={`/shop/${category.slug}`}
                                className="group relative block aspect-[21/9] w-full overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] shadow-sm transition-all duration-300 hover:shadow-lg border border-white/10"
                            >
                                {/* Background Image */}
                                <div
                                    className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                                    style={{
                                        backgroundImage: `url(${category.image})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                />

                                {/* Content Overlay */}
                                <div className="absolute inset-0 flex items-center justify-between p-6 bg-gradient-to-r from-white/10 to-transparent">
                                    {category.showLabel && (
                                        <div className="flex flex-col gap-1 z-10">
                                            <h3
                                                className="text-2xl font-serif text-[var(--primary)] text-left leading-tight"
                                                style={{ fontFamily: "var(--font-peachi)" }}
                                            >
                                                {category.name}
                                            </h3>
                                            <span className="text-xs font-medium uppercase tracking-wider text-[var(--secondary)] opacity-0 -translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                                Shop Now
                                            </span>
                                        </div>
                                    )}

                                    {/* Decorative Star/Sparkle (optional, adds to the aesthetic) */}
                                    <span className="text-2xl text-white/80 opacity-60 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-500">
                                        ✦
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
