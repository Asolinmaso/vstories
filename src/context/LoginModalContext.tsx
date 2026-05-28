"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import LoginModal from "@/components/ui/LoginModal";

type AuthTab = "login" | "signup";

interface LoginModalContextType {
    open: (tab?: AuthTab) => void;
    close: () => void;
}

const LoginModalContext = createContext<LoginModalContextType>({ open: () => {}, close: () => {} });

export function useLoginModal() {
    return useContext(LoginModalContext);
}

export function LoginModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [initialTab, setInitialTab] = useState<AuthTab>("login");
    const { user } = useAuth();
    const pathname = usePathname();

    const open = (tab: AuthTab = "login") => {
        setInitialTab(tab);
        setIsOpen(true);
    };

    const close = () => setIsOpen(false);

    // Open modal from URL params (?login=1 or ?signup=1)
    useEffect(() => {
        if (user || typeof window === "undefined") return;
        const params = new URLSearchParams(window.location.search);
        if (params.get("login") === "1") {
            setInitialTab("login");
            setIsOpen(true);
        } else if (params.get("signup") === "1") {
            setInitialTab("signup");
            setIsOpen(true);
        }
    }, [user, pathname]);

    // First-visit popup: show after 2s if not logged in and not on auth/admin pages
    useEffect(() => {
        if (user) return;
        const isAuthPage = pathname === "/login" || pathname === "/signup";
        const isAdmin = pathname?.startsWith("/admin");
        if (isAuthPage || isAdmin) return;
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            if (params.get("login") === "1" || params.get("signup") === "1") return;
        }

        const seen = localStorage.getItem("vstories_login_prompt");
        if (!seen) {
            const timer = setTimeout(() => {
                setInitialTab("login");
                setIsOpen(true);
                localStorage.setItem("vstories_login_prompt", "1");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [user, pathname]);

    return (
        <LoginModalContext.Provider value={{ open, close }}>
            {children}
            {isOpen && <LoginModal onClose={close} initialTab={initialTab} />}
        </LoginModalContext.Provider>
    );
}
