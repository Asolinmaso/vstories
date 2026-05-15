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
                <div className="bg-[var(--primary)] py-2.5 z-50">
                    <div className="container-premium flex items-center justify-center gap-6 text-center">
                        <p className="text-sm md:text-base font-medium text-white tracking-wide">
                            {announcement.text}
                        </p>
                        <Link 
                            href="/shop" 
                            className="bg-white text-[var(--primary)] px-5 py-1 rounded-full text-xs font-bold hover:bg-[var(--secondary-light)] transition-all uppercase tracking-wider"
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>
            )}

            {/* Main Navbar */}
            <header
                className={`sticky top-0 z-50 transition-all duration-500 ${isScrolled
                    ? "bg-white/95 backdrop-blur-md shadow-sm py-2"
                    : "bg-[var(--background)] py-4"
                    }`}
            >
                <div className="container-premium">
                    <nav className="flex items-center justify-between relative">
                        {/* Left - Mobile: Hamburger + Logo */}
                        <div className="flex items-center gap-4">
                            <button
                                className="lg:hidden p-2 -ml-2 text-[var(--primary)]"
                                onClick={() => setIsMobileMenuOpen(true)}
                                aria-label="Open menu"
                            >
                                <Menu className="w-6 h-6" />
                            </button>

                            <Link href="/" className="flex-shrink-0">
                                <Image
                                    src="/images/logo.png"
                                    alt="V Stories Logo"
                                    width={isScrolled ? 50 : 65}
                                    height={isScrolled ? 50 : 65}
                                    className="rounded-full transition-all duration-500"
                                />
                            </Link>
                        </div>

                        {/* Center - Navigation Links */}
                        <div className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
                            {navLinks.map((link) => (
                                <div 
                                    key={link.label}
                                    className="relative group"
                                    onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <Link
                                        href={link.href}
                                        className={`flex items-center gap-1 text-[15px] font-semibold transition-all duration-300 relative tracking-wide uppercase ${
                                            pathname === link.href ? "text-[var(--primary)]" : "text-black/70 hover:text-[var(--primary)]"
                                        }`}
                                    >
                                        {link.label}
                                        {link.dropdown && (
                                            <svg className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === link.label ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                        )}
                                        <span className={`absolute -bottom-1 left-0 h-[2px] bg-[var(--primary)] transition-all duration-300 ${
                                            pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                                        }`} />
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

                        {/* Right - Icons */}
                        <div className="hidden lg:flex items-center gap-5">
                            {/* Search */}
                            <form onSubmit={handleSearch} className="relative">
                                <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-black/10 bg-black/5 w-[200px] focus-within:w-[240px] focus-within:bg-white focus-within:border-[var(--primary)]/30 transition-all duration-300">
                                    <Search className="w-4 h-4 text-black/50" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search..."
                                        className="bg-transparent text-sm focus:outline-none w-full font-inter placeholder:text-black/30"
                                    />
                                </div>
                            </form>

                            <div className="flex items-center gap-2">
                                {user ? (
                                    <Link
                                        href="/profile"
                                        className="p-2 text-[var(--primary)] hover:scale-110 transition-transform relative"
                                        aria-label="Profile"
                                    >
                                        <User className="w-6 h-6" />
                                        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
                                    </Link>
                                ) : (
                                    <button
                                        onClick={openLoginModal}
                                        className="flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] transition-all shadow-sm hover:shadow-md uppercase tracking-wider"
                                    >
                                        Login
                                    </button>
                                )}
                                
                                <button
                                    className="relative p-2 text-[var(--primary)] hover:scale-110 transition-transform"
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
                        </div>

                        {/* Mobile Icons */}
                        <div className="flex lg:hidden items-center gap-3">
                            {user ? (
                                <Link href="/profile" className="p-2 text-[var(--primary)]">
                                    <User className="w-6 h-6" />
                                </Link>
                            ) : (
                                <button
                                    onClick={openLoginModal}
                                    className="px-4 py-1.5 rounded-full text-xs font-bold bg-[var(--primary)] text-white uppercase tracking-wider"
                                >
                                    Login
                                </button>
                            )}

                            <button
                                className="relative p-2 text-[var(--primary)]"
                                onClick={() => setIsCartOpen(true)}
                                aria-label="Cart"
                            >
                                <ShoppingBag className="w-6 h-6" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-[var(--highlight)] text-white text-[10px] font-bold rounded-full border-2 border-white">
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
