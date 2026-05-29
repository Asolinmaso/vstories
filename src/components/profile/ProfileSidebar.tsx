"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, ShoppingBag, MapPin, Settings, LogOut, Headset, Store } from "lucide-react";

interface ProfileSidebarProps {
  onSignOut: () => void;
  isAdmin?: boolean;
}

export default function ProfileSidebar({ onSignOut, isAdmin = false }: ProfileSidebarProps) {
  const pathname = usePathname();

  const tabs: { label: string; href: string; icon?: any; img?: string }[] = [
    { label: "My Profile", href: "/profile", icon: User },
    { label: "My Orders", href: "/profile/orders", icon: ShoppingBag },
    { label: "Addresses", href: "/profile/addresses", icon: MapPin },
    { label: "Settings", href: "/profile/settings", icon: Settings },
  ];

  if (isAdmin) {
    tabs.push({ label: "Store Dashboard", href: "/admin/products", icon: Store });
  }

  return (
    <div className="w-full lg:w-[280px] shrink-0 flex flex-col gap-6">
      {/* Navigation Card */}
      <div className="bg-[#1D3B29] rounded-[16px] p-4 flex flex-col gap-2">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;

          return (
            <Link
              key={tab.label}
              href={tab.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-[8px] font-inter font-medium text-[15px] transition-all ${isActive
                  ? "bg-[#F7EDE2] text-[#1D3B29]"
                  : "hover:bg-white/10"
                }`}
              style={{ color: isActive ? "#1D3B29" : "#F7EDE2" }}
            >
              {tab.img ? (
                <Image src={tab.img} alt={tab.label} width={18} height={18} className="object-contain" />
              ) : tab.icon ? (
                <tab.icon className="w-[18px] h-[18px]" strokeWidth={2} />
              ) : null}
              {tab.label}
            </Link>
          );
        })}

        <div className="h-[1px] bg-white/20 my-2" />

        <button
          onClick={onSignOut}
          className="flex items-center gap-3 px-4 py-3 rounded-[8px] font-inter font-medium text-[15px] text-[#F7EDE2] hover:bg-white/10 transition-all text-left"
        >
          <LogOut className="w-[18px] h-[18px]" strokeWidth={2} />
          Sign Out
        </button>
      </div>

      {/* Need Help Card */}
      <div className="hidden lg:flex bg-[#F7EDE2] rounded-[16px] p-6 flex-col items-center text-center">
        <Image src="/images/icons/help.png" alt="Help" width={32} height={32} className="mb-3 object-contain" />
        <h3 className="font-inter font-semibold text-[#1D3B29] text-[24px] mb-1 leading-none">Need Help?</h3>
        <p className="font-inter text-[#1D3B29] text-[13px] opacity-80 mb-5">
          We're here to help you.
        </p>
        <Link
          href="/contact"
          className="bg-[#1D3B29] text-white font-inter font-medium text-[14px] px-6 py-2.5 rounded-[8px] hover:bg-[#2A4F38] transition-all"
          style={{ color: "#F7EDE2" }}
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
