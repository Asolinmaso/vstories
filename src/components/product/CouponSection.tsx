"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { motion } from "framer-motion";

const COUPONS = [
    {
        code: "WELCOME10",
        discount: "10% OFF",
        description: "For your first order above ₹500",
    },
    {
        code: "NATURAL20",
        discount: "20% OFF",
        description: "On all hair care bundles",
    },
];

export default function CouponSection() {
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    return (
        <div className="my-8">
            <h3 className="text-sm font-medium text-[var(--primary)] uppercase tracking-wider mb-4">Available Offers</h3>
            <div className="space-y-3">
                {COUPONS.map((coupon) => (
                    <div
                        key={coupon.code}
                        className="flex items-center justify-between p-4 border border-dashed border-[var(--highlight)] rounded-lg bg-[var(--highlight)]/5 hover:bg-[var(--highlight)]/10 transition-colors"
                    >
                        <div>
                            <span className="block font-bold text-[var(--primary)]">{coupon.discount}</span>
                            <span className="text-xs text-[var(--text-muted)]">{coupon.description}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="font-mono font-medium text-sm bg-white px-2 py-1 rounded border border-[var(--highlight)]/20 text-[var(--primary)]">
                                {coupon.code}
                            </span>
                            <button
                                onClick={() => handleCopy(coupon.code)}
                                className="text-[var(--highlight)] hover:text-[var(--primary)] transition-colors focus:outline-none"
                                title="Copy Code"
                            >
                                {copiedCode === coupon.code ? (
                                    <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }}>
                                        <Check className="w-5 h-5" />
                                    </motion.div>
                                ) : (
                                    <Copy className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
