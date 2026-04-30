"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLoginModal } from "@/context/LoginModalContext";
import { useAuth } from "@/context/AuthContext";

/**
 * /login route — opens the login modal on the current page.
 * If already authenticated, goes directly to /profile.
 */
export default function LoginPage() {
    const router = useRouter();
    const { open } = useLoginModal();
    const { user, loading } = useAuth();

    useEffect(() => {
        if (loading) return;
        if (user) {
            router.replace("/profile");
            return;
        }
        // Go back (or home) and open modal
        router.replace("/");
        // Small delay so the home page mounts and the modal context is ready
        const t = setTimeout(() => open(), 100);
        return () => clearTimeout(t);
    }, [user, loading, router, open]);

    // Show nothing while redirecting
    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
            <div className="w-10 h-10 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
        </div>
    );
}
