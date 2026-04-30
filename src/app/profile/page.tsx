"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import StatCards from "@/components/profile/StatCards";
import RecentOrders from "@/components/profile/RecentOrders";
import Sidebar from "@/components/profile/Sidebar"; // Import Sidebar for mobile view if needed

export default function ProfilePage() {
    const { profile } = useAuth();
    const router = useRouter();

    // Greeting logic
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

    return (
        <div className="space-y-8">
            {/* Mobile Sidebar - Only visible on small screens */}
            <div className="lg:hidden mb-8">
                <Sidebar />
            </div>

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <p className="text-[var(--text-muted)] font-medium mb-1">{greeting},</p>
                    <h1 className="text-3xl md:text-4xl font-heading font-bold text-[var(--primary)]">
                        {profile?.full_name?.split(' ')[0] || "User"}
                    </h1>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-sm text-[var(--text-muted)]">Member since {new Date().getFullYear()}</p>
                </div>
            </div>

            {/* Stats Row */}
            <StatCards />

            {/* Middle Row: Orders */}
            <div className="w-full">
                <RecentOrders />
            </div>

            {/* Trust / Promo Banner */}
            <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-3xl p-8 relative overflow-hidden shadow-2xl shadow-[var(--primary)]/20 dark-section">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="relative z-10 text-white max-w-xl">
                    {/* Inline styles to guarantee visibility */}
                    <h3 className="text-xl font-bold font-heading mb-2 text-white" style={{ color: '#ffffff' }}>Exclusive Member Benefits</h3>
                    <p className="text-white/90 mb-6" style={{ color: 'rgba(255,255,255,0.9)' }}>
                        You have unlocked free shipping on all orders over ₹999. Use code <span className="font-bold text-[var(--gold)]">VSTORY10</span> for 10% off your next purchase.
                    </p>
                    <button
                        onClick={() => router.push('/shop')}
                        className="px-6 py-2 bg-white text-[var(--primary)] rounded-full text-sm font-bold hover:bg-[var(--gold)] hover:text-white transition-colors"
                        style={{ backgroundColor: '#ffffff', color: '#1D3515' }}
                    >
                        Browse Premium Collection
                    </button>
                </div>
            </div>
        </div>
    );
}
