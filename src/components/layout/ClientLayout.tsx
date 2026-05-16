"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LoginModalProvider } from "@/context/LoginModalContext";

interface ClientLayoutProps {
    children: React.ReactNode;
    announcement?: {
        text: string;
        enabled: boolean;
    };
}

export default function ClientLayout({ children, announcement }: ClientLayoutProps) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");
    // Pages that embed their own Figma footer
    const hasOwnFooter = pathname === "/about" || pathname === "/blog";

    return (
        <LoginModalProvider>
            {!isAdmin && <Navbar announcement={announcement} />}
            <main id="main-content" className={isAdmin ? "" : "pt-0"}>
                {children}
            </main>
            {!isAdmin && !hasOwnFooter && <Footer />}
        </LoginModalProvider>
    );
}
