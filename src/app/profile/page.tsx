"use client";

import { useEffect, useState } from "react";
import { Pencil, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase-browser";
import { AddressService } from "@/lib/services/address.service";
import { toast } from "sonner";

export default function ProfilePage() {
    const { user, profile } = useAuth();
    const [phone, setPhone] = useState<string>("—");
    const [loadingPhone, setLoadingPhone] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState("");
    const [saving, setSaving] = useState(false);

    const fullName = profile?.full_name || "User";
    const initials = fullName
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    useEffect(() => {
        async function loadPhone() {
            try {
                const addresses = await AddressService.getAddresses();
                const defaultAddr =
                    addresses.find((a) => a.is_default) || addresses[0];
                if (defaultAddr?.phone) {
                    setPhone(defaultAddr.phone);
                }
            } catch {
                // keep placeholder
            } finally {
                setLoadingPhone(false);
            }
        }
        loadPhone();
    }, []);

    useEffect(() => {
        setEditName(fullName);
    }, [fullName]);

    async function handleSave() {
        if (!user || !editName.trim()) return;
        setSaving(true);
        try {
            const { error } = await supabase
                .from("profiles")
                .update({ full_name: editName.trim() })
                .eq("id", user.id);

            if (error) throw error;
            toast.success("Profile updated");
            setIsEditing(false);
            window.location.reload();
        } catch {
            toast.error("Failed to update profile");
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="rounded-[24px] border border-[#C6C6C6] bg-[#F4F0EC] p-6">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="font-inter text-xl lg:text-2xl font-semibold text-[#2E2E2E]">
                    My Profile
                </h2>
                <button
                    type="button"
                    onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                    disabled={saving}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-[#2E2E2E] transition-colors hover:bg-white/60"
                    aria-label={isEditing ? "Save profile" : "Edit profile"}
                >
                    {saving ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        <Pencil className="h-5 w-5" strokeWidth={1.5} />
                    )}
                </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#1D3B29] font-inter text-2xl font-semibold text-[#F4F0EC]">
                    {initials}
                </div>

                <div className="flex-1 space-y-4 font-inter text-base text-[#2E2E2E]">
                    <div>
                        <p className="font-semibold">Name</p>
                        {isEditing ? (
                            <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="mt-1 w-full max-w-md rounded-lg border border-[#C6C6C6] bg-white px-3 py-2 outline-none focus:border-[#1D3B29]"
                            />
                        ) : (
                            <p className="mt-1">{fullName}</p>
                        )}
                    </div>

                    <div>
                        <p className="font-semibold">Contact</p>
                        <p className="mt-1">
                            {loadingPhone ? "Loading..." : phone}
                        </p>
                    </div>

                    <div>
                        <p className="font-semibold">E-mail</p>
                        <p className="mt-1 break-all">{user?.email || "—"}</p>
                    </div>

                    {isEditing && (
                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={saving}
                                className="rounded-[8px] bg-[#1D3B29] px-5 py-2.5 font-inter text-sm font-medium text-[#F7EDE2] hover:bg-[#2A4F38] disabled:opacity-60"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsEditing(false);
                                    setEditName(fullName);
                                }}
                                className="rounded-[8px] border border-[#C6C6C6] bg-white px-5 py-2.5 font-inter text-sm font-medium text-[#2E2E2E] hover:bg-[#FCFAF4]"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
