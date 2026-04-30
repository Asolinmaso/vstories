"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    Users,
    Tag,
    Settings,
    LogOut,
    ShoppingBag,
    X
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/coupons", label: "Coupons", icon: Tag },
    { href: "/admin/settings", label: "Web Config", icon: Settings },
];

interface AdminSidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export default function AdminSidebar({ isOpen = false, onClose }: AdminSidebarProps) {
    const pathname = usePathname();
    const { signOut } = useAuth();

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            <aside
                className={`fixed top-0 left-0 h-screen w-72 bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] text-white flex flex-col z-50 shadow-2xl overflow-hidden transition-transform duration-300 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Glossy Overlay */}
                <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>

                <div className="relative p-8 border-b border-white/10 flex flex-col items-center">
                    {/* Mobile Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-white/60 hover:text-white lg:hidden"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="relative w-24 h-24">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/images/logo.png"
                            alt="V Stories Logo"
                            className="object-contain w-full h-full"
                        />
                    </div>
                </div>

                <nav className="relative flex-1 py-8 px-4 space-y-2 overflow-y-auto custom-scrollbar">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => onClose?.()} // Close sidebar on mobile nav click
                                className={`flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${isActive
                                    ? "bg-white/15 text-white shadow-lg border border-white/10"
                                    : "text-white/60 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--highlight)]"></div>}
                                <Icon className={`w-5 h-5 ${isActive ? "text-[var(--highlight)]" : "text-white/50 group-hover:text-white"} transition-colors`} />
                                <span className="font-medium tracking-wide text-sm">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="relative p-6 border-t border-white/10 space-y-3 bg-[var(--primary-dark)]/50">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-2.5 text-white/60 hover:text-white transition-colors hover:translate-x-1 duration-200"
                    >
                        <ShoppingBag className="w-4 h-4" />
                        <span className="text-sm font-medium">View Storefront</span>
                    </Link>
                    <button
                        onClick={() => signOut()}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-200 hover:text-white rounded-xl transition-all border border-transparent hover:border-red-500/30"
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm font-semibold">Sign Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
