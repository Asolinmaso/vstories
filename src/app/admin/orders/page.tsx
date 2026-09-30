"use client";

import { useEffect, useState, useCallback } from "react";
import { Search, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";

interface Order {
    id: string;
    user_id: string;
    razorpay_order_id: string;
    razorpay_payment_id: string | null;
    amount: number;
    status: string;
    items: any[];
    shipping_address: any;
    created_at: string;
}

const STATUSES = ["pending", "paid", "failed", "refunded", "cancelled"];

const statusStyle: Record<string, string> = {
    paid: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    failed: "bg-red-100 text-red-700",
    cancelled: "bg-gray-100 text-gray-600",
    refunded: "bg-blue-100 text-blue-700",
};

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [open, setOpen] = useState<string | null>(null);

    const load = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/admin/orders", { cache: "no-store" });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error);
            setOrders(json.orders || []);
        } catch (e: any) {
            setError(e.message || "Failed to load orders");
        }
        setLoading(false);
    }, []);

    useEffect(() => { load(); }, [load]);

    const updateStatus = async (id: string, status: string) => {
        const prev = orders;
        setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)));
        const res = await fetch("/api/admin/orders", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status }),
        });
        if (!res.ok) {
            setOrders(prev);
            const json = await res.json().catch(() => ({}));
            alert(json.error || "Failed to update order");
        }
    };

    const shown = orders.filter((o) => {
        if (filter !== "all" && o.status !== filter) return false;
        const q = search.toLowerCase();
        if (!q) return true;
        const a = o.shipping_address || {};
        return [o.id, o.razorpay_order_id, o.razorpay_payment_id, a.name, a.full_name, a.phone, a.email]
            .filter(Boolean).join(" ").toLowerCase().includes(q);
    });

    return (
        <div>
            <div className="flex justify-between items-start mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-[var(--primary)]">Orders</h1>
                    <p className="text-gray-500 mt-1">{orders.length} total orders</p>
                </div>
                <button onClick={load} className="p-2.5 rounded-xl bg-white border border-gray-200 hover:bg-gray-50" title="Refresh">
                    <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                </button>
            </div>

            {error && <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-700 text-sm">{error}</div>}

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 outline-none focus:border-primary"
                            placeholder="Search by order id, name, phone..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-4 py-2 rounded-lg border border-gray-200 bg-white">
                        <option value="all">All statuses</option>
                        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-600 font-medium text-sm">
                            <tr>
                                <th className="px-6 py-4">Order</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 w-10"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading && orders.length === 0 ? (
                                <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">Loading orders...</td></tr>
                            ) : shown.length === 0 ? (
                                <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">No orders found.</td></tr>
                            ) : shown.map((o) => {
                                const a = o.shipping_address || {};
                                const expanded = open === o.id;
                                return (
                                    <FragmentRow key={o.id}>
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-6 py-4 font-mono text-sm">#{o.id.slice(0, 8)}</td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-900">{a.name || a.full_name || "—"}</div>
                                                <div className="text-xs text-gray-500">{a.phone || a.email || ""}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">{new Date(o.created_at).toLocaleString()}</td>
                                            <td className="px-6 py-4 font-semibold">₹{Number(o.amount).toLocaleString("en-IN")}</td>
                                            <td className="px-6 py-4">
                                                <select
                                                    value={o.status}
                                                    onChange={(e) => updateStatus(o.id, e.target.value)}
                                                    className={`px-2.5 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${statusStyle[o.status] || "bg-gray-100"}`}
                                                >
                                                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                                                </select>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button onClick={() => setOpen(expanded ? null : o.id)} className="text-gray-400 hover:text-gray-700">
                                                    {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                                </button>
                                            </td>
                                        </tr>
                                        {expanded && (
                                            <tr className="bg-gray-50">
                                                <td colSpan={6} className="px-6 py-4 text-sm grid md:grid-cols-2 gap-6">
                                                    <div>
                                                        <p className="font-semibold mb-2">Items</p>
                                                        {(Array.isArray(o.items) ? o.items : []).map((it: any, i: number) => (
                                                            <p key={i} className="text-gray-700">
                                                                {it.quantity ?? 1} × {it.name || it.product_name || it.product_id || "Item"}{it.size ? ` (${it.size})` : ""}
                                                                {it.price != null ? ` — ₹${it.price}` : ""}
                                                            </p>
                                                        ))}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold mb-2">Shipping & payment</p>
                                                        <p className="text-gray-700">
                                                            {[a.address, a.address_line1, a.line1, a.city, a.state, a.pincode || a.zip].filter(Boolean).join(", ")}
                                                        </p>
                                                        <p className="text-gray-500 mt-2 text-xs">Razorpay order: {o.razorpay_order_id}</p>
                                                        {o.razorpay_payment_id && <p className="text-gray-500 text-xs">Payment: {o.razorpay_payment_id}</p>}
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </FragmentRow>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function FragmentRow({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
