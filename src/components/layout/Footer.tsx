"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram, Phone, MapPin, Mail, Facebook, Linkedin } from "lucide-react";

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

function SocialIcon({ icon, href, label }: { icon: React.ReactNode; href: string; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-[#E8BF72] flex items-center justify-center text-[#E8BF72] hover:bg-[#E8BF72] hover:text-[#1D3B29] transition-all duration-300"
            aria-label={label}
        >
            {icon}
        </a>
    );
}

function ContactItem({ icon, text, href }: { icon: React.ReactNode; text: string; href?: string }) {
    const content = (
        <div className="flex items-center gap-4 group">
            <div className="w-6 h-6 rounded-full border border-[#E8BF72] flex items-center justify-center text-[#E8BF72] group-hover:bg-[#E8BF72] group-hover:text-[#1D3B29] transition-all duration-300">
                {icon}
            </div>
            <span className="text-[#F7EDE2] font-inter text-base font-normal" style={{ color: '#F7EDE2' }}>{text}</span>
        </div>
    );

    return href ? <a href={href}>{content}</a> : content;
}

export default function Footer() {
    return (
        <footer className="bg-[#1D3B29] pt-20 pb-10 overflow-hidden relative text-[#F7EDE2]" style={{ backgroundColor: '#1D3B29' }}>
            <div className="container-premium max-w-[1440px] px-10">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-8">
                    {/* Column 1: Brand */}
                    <div className="flex flex-col gap-8">
                        <Link href="/" className="w-[160px]">
                            <Image
                                src="/images/logo.png"
                                alt="V Stories"
                                width={160}
                                height={51}
                                className="object-contain brightness-0 invert opacity-90"
                            />
                        </Link>
                        <p className="font-inter text-base font-normal leading-[19px] max-w-[220px]" style={{ color: '#F7EDE2' }}>
                            Reviving ancient herbal practices with modern standards. 100% natural, chemical-free products crafted with love.
                        </p>
                        <div className="flex gap-6">
                            <SocialIcon icon={<Facebook className="w-4 h-4" />} href="#" label="Facebook" />
                            <SocialIcon icon={<Instagram className="w-4 h-4" />} href="#" label="Instagram" />
                            <SocialIcon icon={<Linkedin className="w-4 h-4" />} href="#" label="LinkedIn" />
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="flex flex-col gap-6">
                        <h4 className="font-inter text-base font-medium" style={{ color: '#F7EDE2' }}>Quick Links</h4>
                        <ul className="flex flex-col gap-4">
                            {quickLinks.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="font-inter text-base font-normal hover:text-[#E8BF72] transition-colors" style={{ color: '#F7EDE2' }}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Categories */}
                    <div className="flex flex-col gap-6">
                        <h4 className="font-inter text-base font-medium" style={{ color: '#F7EDE2' }}>Categories</h4>
                        <ul className="flex flex-col gap-4">
                            {categories.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="font-inter text-base font-normal hover:text-[#E8BF72] transition-colors" style={{ color: '#F7EDE2' }}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Policies */}
                    <div className="flex flex-col gap-6">
                        <h4 className="font-inter text-base font-medium" style={{ color: '#F7EDE2' }}>Policies</h4>
                        <ul className="flex flex-col gap-4">
                            {policies.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="font-inter text-base font-normal hover:text-[#E8BF72] transition-colors" style={{ color: '#F7EDE2' }}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 5: Contact Us */}
                    <div className="flex flex-col gap-6">
                        <h4 className="font-inter text-base font-medium" style={{ color: '#F7EDE2' }}>Contact Us</h4>
                        <div className="flex flex-col gap-4">
                            <ContactItem icon={<Phone className="w-3 h-3" />} text="+91 6383921957" href="tel:+916383921957" />
                            <ContactItem icon={<Mail className="w-3 h-3" />} text="hello@vstories.in" href="mailto:hello@vstories.in" />
                            <ContactItem icon={<MapPin className="w-3 h-3" />} text="Kilakarai, Tamil Nadu" />
                        </div>
                        <div className="mt-4">
                            <h5 className="font-inter text-base font-medium mb-4" style={{ color: '#F7EDE2' }}>Join Our Community</h5>
                            <a
                                href="https://wa.me/916383921957"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full border border-[#E8BF72] flex items-center justify-center text-[#E8BF72] hover:bg-[#E8BF72] hover:text-[#1D3B29] transition-all duration-300"
                                aria-label="WhatsApp"
                            >
                                <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Decorative Vine Line */}
                <div className="relative h-20 mt-12 flex items-center justify-center">
                    <div className="absolute left-0 right-0 h-[2px] bg-[#E8BF72]" />
                    <div className="absolute flex gap-12 text-[#E8BF72]">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className={`relative ${i % 2 === 0 ? '-top-4' : 'top-4'}`}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={i % 2 === 0 ? 'rotate-[-30deg]' : 'rotate-[150deg]'}>
                                    <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L7,20.5C9.75,20.04 12.67,18.87 15.06,16.54C18.27,13.4 19.91,8.93 20.3,5.24C20.36,4.67 20,4.22 19.5,4.22C19.08,4.22 18.73,4.5 18.59,4.88C17.61,7.43 18.42,7.69 17,8Z" />
                                </svg>
                            </div>
                        ))}
                    </div>
                    {/* Center Leaf Group */}
                    <div className="relative z-10 bg-[#1D3B29] px-4">
                        <svg width="49" height="49" viewBox="0 0 49 49" fill="#E8BF72">
                            <path d="M24.5 0C24.5 0 24.5 15.3 14 24.5C14 24.5 19.1 24.5 24.5 10.2C29.9 24.5 35 24.5 35 24.5C24.5 15.3 24.5 0 24.5 0Z" />
                            <path d="M24.5 49C24.5 49 24.5 33.7 35 24.5C35 24.5 29.9 24.5 24.5 38.8C19.1 24.5 14 24.5 14 24.5C24.5 33.7 24.5 49 24.5 49Z" />
                        </svg>
                    </div>
                </div>

                {/* Copyright Text */}
                <div className="mt-8 text-center">
                    <p className="font-inter text-base font-normal" style={{ color: '#F7EDE2' }}>
                        © {new Date().getFullYear()} Vstories. All rights reserved. | Designed & Developed By Manvian
                    </p>
                </div>
            </div>
        </footer>
    );
}

