import { Package, Heart, MapPin } from "lucide-react";

const stats = [
    { label: "Total Orders", value: "0", icon: Package },
    { label: "Wishlist Items", value: "0", icon: Heart },
    { label: "Saved Addresses", value: "0", icon: MapPin },
];

export default function StatCards() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="rounded-xl border border-[#1D3B29]/10 bg-white p-5 shadow-sm"
                >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#F3EEE9]">
                        <stat.icon className="h-5 w-5 text-[var(--primary)]" />
                    </div>
                    <p className="font-inter text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
                        {stat.label}
                    </p>
                    <p className="mt-1 font-playfair text-2xl font-semibold text-[var(--primary)]">
                        {stat.value}
                    </p>
                </div>
            ))}
        </div>
    );
}
