"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLoginModal } from "@/context/LoginModalContext";
import Sidebar from "@/components/profile/Sidebar";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileMobileNav from "@/components/profile/ProfileMobileNav";
import NeedHelpCard from "@/components/profile/NeedHelpCard";
import MemberOffersBanner from "@/components/profile/MemberOffersBanner";
import TrustFeatures from "@/components/home/TrustFeatures";

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading } = useAuth();
    const { open } = useLoginModal();

    useEffect(() => {
        if (loading || user) return;
        open();
    }, [loading, user, open]);

    if (loading) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center bg-[#FCFAF4]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-[#1D3B29] border-t-transparent rounded-full animate-spin" />
                    <p className="text-[#1D3B29] font-inter text-sm">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="bg-[#FCFAF4]">
            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[100px] pt-8 pb-10 lg:pt-12 lg:pb-16">
                <ProfileHeader />
                <ProfileMobileNav />

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-[293px_1fr] gap-6 lg:gap-8">
                    <aside className="hidden lg:flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
                        <Sidebar />
                        <NeedHelpCard />
                    </aside>

                    <div className="min-w-0">
                        {children}
                        <MemberOffersBanner />
                    </div>
                </div>

                <div className="mt-6 lg:hidden">
                    <NeedHelpCard />
                </div>
            </div>

            <TrustFeatures />
        </div>
    );
}
