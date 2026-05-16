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
    const bgColor = variant === "dark" ? "#1D3B29" : "#1D3B29";
    const color = "#F7EDE2";

    const animationDuration =
        speed === "slow" ? "40s" : speed === "fast" ? "15s" : "25s";

    return (
        <div className="py-5 overflow-hidden border-b border-[var(--primary)]/10" style={{ backgroundColor: bgColor }}>
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
                                    style={{ color: color }}
                                >
                                    {item}
                                </span>
                                <div className="mx-8 w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
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
