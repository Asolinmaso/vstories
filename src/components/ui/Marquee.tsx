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
    const bgColor = variant === "dark" ? "bg-[var(--primary)]" : "bg-[var(--background)]";
    const textColor = "text-black";
    const accentColor = "text-black";

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
                                    style={{ fontFamily: "var(--font-peachi)" }}
                                >
                                    {item}
                                </span>
                                <span className={`mx-8 text-[8px] opacity-40 ${textColor}`}>●</span>
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
