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

// ... existing imports ...

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/shop/hair", label: "Hair" },
    { href: "/shop/skin", label: "Skin Care" },
    { href: "/shop/combos", label: "Combos & Gifts" },
    { href: "/shop", label: "Shop All" },
    { href: "/contact", label: "Contact Us" },
];

// ... within Navbar component ...

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
    const [isSearchOpen, setIsSearchOpen] = useState(false);
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
    }, [pathname]);

    // ... existing useEffect ...
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
                <div className="bg-[var(--primary)] py-2.5 overflow-hidden relative z-50">
                    <div className="container-premium flex items-center justify-center text-center px-4">
                        <p className="text-sm font-medium tracking-wide !text-white" style={{ color: '#FFFFFF' }}>
                            {announcement.text}
                        </p>
                    </div>
                </div>
            )}

            {/* Main Navbar */}
            <header
                className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
                    ? "glass shadow-md py-2"
                    : "bg-[var(--background)]/80 py-2"
                    }`}
            >
                <div className="container-premium">
                    <nav className="flex items-center justify-between">
                        {/* Left - Mobile: Hamburger + Logo */}
                        <div className="flex items-center gap-3 lg:gap-8">
                            {/* Mobile Menu Button */}
                            <button
                                className="lg:hidden p-2 -ml-2 text-[var(--primary)]"
                                onClick={() => setIsMobileMenuOpen(true)}
                                aria-label="Open menu"
                            >
                                <Menu className="w-6 h-6" />
                            </button>

                            {/* Logo Icon - Shows on all screens */}
                            <Link href="/" className="flex-shrink-0">
                                <Image
                                    src="/images/logo.png"
                                    alt="V Stories Logo"
                                    width={45}
                                    height={45}
                                    className="rounded-full lg:w-[55px] lg:h-[55px]"
                                />
                            </Link>

                        </div>

                        {/* Center - All Navigation Links */}
                        <div className="hidden lg:flex items-center justify-center gap-8 absolute left-1/2 -translate-x-1/2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-base font-semibold text-black hover:text-[var(--gold)] transition-all duration-300 relative group tracking-wide whitespace-nowrap"
                                >
                                    {link.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[var(--gold)] to-[var(--highlight)] transition-all duration-300 group-hover:w-full" />
                                </Link>
                            ))}
                        </div>

                        {/* Right - Icons */}
                        <div className="hidden lg:flex items-center gap-3 justify-end flex-shrink-0">
                            <div className="flex items-center gap-2 border-l border-[var(--primary)]/20 pl-3">
                                {/* Desktop Search Input */}
                                <form onSubmit={handleSearch} className="relative group">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search..."
                                        aria-label="Search products"
                                        className="pl-4 pr-10 py-2 rounded-full border border-gray-200 bg-gray-50/50 focus:bg-white text-sm focus:outline-none focus:border-[var(--primary)] w-[130px] focus:w-[160px] transition-all duration-300 shadow-sm"
                                    />
                                    <button
                                        type="submit"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[var(--primary)] transition-colors"
                                        aria-label="Search"
                                    >
                                        <Search className="w-4 h-4" />
                                    </button>
                                </form>

                                {user ? (
                                    <Link
                                        href="/profile"
                                        className="p-2 text-[var(--primary)] hover:text-[var(--gold)] transition-colors relative group"
                                        aria-label="Profile"
                                    >
                                        <User className="w-5 h-5" />
                                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
                                    </Link>
                                ) : (
                                    <button
                                        onClick={openLoginModal}
                                        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg whitespace-nowrap"
                                        style={{ backgroundColor: "#1D3515", color: "#ffffff" }}
                                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#2a4a1f")}
                                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#1D3515")}
                                        aria-label="Login"
                                    >
                                        <User className="w-4 h-4" />
                                        Login
                                    </button>
                                )}
                                <button
                                    className="relative p-2 text-[var(--primary)] hover:text-[var(--gold)] transition-colors"
                                    onClick={() => setIsCartOpen(true)}
                                    aria-label="Cart"
                                >
                                    <ShoppingBag className="w-5 h-5" />
                                    {cartCount > 0 && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center justify-center bg-[var(--highlight)] text-white text-xs font-medium rounded-full"
                                        >
                                            {cartCount}
                                        </motion.span>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Mobile Icons */}
                        <div className="flex lg:hidden items-center gap-2">
                            {/* Search Hidden as per request */}
                            <button
                                className="hidden p-2 text-[var(--primary)]"
                                onClick={() => setIsSearchOpen(true)}
                                aria-label="Search"
                            >
                                <Search className="w-5 h-5" />
                            </button>

                            {/* Profile Icon */}
                            {user ? (
                                <Link href="/profile" className="p-2 text-[var(--primary)]" aria-label="Profile">
                                    <User className="w-5 h-5" />
                                </Link>
                            ) : (
                                <button
                                    onClick={openLoginModal}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                                    style={{ backgroundColor: "#1D3515", color: "#ffffff" }}
                                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#2a4a1f")}
                                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#1D3515")}
                                    aria-label="Login"
                                >
                                    <User className="w-3.5 h-3.5" />
                                    Login
                                </button>
                            )}

                            <button
                                className="relative p-2 text-[var(--primary)]"
                                onClick={() => setIsCartOpen(true)}
                                aria-label="Cart"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center bg-[var(--highlight)] text-white text-[10px] font-medium rounded-full">
                                        {cartCount}
                                    </span>
                                )}
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
