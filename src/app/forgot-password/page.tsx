"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase-browser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

type Step = "email" | "otp" | "reset" | "done";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [step, setStep] = useState<Step>("email");

    const [email, setEmail] = useState("");
    const [otpCode, setOtpCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // ── Step 1: Send OTP ──
    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); setError(null);
        try {
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: { shouldCreateUser: false },
            });
            if (error) throw error;
            setStep("otp");
        } catch (err: any) {
            if (err.message?.toLowerCase().includes("user not found") || err.message?.toLowerCase().includes("no user")) {
                setError("No account found with this email address.");
            } else {
                setError(err.message || "Failed to send OTP. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    // ── Step 2: Verify OTP ──
    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); setError(null);
        try {
            const { error } = await supabase.auth.verifyOtp({
                email,
                token: otpCode,
                type: "email",
            });
            if (error) throw error;
            setStep("reset");
        } catch (err: any) {
            setError("Invalid or expired code. Please check and try again.");
        } finally {
            setLoading(false);
        }
    };

    // ── Step 3: Reset password ──
    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) { setError("Passwords do not match."); return; }
        if (newPassword.length < 6) { setError("Password must be at least 6 characters."); return; }
        setLoading(true); setError(null);
        try {
            const { error } = await supabase.auth.updateUser({ password: newPassword });
            if (error) throw error;
            setStep("done");
            setTimeout(() => router.push("/login"), 2500);
        } catch (err: any) {
            setError(err.message || "Failed to update password.");
        } finally {
            setLoading(false);
        }
    };

    const stepLabels = ["Enter email", "Verify OTP", "New password"];
    const stepKeys: Step[] = ["email", "otp", "reset"];
    const currentIndex = stepKeys.indexOf(step);

    return (
        <div className="min-h-screen pt-32 pb-12 bg-cream flex items-center justify-center px-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-primary/10">

                <Link href="/login" className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-6 w-fit">
                    <ArrowLeft className="w-4 h-4" /> Back to sign in
                </Link>

                {/* Step indicators */}
                {step !== "done" && (
                    <div className="flex items-center gap-2 mb-8">
                        {stepLabels.map((label, i) => (
                            <div key={label} className="flex items-center gap-2">
                                <div className="flex items-center gap-1.5">
                                    <div
                                        className="flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all"
                                        style={{
                                            background: currentIndex === i ? "#1D3515" : currentIndex > i ? "#3A5D20" : "#e5e7eb",
                                            color: currentIndex >= i ? "#fff" : "#9ca3af",
                                        }}
                                    >
                                        {currentIndex > i ? "✓" : i + 1}
                                    </div>
                                    <span className="text-xs hidden sm:block" style={{ color: currentIndex === i ? "#1D3515" : "#9ca3af", fontWeight: currentIndex === i ? 600 : 400 }}>
                                        {label}
                                    </span>
                                </div>
                                {i < 2 && <div className="w-6 h-px flex-shrink-0" style={{ background: currentIndex > i ? "#3A5D20" : "#e5e7eb" }} />}
                            </div>
                        ))}
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                {/* ── Step 1: Email ── */}
                {step === "email" && (
                    <>
                        <h1 className="text-2xl font-heading font-bold text-primary mb-1">Forgot password?</h1>
                        <p className="text-sm text-gray-500 mb-6">Enter your registered email and we'll send a 6-digit verification code.</p>
                        <form onSubmit={handleSendOtp} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-primary/80 mb-1">Email Address</label>
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                    placeholder="you@example.com" />
                            </div>
                            <button type="submit" disabled={loading} className="w-full btn-primary py-3 disabled:opacity-60">
                                {loading ? "Sending code..." : "Send OTP"}
                            </button>
                        </form>
                    </>
                )}

                {/* ── Step 2: OTP ── */}
                {step === "otp" && (
                    <>
                        <h1 className="text-2xl font-heading font-bold text-primary mb-1">Check your inbox</h1>
                        <p className="text-sm text-gray-500 mb-1">
                            We sent a 6-digit code to <span className="font-semibold text-gray-700">{email}</span>
                        </p>
                        <p className="text-xs text-gray-400 mb-6">Check your spam folder if you don't see it.</p>
                        <form onSubmit={handleVerifyOtp} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-primary/80 mb-1">6-Digit Code</label>
                                <input
                                    type="text"
                                    value={otpCode}
                                    onChange={e => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                    required maxLength={6}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all tracking-[0.5em] font-mono text-center text-xl"
                                    placeholder="000000"
                                />
                            </div>
                            <button type="submit" disabled={loading || otpCode.length < 6}
                                className="w-full btn-primary py-3 disabled:opacity-60">
                                {loading ? "Verifying..." : "Verify Code"}
                            </button>
                        </form>
                        <button type="button" onClick={() => { setStep("email"); setError(null); setOtpCode(""); }}
                            className="mt-3 w-full text-center text-xs text-gray-400 underline underline-offset-2 hover:text-gray-600">
                            Didn't receive it? Go back and resend
                        </button>
                    </>
                )}

                {/* ── Step 3: New password ── */}
                {step === "reset" && (
                    <>
                        <h1 className="text-2xl font-heading font-bold text-primary mb-1">Set new password</h1>
                        <p className="text-sm text-gray-500 mb-6">Choose a strong password for your account.</p>
                        <form onSubmit={handleReset} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-primary/80 mb-1">New Password</label>
                                <div className="relative">
                                    <input type={showNew ? "text" : "password"} value={newPassword} onChange={e => setNewPassword(e.target.value)} required minLength={6}
                                        className="w-full px-4 py-3 pr-11 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                        placeholder="Min. 6 characters" />
                                    <button type="button" onClick={() => setShowNew(p => !p)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                                        {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-primary/80 mb-1">Confirm New Password</label>
                                <div className="relative">
                                    <input type={showConfirm ? "text" : "password"} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required
                                        className={`w-full px-4 py-3 pr-11 rounded-lg border outline-none transition-all ${
                                            confirmPassword && confirmPassword !== newPassword
                                                ? "border-red-400 focus:border-red-500"
                                                : "border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
                                        }`}
                                        placeholder="Repeat password" />
                                    <button type="button" onClick={() => setShowConfirm(p => !p)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                {confirmPassword && confirmPassword !== newPassword && (
                                    <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                                )}
                            </div>
                            <button type="submit" disabled={loading || (!!confirmPassword && confirmPassword !== newPassword)}
                                className="w-full btn-primary py-3 disabled:opacity-60">
                                {loading ? "Updating..." : "Update Password"}
                            </button>
                        </form>
                    </>
                )}

                {/* ── Done ── */}
                {step === "done" && (
                    <div className="text-center py-6">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                            style={{ background: "rgba(58,93,32,0.1)" }}>
                            <span className="text-3xl">✓</span>
                        </div>
                        <h1 className="text-2xl font-heading font-bold text-primary mb-2">Password Updated!</h1>
                        <p className="text-sm text-gray-500">Redirecting you to sign in...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
