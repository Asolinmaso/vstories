"use client";

import { motion } from "framer-motion";
import { Leaf, Heart, Award, Users } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

const values = [
    {
        icon: Leaf,
        title: "100% Natural",
        description: "Every ingredient is sourced from nature, ensuring purity and effectiveness.",
    },
    {
        icon: Heart,
        title: "Made with Love",
        description: "Each product is crafted with care and passion for holistic beauty.",
    },
    {
        icon: Award,
        title: "Quality First",
        description: "We never compromise on quality, using only the finest herbs and oils.",
    },
    {
        icon: Users,
        title: "Community Focused",
        description: "We believe in empowering our community through natural wellness.",
    },
];

const timeline = [
    {
        year: "2021",
        title: "The Beginning",
        description: "V Stories was born from a passion for ancient herbal remedies.",
    },
    {
        year: "2022",
        title: "First Products",
        description: "Launched our signature Herbal Hair Oil, now a bestseller.",
    },
    {
        year: "2023",
        title: "Growing Family",
        description: "Expanded to skin care and built a community of 10,000+ customers.",
    },
    {
        year: "2024",
        title: "New Horizons",
        description: "Introducing new product lines and B2B partnerships.",
    },
];

export default function AboutContent() {
    return (
        <div className="bg-[var(--background)]">


            {/* Founder Section */}
            <section className="section-padding bg-[var(--background)] relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--secondary)]/5 rounded-full blur-[100px] -z-10" />

                <div className="container-premium">
                    <FadeIn delay={0.1}>
                        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                            {/* Image Column */}
                            <FadeIn direction="left" delay={0.2} className="w-full lg:w-1/2 relative">
                                <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl">
                                    {/* Use the same founder image as home page or a specific one if available */}
                                    <img
                                        src="/images/founder.png"
                                        alt="Fathima Nowra M - Founder of V Stories"
                                        className="object-cover w-full h-full"
                                    />
                                    {/* Founder Name Overlay - Bottom Left */}
                                    <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-[var(--primary)]/90 to-transparent pt-32">
                                        <h3 className="text-3xl md:text-4xl text-white font-semibold mb-2" style={{ fontFamily: "var(--font-peachi)" }}>
                                            Fathima Nowra M
                                        </h3>
                                        <p className="text-white/95 text-base tracking-[0.2em] uppercase font-semibold">
                                            FOUNDER AT V STORIES
                                        </p>
                                    </div>
                                </div>
                            </FadeIn>

                            {/* Text Column */}
                            <FadeIn direction="right" delay={0.3} className="w-full lg:w-1/2 text-left">
                                <h2 className="text-4xl md:text-5xl font-medium text-[var(--secondary)] mb-8" style={{ fontFamily: "var(--font-peachi)" }}>
                                    Founder’s Note
                                </h2>

                                <div className="mb-8">
                                    <span className="text-6xl text-[var(--secondary)]/20 font-serif block mb-4">“</span>
                                    <h3
                                        className="text-2xl md:text-4xl font-medium text-[var(--secondary)] mb-6 leading-tight"
                                        style={{ fontFamily: "var(--font-peachi)" }}
                                    >
                                        My late mother is the reason behind this brand
                                    </h3>
                                </div>

                                <div className="space-y-6 text-lg text-[var(--text-secondary)] leading-relaxed font-light">
                                    <p>
                                        My mother had sensitive skin and suffered with skin problems for more
                                        than a decade. The products she used on her skin made the condition
                                        even worse.
                                    </p>
                                    <p>
                                        My late mother is the reason behind this brand and inspired me to
                                        do what I do today with V Stories.
                                    </p>
                                </div>

                                <div className="mt-10">
                                    <a href="/shop/bestsellers" className="btn-primary" style={{ backgroundColor: 'var(--secondary)', color: 'white' }}>
                                        Discover Fathima's Favourites
                                    </a>
                                </div>
                            </FadeIn>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Values Section */}
            <section className="section-padding bg-white">
                <div className="container-premium">
                    <FadeIn className="text-center mb-12">
                        <span className="text-[var(--highlight)] text-sm font-medium tracking-wider uppercase mb-4 block">
                            What We Stand For
                        </span>
                        <h2
                            className="text-3xl md:text-4xl font-semibold text-[var(--primary)]"
                            style={{ fontFamily: "var(--font-peachi)" }}
                        >
                            Our Values
                        </h2>
                    </FadeIn>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <FadeIn
                                key={value.title}
                                delay={index * 0.1}
                                className="text-center p-6 rounded-2xl bg-[var(--background)] hover:shadow-lg transition-shadow"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--secondary)]/10 mb-4">
                                    <value.icon className="w-8 h-8 text-[var(--secondary)]" />
                                </div>
                                <h3
                                    className="text-lg font-semibold text-[var(--primary)] mb-2"
                                    style={{ fontFamily: "var(--font-peachi)" }}
                                >
                                    {value.title}
                                </h3>
                                <p className="text-sm text-[var(--text-muted)]">
                                    {value.description}
                                </p>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="section-padding">
                <div className="container-premium">
                    <FadeIn className="text-center mb-12">
                        <span className="text-[var(--highlight)] text-sm font-medium tracking-wider uppercase mb-4 block">
                            Our Journey
                        </span>
                        <h2
                            className="text-3xl md:text-4xl font-semibold text-[var(--primary)]"
                            style={{ fontFamily: "var(--font-peachi)" }}
                        >
                            Growing Together
                        </h2>
                    </FadeIn>

                    <div className="max-w-3xl mx-auto">
                        {timeline.map((item, index) => (
                            <FadeIn
                                key={item.year}
                                direction={index % 2 === 0 ? "left" : "right"}
                                delay={index * 0.1}
                                className="flex gap-6 mb-8 last:mb-0"
                            >
                                <div className="flex-shrink-0 w-20 text-right">
                                    <span className="text-2xl font-bold text-[var(--highlight)]">
                                        {item.year}
                                    </span>
                                </div>
                                <div className="relative flex-1 pb-8 border-l-2 border-[var(--secondary-light)] pl-6 last:pb-0">
                                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-[var(--secondary)]" />
                                    <h3
                                        className="text-lg font-semibold text-[var(--primary)] mb-1"
                                        style={{ fontFamily: "var(--font-peachi)" }}
                                    >
                                        {item.title}
                                    </h3>
                                    <p className="text-[var(--text-muted)]">{item.description}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-[var(--secondary)] dark-section">
                <div className="container-premium text-center">
                    <h2
                        className="text-2xl md:text-3xl font-semibold text-white mb-4"
                        style={{ fontFamily: "var(--font-peachi)" }}
                    >
                        Ready to Experience the V Stories Difference?
                    </h2>
                    <p className="text-white/80 mb-8 max-w-md mx-auto">
                        Join thousands of customers who&apos;ve discovered the power of natural beauty.
                    </p>
                    <a href="/shop" className="btn-highlight">
                        Shop Our Collection
                    </a>
                </div>
            </section>
        </div>
    );
}
