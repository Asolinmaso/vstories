"use client";

import { useAuth } from "@/context/AuthContext";
import {
    User,
    ShoppingBag,
    MapPin,
    Settings,
    LogOut,
    Shield,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const menuItems = [
    { icon: User, label: "My Profile", href: "/profile" },
    { icon: ShoppingBag, label: "My Orders", href: "/profile/orders" },
    { icon: MapPin, label: "Addresses", href: "/profile/addresses" },
    { icon: Settings, label: "Settings", href: "/profile/settings" },
];

function isActive(pathname: string, href: string) {
    if (href === "/profile") return pathname === "/profile";
    return pathname.startsWith(href);
}

export default function Sidebar() {
    const { signOut, isAdmin } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className="flex flex-col gap-4">
            <nav className="rounded-[24px] bg-[#1D3B29] p-6">
                <ul className="flex flex-col gap-4">
                    {menuItems.map((item) => {
                        const active = isActive(pathname, item.href);
                        return (
                            <li key={item.label}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-4 rounded-[16px] px-6 py-3 font-inter text-base transition-colors ${
                                        active
                                            ? "bg-white font-semibold text-[#1D3B29]"
                                            : "font-normal text-[#F4F0EC] hover:bg-white/10"
                                    }`}
                                >
                                    <item.icon
                                        className={`h-5 w-5 shrink-0 ${
                                            active ? "text-[#1D3B29]" : "text-[#F4F0EC]"
                                        }`}
                                        strokeWidth={1.5}
                                    />
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        );
                    })}

                    <li>
                        <button
                            type="button"
                            onClick={() => signOut()}
                            className="flex w-full items-center gap-4 rounded-[16px] px-6 py-3 font-inter text-base font-normal text-[#F4F0EC] transition-colors hover:bg-white/10"
                        >
                            <LogOut className="h-5 w-5 shrink-0 text-[#F7EDE2]" strokeWidth={1.5} />
                            <span>Sign Out</span>
                        </button>
                    </li>
                </ul>
            </nav>

            {isAdmin && (
                <button
                    type="button"
                    onClick={() => router.push("/admin")}
                    className="w-full rounded-[16px] border border-[#E8BF72]/30 bg-[#1D3B29] p-4 text-left text-[#F7EDE2] transition-opacity hover:opacity-90"
                >
                    <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#E8BF72]">
                        <Shield className="h-4 w-4" />
                        Admin Access
                    </div>
                    <span className="font-playfair text-lg font-semibold">Store Dashboard</span>
                </button>
            )}
        </div>
    );
}
