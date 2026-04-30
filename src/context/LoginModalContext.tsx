"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import LoginModal from "@/components/ui/LoginModal";

interface LoginModalContextType {
    open: () => void;
    close: () => void;
}

const LoginModalContext = createContext<LoginModalContextType>({ open: () => {}, close: () => {} });

export function useLoginModal() {
    return useContext(LoginModalContext);
}

export function LoginModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();
    const pathname = usePathname();

    // First-visit popup: show after 2s if not logged in and not on auth/admin pages
    useEffect(() => {
        if (user) return;
        const isAuthPage = pathname === "/login" || pathname === "/signup";
        const isAdmin = pathname?.startsWith("/admin");
        if (isAuthPage || isAdmin) return;

        const seen = localStorage.getItem("vstories_login_prompt");
        if (!seen) {
            const timer = setTimeout(() => {
                setIsOpen(true);
                localStorage.setItem("vstories_login_prompt", "1");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [user, pathname]);

    return (
        <LoginModalContext.Provider value={{ open: () => setIsOpen(true), close: () => setIsOpen(false) }}>
            {children}
            {isOpen && <LoginModal onClose={() => setIsOpen(false)} />}
        </LoginModalContext.Provider>
    );
}
