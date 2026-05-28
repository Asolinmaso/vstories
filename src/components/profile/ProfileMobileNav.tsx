"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, ShoppingBag, MapPin, Settings } from "lucide-react";

const menuItems = [
  { icon: User, label: "My Profile", href: "/profile" },
  { icon: ShoppingBag, label: "My Orders", href: "/profile/orders" },
  { icon: MapPin, label: "Addresses", href: "/profile/addresses" },
  { icon: Settings, label: "Settings", href: "/profile/settings" },
];

function isActive(pathname: string, href: string) {
  if (href === "/profile") return pathname === "/profile";
  return pathname.startsWith(href);
}

export default function ProfileMobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden -mx-1 overflow-x-auto pb-1">
      <ul className="flex gap-2 min-w-max px-1">
        {menuItems.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <li key={item.label}>
              <Link
                href={item.href}
                className={`inline-flex items-center gap-2 rounded-[16px] px-4 py-2.5 font-inter text-sm whitespace-nowrap transition-colors ${active
                    ? "bg-[#1D3B29] font-semibold text-white"
                    : "bg-[#F4F0EC] font-normal text-[#1D3B29]"
                  }`}
              >
                <item.icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
