"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Sparkles } from "lucide-react";

const ingredients = [
    { name: "Frankincense", highlight: true },
    { name: "Niacinamide", highlight: true },
    { name: "Rosemary", highlight: false },
    { name: "Brahmi", highlight: false },
    { name: "Bhringraj", highlight: false },
    { name: "Amla", highlight: false },
    { name: "Neem", highlight: false },
    { name: "Hibiscus", highlight: false },
    { name: "Black Seed", highlight: true },
    { name: "Coconut Oil", highlight: false },
];

export default function IngredientSpotlight() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1.1, 1, 1, 0.95]);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[90vh] overflow-hidden flex items-center justify-center py-32"
        >
            {/* Parallax Background with Enhanced Gradient */}
            <motion.div
                style={{ y, scale }}
                className="absolute inset-0"
            >
                <div
                    className="w-full h-[130%] absolute -top-[15%] img-placeholder opacity-10"
                    style={{
                        backgroundImage: "url(/images/category-best.png)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
            </motion.div>

            {/* Premium Multi-layer Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-[var(--background)]/90 to-[var(--background)]" />

            {/* Decorative Elements */}
            <div className="absolute top-1/4 left-10 w-64 h-64 bg-[var(--gold)]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[var(--secondary)]/5 rounded-full blur-3xl" />

            {/* Content */}
            <motion.div
                style={{ opacity }}
                className="relative z-10 text-center px-4 max-w-5xl mx-auto"
            >
                {/* Decorative Icon */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/20 mb-8"
                >
                    <Sparkles className="w-7 h-7 text-[var(--gold)]" />
                </motion.div>

                {/* Label */}
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6 }}
                    className="inline-block text-sm font-semibold tracking-[0.3em] uppercase mb-6"
                    style={{ color: "var(--gold)" }}
                >
                    The Science of Nature
                </motion.span>

                {/* Main Heading with Premium Typography */}
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-5xl md:text-6xl lg:text-7xl font-semibold text-[var(--primary)] mb-6 leading-tight"
                    style={{ fontFamily: "var(--font-peachi)" }}
                >
                    Powered by{" "}
                    <span className="text-[var(--highlight)]">
                        Nature
                    </span>
                </motion.h2>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-xl md:text-2xl text-[var(--text-secondary)] mb-14 max-w-2xl mx-auto font-light"
                >
                    40+ Prophetic Herbs & Cold-Pressed Organic Ingredients
                </motion.p>

                {/* Premium Ingredient Tags */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
                >
                    {ingredients.map((ingredient, index) => (
                        <motion.span
                            key={ingredient.name}
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{
                                duration: 0.5,
                                delay: 0.4 + index * 0.06,
                                type: "spring",
                                stiffness: 200
                            }}
                            whileHover={{
                                scale: 1.08,
                                y: -4,
                                boxShadow: ingredient.highlight
                                    ? "0 8px 32px rgba(194, 126, 15, 0.25)"
                                    : "0 8px 24px rgba(29, 53, 21, 0.1)"
                            }}
                            className={`px-6 py-3 rounded-full text-sm font-medium cursor-default transition-all duration-300 ${ingredient.highlight
                                ? "bg-gradient-to-r from-[var(--highlight)] to-[var(--gold)] text-white shadow-lg"
                                : "bg-white border border-[var(--primary)]/10 text-[var(--primary)] hover:border-[var(--highlight)] hover:shadow-md"
                                }`}
                        >
                            {ingredient.name}
                        </motion.span>
                    ))}
                </motion.div>

                {/* Bottom Decorative Line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="mt-16 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent"
                />
            </motion.div>
        </section>
    );
}
