"use client";

import { useState, useEffect } from "react";
import { MapPin, Plus, Home, Briefcase, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Address {
    id: string;
    name: string;
    phone: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    state: string;
    pincode: string;
    label: string;
}

interface AddressSelectionProps {
    onSelect: (address: Address) => void;
    selectedId?: string;
}

export default function AddressSelection({ onSelect, selectedId }: AddressSelectionProps) {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState(true);
    const [showNewForm, setShowNewForm] = useState(false);
    const [saving, setSaving] = useState(false);

    const [newAddress, setNewAddress] = useState({
        name: "",
        phone: "",
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        pincode: "",
        label: "Home",
    });

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            const res = await fetch("/api/user/addresses");
            const data = await res.json();
            if (data.addresses) {
                setAddresses(data.addresses);
                if (data.addresses.length > 0 && !selectedId) {
                    onSelect(data.addresses[0]);
                }
            }
        } catch (error) {
            console.error("Failed to fetch addresses:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveAddress = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch("/api/user/addresses", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newAddress),
            });
            const data = await res.json();
            if (data.success) {
                await fetchAddresses();
                setShowNewForm(false);
                setNewAddress({
                    name: "",
                    phone: "",
                    address_line1: "",
                    address_line2: "",
                    city: "",
                    state: "",
                    pincode: "",
                    label: "Home",
                });
            }
        } catch (error) {
            console.error("Failed to save address:", error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-10">
                <Loader2 className="w-6 h-6 animate-spin text-[var(--primary)]" />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((address) => (
                    <button
                        key={address.id}
                        onClick={() => onSelect(address)}
                        className={`text-left p-4 rounded-xl border-2 transition-all relative group ${
                            selectedId === address.id
                                ? "border-[var(--primary)] bg-[var(--primary)]/5"
                                : "border-gray-100 bg-white hover:border-[var(--primary)]/30"
                        }`}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            {address.label === "Home" ? (
                                <Home className="w-4 h-4 text-[var(--primary)]" />
                            ) : (
                                <Briefcase className="w-4 h-4 text-[var(--primary)]" />
                            )}
                            <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
                                {address.label}
                            </span>
                        </div>
                        <p className="font-semibold text-gray-900 mb-1">{address.name}</p>
                        <p className="text-sm text-gray-600 line-clamp-2">
                            {address.address_line1}, {address.city}
                        </p>
                        <p className="text-sm text-gray-600">{address.pincode}</p>
                        <p className="text-sm font-medium mt-2">{address.phone}</p>

                        {selectedId === address.id && (
                            <div className="absolute top-4 right-4">
                                <CheckCircle2 className="w-5 h-5 text-[var(--primary)]" />
                            </div>
                        )}
                    </button>
                ))}

                <button
                    onClick={() => setShowNewForm(true)}
                    className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 hover:border-[var(--primary)]/30 hover:bg-white transition-all min-h-[140px]"
                >
                    <Plus className="w-6 h-6 text-gray-400 mb-2" />
                    <span className="text-sm font-medium text-gray-600">Add New Address</span>
                </button>
            </div>

            <AnimatePresence>
                {showNewForm && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mt-6"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-[var(--primary)]">New Address</h3>
                            <button
                                onClick={() => setShowNewForm(false)}
                                className="text-sm text-gray-500 hover:text-red-500"
                            >
                                Cancel
                            </button>
                        </div>

                        <form onSubmit={handleSaveAddress} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={newAddress.name}
                                        onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-[var(--primary)]/20 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Phone</label>
                                    <input
                                        type="tel"
                                        required
                                        value={newAddress.phone}
                                        onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-[var(--primary)]/20 outline-none"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Address</label>
                                    <input
                                        type="text"
                                        required
                                        value={newAddress.address_line1}
                                        onChange={(e) => setNewAddress({ ...newAddress, address_line1: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-[var(--primary)]/20 outline-none"
                                        placeholder="House No, Building, Street"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">City</label>
                                    <input
                                        type="text"
                                        required
                                        value={newAddress.city}
                                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-[var(--primary)]/20 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Pincode</label>
                                    <input
                                        type="text"
                                        required
                                        value={newAddress.pincode}
                                        onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-[var(--primary)]/20 outline-none"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3">
                                {["Home", "Office"].map((label) => (
                                    <button
                                        key={label}
                                        type="button"
                                        onClick={() => setNewAddress({ ...newAddress, label })}
                                        className={`px-6 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                                            newAddress.label === label
                                                ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                                                : "border-gray-100 text-gray-600 hover:border-gray-300"
                                        }`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>

                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full btn-primary py-3 flex items-center justify-center gap-2"
                            >
                                {saving ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    "Save Address"
                                )}
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
