"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLoginModal } from "@/context/LoginModalContext";

/** /forgot-password — opens login modal forgot tab on the home page. */
export default function ForgotPasswordPage() {
    const router = useRouter();
    const { open } = useLoginModal();

    useEffect(() => {
        router.replace("/?login=1");
        const t = setTimeout(() => open(), 100);
        return () => clearTimeout(t);
    }, [router, open]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
            <div className="w-10 h-10 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
        </div>
    );
}
