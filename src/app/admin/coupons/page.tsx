"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";
import { Plus, Trash2, Tag, Copy } from "lucide-react";

interface Coupon {
    code: string;
    discount_percentage: number;
    usage_limit: number;
    used_count: number;
    valid_until: string;
}

export default function AdminCouponsPage() {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState({
        code: "",
        discount_percentage: 10,
        usage_limit: 100,
        valid_until: "",
    });

    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("coupons")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching coupons:", error);
        } else {
            setCoupons(data || []);
        }
        setLoading(false);
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { error } = await supabase.from("coupons").insert({
                ...formData,
                code: formData.code.toUpperCase(),
            });

            if (error) throw error;

            setShowForm(false);
            setFormData({
                code: "",
                discount_percentage: 10,
                usage_limit: 100,
                valid_until: "",
            });
            fetchCoupons();
        } catch (error: any) {
            alert(error.message);
        }
    };

    const handleDelete = async (code: string) => {
        if (!confirm("Delete this coupon?")) return;
        const { error } = await supabase.from("coupons").delete().eq("code", code);
        if (!error) {
            setCoupons(coupons.filter(c => c.code !== code));
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-[var(--primary)]">Coupons</h1>
                    <p className="text-gray-500 mt-1">Manage discount codes</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    <span>Create Coupon</span>
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 animate-fade-in">
                    <h3 className="font-semibold text-lg mb-4">New Coupon</h3>
                    <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 uppercase"
                                placeholder="SUMMER25"
                                value={formData.code}
                                onChange={e => setFormData({ ...formData, code: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                            <input
                                type="number"
                                required
                                min="1" max="100"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200"
                                value={formData.discount_percentage}
                                onChange={e => setFormData({ ...formData, discount_percentage: parseInt(e.target.value) })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Usage Limit</label>
                            <input
                                type="number"
                                required
                                min="1"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200"
                                value={formData.usage_limit}
                                onChange={e => setFormData({ ...formData, usage_limit: parseInt(e.target.value) })}
                            />
                        </div>
                        <button type="submit" className="btn-primary w-full py-2">Save Coupon</button>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coupons.length === 0 && !loading && (
                    <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-xl border border-dashed border-gray-200">
                        No active coupons found.
                    </div>
                )}

                {coupons.map((coupon) => (
                    <div key={coupon.code} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2">
                                <Tag className="w-5 h-5 text-[var(--highlight)]" />
                                <span className="font-bold text-lg text-gray-800">{coupon.code}</span>
                            </div>
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">
                                {coupon.discount_percentage}% OFF
                            </span>
                        </div>

                        <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex justify-between">
                                <span>Used:</span>
                                <span className="font-medium">{coupon.used_count} / {coupon.usage_limit}</span>
                            </div>
                            {/* Add progress bar */}
                            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                <div
                                    className="bg-[var(--primary)] h-full"
                                    style={{ width: `${Math.min((coupon.used_count / coupon.usage_limit) * 100, 100)}%` }}
                                ></div>
                            </div>
                        </div>

                        <button
                            onClick={() => handleDelete(coupon.code)}
                            className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
