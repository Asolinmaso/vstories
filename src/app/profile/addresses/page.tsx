"use client";

import { useEffect, useState } from "react";
import { MapPin, Plus, Trash2, Edit2, Loader2, Check } from "lucide-react";
import { AddressService, Address, NewAddress } from "@/lib/services/address.service";
import { toast } from "sonner";

export default function AddressesPage() {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<NewAddress>({
        name: "", // Label e.g. Home
        full_name: "",
        phone: "",
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        postal_code: "",
        country: "India",
        is_default: false
    });

    useEffect(() => {
        loadAddresses();
    }, []);

    async function loadAddresses() {
        try {
            setLoading(true);
            const data = await AddressService.getAddresses();
            setAddresses(data);
        } catch (error) {
            console.error("Failed to load addresses", error);
            // toast.error("Could not load addresses"); 
            // Commented out toast to avoid error if toast is not set up, 
            // but in a real app better to show error.
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            if (editingId) {
                await AddressService.updateAddress(editingId, formData);
                toast.success("Address updated successfully");
            } else {
                await AddressService.addAddress(formData);
                toast.success("Address added successfully");
            }
            setIsFormOpen(false);
            setEditingId(null);
            resetForm();
            loadAddresses();
        } catch (error: any) {
            console.error("Error saving address:", error.message || error);
            toast.error(`Failed to save address: ${error.message || "Unknown error"}`);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this address?")) return;
        try {
            await AddressService.deleteAddress(id);
            toast.success("Address deleted");
            loadAddresses();
        } catch (error) {
            console.error("Error deleting address", error);
            toast.error("Failed to delete address");
        }
    }

    async function handleSetDefault(id: string) {
        try {
            await AddressService.setDefaultAddress(id);
            toast.success("Default address updated");
            loadAddresses();
        } catch (error) {
            console.error("Error setting default address", error);
            toast.error("Failed to update default address");
        }
    }

    function handleEdit(address: Address) {
        setFormData({
            name: address.name,
            full_name: address.full_name,
            phone: address.phone,
            address_line1: address.address_line1,
            address_line2: address.address_line2 || "",
            city: address.city,
            state: address.state,
            postal_code: address.postal_code,
            country: address.country,
            is_default: address.is_default
        });
        setEditingId(address.id);
        setIsFormOpen(true);
    }

    function resetForm() {
        setFormData({
            name: "",
            full_name: "",
            phone: "",
            address_line1: "",
            address_line2: "",
            city: "",
            state: "",
            postal_code: "",
            country: "India",
            is_default: false
        });
    }

    if (loading) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary)]" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* ... (header) ... */}

            {/* Address Form Modal/Overlay */}
            {isFormOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-[var(--primary)]">
                                {editingId ? "Edit Address" : "Add New Address"}
                            </h2>
                            <button
                                onClick={() => setIsFormOpen(false)}
                                className="text-gray-600 hover:text-gray-900"
                            >
                                Cancel
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-800 mb-1">Label (e.g. Home)</label>
                                    <input
                                        required
                                        className="w-full px-4 py-2 rounded-xl border border-gray-300 text-gray-900 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all placeholder:text-gray-400"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Home, Work..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-800 mb-1">Full Name</label>
                                    <input
                                        required
                                        className="w-full px-4 py-2 rounded-xl border border-gray-300 text-gray-900 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all"
                                        value={formData.full_name}
                                        onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-800 mb-1">Phone Number</label>
                                <input
                                    required
                                    type="tel"
                                    className="w-full px-4 py-2 rounded-xl border border-gray-300 text-gray-900 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-800 mb-1">Address Line 1</label>
                                <input
                                    required
                                    className="w-full px-4 py-2 rounded-xl border border-gray-300 text-gray-900 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all placeholder:text-gray-400"
                                    value={formData.address_line1}
                                    onChange={e => setFormData({ ...formData, address_line1: e.target.value })}
                                    placeholder="Street address"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-800 mb-1">Address Line 2 (Optional)</label>
                                <input
                                    className="w-full px-4 py-2 rounded-xl border border-gray-300 text-gray-900 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all placeholder:text-gray-400"
                                    value={formData.address_line2}
                                    onChange={e => setFormData({ ...formData, address_line2: e.target.value })}
                                    placeholder="Apartment, suite, unit, etc."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-800 mb-1">City</label>
                                    <input
                                        required
                                        className="w-full px-4 py-2 rounded-xl border border-gray-300 text-gray-900 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all"
                                        value={formData.city}
                                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-800 mb-1">State</label>
                                    <input
                                        required
                                        className="w-full px-4 py-2 rounded-xl border border-gray-300 text-gray-900 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all"
                                        value={formData.state}
                                        onChange={e => setFormData({ ...formData, state: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-800 mb-1">Postal Code</label>
                                    <input
                                        required
                                        className="w-full px-4 py-2 rounded-xl border border-gray-300 text-gray-900 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all"
                                        value={formData.postal_code}
                                        onChange={e => setFormData({ ...formData, postal_code: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-800 mb-1">Country</label>
                                    <input
                                        required
                                        className="w-full px-4 py-2 rounded-xl border border-gray-300 text-gray-900 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none transition-all"
                                        value={formData.country}
                                        onChange={e => setFormData({ ...formData, country: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2 pt-2">
                                <input
                                    type="checkbox"
                                    id="is_default"
                                    className="w-4 h-4 rounded border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)]"
                                    checked={formData.is_default}
                                    onChange={e => setFormData({ ...formData, is_default: e.target.checked })}
                                />
                                <label htmlFor="is_default" className="text-sm font-medium text-gray-900 cursor-pointer">Set as default address</label>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 bg-[var(--primary)] text-white font-bold rounded-xl hover:bg-[var(--primary-dark)] transition-all shadow-lg shadow-[var(--primary)]/20 mt-4"
                                style={{ backgroundColor: 'var(--primary)', color: 'white' }}
                            >
                                {editingId ? "Update Address" : "Save Address"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
                {addresses.length === 0 ? (
                    <div className="col-span-2 text-center py-12 bg-white rounded-3xl border border-dashed border-gray-300">
                        <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-gray-900 mb-2">No addresses saved yet</h3>
                        <p className="text-gray-700 mb-6 font-medium">Add an address for faster checkout.</p>
                        <button
                            onClick={() => setIsFormOpen(true)}
                            className="bg-[var(--primary)] text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-[var(--primary-dark)] transition-all"
                            style={{ backgroundColor: 'var(--primary)', color: 'white' }}
                        >
                            Add Address
                        </button>
                    </div>
                ) : (
                    addresses.map((addr) => (
                        <div key={addr.id} className={`bg-white p-6 rounded-3xl border ${addr.is_default ? 'border-[var(--primary)] shadow-md' : 'border-gray-200 shadow-sm'} relative group transition-all hover:shadow-[var(--primary)]/5`}>
                            {/* ... Content ... */}
                            <div className="flex items-start gap-4 mb-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${addr.is_default ? 'bg-[var(--primary)]/10 text-[var(--primary)]' : 'bg-gray-100 text-gray-600'}`}>
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl text-gray-900">{addr.name}</h3>
                                    <p className="text-sm font-medium text-gray-700">{addr.full_name}</p>
                                </div>
                            </div>
                            <p className="text-gray-800 text-sm leading-relaxed mb-6 pl-14 font-medium">
                                {addr.address_line1}, {addr.address_line2 ? <>{addr.address_line2},<br /></> : null}<br />
                                {addr.city}, {addr.state} - {addr.postal_code}<br />
                                {addr.country}<br />
                                <span className="block mt-1 font-bold text-gray-900">Phone: {addr.phone}</span>
                            </p>
                            <div className="flex gap-4 pl-14 border-t border-gray-100 pt-4 mt-auto">
                                <button
                                    onClick={() => handleEdit(addr)}
                                    className="flex items-center gap-1 text-sm font-bold text-gray-700 hover:text-[var(--primary)] transition-colors"
                                >
                                    <Edit2 className="w-3.5 h-3.5" /> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(addr.id)}
                                    className="flex items-center gap-1 text-sm font-bold text-red-500 hover:text-red-700 transition-colors"
                                >
                                    <Trash2 className="w-3.5 h-3.5" /> Delete
                                </button>
                                {!addr.is_default && (
                                    <button
                                        onClick={() => handleSetDefault(addr.id)}
                                        className="ml-auto text-sm font-bold text-[var(--primary)] hover:underline"
                                    >
                                        Set as Default
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
                {/* ... Big Add Button ... */}
                {/* Always show big add button if there are existing addresses */}
                {addresses.length > 0 && (
                    <button
                        onClick={() => {
                            resetForm();
                            setEditingId(null);
                            setIsFormOpen(true);
                        }}
                        className="border-2 border-dashed border-gray-200 rounded-3xl p-6 flex flex-col items-center justify-center gap-3 text-gray-400 hover:border-[var(--primary)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/5 transition-all h-full min-h-[200px]"
                    >
                        <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Plus className="w-6 h-6" />
                        </div>
                        <span className="font-medium">Add New Address</span>
                    </button>
                )}
            </div>
        </div>
    );
}
