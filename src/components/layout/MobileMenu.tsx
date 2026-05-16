"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { X } from "lucide-react";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    navLinks: { 
        href: string; 
        label: string; 
        dropdown?: { href: string; label: string }[] 
    }[];
}

export default function MobileMenu({
    isOpen,
    onClose,
    navLinks,
}: MobileMenuProps) {
    const pathname = usePathname();
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50"
                        onClick={onClose}
                    />

                    {/* Menu Panel */}
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 left-0 h-full w-[300px] max-w-[85vw] bg-[var(--background)] z-50 shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-[var(--primary)]/10">
                            <span
                                className="text-xl font-bold tracking-tight text-[var(--primary)]"
                                style={{ fontFamily: "var(--font-peachi)" }}
                            >
                                V STORIES
                            </span>
                            <button
                                onClick={onClose}
                                className="p-2 text-[var(--primary)] hover:text-[var(--secondary)] transition-colors"
                                aria-label="Close menu"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <nav className="p-6">
                            <ul className="space-y-4">
                                {navLinks.map((link, index) => (
                                    <motion.li
                                        key={link.label}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <div className="flex flex-col">
                                            <Link
                                                href={link.href}
                                                className={`block py-3 text-lg transition-colors ${
                                                    (pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href)))
                                                        ? "font-black text-[var(--primary)]" 
                                                        : "font-medium text-black hover:text-[var(--primary)]"
                                                }`}
                                                onClick={() => !link.dropdown && onClose()}
                                            >
                                                {link.label}
                                            </Link>
                                            {link.dropdown && (
                                                <ul className="pl-4 space-y-2 mb-4 border-l-2 border-[var(--primary)]/10">
                                                    {link.dropdown.map((sublink) => (
                                                        <li key={sublink.label}>
                                                            <Link
                                                                href={sublink.href}
                                                                className="block py-2 text-base font-medium text-black/60 hover:text-[var(--primary)] transition-colors"
                                                                onClick={onClose}
                                                            >
                                                                {sublink.label}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </motion.li>
                                ))}
                            </ul>
                        </nav>

                        {/* Contact Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-[var(--primary)] text-[var(--background)]">
                            <p className="text-sm mb-2">Need help?</p>
                            <a
                                href="tel:+916383921957"
                                className="text-lg font-medium hover:text-[var(--highlight)] transition-colors"
                            >
                                +91 6383921957
                            </a>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
