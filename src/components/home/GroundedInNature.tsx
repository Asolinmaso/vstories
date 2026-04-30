"use client";

import React from "react";
import { motion } from "framer-motion";
import { Droplet, Leaf, Microscope, Heart } from "lucide-react";

const features = [
    {
        id: 1,
        title: "Rooted in Prophetic Wisdom",
        description: "We follow time-tested Prophetic herbs and traditional remedies, bringing you skincare inspired by purity, faith, and centuries of natural healing.",
        icon: <Droplet className="w-8 h-8" strokeWidth={1.5} />,
    },
    {
        id: 2,
        title: "Plant-Based Actives",
        description: "Our advanced formulations are infused with plant-derived actives that are safe & gentle for everyone.",
        icon: <Leaf className="w-8 h-8" strokeWidth={1.5} />,
    },
    {
        id: 3,
        title: "Clinically Proven",
        description: "Our in-house R&D experts build powerful, world-class formulations that are clinically tested and proven to be gentle on all skin types.",
        icon: <Microscope className="w-8 h-8" strokeWidth={1.5} />,
    },
    {
        id: 4,
        title: "Cruelty-Free",
        description: "Our products are responsibly made, ethically created, and never tested on animals.",
        // Using Heart as a proxy for the bunny-heart icon
        icon: <Heart className="w-8 h-8" strokeWidth={1.5} />,
    },
];

export default function GroundedInNature() {
    return (
        <section className="section-padding bg-[var(--background)]">
            <div className="container-premium">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2
                        className="text-xl md:text-2xl font-semibold text-[var(--primary)] mb-4"
                        style={{ fontFamily: "var(--font-peachi)" }}
                    >
                        Grounded In Nature, Growing With Science
                    </h2>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex flex-col items-center text-center"
                        >
                            {/* Icon Circle */}
                            <div className="w-24 h-24 rounded-full border border-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] mb-6 hover:scale-105 transition-transform duration-300 bg-white shadow-sm group-hover:border-[var(--primary)]/40 group-hover:shadow-md">
                                <div className="p-3 bg-[var(--background)] rounded-full">
                                    {/* Clone element with thinner stroke for elegance */}
                                    {React.cloneElement(feature.icon as any, { strokeWidth: 1 })}
                                </div>
                            </div>

                            <h3 className="text-xs font-bold text-[var(--primary)] mb-3 leading-tight text-center">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-[15px] text-[#555] leading-relaxed max-w-[260px] font-medium">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
