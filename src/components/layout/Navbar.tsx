"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Search, User, ShoppingBag, ShoppingCart, Menu, LogOut, Heart } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useAuth } from "@/context/AuthContext";
import { useLoginModal } from "@/context/LoginModalContext";
import { useWishlistStore } from "@/lib/wishlistStore";

const MobileMenu = dynamic(() => import("./MobileMenu"), { ssr: false });
const CartDrawer = dynamic(() => import("./CartDrawer"), { ssr: false });

interface NavCategory {
    id: string;
    name: string;
    slug: string;
}

interface NavLink {
    href: string;
    label: string;
    dropdown?: { href: string; label: string }[];
}

const staticNavLinks: NavLink[] = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    {
        href: "/shop",
        label: "Products",
        dropdown: [
            { href: "/shop/skin", label: "Skin Care" },
            { href: "/shop/hair", label: "Hair Care" },
            { href: "/shop/combos", label: "Combo / Gift Packs" },
            { href: "/shop/sample-packs", label: "Sample Packs" },
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
    const { user, signOut } = useAuth();
    const { open: openLoginModal } = useLoginModal();
    const router = useRouter();
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [navLinks, setNavLinks] = useState<NavLink[]>(staticNavLinks);
    const [isMounted, setIsMounted] = useState(false);
    const cartItems = useCartStore((state) => state.items);
    const cartCount = isMounted ? cartItems.reduce((sum, item) => sum + item.quantity, 0) : 0;
    const wishlistItems = useWishlistStore((state) => state.items);
    const hasWishlistItems = isMounted ? wishlistItems.length > 0 : false;

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Static categories used for dropdown

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    // Clear search on navigation
    useEffect(() => {
        setSearchQuery("");
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
            <div className="bg-[#F8F7F4] z-30 border-b border-[#1D3B29]/5 overflow-hidden">
                <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-[100px] py-3 md:py-0 md:h-[60px] flex flex-col md:flex-row items-center justify-center gap-2 md:gap-[24px]">
                    <div className="flex items-center justify-center gap-1.5 w-full md:w-auto min-w-0">
                        <Image
                            src="/images/icons/leafleft.png"
                            alt="Leaf"
                            width={24}
                            height={24}
                            className="w-[14px] h-[14px] sm:w-[18px] sm:h-[18px] object-contain shrink-0"
                        />
                        <p className="text-[#1D3B29] font-inter font-normal text-[11px] sm:text-xs md:text-[18px] leading-none shrink-0 text-center">
                            Flat 20% OFF on Hair Care | Use code: HAIR20
                        </p>
                    </div>
                    <Link
                        href="/shop"
                        className="bg-[#1D3B29] !text-white px-4 py-1.5 md:px-6 md:py-2.5 rounded-[6px] text-[11px] sm:text-xs md:text-[15px] font-medium hover:bg-[#2A4F38] transition-all font-inter shrink-0 whitespace-nowrap text-center"
                    >
                        Shop Now
                    </Link>
                </div>
            </div>

            {/* Main Navbar */}
            <header
                className="sticky top-0 z-50 transition-all duration-500 bg-[#F4EEE2] h-16 lg:h-[80px] flex items-center w-full"
            >
                <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-[100px]">
                    <nav className="flex items-center justify-between gap-4 w-full min-w-0">
                        {/* Logo */}
                        <Link href="/" className="flex-shrink-0 hidden lg:block">
                            <Image
                                src="/images/logo.png"
                                alt="V Stories Logo"
                                width={171}
                                height={52}
                                className="object-contain w-[140px] xl:w-[171px] h-auto"
                                style={{ height: "auto" }}
                            />
                        </Link>

                        {/* Center - Navigation Links */}
                        <div className="hidden lg:flex items-center justify-center gap-6 xl:gap-[24px] flex-1 min-w-0">
                            {navLinks.map((link) => (
                                <div
                                    key={link.label}
                                    className="relative group"
                                >
                                    <Link
                                        href={link.href}
                                        className={`flex items-center gap-1.5 text-[16px] leading-[19px] transition-all duration-300 font-inter ${(pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href)))
                                            ? "font-semibold text-[var(--primary)]"
                                            : "font-normal text-black hover:text-[var(--primary)]"
                                            }`}
                                    >
                                        <span className={link.label === "Products" ? "w-[68px]" : ""}>{link.label}</span>
                                        {link.dropdown && link.dropdown.length > 0 && (
                                            <div className="w-[12px] h-[6px] flex items-center justify-center">
                                                <svg className="w-3 h-3 transition-transform duration-300 rotate-180 group-hover:rotate-0" viewBox="0 0 12 6" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M1 1L6 5L11 1" /></svg>
                                            </div>
                                        )}
                                    </Link>

                                    {/* Dropdown Menu */}
                                    {link.dropdown && link.dropdown.length > 0 && (
                                        <div className="absolute top-[80%] -left-4 pt-4 w-48 z-[100] opacity-0 invisible translate-y-2 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto">
                                            <div className="bg-[#F4EEE2] shadow-sm rounded-none border border-black/5">
                                                <div className="py-2">
                                                    {link.dropdown.map((sublink) => (
                                                        <Link
                                                            key={sublink.href}
                                                            href={sublink.href}
                                                            className="block px-4 py-2.5 text-[15px] leading-tight font-inter text-black hover:bg-black/5 transition-colors"
                                                        >
                                                            {sublink.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                </div>
                            ))}
                        </div>

                        {/* Right Section - search, account, cart (always visible on desktop) */}
                        <div className="hidden lg:flex items-center gap-4 xl:gap-[32px] flex-shrink-0">
                            <form onSubmit={handleSearch} className="relative">
                                <div className="flex items-center gap-3 px-4 py-[12px] rounded-lg border border-black bg-transparent w-[180px] xl:w-[229px] h-[40px]">
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
                                <>
                                    <Link href="/wishlist" className="p-2 hover:scale-110 active:scale-95 transition-transform group">
                                        <Heart className={`w-6 h-6 transition-colors ${pathname === '/wishlist' ? 'fill-[#778E6B] text-[#778E6B]' : 'text-[#778E6B] group-active:fill-[#778E6B]'}`} strokeWidth={1.5} />
                                    </Link>

                                    <Link
                                        href="/cart"
                                        className="relative p-2 text-black hover:scale-110 transition-transform"
                                        aria-label="Cart"
                                    >
                                        <Image src="/images/icons/cart.png" alt="Cart" width={24} height={24} className="w-6 h-6 object-contain" />
                                        {cartCount > 0 && (
                                            <motion.span
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-[var(--highlight)] text-white text-[10px] font-bold rounded-full border-2 border-white"
                                            >
                                                {cartCount}
                                            </motion.span>
                                        )}
                                    </Link>

                                    <Link href="/profile" className="p-2 text-black hover:scale-110 transition-transform">
                                        <User className="w-6 h-6" strokeWidth={2} />
                                    </Link>
                                </>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => openLoginModal("login")}
                                    className="flex items-center justify-center px-5 py-2 rounded-lg text-[15px] font-semibold transition-all hover:opacity-90 font-inter"
                                    style={{ backgroundColor: "#1D3B29", color: "#F7EDE2" }}
                                >
                                    Login
                                </button>
                            )}
                        </div>

                        {/* Mobile Controls */}
                        <div className="flex lg:hidden items-center justify-between w-full min-w-0">
                            {isMobileSearchOpen ? (
                                <form onSubmit={handleSearch} className="flex items-center w-full gap-2 py-1 px-1">
                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-black bg-transparent flex-1 h-[40px]">
                                        <Search className="w-4 h-4 text-black shrink-0" strokeWidth={1.5} />
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search products..."
                                            className="bg-transparent text-[15px] focus:outline-none w-full font-poppins text-black placeholder:text-black/60"
                                            autoFocus
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setIsMobileSearchOpen(false)}
                                        className="text-sm font-medium px-2 py-1 text-[#1D3B29] hover:opacity-75 font-inter"
                                    >
                                        Cancel
                                    </button>
                                </form>
                            ) : (
                                <>
                                    {/* Logo on the left */}
                                    <Link href="/" className="flex-shrink-0">
                                        <Image
                                            src="/images/logo.png"
                                            alt="V Stories Logo"
                                            width={120}
                                            height={36}
                                            className="object-contain w-[96px] sm:w-[110px] h-auto max-h-9"
                                            style={{ height: "auto" }}
                                            priority
                                        />
                                    </Link>

                                    {/* Icons on the right: Search, Heart, Cart, Profile, Hamburger Menu */}
                                    <div className="flex items-center justify-end shrink-0 gap-0 sm:gap-0.5">
                                        {/* Search */}
                                        <button
                                            type="button"
                                            onClick={() => setIsMobileSearchOpen(true)}
                                            className="flex h-10 w-10 items-center justify-center text-black hover:scale-105 transition-transform"
                                            aria-label="Search"
                                        >
                                            <Search className="w-5 h-5" strokeWidth={1.5} />
                                        </button>

                                        {user ? (
                                            <>
                                                {/* Wishlist */}
                                                <Link href="/wishlist" className="flex h-10 w-10 items-center justify-center hover:scale-105 active:scale-95 transition-transform group" aria-label="Wishlist">
                                                    <Heart className={`w-5 h-5 transition-colors ${pathname === '/wishlist' ? 'fill-[#778E6B] text-[#778E6B]' : 'text-[#778E6B] group-active:fill-[#778E6B]'}`} strokeWidth={1.5} />
                                                </Link>

                                                {/* Cart */}
                                                <Link
                                                    href="/cart"
                                                    className="relative flex h-10 w-10 items-center justify-center text-black hover:scale-105 transition-transform"
                                                    aria-label="Cart"
                                                >
                                                    <Image src="/images/icons/cart.png" alt="Cart" width={20} height={20} className="w-5 h-5 object-contain" />
                                                    {cartCount > 0 && (
                                                        <span className="absolute top-1 right-1 w-4 h-4 flex items-center justify-center bg-[var(--highlight)] text-white text-[9px] font-bold rounded-full">
                                                            {cartCount}
                                                        </span>
                                                    )}
                                                </Link>

                                                {/* Profile */}
                                                <Link href="/profile" className="flex h-10 w-10 items-center justify-center text-black hover:scale-105 transition-transform" aria-label="Profile">
                                                    <User className="w-5 h-5" strokeWidth={1.5} />
                                                </Link>
                                            </>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => openLoginModal("login")}
                                                className="flex items-center justify-center px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-all hover:opacity-90 font-inter mr-1"
                                                style={{ backgroundColor: "#1D3B29", color: "#F7EDE2" }}
                                            >
                                                Login
                                            </button>
                                        )}

                                        {/* Hamburger Menu */}
                                        <button
                                            type="button"
                                            className="flex h-10 w-10 items-center justify-center text-black hover:scale-105 transition-transform"
                                            onClick={() => setIsMobileMenuOpen(true)}
                                            aria-label="Open menu"
                                        >
                                            <Menu className="w-6 h-6" />
                                        </button>
                                    </div>
                                </>
                            )}
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
