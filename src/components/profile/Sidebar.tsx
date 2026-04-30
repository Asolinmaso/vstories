"use client";

import { useAuth } from "@/context/AuthContext";
import {
    LayoutDashboard,
    ShoppingBag,
    Heart,
    MapPin,
    Settings,
    LogOut,
    Shield
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const menuItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/profile", active: true },
    { icon: ShoppingBag, label: "My Orders", href: "/profile/orders", active: false },
    { icon: Heart, label: "Wishlist", href: "/profile/wishlist", active: false },
    { icon: MapPin, label: "Addresses", href: "/profile/addresses", active: false },
];

export default function Sidebar() {
    const { user, profile, signOut, isAdmin } = useAuth();
    const router = useRouter();

    return (
        <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 border border-[var(--primary)]/5 shadow-sm">
                <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4 group">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary)] p-1 shadow-lg">
                            <div className="w-full h-full rounded-full bg-[#f8f5f0] flex items-center justify-center text-3xl font-heading text-[var(--primary)]">
                                {profile?.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
                            </div>
                        </div>
                        <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-[#faf9f6] rounded-full"></div>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 mb-1">
                        {profile?.full_name || "Valued Customer"}
                    </h2>
                    <p className="text-sm text-[var(--text-muted)] mb-4">{user?.email}</p>

                    <span className="px-4 py-1.5 bg-[var(--gold)]/10 text-[var(--highlight-dark)] text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        {profile?.role === 'admin' ? 'Administrator' : 'Gold Member'}
                    </span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="bg-white/60 backdrop-blur-md rounded-3xl p-4 border border-[var(--primary)]/5 shadow-sm">
                <ul className="space-y-1">
                    {menuItems.map((item) => (
                        <li key={item.label}>
                            <Link
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${item.active
                                        ? "bg-[var(--primary)] text-white shadow-md shadow-[var(--primary)]/20"
                                        : "text-[var(--text-secondary)] hover:bg-[var(--primary)]/5 hover:text-[var(--primary)]"
                                    }`}
                                style={item.active ? { color: 'white', backgroundColor: 'var(--primary)' } : {}}
                            >
                                <item.icon className={`w-5 h-5 ${item.active ? "text-white" : ""}`} style={item.active ? { color: 'white' } : {}} />
                                <span className={`font-medium ${item.active ? "text-white" : ""}`} style={item.active ? { color: 'white' } : {}}>{item.label}</span>
                            </Link>
                        </li>
                    ))}

                    <div className="my-2 border-t border-[var(--primary)]/5"></div>

                    <li>
                        <Link
                            href="/profile/settings"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--primary)]/5 hover:text-[var(--primary)] transition-all"
                        >
                            <Settings className="w-5 h-5" />
                            <span className="font-medium">Settings</span>
                        </Link>
                    </li>

                    <li>
                        <button
                            onClick={() => signOut()}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-medium"
                        >
                            <LogOut className="w-5 h-5" />
                            <span>Sign Out</span>
                        </button>
                    </li>
                </ul>
            </nav>

            {/* Admin Link */}
            {isAdmin && (
                <div
                    onClick={() => router.push('/admin')}
                    className="cursor-pointer bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] rounded-3xl p-6 text-white shadow-lg relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="relative z-10 flex items-center gap-3 mb-2">
                        <Shield className="w-5 h-5 text-[var(--gold)]" />
                        <span className="text-xs font-bold uppercase tracking-wider text-[var(--gold)]">Admin Access</span>
                    </div>
                    {/* Explicit white color style to override any global/theme issues */}
                    <h3 className="font-heading font-bold text-lg text-white" style={{ color: '#ffffff' }}>Store Dashboard</h3>
                </div>
            )}
        </div>
    );
}
