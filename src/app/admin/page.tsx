"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Package, Users, ShoppingCart, TrendingUp, RefreshCw, AlertTriangle } from "lucide-react";

interface Stats {
    products: number;
    users: number;
    orders: number;
    pendingOrders: number;
    revenue: number;
    recentOrders: { id: string; amount: number; status: string; created_at: string; shipping_address: any }[];
    lowStock: { id: string; name: string; stock: number }[];
}

const statusStyle: Record<string, string> = {
    paid: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    failed: "bg-red-100 text-red-700",
    cancelled: "bg-gray-100 text-gray-600",
    refunded: "bg-blue-100 text-blue-700",
};

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const load = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/admin/stats", { cache: "no-store" });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error || "Failed to load stats");
            setStats(json);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        load();
        const t = setInterval(load, 30000); // live refresh
        return () => clearInterval(t);
    }, [load]);

    const statCards = [
        { label: "Total Products", value: stats?.products ?? 0, icon: Package, color: "from-blue-500 to-blue-600", href: "/admin/products" },
        { label: "Total Users", value: stats?.users ?? 0, icon: Users, color: "from-green-500 to-green-600", href: "/admin/users" },
        { label: "Total Orders", value: stats?.orders ?? 0, icon: ShoppingCart, color: "from-purple-500 to-purple-600", href: "/admin/orders" },
        { label: "Revenue (paid)", value: `₹${(stats?.revenue ?? 0).toLocaleString("en-IN")}`, icon: TrendingUp, color: "from-orange-500 to-orange-600", href: "/admin/orders" },
    ];

    return (
        <div className="pb-20">
            <div className="flex items-start justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-[var(--primary)] mb-2">Dashboard Overview</h1>
                    <p className="text-gray-500">
                        Live store data{stats && stats.pendingOrders > 0 ? ` · ${stats.pendingOrders} pending order${stats.pendingOrders > 1 ? "s" : ""}` : ""}.
                    </p>
                </div>
                <button onClick={load} className="p-2.5 rounded-xl bg-white border border-gray-200 hover:bg-gray-50" title="Refresh">
                    <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                </button>
            </div>

            {error && <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-700 text-sm">{error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {statCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Link key={stat.label} href={stat.href} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div>
                                <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">{stat.label}</p>
                                {loading && !stats ? (
                                    <div className="h-8 w-24 bg-gray-100 animate-pulse rounded-lg"></div>
                                ) : (
                                    <h2 className="text-3xl font-bold text-gray-800 tracking-tight">{stat.value}</h2>
                                )}
                            </div>
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}>
                                <Icon className="w-6 h-6" />
                            </div>
                        </Link>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="text-xl font-bold text-gray-800">Recent Orders</h3>
                        <Link href="/admin/orders" className="text-sm font-medium text-[var(--primary)] hover:underline">View All</Link>
                    </div>
                    {stats && stats.recentOrders.length === 0 ? (
                        <p className="p-10 text-center text-gray-500">No orders yet.</p>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {(stats?.recentOrders || []).map((o) => (
                                <div key={o.id} className="px-6 py-4 flex items-center justify-between gap-4">
                                    <div className="min-w-0">
                                        <p className="font-medium text-gray-900 truncate">{o.shipping_address?.name || o.shipping_address?.full_name || `#${o.id.slice(0, 8)}`}</p>
                                        <p className="text-xs text-gray-500">{new Date(o.created_at).toLocaleString()}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyle[o.status] || "bg-gray-100"}`}>{o.status}</span>
                                        <span className="font-semibold text-gray-800">₹{Number(o.amount).toLocaleString("en-IN")}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-orange-500" />
                        <h3 className="text-xl font-bold text-gray-800">Low Stock</h3>
                    </div>
                    {stats && stats.lowStock.length === 0 ? (
                        <p className="p-10 text-center text-gray-500">All products well stocked.</p>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {(stats?.lowStock || []).map((p) => (
                                <Link key={p.id} href={`/admin/products/${p.id}`} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                                    <span className="text-gray-800 truncate pr-3">{p.name}</span>
                                    <span className={`text-sm font-semibold ${p.stock === 0 ? "text-red-600" : "text-orange-600"}`}>{p.stock} left</span>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
