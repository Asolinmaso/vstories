"use client";

import { motion } from "framer-motion";

interface MarqueeProps {
    items: string[];
    variant?: "dark" | "light";
    speed?: "slow" | "normal" | "fast";
}

export default function Marquee({
    items,
    variant = "light",
    speed = "normal",
}: MarqueeProps) {
    const bgColor = variant === "dark" ? "bg-[var(--primary)]" : "bg-[var(--primary)]";
    const textColor = "text-[var(--secondary-light)]";
    const accentColor = "text-[var(--secondary-light)]";

    const animationDuration =
        speed === "slow" ? "40s" : speed === "fast" ? "15s" : "25s";

    return (
        <div className={`${bgColor} py-5 overflow-hidden border-b border-[var(--primary)]/10`}>
            <div
                className="flex whitespace-nowrap min-w-full"
                style={{
                    animation: `marquee ${animationDuration} linear infinite`,
                }}
            >
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex items-center shrink-0">
                        {items.map((item, index) => (
                            <div key={`${i}-${index}`} className="flex items-center">
                                <span
                                    className="text-lg md:text-2xl font-medium font-inter"
                                >
                                    {item}
                                </span>
                                <div className="mx-8 w-3 h-3 rounded-full bg-[var(--secondary-light)]" />
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-100%); }
                }
            `}</style>
        </div>
    );
}
