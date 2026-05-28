"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import Image from "next/image";
import Link from "next/link";
import { Loader2, MapPin, Trash2, Pencil, Plus, X } from "lucide-react";

interface Address {
  id: string;
  label?: string;
  name?: string;
  full_name?: string;
  phone?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  is_default?: boolean;
}

const COUNTRY_CODES = [
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+1", country: "USA", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+971", country: "UAE", flag: "🇦🇪" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+65", country: "Singapore", flag: "🇸🇬" },
  { code: "+60", country: "Malaysia", flag: "🇲🇾" },
  { code: "+1", country: "Canada", flag: "🇨🇦" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+33", country: "France", flag: "🇫🇷" },
];

export default function ClientAddresses() {
  const { user, loading, signOut, isAdmin } = useAuth();
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addressLoading, setAddressLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState("+91");
  const [showCodeDropdown, setShowCodeDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    label: "Home",
    full_name: "",
    phone: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "India",
    is_default: false,
  });

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowCodeDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
  const joinYear = user?.created_at ? new Date(user.created_at).getFullYear() : "2026";

  useEffect(() => {
    if (!user) return;
    fetchAddresses();
  }, [user]);

  const fetchAddresses = async () => {
    setAddressLoading(true);
    try {
      const res = await fetch("/api/user/addresses");
      const data = await res.json();
      if (data.addresses) setAddresses(data.addresses);
    } catch (err) {
      console.error("Error fetching addresses:", err);
    } finally {
      setAddressLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const resetForm = () => {
    setFormData({
      label: "Home",
      full_name: "",
      phone: "",
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      postal_code: "",
      country: "India",
      is_default: false,
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (addr: Address) => {
    setFormData({
      label: addr.label || addr.name || "Home",
      full_name: addr.full_name || "",
      phone: addr.phone || "",
      address_line1: addr.address_line1 || "",
      address_line2: addr.address_line2 || "",
      city: addr.city || "",
      state: addr.state || "",
      postal_code: addr.postal_code || "",
      country: addr.country || "India",
      is_default: addr.is_default || false,
    });
    setEditingId(addr.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this address?")) return;
    try {
      await fetch(`/api/user/addresses?id=${id}`, { method: "DELETE" });
      setAddresses((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Error deleting address:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        const res = await fetch("/api/user/addresses", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingId, ...formData }),
        });
        const data = await res.json();
        if (data.address) {
          setAddresses((prev) => prev.map((a) => (a.id === editingId ? data.address : a)));
        }
      } else {
        const res = await fetch("/api/user/addresses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.address) {
          setAddresses((prev) => [data.address, ...prev]);
        }
      }
      resetForm();
    } catch (err) {
      console.error("Error saving address:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4EEE2]">
        <Loader2 className="w-8 h-8 animate-spin text-[#1D3B29]" />
      </div>
    );
  }

  const buildFullAddress = (addr: Address) => {
    const parts = [addr.address_line1, addr.address_line2, addr.city, addr.state, addr.country, addr.postal_code].filter(Boolean);
    return parts.join(", ") || "No address details";
  };

  return (
    <div className="min-h-screen bg-[#FCFAF4] py-12 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[100px]">
        {/* Header */}
        <div className="mb-10 lg:mb-12">
          <h1 className="font-playfair font-semibold text-[#2E2E2E] text-3xl md:text-4xl lg:text-[40px] leading-tight mb-2">
            Welcome {displayName}!
          </h1>
          <p className="font-inter text-[#2E2E2E] opacity-70 text-[14px]">
            Member Since {joinYear}
          </p>
        </div>

        {/* Layout Grid */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Sidebar */}
          <ProfileSidebar onSignOut={handleSignOut} isAdmin={isAdmin} />

          {/* Right Content */}
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            {/* Addresses Card */}
            <div className="bg-[#F4EEE2] rounded-[16px] p-6 lg:p-8 border border-black/5">
              {/* Title & Add Button */}
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <h2 className="font-inter font-bold text-[18px] md:text-[20px] text-[#2E2E2E]">Addresses</h2>
                {!showForm && addresses.length > 0 && (
                  <button
                    onClick={() => { resetForm(); setShowForm(true); }}
                    className="px-3.5 py-2 md:px-5 md:py-2.5 rounded-[6px] md:rounded-[8px] font-inter font-medium text-[11px] md:text-[13px] transition-colors hover:bg-[#2A4F38]"
                    style={{ backgroundColor: "#1D3B29", color: "#F7EDE2" }}
                  >
                    Add New Address
                  </button>
                )}
              </div>

              {/* Add/Edit Modal */}
              {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                  <div className="bg-[#F4EEE2] rounded-[24px] p-6 md:p-8 w-full max-w-[560px] relative shadow-xl max-h-[90vh] overflow-y-auto">
                    {/* Close */}
                    <button onClick={resetForm} className="absolute top-5 right-5 text-[#2E2E2E] hover:opacity-60 transition-opacity">
                      <X className="w-4 h-4 md:w-5 md:h-5" />
                    </button>

                    <h3 className="font-playfair font-semibold text-[20px] md:text-[26px] text-[#2E2E2E] mb-4 md:mb-6">
                      {editingId ? "Edit Address" : "Add Address"}
                    </h3>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-0">
                      {/* Row 1: Name + Phone */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 mb-3 md:mb-6">
                        <div className="border-b border-[#2E2E2E]/30 pb-1">
                          <input
                            type="text" name="full_name" value={formData.full_name}
                            onChange={handleChange} required placeholder="Name"
                            className="w-full bg-transparent font-inter text-[11px] md:text-[13px] text-[#2E2E2E] outline-none placeholder-[#2E2E2E]/60"
                          />
                        </div>
                        <div className="border-b border-[#2E2E2E]/30 pb-1 flex items-center gap-1">
                          {/* Country Code Dropdown */}
                          <div className="relative shrink-0" ref={dropdownRef}>
                            <button
                              type="button"
                              onClick={() => setShowCodeDropdown((v) => !v)}
                              className="flex items-center gap-0.5 font-inter text-[11px] md:text-[13px] text-[#2E2E2E] hover:text-[#1D3B29] transition-colors pr-1"
                            >
                              <span>{countryCode}</span>
                              <span className="text-[9px] mt-0.5">▾</span>
                            </button>
                            {showCodeDropdown && (
                              <div className="absolute top-full left-0 mt-1 z-50 bg-white rounded-[10px] shadow-lg border border-black/5 overflow-hidden min-w-[160px]">
                                {COUNTRY_CODES.map((c, i) => (
                                  <button
                                    key={i}
                                    type="button"
                                    onClick={() => { setCountryCode(c.code); setShowCodeDropdown(false); }}
                                    className="w-full flex items-center gap-2 px-3 py-2 font-inter text-[12px] text-[#2E2E2E] hover:bg-[#F4EEE2] transition-colors text-left"
                                  >
                                    <span>{c.flag}</span>
                                    <span className="font-medium">{c.code}</span>
                                    <span className="text-[#2E2E2E]/60">{c.country}</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          <input
                            type="text" name="phone" value={formData.phone}
                            onChange={handleChange} required placeholder="Phone number"
                            className="w-full bg-transparent font-inter text-[11px] md:text-[13px] text-[#2E2E2E] outline-none placeholder-[#2E2E2E]/60"
                          />
                        </div>
                      </div>

                      {/* Label */}
                      <div className="border-b border-[#2E2E2E]/30 pb-1 mb-3 md:mb-6">
                        <input
                          type="text" name="label" value={formData.label}
                          onChange={handleChange} placeholder="Label (Home, Work..)"
                          className="w-full bg-transparent font-inter text-[11px] md:text-[13px] text-[#2E2E2E] outline-none placeholder-[#2E2E2E]/60"
                        />
                      </div>

                      {/* Address Line 1 */}
                      <div className="border-b border-[#2E2E2E]/30 pb-1 mb-3 md:mb-6">
                        <input
                          type="text" name="address_line1" value={formData.address_line1}
                          onChange={handleChange} required placeholder="Address Line 1"
                          className="w-full bg-transparent font-inter text-[11px] md:text-[13px] text-[#2E2E2E] outline-none placeholder-[#2E2E2E]/60"
                        />
                      </div>

                      {/* Address Line 2 */}
                      <div className="border-b border-[#2E2E2E]/30 pb-1 mb-3 md:mb-6">
                        <input
                          type="text" name="address_line2" value={formData.address_line2}
                          onChange={handleChange} placeholder="Address Line 2 (Optional)"
                          className="w-full bg-transparent font-inter text-[11px] md:text-[13px] text-[#2E2E2E] outline-none placeholder-[#2E2E2E]/60"
                        />
                      </div>

                      {/* Row: City + State */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 mb-3 md:mb-6">
                        <div className="border-b border-[#2E2E2E]/30 pb-1">
                          <input
                            type="text" name="city" value={formData.city}
                            onChange={handleChange} required placeholder="City"
                            className="w-full bg-transparent font-inter text-[11px] md:text-[13px] text-[#2E2E2E] outline-none placeholder-[#2E2E2E]/60"
                          />
                        </div>
                        <div className="border-b border-[#2E2E2E]/30 pb-1">
                          <input
                            type="text" name="state" value={formData.state}
                            onChange={handleChange} required placeholder="State"
                            className="w-full bg-transparent font-inter text-[11px] md:text-[13px] text-[#2E2E2E] outline-none placeholder-[#2E2E2E]/60"
                          />
                        </div>
                      </div>

                      {/* Row: Postal Code + Country */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 mb-5 md:mb-8">
                        <div className="border-b border-[#2E2E2E]/30 pb-1">
                          <input
                            type="text" name="postal_code" value={formData.postal_code}
                            onChange={handleChange} required placeholder="Postal Code"
                            className="w-full bg-transparent font-inter text-[11px] md:text-[13px] text-[#2E2E2E] outline-none placeholder-[#2E2E2E]/60"
                          />
                        </div>
                        <div className="border-b border-[#2E2E2E]/30 pb-1">
                          <input
                            type="text" name="country" value={formData.country}
                            onChange={handleChange} placeholder="Country"
                            className="w-full bg-transparent font-inter text-[11px] md:text-[13px] text-[#2E2E2E] outline-none placeholder-[#2E2E2E]/60"
                          />
                        </div>
                      </div>

                      {/* Submit */}
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="px-6 py-2 md:px-8 md:py-2.5 rounded-[6px] md:rounded-[8px] font-inter text-[12px] md:text-[14px] font-medium transition-colors hover:bg-[#2A4F38]"
                          style={{ backgroundColor: "#1D3B29", color: "#F7EDE2" }}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Address List */}
              {addressLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-[#1D3B29]" />
                </div>
              ) : addresses.length === 0 && !showForm ? (
                <div className="bg-white rounded-[16px] border border-black/5 flex flex-col items-center justify-center py-10 px-6 gap-3 mt-2 md:mt-0">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#1D3B29] flex items-center justify-center mb-1">
                    <MapPin className="w-5 h-5 md:w-6 md:h-6 text-[#F7EDE2]" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-inter font-bold text-[16px] md:text-[18px] text-[#2E2E2E]">No Saved Address</h3>
                  <p className="font-inter text-[12px] md:text-[13px] text-[#2E2E2E]/60 text-center max-w-[260px] leading-relaxed mb-1">
                    Add your delivery address to enjoy faster and smoother checkout for your future orders.
                  </p>
                  <button
                    onClick={() => setShowForm(true)}
                    className="mt-1 px-5 py-2.5 rounded-[8px] font-inter font-medium text-[12px] md:text-[13px] transition-colors hover:bg-[#2A4F38]"
                    style={{ backgroundColor: "#1D3B29", color: "#F7EDE2" }}
                  >
                    Add New Address
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-[16px] overflow-hidden border border-black/5">
                  {addresses.map((addr, idx) => (
                    <div key={addr.id}>
                      {/* Divider between items */}
                      {idx > 0 && <hr className="border-t border-[#1D3B29]/20 mx-4 md:mx-5" />}

                      <div className="px-4 py-4 md:px-5 md:py-5">
                        {/* Top row: icon + label + name | action icons */}
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-2.5 md:gap-3">
                            <MapPin className="w-[16px] h-[16px] md:w-[18px] md:h-[18px] text-[#2E2E2E]/60 mt-0.5 shrink-0" />
                            <div>
                              <h4 className="font-inter font-bold text-[13px] md:text-[14px] text-[#2E2E2E] leading-tight">
                                {addr.label || addr.name || "Address"}
                              </h4>
                              <p className="font-inter text-[10px] md:text-[12px] text-[#2E2E2E]/60 mt-0.5">
                                {addr.full_name}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => handleDelete(addr.id)}
                              className="p-1 text-[#2E2E2E]/60 hover:text-red-500 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-[14px] h-[14px] md:w-[16px] md:h-[16px]" />
                            </button>
                            <button
                              onClick={() => handleEdit(addr)}
                              className="p-1 text-[#2E2E2E]/60 hover:text-[#1D3B29] transition-colors"
                              title="Edit"
                            >
                              <Pencil className="w-[14px] h-[14px] md:w-[16px] md:h-[16px]" />
                            </button>
                          </div>
                        </div>

                        {/* Address text */}
                        <p className="font-inter text-[12px] md:text-[13px] text-[#2E2E2E]/80 md:text-[#2E2E2E] mt-2 md:mt-3 ml-[26px] md:ml-[30px] leading-relaxed">
                          {buildFullAddress(addr)}
                        </p>

                        {/* Contact */}
                        {addr.phone && (
                          <p className="font-inter text-[12px] md:text-[13px] text-[#2E2E2E]/80 md:text-[#2E2E2E] mt-1 ml-[26px] md:ml-[30px]">
                            <span className="font-bold text-[#2E2E2E]">Contact :</span> +91 - {addr.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Member Offers Banner */}
            <div className="relative rounded-[16px] overflow-hidden bg-[#D3C5B1] min-h-[160px] flex items-center p-6 lg:p-8">
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/profile.png"
                  alt="Exclusive offers"
                  fill
                  className="object-cover object-[65%_75%] lg:object-[100%_75%]"
                />
              </div>
              <div className="relative z-10 max-w-[400px] flex flex-col items-start gap-3">
                <h3 className="font-inter font-bold text-[18px] text-[#2E2E2E]">
                  Exclusive Member Offers
                </h3>
                <p className="font-inter text-[14px] leading-relaxed text-[#2E2E2E]">
                  You have unlocked free shipping on all orders over ₹999. Use code{" "}
                  <span className="font-semibold">VSTORY10</span> for 10% off your next purchase.
                </p>
                <Link
                  href="/shop"
                  className="mt-2 font-inter font-medium text-[13px] px-5 py-2.5 rounded-[8px] transition-all hover:bg-[#2A4F38]"
                  style={{ backgroundColor: "#1D3B29", color: "#F7EDE2" }}
                >
                  Browse Premium Collections
                </Link>
              </div>
            </div>

            {/* Need Help Card (Mobile Only) */}
            <div className="flex lg:hidden bg-[#F7EDE2] rounded-[16px] p-6 flex-col items-center text-center mt-4">
              <Image src="/images/icons/help.png" alt="Help" width={32} height={32} className="mb-3 object-contain" />
              <h3 className="font-inter font-semibold text-[#1D3B29] text-[24px] mb-1 leading-none">Need Help?</h3>
              <p className="font-inter text-[#1D3B29] text-[13px] opacity-80 mb-5">
                We're here to help you.
              </p>
              <Link
                href="/contact"
                className="bg-[#1D3B29] text-white font-inter font-medium text-[14px] px-6 py-2.5 rounded-[8px] hover:bg-[#2A4F38] transition-all"
                style={{ color: "#F7EDE2" }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
