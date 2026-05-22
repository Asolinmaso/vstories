"use client";

import { useState, useEffect } from "react";
import { ShoppingBag, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface Order {
    id: string;
    created_at: string;
    amount: number;
    status: string;
    items: { name: string; image: string; quantity: number }[];
    shipping_address: { name: string };
}

const ACTIVE_STATUSES = ["pending", "processing", "shipped"];
const PAST_STATUSES = ["delivered", "cancelled"];

const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    processing: "bg-blue-100 text-blue-700 border-blue-200",
    shipped: "bg-purple-100 text-purple-700 border-purple-200",
    delivered: "bg-green-100 text-green-700 border-green-200",
    cancelled: "bg-red-100 text-red-700 border-red-200",
};

export default function MyOrdersPage() {
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"recent" | "past">("recent");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch("/api/user/orders");
            const data = await res.json();
            if (data.orders) {
                setOrders(data.orders);
            }
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredOrders = orders.filter((order) =>
        activeTab === "recent"
            ? ACTIVE_STATUSES.includes(order.status)
            : PAST_STATUSES.includes(order.status)
    );

    if (loading) {
        return (
            <div className="min-h-[287px] flex items-center justify-center rounded-[24px] border border-[#C6C6C6] bg-[#F4F0EC]">
                <Loader2 className="w-8 h-8 animate-spin text-[#1D3B29]" />
            </div>
        );
    }

    return (
        <div className="rounded-[24px] border border-[#C6C6C6] bg-[#F4F0EC] p-6">
            <div className="mb-6 flex gap-6 border-b border-[#2E2E2E]/20 pb-4">
                <button
                    type="button"
                    onClick={() => setActiveTab("recent")}
                    className={`font-inter text-base transition-colors ${
                        activeTab === "recent"
                            ? "font-semibold text-[#2E2E2E]"
                            : "font-normal text-[#2E2E2E]/60 hover:text-[#2E2E2E]"
                    }`}
                >
                    Recent Orders
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab("past")}
                    className={`font-inter text-base transition-colors ${
                        activeTab === "past"
                            ? "font-semibold text-[#2E2E2E]"
                            : "font-normal text-[#2E2E2E]/60 hover:text-[#2E2E2E]"
                    }`}
                >
                    Past Orders
                </button>
            </div>

            {filteredOrders.length === 0 ? (
                <div className="rounded-[24px] bg-white px-6 py-12 text-center flex flex-col items-center justify-center min-h-[220px]">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F4F0EC]">
                        <ShoppingBag className="h-8 w-8 text-[#1D3B29]" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-inter text-lg font-semibold text-[#2E2E2E] mb-2">
                        {activeTab === "recent" ? "No Active Orders" : "No Past Orders"}
                    </h3>
                    <p className="font-inter text-sm text-[#2E2E2E]/70 max-w-sm mx-auto mb-6">
                        {activeTab === "recent"
                            ? "You don't have any orders in progress. Start shopping to see your orders here."
                            : "Your completed and cancelled orders will appear here."}
                    </p>
                    {activeTab === "recent" && (
                        <button
                            type="button"
                            onClick={() => router.push("/shop")}
                            className="rounded-[8px] bg-[#1D3B29] px-6 py-3 font-inter text-base font-medium text-[#F7EDE2] hover:bg-[#2A4F38] transition-colors"
                        >
                            Start Shopping
                        </button>
                    )}
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredOrders.map((order) => (
                        <div
                            key={order.id}
                            className="rounded-[24px] bg-white border border-[#C6C6C6]/40 overflow-hidden"
                        >
                            <div className="bg-[#FCFAF4] px-5 py-4 border-b border-[#C6C6C6]/40 flex flex-wrap items-center justify-between gap-3">
                                <div className="flex flex-wrap gap-5">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#2E2E2E]/50 mb-0.5">
                                            Order Placed
                                        </p>
                                        <p className="text-sm font-semibold text-[#2E2E2E]">
                                            {new Date(order.created_at).toLocaleDateString("en-IN", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#2E2E2E]/50 mb-0.5">
                                            Total
                                        </p>
                                        <p className="text-sm font-bold text-[#1D3B29]">₹{order.amount}</p>
                                    </div>
                                </div>
                                <div
                                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                                        statusColors[order.status] || "bg-gray-100"
                                    }`}
                                >
                                    {order.status}
                                </div>
                            </div>

                            <div className="p-5">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex gap-4 mb-4 last:mb-0">
                                        <div className="relative h-16 w-16 shrink-0 rounded-xl bg-[#F4F0EC] overflow-hidden border border-[#C6C6C6]/40">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="font-inter font-semibold text-[#2E2E2E] truncate">
                                                {item.name}
                                            </p>
                                            <p className="font-inter text-xs text-[#2E2E2E]/60">
                                                Qty: {item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                <Link
                                    href={`/profile/orders/${order.id}`}
                                    className="mt-4 inline-flex rounded-[8px] border border-[#C6C6C6] px-5 py-2.5 font-inter text-sm font-medium text-[#2E2E2E] hover:bg-[#FCFAF4] transition-colors"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
