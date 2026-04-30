"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FounderStory() {
    return (
        <section className="section-padding bg-white overflow-hidden">
            <div className="container-premium">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Image Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2 relative"
                    >
                        <div className="relative aspect-[4/3] lg:aspect-square rounded-[2rem] overflow-hidden shadow-2xl">
                            <Image
                                src="/images/founder.png"
                                alt="Fathima Nowra M - Founder of V Stories"
                                fill
                                className="object-cover"
                            />
                            {/* Founder Name Overlay - Bottom Left */}
                            <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-[var(--primary)]/90 to-transparent pt-32">
                                <h3 className="text-2xl md:text-3xl font-medium mb-1" style={{ fontFamily: "var(--font-peachi)", color: "#fff", textShadow: "0 0 12px rgba(255,255,255,0.9), 0 0 24px rgba(255,255,255,0.6), 0 0 40px rgba(255,255,255,0.4)" }}>
                                    Fathima Nowra M
                                </h3>
                                <p className="text-sm tracking-widest uppercase font-medium" style={{ color: "#fff", textShadow: "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.5)" }}>
                                    Founder at V Stories
                                </p>
                            </div>
                        </div>
                        {/* Decorative background blob */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--secondary-light)]/20 rounded-full blur-3xl -z-10" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[var(--highlight)]/20 rounded-full blur-3xl -z-10" />
                    </motion.div>

                    {/* Text Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full lg:w-1/2 text-left"
                    >
                        <h2
                            className="text-4xl lg:text-5xl lg:leading-tight font-medium text-[var(--primary)] mb-8"
                            style={{ fontFamily: "var(--font-peachi)" }}
                        >
                            We Make Skincare That Understands <span className="text-[var(--secondary)]">Indian Skin</span>
                        </h2>

                        <div className="space-y-6 text-lg text-[var(--text-secondary)] mb-10">
                            <p className="font-handwriting text-xl md:text-2xl text-[var(--text-muted)] italic leading-relaxed" style={{ fontFamily: 'var(--font-playfair), serif', fontStyle: 'italic' }}>
                                "Your skin isn't French. Your weather isn't Korean. <br className="hidden md:block" />
                                So why should your skincare be?
                            </p>
                            <p className="font-light leading-relaxed">
                                We make advanced plant-based formulations that understand the Indian climate and work harmoniously on Indian skin. Grounded in Nature, Growing with Science."
                            </p>
                        </div>

                        <Link
                            href="/about"
                            className="btn-primary"
                        >
                            Explore Founder's Journey
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
