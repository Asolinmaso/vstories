"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/shop", label: "Products" },
    { href: "/blog", label: "Blog" },
    { href: "/career", label: "Career" },
];

const categories = [
    { href: "/shop/skin", label: "Skin Care" },
    { href: "/shop/hair", label: "Hair Care" },
    { href: "/shop/combos", label: "Combo/Gift Packs" },
    { href: "/shop/samples", label: "Sample Packs" },
];

const policies = [
    { href: "/policies/privacy", label: "Privacy Policies" },
    { href: "/policies/terms", label: "Terms & Conditions" },
    { href: "/policies/shipping", label: "Shipping & Cancellations" },
    { href: "/policies/returns", label: "Returns & Refunds" },
    { href: "/policies/collaboration", label: "Collaboration & Partnership" },
];

function SocialIcon({ src, href, label }: { src: string; href: string; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-[#E8BF72] flex items-center justify-center hover:bg-[#E8BF72] transition-all duration-300"
            aria-label={label}
        >
            <div className="relative w-5 h-5">
                <Image src={src} alt={label} fill className="object-contain" />
            </div>
        </a>
    );
}

function ContactItem({ iconSrc, text, href }: { iconSrc: string; text: string; href?: string }) {
    const content = (
        <div className="flex items-center gap-4 group">
            <div className="w-6 h-6 rounded-full border border-[#E8BF72] flex items-center justify-center group-hover:bg-[#E8BF72] transition-all duration-300">
                <div className="relative w-3 h-3">
                    <Image src={iconSrc} alt="Icon" fill className="object-contain" />
                </div>
            </div>
            <span className="text-[#F7EDE2] font-inter text-base font-normal">{text}</span>
        </div>
    );

    return href ? <a href={href}>{content}</a> : content;
}

export default function Footer() {
    return (
        <footer className="bg-[#1D3B29] pt-20 pb-10 overflow-hidden relative" style={{ backgroundColor: '#1D3B29' }}>
            <div className="w-full max-w-[1440px] mx-auto px-4 md:px-[100px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-12 mb-20">
                    {/* Column 1: Brand */}
                    <div className="flex flex-col gap-8 lg:col-span-1">
                        <Link href="/" className="w-[180px]">
                            <Image
                                src="/images/icons/vstore logo.png"
                                alt="Vstories"
                                width={180}
                                height={60}
                                className="object-contain"
                            />
                        </Link>
                        <p className="font-inter text-base font-normal leading-[1.6] max-w-[280px] text-[#F7EDE2]" style={{ color: '#F7EDE2' }}>
                            Reviving ancient herbal practices with modern standards. 100% natural, chemical-free products crafted with love.
                        </p>
                        <div className="flex gap-4 mt-2">
                            <SocialIcon src="/images/icons/fb.png" href="#" label="Facebook" />
                            <SocialIcon src="/images/icons/insta.png" href="#" label="Instagram" />
                            <SocialIcon src="/images/icons/linkedin.png" href="#" label="LinkedIn" />
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="flex flex-col gap-8">
                        <h4 className="font-inter text-[18px] font-medium text-[#F7EDE2]" style={{ color: '#F7EDE2' }}>Quick Links</h4>
                        <ul className="flex flex-col gap-4">
                            {quickLinks.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="font-inter text-[16px] font-normal text-[#F7EDE2] hover:text-[#E8BF72] transition-colors" style={{ color: '#F7EDE2' }}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Categories */}
                    <div className="flex flex-col gap-8">
                        <h4 className="font-inter text-[18px] font-medium text-[#F7EDE2]" style={{ color: '#F7EDE2' }}>Categories</h4>
                        <ul className="flex flex-col gap-4">
                            {categories.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="font-inter text-[16px] font-normal text-[#F7EDE2] hover:text-[#E8BF72] transition-colors" style={{ color: '#F7EDE2' }}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Policies */}
                    <div className="flex flex-col gap-8">
                        <h4 className="font-inter text-[18px] font-medium text-[#F7EDE2]" style={{ color: '#F7EDE2' }}>Policies</h4>
                        <ul className="flex flex-col gap-4">
                            {policies.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="font-inter text-[16px] font-normal text-[#F7EDE2] hover:text-[#E8BF72] transition-colors" style={{ color: '#F7EDE2' }}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 5: Contact Us */}
                    <div className="flex flex-col gap-8 lg:col-span-1">
                        <h4 className="font-inter text-[18px] font-medium text-[#F7EDE2]" style={{ color: '#F7EDE2' }}>Contact Us</h4>
                        <div className="flex flex-col gap-4">
                            <ContactItem iconSrc="/images/icons/phone-foot.png" text="+91 6383921957" href="tel:+916383921957" />
                            <ContactItem iconSrc="/images/icons/mail-foot.png" text="hello@vstories.in" href="mailto:hello@vstories.in" />
                            <ContactItem iconSrc="/images/icons/location-foot.png" text="Kilakarai, Tamil Nadu" />
                        </div>
                        <div className="mt-4">
                            <h5 className="font-inter text-[18px] font-medium mb-4 text-[#F7EDE2]" style={{ color: '#F7EDE2' }}>Join Our Community</h5>
                            <a
                                href="https://wa.me/916383921957"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full border border-[#E8BF72] flex items-center justify-center hover:bg-[#E8BF72] transition-all duration-300"
                                aria-label="WhatsApp"
                            >
                                <div className="relative w-5 h-5">
                                    <Image src="/images/icons/whatsapp.png" alt="WhatsApp" fill className="object-contain" />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Vine Line - Full Width */}
            <div className="relative w-full flex flex-col items-center pt-2">
                <div className="flex items-center w-full justify-between gap-0">
                    <div className="relative h-[45px] flex-grow">
                        <Image src="/images/icons/footerleft.png" alt="Vine Left" fill className="object-contain object-right" />
                    </div>
                    <div className="relative w-[50px] h-[50px] mx-4 flex-shrink-0">
                        <Image src="/images/icons/footermiddle.png" alt="Vine Middle" fill className="object-contain" />
                    </div>
                    <div className="relative h-[45px] flex-grow">
                        <Image src="/images/icons/footerright.png" alt="Vine Right" fill className="object-contain object-left" />
                    </div>
                </div>

                {/* Copyright Text */}
                <div className="text-center mt-4 pb-10">
                    <p className="font-inter text-sm font-normal text-[#F7EDE2]" style={{ color: '#F7EDE2' }}>
                        © {new Date().getFullYear()} Vstories. All rights reserved. | Designed & Developed By Manvian
                    </p>
                </div>
            </div>
        </footer>
    );
}

