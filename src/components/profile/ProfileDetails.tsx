"use client";

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

interface ProfileDetailsProps {
  user: any;
}

export default function ProfileDetails({ user }: ProfileDetailsProps) {
  // Extract initials for the avatar
  const getInitials = (name: string) => {
    if (!name) return "US";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const initialDisplayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || "User";
  const initialContact = user?.user_metadata?.phone || "Not provided";
  const initialEmail = user?.email || "No email";
  const initials = getInitials(initialDisplayName);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: initialDisplayName,
    contact: initialContact,
    email: initialEmail
  });

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel edit - reset data
      setFormData({
        name: initialDisplayName,
        contact: initialContact,
        email: initialEmail
      });
    }
    setIsEditing(!isEditing);
  };

  const handleUpdate = () => {
    // Here you would add logic to actually update the user's profile in Supabase
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Profile Details Card */}
      <div className="bg-[#F4EEE2] rounded-[16px] p-6 lg:p-8 relative border border-black/5">
        <div className="flex justify-between items-start mb-8">
          <h2 className="font-inter font-bold text-[20px] text-[#2E2E2E]">My Profile</h2>
          {!isEditing && (
            <button onClick={handleEditToggle} className="text-[#2E2E2E] hover:opacity-70 transition-opacity">
              <Image src="/images/icons/edit.png" alt="Edit" width={18} height={18} className="object-contain" />
            </button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
          {/* Avatar */}
          <div className="w-[90px] h-[90px] shrink-0 bg-[#1D3B29] rounded-full flex items-center justify-center text-[#F7EDE2] font-inter font-semibold text-[28px] shadow-sm">
            {initials}
          </div>

          {/* Details Grid */}
          <div className="flex flex-col gap-4 w-full max-w-[500px]">
            <div className="grid grid-cols-[80px_10px_1fr] items-center text-[13px] font-inter min-h-[32px]">
              <span className="font-bold text-[#2E2E2E]">Name</span>
              <span className="text-[#2E2E2E]">:</span>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-transparent border-b border-[#2E2E2E]/30 focus:border-[#1D3B29] outline-none text-[#2E2E2E] font-medium py-1 px-1 w-full"
                />
              ) : (
                <span className="text-[#2E2E2E] truncate font-medium">{formData.name}</span>
              )}
            </div>

            <div className="grid grid-cols-[80px_10px_1fr] items-center text-[13px] font-inter min-h-[32px]">
              <span className="font-bold text-[#2E2E2E]">Contact</span>
              <span className="text-[#2E2E2E]">:</span>
              {isEditing ? (
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="bg-transparent border-b border-[#2E2E2E]/30 focus:border-[#1D3B29] outline-none text-[#2E2E2E] font-medium py-1 px-1 w-full"
                />
              ) : (
                <span className="text-[#2E2E2E] font-medium">{formData.contact}</span>
              )}
            </div>

            <div className="grid grid-cols-[80px_10px_1fr] items-center text-[13px] font-inter min-h-[32px]">
              <span className="font-bold text-[#2E2E2E]">E-mail</span>
              <span className="text-[#2E2E2E]">:</span>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-transparent border-b border-[#2E2E2E]/30 focus:border-[#1D3B29] outline-none text-[#2E2E2E] font-medium py-1 px-1 w-full"
                />
              ) : (
                <span className="text-[#2E2E2E] truncate font-medium">{formData.email}</span>
              )}
            </div>
          </div>
        </div>

        {/* Edit Mode Buttons */}
        {isEditing && (
          <div className="flex justify-end gap-3 mt-6 sm:mt-0 sm:absolute sm:bottom-6 sm:right-6">
            <button
              onClick={handleEditToggle}
              className="px-6 py-2 rounded-[6px] font-inter text-[14px] font-medium transition-colors"
              style={{ border: "1px solid #1D3B29", color: "#1D3B29", backgroundColor: "transparent" }}
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="px-6 py-2 rounded-[6px] font-inter text-[14px] font-medium transition-colors"
              style={{ backgroundColor: "#1D3B29", color: "#F7EDE2", border: "1px solid #1D3B29" }}
            >
              Update
            </button>
          </div>
        )}
      </div>

      {/* Member Offers Banner */}
      <div className="relative rounded-[16px] overflow-hidden bg-[#D3C5B1] min-h-[160px] flex items-center p-6 lg:p-8 mt-4">
        {/* Background Image - full cover */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/profile.png"
            alt="Exclusive offers"
            fill
            priority
            className="object-cover object-[65%_75%] lg:object-[100%_75%]"
          />
        </div>

        {/* Banner Content */}
        <div className="relative z-10 max-w-[400px] flex flex-col items-start gap-3">
          <h3 className="font-inter font-bold text-[18px] text-[#2E2E2E]">
            Exclusive Member Offers
          </h3>
          <p className="font-inter text-[14px] leading-relaxed text-[#2E2E2E]">
            You have unlocked free shipping on all orders over ₹999. Use code <span className="font-semibold">VSTORY10</span> for 10% off your next purchase.
          </p>
          <Link
            href="/shop"
            className="mt-2 bg-[#1D3B29] text-white font-inter font-medium text-[13px] px-5 py-2.5 rounded-[8px] hover:bg-[#2A4F38] transition-all"
            style={{ color: "#F7EDE2" }}
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
  );
}
