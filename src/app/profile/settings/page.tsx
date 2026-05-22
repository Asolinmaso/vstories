"use client";

import { useEffect, useState } from "react";
import ToggleSwitch from "@/components/profile/ToggleSwitch";

const STORAGE_KEY = "vstories_notification_prefs";

type NotificationPrefs = {
    orderUpdates: boolean;
    promotions: boolean;
};

const defaultPrefs: NotificationPrefs = {
    orderUpdates: true,
    promotions: false,
};

export default function SettingsPage() {
    const [prefs, setPrefs] = useState<NotificationPrefs>(defaultPrefs);

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                setPrefs({ ...defaultPrefs, ...JSON.parse(stored) });
            }
        } catch {
            // use defaults
        }
    }, []);

    function updatePref(key: keyof NotificationPrefs, value: boolean) {
        const next = { ...prefs, [key]: value };
        setPrefs(next);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }

    return (
        <div className="rounded-[24px] border border-[#C6C6C6] bg-[#F4F0EC] p-6">
            <h2 className="font-inter text-xl lg:text-2xl font-semibold text-[#2E2E2E] mb-6">
                Notifications
            </h2>

            <div className="rounded-[24px] bg-white p-6 space-y-6">
                <div className="flex items-start justify-between gap-4 pb-6 border-b border-[#2E2E2E]">
                    <div className="space-y-3">
                        <p className="font-inter text-base font-semibold text-[#2E2E2E]">
                            Order Updates
                        </p>
                        <p className="font-inter text-base text-[#2E2E2E]">
                            Get text messages about your order status
                        </p>
                    </div>
                    <ToggleSwitch
                        checked={prefs.orderUpdates}
                        onChange={(v) => updatePref("orderUpdates", v)}
                        label="Order Updates"
                    />
                </div>

                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-3">
                        <p className="font-inter text-base font-semibold text-[#2E2E2E]">
                            Promotions and Offers
                        </p>
                        <p className="font-inter text-base text-[#2E2E2E]">
                            Receive emails about new products and sales
                        </p>
                    </div>
                    <ToggleSwitch
                        checked={prefs.promotions}
                        onChange={(v) => updatePref("promotions", v)}
                        label="Promotions and Offers"
                    />
                </div>
            </div>
        </div>
    );
}
