"use client";

import { useState, useEffect } from "react";
import { Package, ChevronRight, Search, Clock, CheckCircle2, Truck, XCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface Order {
    id: string;
    created_at: string;
    amount: number;
    status: string;
    items: any[];
    shipping_address: any;
}

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
    const [searchQuery, setSearchQuery] = useState("");

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

    const filteredOrders = orders.filter(order => 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (loading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary)]" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-3xl font-bold text-[var(--primary)]" style={{ fontFamily: "var(--font-peachi)" }}>My Orders</h1>
                
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search orders..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-[var(--primary)]/10 outline-none text-sm shadow-sm"
                    />
                </div>
            </div>

            {filteredOrders.length === 0 ? (
                <div className="bg-white rounded-[2.5rem] p-12 text-center flex flex-col items-center justify-center min-h-[400px] border border-gray-100 shadow-sm">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                        <Package className="w-10 h-10 text-gray-300" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No orders found</h3>
                    <p className="text-gray-500 max-w-sm mx-auto mb-8 text-sm">
                        {searchQuery ? "No orders match your search criteria." : "You haven't placed any orders yet. Start your journey with our premium collection."}
                    </p>
                    {!searchQuery && (
                        <button
                            onClick={() => router.push('/shop')}
                            className="btn-primary px-10 py-3 shadow-lg shadow-[var(--primary)]/20"
                        >
                            Start Shopping
                        </button>
                    )}
                </div>
            ) : (
                <div className="space-y-6">
                    {filteredOrders.map((order) => (
                        <div 
                            key={order.id} 
                            className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                        >
                            {/* Order Header */}
                            <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
                                <div className="flex gap-6">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Order Placed</p>
                                        <p className="text-sm font-semibold text-gray-900">{new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Total</p>
                                        <p className="text-sm font-bold text-[var(--primary)]">₹{order.amount}</p>
                                    </div>
                                    <div className="hidden sm:block">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Ship To</p>
                                        <p className="text-sm font-semibold text-gray-900 truncate max-w-[150px]">{order.shipping_address.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusColors[order.status] || "bg-gray-100"}`}>
                                        {order.status}
                                    </div>
                                    <p className="text-xs font-mono text-gray-400">#{order.id.slice(0, 8)}</p>
                                </div>
                            </div>

                            {/* Order Content */}
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
                                    <div className="flex-1 space-y-4">
                                        {order.items.map((item: any, idx: number) => (
                                            <div key={idx} className="flex gap-4">
                                                <div className="w-20 h-20 rounded-2xl bg-gray-50 flex-shrink-0 relative border border-gray-100 overflow-hidden">
                                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-bold text-gray-900 mb-1 truncate">{item.name}</p>
                                                    <p className="text-xs text-gray-500 mb-2">Qty: {item.quantity}</p>
                                                    <button className="text-xs font-bold text-[var(--highlight)] hover:underline">Buy it again</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="w-full md:w-auto flex flex-col gap-3 pt-4 md:pt-0">
                                        <button className="btn-primary py-2.5 px-6 text-sm">Track Package</button>
                                        <Link 
                                            href={`/profile/orders/${order.id}`}
                                            className="w-full text-center py-2.5 px-6 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
