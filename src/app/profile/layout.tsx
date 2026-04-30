"use client";

import { useAuth } from "@/context/AuthContext";
import { useLoginModal } from "@/context/LoginModalContext";
import { supabase } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "@/components/profile/Sidebar";

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading } = useAuth();
    const { open } = useLoginModal();
    const router = useRouter();

    useEffect(() => {
        if (loading || user) return;
        let cancelled = false;
        const id = window.setTimeout(async () => {
            if (cancelled) return;
            const {
                data: { session },
            } = await supabase.auth.getSession();
            if (cancelled) return;
            if (session?.user) return;
            // Open modal instead of hard navigating away
            open();
        }, 500);
        return () => {
            cancelled = true;
            window.clearTimeout(id);
        };
    }, [user, loading, open]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#faf9f6]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-[var(--primary)] font-medium font-heading">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#faf9f6] pt-8 pb-20">
            {/* Background Decorations */}
            <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[var(--primary)]/5 to-transparent pointer-events-none" />

            <div className="container-premium max-w-7xl relative z-10">
                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Left Sidebar - Sticky */}
                    <div className="lg:col-span-3 lg:sticky lg:top-28 h-fit hidden lg:block">
                        <Sidebar />
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-9 space-y-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
