"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Search, User, ShoppingBag, Menu } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useAuth } from "@/context/AuthContext";
import { useLoginModal } from "@/context/LoginModalContext";

const MobileMenu = dynamic(() => import("./MobileMenu"), { ssr: false });
const CartDrawer = dynamic(() => import("./CartDrawer"), { ssr: false });

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    {
        href: "/shop",
        label: "Products",
        dropdown: [
            { href: "/shop/skin", label: "Skin Care" },
            { href: "/shop/hair", label: "Hair Care" },
            { href: "/shop/combos", label: "Combo / Gift Packs" },
            { href: "/shop/samples", label: "Sample Packs" },
        ]
    },
    { href: "/contact", label: "Contact Us" },
    { href: "/blog", label: "Blog" },
];

interface NavbarProps {
    announcement?: {
        text: string;
        enabled: boolean;
    };
}

export default function Navbar({ announcement }: NavbarProps) {
    const { user } = useAuth();
    const { open: openLoginModal } = useLoginModal();
    const router = useRouter();
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const cartItems = useCartStore((state) => state.items);
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    // Clear search on navigation
    useEffect(() => {
        setSearchQuery("");
        setActiveDropdown(null);
    }, [pathname]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Skip to main content link for accessibility */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[var(--primary)] focus:text-white focus:rounded-lg"
            >
                Skip to main content
            </a>

            {/* Announcement Bar */}
            {announcement?.enabled && (
                <div className="bg-[#FCFAF4] py-6 md:py-[35px] z-50 border-b border-[#1D3B29]/5">
                    <div className="container-premium flex items-center justify-center gap-4 md:gap-[29px] text-center">
                        <div className="flex items-center gap-2 md:gap-[13px]">
                            <div className="text-[#1D3B29] -rotate-[18.46deg] shrink-0">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.67806 0.393273C3.33698 0.746016 3.86524 1.26031 4.27352 1.86988C4.93665 2.86007 5.32531 4.08777 5.64054 5.36694C6.27084 7.92543 6.64437 10.715 7.77326 12.1466C8.83291 13.4904 10.0172 14.1032 11.144 14.2227C11.6287 14.2742 12.107 14.2325 12.5642 14.1104C12.5917 10.6285 11.032 6.71738 8.37049 4.61054C11.4761 6.14733 13.7451 9.27599 14.257 13.1784L13.89 13.4892C14.0091 13.4058 14.1242 13.3167 14.2348 13.2224C15.98 11.7396 16.8379 8.81822 14.9913 5.57157C14.1428 4.07991 12.3091 2.18967 9.91609 1.04988C7.84587 0.0639353 5.3733 -0.379387 2.67804 0.393385L2.67806 0.393273ZM19.3181 4.63049C19.4716 5.22489 19.4715 5.83468 19.3522 6.42831C19.1435 7.46589 18.6174 8.47483 18.0145 9.46774C16.8086 11.4535 15.3099 13.4204 15.1202 14.9811C14.9406 16.4594 15.288 17.553 15.9002 18.3107C16.1619 18.6351 16.4825 18.9075 16.8453 19.114C19.0068 16.963 20.4558 13.5914 20.1231 10.6547C21.0827 13.5168 20.5478 16.8457 18.4592 19.5823C20.4194 19.7039 22.7021 18.4343 23.5656 15.3296C23.9656 13.8911 24.0093 11.5905 23.2428 9.41464C22.5922 7.56759 21.3813 5.80863 19.3182 4.63062L19.3181 4.63049ZM-1.99875e-05 15.0004C0.277852 17.3556 1.42587 19.1575 2.87451 20.4786C4.58089 22.0347 6.72078 22.8962 8.20421 23.0928C11.4058 23.5172 13.47 21.9199 14.1261 20.0736C10.7839 20.9173 7.50419 20.1036 5.24087 18.1012C7.81924 19.5575 11.4967 19.5496 14.3277 18.4088C14.2799 17.995 14.1546 17.594 13.9582 17.2267C13.4992 16.368 12.6247 15.6205 11.1908 15.2059C9.67724 14.7684 7.27655 15.3731 4.97243 15.7013C3.82046 15.8656 2.68427 15.9536 1.64553 15.7383C1.0509 15.6151 0.488478 15.3744 9.28297e-05 15.0005L-1.99875e-05 15.0004Z" fill="currentColor" />
                                </svg>
                            </div>
                            <p className="text-[#1D3B29] font-inter font-normal text-sm md:text-[24px] md:leading-[29px] whitespace-nowrap">
                                Flat 20% OFF on Hair Care | Use code: HAIR20
                            </p>
                        </div>
                        <Link
                            href="/shop"
                            className="bg-[#1D3B29] !text-white px-6 py-3 rounded-[8px] text-sm md:text-[16px] font-medium hover:bg-[#2A4F38] transition-all font-inter shrink-0 shadow-sm"
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>
            )}

            {/* Main Navbar */}
            <header
                className={`sticky top-0 z-50 transition-all duration-500 bg-[#F3EEE9] shadow-sm h-[80px] md:h-[100px] flex items-center`}
            >
                <div className="w-full max-w-[1440px] mx-auto px-4 md:px-[100px]">
                    <nav className="flex items-center justify-between w-full">
                        {/* Logo – always visible */}
                        <Link href="/" className="flex-shrink-0">
                            <Image
                                src="/images/logo.png"
                                alt="V Stories Logo"
                                width={140}
                                height={44}
                                className="object-contain w-[120px] md:w-[171px] h-auto"
                            />
                        </Link>

                        {/* Desktop nav links – hidden on mobile */}
                        <div className="hidden lg:flex items-center gap-[24px]">
                            {navLinks.map((link) => (
                                <div
                                    key={link.label}
                                    className="relative group"
                                    onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <Link
                                        href={link.href}
                                        className={`flex items-center gap-1.5 text-[16px] leading-[19px] transition-all duration-300 font-inter ${
                                            (pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href)))
                                                ? "font-semibold text-[var(--primary)]" 
                                                : "font-normal text-black hover:text-[var(--primary)]"
                                        }`}
                                    >
                                        <span className={link.label === "Products" ? "w-[68px]" : ""}>{link.label}</span>
                                        {link.dropdown && (
                                            <div className="w-[12px] h-[6px] flex items-center justify-center">
                                                <svg className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === link.label ? 'rotate-0' : 'rotate-180'}`} viewBox="0 0 12 6" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1L6 5L11 1" /></svg>
                                            </div>
                                        )}
                                    </Link>

                                    {/* Dropdown Menu */}
                                    {link.dropdown && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, pointerEvents: "none" }}
                                            animate={{
                                                opacity: activeDropdown === link.label ? 1 : 0,
                                                y: activeDropdown === link.label ? 0 : 10,
                                                pointerEvents: activeDropdown === link.label ? "auto" : "none"
                                            }}
                                            className="absolute top-full left-0 mt-2 w-56 bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100 z-[100]"
                                        >
                                            <div className="py-2">
                                                {link.dropdown.map((sublink) => (
                                                    <Link
                                                        key={sublink.label}
                                                        href={sublink.href}
                                                        className="block px-6 py-3 text-sm font-medium text-gray-700 hover:bg-[var(--background-warm)] hover:text-[var(--primary)] transition-colors"
                                                    >
                                                        {sublink.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Desktop right section */}
                        <div className="hidden lg:flex items-center gap-[32px]">
                            {/* Search Bar */}
                            <form onSubmit={handleSearch} className="relative">
                                <div className="flex items-center gap-3 px-4 py-[12px] rounded-lg border border-black bg-transparent w-[229px] h-[40px]">
                                    <Search className="w-4 h-4 text-black" strokeWidth={1.5} />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search for products..."
                                        className="bg-transparent text-[16px] leading-[24px] focus:outline-none w-full font-poppins text-black placeholder:text-black"
                                    />
                                </div>
                            </form>

                            {user ? (
                                <div className="flex items-center gap-[32px]">
                                    <Link
                                        href="/profile"
                                        className="p-2 text-black hover:scale-110 transition-transform relative"
                                        aria-label="Profile"
                                    >
                                        <User className="w-6 h-6" />
                                    </Link>

                                    <button
                                        className="relative p-2 text-black hover:scale-110 transition-transform"
                                        onClick={() => setIsCartOpen(true)}
                                        aria-label="Cart"
                                    >
                                        <ShoppingBag className="w-6 h-6" />
                                        {cartCount > 0 && (
                                            <motion.span
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-[var(--highlight)] text-white text-[10px] font-bold rounded-full border-2 border-white"
                                            >
                                                {cartCount}
                                            </motion.span>
                                        )}
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={openLoginModal}
                                    className="flex items-center justify-center w-[95px] h-[43px] rounded-[8px] text-[16px] leading-[19px] font-medium hover:bg-[#2A4F38] transition-all font-inter"
                                    style={{ backgroundColor: '#1D3B29', color: '#F7EDE2' }}
                                >
                                    Log In
                                </button>
                            )}
                        </div>

                        {/* Mobile controls – hamburger + cart */}
                        <div className="flex lg:hidden items-center gap-3">
                            <button
                                className="relative p-2 text-black"
                                onClick={() => setIsCartOpen(true)}
                                aria-label="Cart"
                            >
                                <ShoppingBag className="w-6 h-6" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center bg-[var(--highlight)] text-white text-[9px] font-bold rounded-full">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                            <button
                                className="p-2 text-black"
                                onClick={() => setIsMobileMenuOpen(true)}
                                aria-label="Open menu"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Mobile Menu */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                navLinks={navLinks}
            />

            {/* Cart Drawer */}
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}
