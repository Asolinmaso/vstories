"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
    {
        id: 1,
        beforeImage: "/images/testimonials/hair-before-1.png",
        afterImage: "/images/testimonials/hair-after-1.png",
        quote: "Your haircare combo gave me my hair back! After just 2 months of consistent use, I can see visible new growth.",
        name: "Priya S.",
        location: "Chennai",
        productImage: "/images/products/complete-hair-care-trio.png",
        productName: "Complete Hair Care Trio",
        productSlug: "complete-hair-care-trio",
        rating: 5,
    },
    {
        id: 2,
        beforeImage: "/images/testimonials/hair-before-2.png",
        afterImage: "/images/testimonials/hair-after-2.png",
        quote: "The herbal hair oil has transformed my thinning hair into thick, healthy locks. Amazing results!",
        name: "Rajesh K.",
        location: "Bangalore",
        productImage: "/images/products/herbal-hair-oil.jpg",
        productName: "V Herbal Hair Oil",
        productSlug: "v-herbal-hair-oil",
        rating: 5,
    },
    {
        id: 3,
        beforeImage: "/images/testimonials/skin-before-1.png",
        afterImage: "/images/testimonials/skin-after-1.png",
        quote: "Finally, a brand that delivers what it promises. My skin has never looked this radiant and clear!",
        name: "Fatima R.",
        location: "Mumbai",
        productImage: "/images/products/prophetic-face-serum.png",
        productName: "Prophetic Face Serum",
        productSlug: "prophetic-face-serum",
        rating: 5,
    },
];

function ComparisonSlider({ before, after }: { before: string; after: string }) {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative w-full h-[350px] md:h-[500px] overflow-hidden cursor-ew-resize group rounded-xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* After Image (Background) */}
            <div
                className="absolute inset-0 img-placeholder"
                style={{
                    backgroundImage: `url(${after})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                }}
            >
                <span className="absolute bottom-3 right-3 px-3 py-1 bg-black/70 text-white text-[10px] md:text-xs uppercase font-bold rounded-full shadow-sm z-10 backdrop-blur-sm">
                    After
                </span>
            </div>

            {/* Before Image (Foreground with Clip) */}
            <div
                className="absolute inset-0 img-placeholder"
                style={{
                    backgroundImage: `url(${before})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                    clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                }}
            >
                <span className="absolute bottom-3 left-3 px-3 py-1 bg-black/70 text-white text-[10px] md:text-xs uppercase font-bold rounded-full backdrop-blur-sm z-10">
                    Before
                </span>
            </div>

            {/* Slider Handle Line */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20"
                style={{ left: `${sliderPosition}%` }}
            >
                {/* Handle Circle */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full shadow-xl flex items-center justify-center transform transition-transform duration-200 hover:scale-110 border-2 border-[var(--primary)]">
                    <div className="flex gap-0.5">
                        <ChevronLeft className="w-3 h-3 md:w-4 md:h-4 text-[var(--primary)]" />
                        <ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-[var(--primary)]" />
                    </div>
                </div>
            </div>

            {/* Range Input for Interaction */}
            <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                aria-label="Compare before and after images"
            />
        </div>
    );
}

export default function RealResults() {
    return (
        <section className="section-padding bg-[var(--background)]">
            <div className="container-premium !px-4 md:!px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >

                    <h2
                        className="text-3xl md:text-5xl font-semibold text-[var(--primary)] mb-4"
                        style={{ fontFamily: "var(--font-peachi)" }}
                    >
                        Real Results
                    </h2>
                    <p className="text-[var(--text-secondary)] max-w-md mx-auto">
                        See the transformations our customers have experienced
                    </p>
                </motion.div>

                {/* Testimonial Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex flex-col h-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-[var(--primary)]/5"
                        >
                            {/* Interactive Comparison Slider */}
                            <ComparisonSlider
                                before={testimonial.beforeImage}
                                after={testimonial.afterImage}
                            />

                            {/* Review Content */}
                            <div className="p-6 flex flex-col flex-1">
                                {/* Rating */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-[#FFA800] text-[#FFA800]" />
                                    ))}
                                </div>

                                <p
                                    className="text-[var(--primary)] text-lg mb-6 leading-relaxed italic"
                                    style={{ fontFamily: "var(--font-fira-sans)" }}
                                >
                                    &ldquo;{testimonial.quote}&rdquo;
                                </p>

                                <div className="mt-auto flex items-center justify-between border-t border-[var(--primary)]/5 pt-4">
                                    {/* User Info */}
                                    <div>
                                        <p className="font-bold text-sm text-[var(--primary)]">
                                            {testimonial.name}
                                        </p>
                                        <p className="text-xs text-[var(--text-muted)]">
                                            Verified Buyer
                                        </p>
                                    </div>

                                    {/* Product Used - Now Linked */}
                                    <Link
                                        href={`/product/${testimonial.productSlug}`}
                                        className="flex items-center gap-3 bg-[var(--background-warm)] px-3 py-1.5 rounded-lg max-w-[50%] hover:scale-105 transition-transform duration-300 cursor-pointer block"
                                    >
                                        <div className="w-8 h-8 rounded-md overflow-hidden flex-shrink-0 bg-white border border-[var(--primary)]/10">
                                            <img
                                                src={testimonial.productImage}
                                                alt={testimonial.productName}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wide">Used</p>
                                            <p className="text-xs font-medium text-[var(--primary)] truncate leading-tight">
                                                {testimonial.productName}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
