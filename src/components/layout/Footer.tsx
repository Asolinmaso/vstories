"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Phone, MapPin, Mail, ChevronDown } from "lucide-react";
import { useState } from "react";

const quickLinks = [
    { href: "/shop", label: "Shop All" },
    { href: "/shop/hair", label: "Hair Care" },
    { href: "/shop/skin", label: "Skin Care" },
    { href: "/shop/combos", label: "Combos" },
    { href: "/about", label: "About Us" },
];

const policyLinks = [
    { href: "/policies/shipping", label: "Shipping Policy" },
    { href: "/policies/returns", label: "Return Policy" },
    { href: "/policies/privacy", label: "Privacy Policy" },
    { href: "/policies/terms", label: "Terms of Service" },
];

function FooterAccordion({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full">
            {/* Desktop View */}
            <div className="hidden md:block text-left">
                <h4 className="text-lg font-semibold mb-6 text-[var(--background)]">
                    {title}
                </h4>
                {children}
            </div>

            {/* Mobile View */}
            <div className="md:hidden border-b border-[var(--background)]/10 mx-10">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between w-full py-4 text-lg font-semibold text-[var(--background)] text-left"
                >
                    {title}
                    <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ChevronDown className="w-5 h-5" />
                    </motion.span>
                </button>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <div className="pb-4">
                                {children}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default function Footer() {
    return (
        <footer className="bg-[var(--secondary)] text-[var(--background)] dark-section">
            {/* Main Footer */}
            <div className="container-premium section-padding">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {/* Brand Column */}
                    <div className="lg:col-span-1 text-center md:text-left">
                        <Link href="/" className="inline-block mb-6">
                            <Image
                                src="/images/logo landscape.svg"
                                alt="V Stories"
                                width={180}
                                height={50}
                                className="h-12 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-sm text-[var(--background)]/80 leading-relaxed mb-6">
                            Reviving ancient herbal practices with modern standards. 100%
                            natural, chemical-free products crafted with love.
                        </p>
                        <div className="flex gap-4 justify-center md:justify-start">
                            <a
                                href="https://instagram.com/vstories"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-[var(--background)]/10 rounded-full hover:bg-[var(--background)]/20 transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="https://wa.me/916383921957"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-[var(--background)]/10 rounded-full hover:bg-[var(--background)]/20 transition-colors"
                                aria-label="WhatsApp"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <FooterAccordion title="Quick Links">
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-[var(--background)]/80 hover:text-[var(--background)] transition-colors block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </FooterAccordion>

                    {/* Policies */}
                    <FooterAccordion title="Policies">
                        <ul className="space-y-3">
                            {policyLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-[var(--background)]/80 hover:text-[var(--background)] transition-colors block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </FooterAccordion>

                    {/* Contact */}
                    <FooterAccordion title="Contact">
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-[var(--highlight)]" />
                                <a
                                    href="tel:+916383921957"
                                    className="text-sm text-[var(--background)]/80 hover:text-[var(--background)] transition-colors"
                                >
                                    +91 6383921957
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-[var(--highlight)]" />
                                <a
                                    href="mailto:hello@vstories.in"
                                    className="text-sm text-[var(--background)]/80 hover:text-[var(--background)] transition-colors"
                                >
                                    hello@vstories.in
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <MapPin className="w-4 h-4 text-[var(--highlight)]" />
                                <span className="text-sm text-[var(--background)]/80">
                                    Kilakarai, Tamil Nadu
                                </span>
                            </li>
                        </ul>
                    </FooterAccordion>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-[var(--background)]/10">
                <div className="container-premium py-6">
                    <div className="flex flex-col items-center text-center gap-2">
                        <p className="text-xs text-[var(--background)]/60">
                            © {new Date().getFullYear()} V STORIES. All rights reserved.
                        </p>
                        <p className="text-xs text-[var(--background)]/60">
                            Crafted with ♡ in Tamil Nadu, India
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
