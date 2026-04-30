import { Truck, RotateCcw, Download, MessageCircle, Share2, HelpCircle } from "lucide-react";

const actions = [
    { icon: Truck, label: "Track Order", desc: "Check shipment status" },
    { icon: RotateCcw, label: "Reorder", desc: "Buy favorites again" },
    { icon: Download, label: "Invoices", desc: "Download tax bills" },
    { icon: MessageCircle, label: "Support", desc: "Chat with us" },
    { icon: Share2, label: "Refer", desc: "Invite friends" },
    { icon: HelpCircle, label: "FAQ", desc: "Common questions" },
];

export default function QuickActions() {
    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-[var(--primary)]/5">
            <h3 className="text-xl font-heading font-bold text-[var(--primary)] mb-6">Quick Actions</h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {actions.map((action) => (
                    <button
                        key={action.label}
                        className="flex flex-col items-center justify-center p-4 rounded-2xl border border-gray-100 bg-gray-50/30 hover:bg-white hover:border-[var(--primary)]/10 hover:shadow-md transition-all group"
                    >
                        <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform text-[var(--primary)]">
                            <action.icon className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-semibold text-gray-900 mb-0.5">{action.label}</span>
                        <span className="text-[10px] text-gray-400 font-medium">{action.desc}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
