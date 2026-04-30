"use client";

import { Package, ChevronRight, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MyOrdersPage() {
    const router = useRouter();
    // Placeholder orders data
    const orders: any[] = [];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-heading font-bold text-[var(--primary)]">My Orders</h1>

            {/* Filter/Search Bar */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-[var(--primary)]/5 flex gap-4">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Search orders..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[var(--primary)]/20 outline-none text-sm"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
                <select className="px-4 py-2 rounded-xl bg-gray-50 border-none outline-none text-sm text-[var(--text-secondary)]">
                    <option>Last 3 months</option>
                    <option>2025</option>
                    <option>2024</option>
                </select>
            </div>

            {orders.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 shadow-sm border border-[var(--primary)]/5 text-center flex flex-col items-center justify-center min-h-[400px]">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                        <Package className="w-10 h-10 text-gray-300" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No orders found</h3>
                    <p className="text-gray-500 max-w-sm mx-auto mb-8">
                        You haven't placed any orders yet. Start your journey with our premium collection.
                    </p>
                    <button
                        onClick={() => router.push('/shop')}
                        className="bg-[#1D3515] text-white px-8 py-3 rounded-full font-medium hover:bg-[#162810] transition-all shadow-lg hover:shadow-xl"
                        style={{
                            backgroundColor: '#1D3515',
                            color: '#ffffff',
                            opacity: 1
                        }}
                    >
                        Start Shopping
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {/* Order List will go here */}
                    <p>Orders list...</p>
                </div>
            )}
        </div>
    );
}
