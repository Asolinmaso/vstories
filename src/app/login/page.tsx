"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLoginModal } from "@/context/LoginModalContext";
import { useAuth } from "@/context/AuthContext";

/**
 * /login route — opens the login modal on the current page.
 * If already authenticated, goes to redirect param or home.
 */
export default function LoginPage() {
    const router = useRouter();
    const { open } = useLoginModal();
    const { user, loading } = useAuth();

    useEffect(() => {
        if (loading) return;
        const params = new URLSearchParams(window.location.search);
        const redirect = params.get("redirect");

        if (user) {
            if (redirect && redirect.startsWith("/") && !redirect.startsWith("//")) {
                router.replace(redirect);
            } else {
                router.replace("/");
            }
            return;
        }

        const target = redirect && redirect.startsWith("/") && !redirect.startsWith("//")
            ? `/?login=1&redirect=${encodeURIComponent(redirect)}`
            : "/?login=1";
        router.replace(target);
        const t = setTimeout(() => open(), 100);
        return () => clearTimeout(t);
    }, [user, loading, router, open]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
            <div className="w-10 h-10 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
        </div>
    );
}
