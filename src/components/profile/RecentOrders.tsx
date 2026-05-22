"use client";

import { useEffect, useState } from "react";
import { Package, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface Order {
    id: string;
    created_at: string;
    amount: number;
    status: string;
}

export default function RecentOrders() {
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/user/orders")
            .then((res) => res.json())
            .then((data) => setOrders((data.orders || []).slice(0, 3)))
            .catch(() => setOrders([]))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="rounded-xl border border-[#1D3B29]/10 bg-white p-6 sm:p-8 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <h3 className="font-playfair text-xl sm:text-2xl font-semibold text-[var(--primary)]">
                    Recent Orders
                </h3>
                {orders.length > 0 && (
                    <button
                        type="button"
                        onClick={() => router.push("/profile/orders")}
                        className="flex items-center gap-1 font-inter text-sm font-medium text-[var(--primary)] hover:underline"
                    >
                        View All <ChevronRight className="h-4 w-4" />
                    </button>
                )}
            </div>

            {loading ? (
                <div className="py-10 text-center font-inter text-sm text-[var(--text-muted)]">
                    Loading orders...
                </div>
            ) : orders.length === 0 ? (
                <div className="rounded-xl border border-dashed border-[#1D3B29]/15 bg-[#FCFAF4] py-10 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                        <Package className="h-7 w-7 text-[var(--primary)]/40" />
                    </div>
                    <h4 className="font-inter text-base font-medium text-[var(--text-primary)]">
                        No orders yet
                    </h4>
                    <p className="mx-auto mt-2 mb-6 max-w-sm font-inter text-sm text-[var(--text-muted)]">
                        Start exploring our herbal skincare and haircare collection.
                    </p>
                    <button
                        type="button"
                        onClick={() => router.push("/shop")}
                        className="rounded-lg px-6 py-2.5 font-inter text-sm font-medium transition-opacity hover:opacity-90"
                        style={{ backgroundColor: "#1D3B29", color: "#F7EDE2" }}
                    >
                        Shop Now
                    </button>
                </div>
            ) : (
                <div className="space-y-3">
                    {orders.map((order) => (
                        <button
                            key={order.id}
                            type="button"
                            onClick={() => router.push("/profile/orders")}
                            className="flex w-full items-center justify-between rounded-lg border border-[#1D3B29]/10 px-4 py-3 text-left transition-colors hover:bg-[#F3EEE9]"
                        >
                            <div>
                                <p className="font-inter text-sm font-medium text-[var(--text-primary)]">
                                    Order #{order.id.slice(0, 8)}
                                </p>
                                <p className="font-inter text-xs text-[var(--text-muted)] capitalize">
                                    {order.status}
                                </p>
                            </div>
                            <span className="font-inter text-sm font-semibold text-[var(--primary)]">
                                ₹{order.amount}
                            </span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
