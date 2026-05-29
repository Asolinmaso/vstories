"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LoginModalProvider } from "@/context/LoginModalContext";
import TrustFeatures from "@/components/home/TrustFeatures";

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
    const isContactPage = pathname === "/contact";
    return (
        <LoginModalProvider>
            {!isAdmin && <Navbar announcement={announcement} />}
            <main id="main-content" className={isAdmin ? "" : "pt-0"}>
                {children}
            </main>
            {!isAdmin && (
                <>
                    {!isContactPage && <TrustFeatures />}
                    <Footer />
                </>
            )}
        </LoginModalProvider>
    );
}
