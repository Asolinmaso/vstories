"use client";

import { useAuth } from "@/context/AuthContext";

export default function ProfileHeader() {
    const { user, profile } = useAuth();

    const firstName =
        profile?.full_name?.split(" ")[0] ||
        user?.email?.split("@")[0] ||
        "User";

    const memberSince = profile?.created_at
        ? new Date(profile.created_at).getFullYear()
        : user?.created_at
          ? new Date(user.created_at).getFullYear()
          : new Date().getFullYear();

    return (
        <div className="mb-6 lg:mb-8">
            <h1 className="font-playfair text-[32px] leading-tight sm:text-[40px] lg:text-[48px] lg:leading-[64px] font-semibold text-black">
                Welcome {firstName}!
            </h1>
            <p className="mt-1 font-inter text-base leading-[19px] text-black">
                Member Since {memberSince}
            </p>
        </div>
    );
}
