import type { Metadata } from "next";
import { Fira_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { AuthProvider } from "@/context/AuthContext";
import { getWebsiteConfig } from "@/lib/services/website.service";
import { Toaster } from "sonner";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import SessionProvider from "@/components/providers/SessionProvider";

export const revalidate = 60;

const firaSans = Fira_Sans({
  variable: "--font-fira-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const peachi = localFont({
  src: [
    {
      path: "../../public/fonts/Peachi-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-peachi",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vstories.in"), // Replace with actual domain or env var
  title: {
    default: "V STORIES | Premium Herbal Hair & Skincare",
    template: "%s | V STORIES",
  },
  description:
    "Discover V STORIES - Premium herbal hair and skincare products crafted with 40+ organic herbs & cold-pressed oils. Chemical-free, sun-dried herbs for visible, sustainable results.",
  keywords: [
    "herbal hair care",
    "natural skincare",
    "hair oil",
    "organic beauty",
    "chemical-free",
    "hair growth",
    "herbal products India",
    "V STORIES",
  ],
  authors: [{ name: "V STORIES" }],
  creator: "V STORIES",
  icons: {
    icon: "/images/logo.png", // Using the logo as favicon
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://vstories.in",
    siteName: "V STORIES",
    title: "V STORIES | Premium Herbal Hair & Skincare",
    description:
      "Premium herbal hair and skincare products crafted with 40+ organic herbs & cold-pressed oils.",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "V STORIES - Premium Herbal Hair & Skincare",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "V STORIES | Premium Herbal Hair & Skincare",
    description:
      "Premium herbal hair and skincare products crafted with 40+ organic herbs.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { announcement: announcementConfig } = await getWebsiteConfig();

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${firaSans.variable} ${peachi.variable} antialiased bg-[var(--background)]`}
      >
        <SessionProvider>
          <AuthProvider>
            <ClientLayout announcement={announcementConfig}>
              {children}
            </ClientLayout>
            <WhatsAppButton />
            <Toaster position="top-center" richColors />
            <Analytics />
            <SpeedInsights />
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
