"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import ProfileDetails from "@/components/profile/ProfileDetails";
import { Loader2 } from "lucide-react";

export default function ClientProfile() {
  const { user, loading, signOut, isAdmin } = useAuth();
  const router = useRouter();

  // We remove the redirect to home for testing the design.
  // In production, you might want to uncomment this or open the login modal instead.
  /*
  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);
  */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4EEE2]">
        <Loader2 className="w-8 h-8 animate-spin text-[#1D3B29]" />
      </div>
    );
  }

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || "User";
  // Assuming a generic join year if not available in metadata
  const joinYear = user?.created_at ? new Date(user.created_at).getFullYear() : "2026";

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#FCFAF4] py-12 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[100px]">
        {/* Header Section */}
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
          <div className="flex-1 min-w-0">
            <ProfileDetails user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
