"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";
import { Package, Users, ShoppingCart, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        products: 0,
        users: 0,
        orders: 0,
        revenue: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [
                    { count: productCount },
                    { count: userCount },
                    { count: orderCount },
                ] = await Promise.all([
                    supabase.from("products").select("*", { count: 'exact', head: true }),
                    supabase.from("profiles").select("*", { count: 'exact', head: true }),
                    supabase.from("orders").select("*", { count: 'exact', head: true }),
                ]);

                // Calculate revenue
                const { data: revenueData } = await supabase
                    .from("orders")
                    .select("total_amount")
                    .eq("status", "completed");

                const totalRevenue = revenueData?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;

                setStats({
                    products: productCount || 0,
                    users: userCount || 0,
                    orders: orderCount || 0,
                    revenue: totalRevenue,
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        { label: "Total Products", value: stats.products, icon: Package, color: "from-blue-500 to-blue-600", bg: "bg-blue-50" },
        { label: "Total Users", value: stats.users, icon: Users, color: "from-green-500 to-green-600", bg: "bg-green-50" },
        { label: "Total Orders", value: stats.orders, icon: ShoppingCart, color: "from-purple-500 to-purple-600", bg: "bg-purple-50" },
        { label: "Total Revenue", value: `₹${stats.revenue}`, icon: TrendingUp, color: "from-orange-500 to-orange-600", bg: "bg-orange-50" },
    ];

    return (
        <div className="pb-20">
            <h1 className="text-3xl font-heading font-bold text-[var(--primary)] mb-2">Dashboard Overview</h1>
            <p className="text-gray-500 mb-8">Welcome back, Admin. Here's what's happening with your store today.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {statCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div>
                                <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">{stat.label}</p>
                                {loading ? (
                                    <div className="h-8 w-24 bg-gray-100 animate-pulse rounded-lg"></div>
                                ) : (
                                    <h2 className="text-3xl font-bold text-gray-800 tracking-tight">{stat.value}</h2>
                                )}
                            </div>
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg shadow-${stat.color.split('-')[1]}-200`}>
                                <Icon className="w-6 h-6" />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
                <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-800">Recent Activity</h3>
                    <button className="text-sm font-medium text-[var(--primary)] hover:underline">View All</button>
                </div>

                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                        <TrendingUp className="w-8 h-8 text-gray-300" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Order Analytics Coming Soon</h3>
                    <p className="text-gray-500 max-w-sm mx-auto">
                        Once customers start placing orders, you'll see detailed analytics and recent sales here.
                    </p>
                </div>
            </div>
        </div>
    );
}
