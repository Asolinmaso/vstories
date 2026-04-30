"use client";

import { Bell, Lock, User, Globe, Moon, Check, Save } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-heading font-bold text-[var(--primary)]">Account Settings</h1>

            <div className="bg-white rounded-3xl border border-[var(--primary)]/5 shadow-sm overflow-hidden divide-y divide-gray-100">
                {/* Profile Details */}
                <div className="p-6 md:p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-gray-900">Profile Information</h3>
                            <p className="text-sm text-gray-500">Update your photo and personal details</p>
                        </div>
                    </div>
                    <form className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Full Name</label>
                            <input type="text" defaultValue="User" className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[var(--primary)] outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Email Address</label>
                            <input type="email" defaultValue="user@example.com" disabled className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-500" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Phone Number</label>
                            <input type="tel" placeholder="+91" className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[var(--primary)] outline-none" />
                        </div>
                        <div className="flex items-end">
                            <button className="group relative overflow-hidden bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-[var(--primary)]/30 hover:shadow-[var(--primary)]/50 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex items-center gap-2 w-full md:w-auto justify-center">
                                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                                <Check className="w-5 h-5 relative z-10" />
                                <span className="relative z-10 tracking-wide">Save Changes</span>
                            </button>
                        </div>
                    </form>
                </div>

                {/* Notifications */}
                <div className="p-6 md:p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center">
                            <Bell className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-gray-900">Notifications</h3>
                            <p className="text-sm text-gray-500">Manage your email and push notifications</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-900">Order Updates</p>
                                <p className="text-sm text-gray-500">Get text messages about your order status</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
                            </label>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-900">Promotions and Offers</p>
                                <p className="text-sm text-gray-500">Receive emails about new products and sales</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
