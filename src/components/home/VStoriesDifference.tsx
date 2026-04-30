"use client";

import { motion, Variants } from "framer-motion";
import { Leaf, Droplets, Sun, Sparkles } from "lucide-react";

const features = [
    {
        icon: Leaf,
        title: "Authentic Herbal",
        description:
            "Time-tested recipes combining traditional wisdom with modern standards. Each product is crafted with care.",
        gradient: "from-[#3A5D20] to-[#869D57]",
    },
    {
        icon: Droplets,
        title: "Chemical Free",
        description:
            "No parabens, no sulfates, no compromises. We believe in pure, clean ingredients for your hair and skin.",
        gradient: "from-[#1D3515] to-[#3A5D20]",
    },
    {
        icon: Sun,
        title: "Sun-Dried Herbs",
        description:
            "Carefully sun-dried to preserve potency. Ancient methods for visible, sustainable results.",
        gradient: "from-[#869D57] to-[#b8c78a]",
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
    },
};

export default function VStoriesDifference() {
    return (
        <section className="relative section-padding overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[var(--background)]" />

            {/* Decorative Pattern Overlay */}
            <div className="absolute inset-0 opacity-40">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(58, 93, 32, 0.05) 0%, transparent 50%),
                              radial-gradient(circle at 80% 20%, rgba(194, 126, 15, 0.05) 0%, transparent 40%)`,
                    }}
                />
            </div>

            {/* Decorative Blur Orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--gold)]/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[var(--secondary)]/5 rounded-full blur-[120px]" />

            <div className="container-premium relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    {/* Decorative Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: false }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/20 mb-6"
                    >
                        <Sparkles className="w-6 h-6 text-[var(--gold)]" />
                    </motion.div>

                    <span className="block text-sm font-semibold tracking-[0.3em] uppercase mb-4 text-[var(--gold)]">
                        Why Choose Us
                    </span>
                    <h2
                        className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[var(--primary)] mb-6"
                        style={{ fontFamily: "var(--font-peachi)" }}
                    >
                        The V Stories{" "}
                        <span className="text-[var(--highlight)]">
                            Unique
                        </span>
                    </h2>
                    <p className="text-[var(--text-secondary)] max-w-xl mx-auto text-lg">
                        We don&apos;t just make products. We craft herbal experiences that transform
                        your beauty routine.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            variants={itemVariants}
                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                            className="group relative"
                        >
                            {/* Card */}
                            <div className="relative p-8 md:p-10 rounded-3xl bg-white border border-[var(--primary)]/5 shadow-lg group-hover:shadow-xl transition-all duration-500 h-full">
                                {/* Hover Glow */}
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--gold)]/0 to-[var(--gold)]/0 group-hover:from-[var(--gold)]/5 group-hover:to-transparent transition-all duration-500" />

                                {/* Icon Container */}
                                <div className={`relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                    <feature.icon className="w-8 h-8 text-white" />
                                </div>

                                {/* Title */}
                                <h3
                                    className="relative text-xl md:text-2xl font-semibold text-[var(--primary)] mb-4 group-hover:text-[var(--highlight)] transition-colors duration-300"
                                >
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="relative text-[var(--text-secondary)] leading-relaxed group-hover:text-[var(--text-primary)] transition-colors duration-300">
                                    {feature.description}
                                </p>

                                {/* Decorative Corner */}
                                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[var(--primary)]/10 rounded-tr-xl group-hover:border-[var(--gold)]/30 transition-colors duration-300" />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom Decorative Element */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="mt-20 h-px w-48 mx-auto bg-gradient-to-r from-transparent via-[var(--gold)]/50 to-transparent"
                />
            </div>
        </section>
    );
}
