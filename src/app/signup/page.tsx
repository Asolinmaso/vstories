"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLoginModal } from "@/context/LoginModalContext";
import { useAuth } from "@/context/AuthContext";

/**
 * /signup route — opens the login modal (signup tab) on the current page.
 * If already authenticated, goes directly to /profile.
 */
export default function SignupPage() {
    const router = useRouter();
    const { open } = useLoginModal();
    const { user, loading } = useAuth();

    useEffect(() => {
        if (loading) return;
        if (user) {
            router.replace("/profile");
            return;
        }
        router.replace("/");
        const t = setTimeout(() => open(), 100);
        return () => clearTimeout(t);
    }, [user, loading, router, open]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
            <div className="w-10 h-10 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
        </div>
    );
}
