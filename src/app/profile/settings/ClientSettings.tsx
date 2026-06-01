"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase-browser";
import { toast } from "sonner";

function Toggle({
  enabled,
  onToggle,
  disabled = false,
}: {
  enabled: boolean;
  onToggle: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={onToggle}
      disabled={disabled}
      className={`relative inline-flex h-[20px] w-[36px] md:h-[24px] md:w-[44px] shrink-0 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D3B29] focus-visible:ring-offset-2 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      style={{ backgroundColor: enabled ? "#1D3B29" : "#D1D5DB" }}
    >
      <span
        className={`inline-block h-[16px] w-[16px] md:h-[20px] md:w-[20px] transform rounded-full bg-white shadow transition-transform duration-200 mt-[2px] ${
          enabled ? "translate-x-[18px] md:translate-x-[22px]" : "translate-x-[2px]"
        }`}
      />
    </button>
  );
}

export default function ClientSettings() {
  const { user, loading, signOut, isAdmin } = useAuth();
  const router = useRouter();

  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promotions, setPromotions] = useState(false);
  const [isUpdatingOrder, setIsUpdatingOrder] = useState(false);
  const [isUpdatingPromo, setIsUpdatingPromo] = useState(false);

  useEffect(() => {
    if (user) {
      setOrderUpdates(user.user_metadata?.order_updates !== false);
      setPromotions(!!user.user_metadata?.promotions);
    }
  }, [user]);

  const handleToggleOrderUpdates = async () => {
    const newValue = !orderUpdates;
    setOrderUpdates(newValue);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { order_updates: newValue }
      });
      if (error) throw error;
      toast.success("Order updates preference updated successfully");
    } catch (error: any) {
      setOrderUpdates(!newValue); // rollback
      toast.error("Failed to update preference: " + error.message);
    }
  };

  const handleTogglePromotions = async () => {
    const newValue = !promotions;
    setPromotions(newValue);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { promotions: newValue }
      });
      if (error) throw error;
      toast.success("Promotions preference updated successfully");
    } catch (error: any) {
      setPromotions(!newValue); // rollback
      toast.error("Failed to update preference: " + error.message);
    }
  };

  const displayName =
    user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
  const joinYear = user?.created_at
    ? new Date(user.created_at).getFullYear()
    : "2026";

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4EEE2]">
        <Loader2 className="w-8 h-8 animate-spin text-[#1D3B29]" />
      </div>
    );
  }

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
            {/* Settings Card */}
            <div className="bg-[#F4EEE2] rounded-[16px] p-4 md:p-6 lg:p-8 border border-black/5">
              <h2 className="font-inter font-bold text-[18px] md:text-[20px] text-[#2E2E2E] mb-4 md:mb-6">
                Notifications
              </h2>

              <div className="bg-white rounded-[16px] overflow-hidden border border-black/5">
                {/* Order Updates */}
                <div 
                  className="flex items-center justify-between px-4 py-4 md:px-5 md:py-5 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={handleToggleOrderUpdates}
                >
                  <div className="pr-4">
                    <p className="font-inter font-bold md:font-semibold text-[13px] md:text-[14px] text-[#2E2E2E]">
                      Order Updates
                    </p>
                    <p className="font-inter text-[11px] md:text-[12px] text-[#2E2E2E]/60 mt-0.5 leading-snug">
                      Get text messages about your order status
                    </p>
                  </div>
                  <Toggle
                    enabled={orderUpdates}
                    onToggle={() => {}} // handled by parent div
                    disabled={false}
                  />
                </div>

                <hr className="border-t border-[#2E2E2E]/10 mx-4 md:mx-5" />

                {/* Promotions and Offers */}
                <div 
                  className="flex items-center justify-between px-4 py-4 md:px-5 md:py-5 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={handleTogglePromotions}
                >
                  <div className="pr-4">
                    <p className="font-inter font-bold md:font-semibold text-[13px] md:text-[14px] text-[#2E2E2E]">
                      Promotions and Offers
                    </p>
                    <p className="font-inter text-[11px] md:text-[12px] text-[#2E2E2E]/60 mt-0.5 leading-snug">
                      Receive emails about new products and sales
                    </p>
                  </div>
                  <Toggle
                    enabled={promotions}
                    onToggle={() => {}} // handled by parent div
                    disabled={false}
                  />
                </div>
              </div>
            </div>

            {/* Member Offers Banner */}
            <div className="relative rounded-[16px] overflow-hidden bg-[#D3C5B1] min-h-[160px] flex items-center p-6 lg:p-8">
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/profile.png"
                  alt="Exclusive offers"
                  fill
                  priority
                  className="object-cover object-[65%_75%] lg:object-[100%_75%]"
                />
              </div>
              <div className="relative z-10 max-w-[400px] flex flex-col items-start gap-3">
                <h3 className="font-inter font-bold text-[18px] text-[#2E2E2E]">
                  Exclusive Member Offers
                </h3>
                <p className="font-inter text-[14px] leading-relaxed text-[#2E2E2E]">
                  You have unlocked free shipping on all orders over ₹999. Use
                  code <span className="font-semibold">VSTORY10</span> for 10%
                  off your next purchase.
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
              <Image src="/images/icons/help.png" alt="Help" width={32} height={32} className="mb-3 object-contain" style={{ width: "auto", height: "auto" }} />
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
