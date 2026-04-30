"use client";

import { Package, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RecentOrders() {
    const router = useRouter();
    // Assuming empty orders for now
    const orders: any[] = [];

    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-[var(--primary)]/5">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-heading font-bold text-[var(--primary)]">Recent Orders</h3>
                {orders.length > 0 && (
                    <button onClick={() => router.push('/profile/orders')} className="text-sm font-medium text-[var(--highlight)] hover:underline flex items-center gap-1">
                        View All <ChevronRight className="w-4 h-4" />
                    </button>
                )}
            </div>

            {orders.length === 0 ? (
                <div className="text-center py-12 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                        <Package className="w-8 h-8 text-gray-300" />
                    </div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">No active orders</h4>
                    <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                        Your herbal journey begins here. Discover our premium collection.
                    </p>
                    <button
                        onClick={() => router.push('/shop')}
                        className="px-6 py-2.5 bg-[#1D3515] text-white rounded-full font-medium hover:bg-[#162810] transition-colors shadow-lg"
                        style={{ backgroundColor: '#1D3515', color: '#ffffff' }}
                    >
                        Start Shopping
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {/* Render Order Cards here when data exists */}
                    <p>Orders will list here</p>
                </div>
            )}
        </div>
    );
}
