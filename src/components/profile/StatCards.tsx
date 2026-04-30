import { Wallet, Package, Heart, MapPin } from "lucide-react";

const stats = [
    {
        label: "Total Orders",
        value: "0",
        icon: Package,
        color: "text-blue-600",
        bg: "bg-blue-50"
    },
    {
        label: "Total Wishlist",
        value: "0",
        icon: Heart,
        color: "text-pink-600",
        bg: "bg-pink-50"
    },
    {
        label: "Saved Places",
        value: "1",
        icon: MapPin,
        color: "text-purple-600",
        bg: "bg-purple-50"
    }
];

export default function StatCards() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="bg-white/60 backdrop-blur-md p-5 rounded-2xl border border-[var(--primary)]/5 shadow-sm hover:shadow-md transition-all hover:bg-white group"
                >
                    <div className={`${stat.bg} w-10 h-10 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <p className="text-xs text-[var(--text-muted)] font-medium uppercase tracking-wider mb-1">
                        {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-[var(--primary)]">
                        {stat.value}
                    </p>
                </div>
            ))}
        </div>
    );
}
