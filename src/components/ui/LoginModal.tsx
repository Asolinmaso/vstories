"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Leaf, Star, ShieldCheck, ArrowRight, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase-browser";


interface LoginModalProps {
    onClose: () => void;
}

const benefits = [
    { icon: <Leaf className="w-4 h-4" />, text: "Track your herbal orders" },
    { icon: <Star className="w-4 h-4" />, text: "Exclusive member discounts" },
    { icon: <ShieldCheck className="w-4 h-4" />, text: "Save addresses & wishlist" },
];

export default function LoginModal({ onClose }: LoginModalProps) {
    const router = useRouter();
    const [tab, setTab] = useState<"login" | "signup" | "forgot">("login");

    // Shared form state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [unconfirmedEmail, setUnconfirmedEmail] = useState<string | null>(null);
    const [resendStatus, setResendStatus] = useState<"idle" | "sending" | "sent">("idle");

    // Forgot password state
    const [forgotStep, setForgotStep] = useState<"email" | "otp" | "reset">("email");
    const [forgotEmail, setForgotEmail] = useState("");
    const [otpCode, setOtpCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

    const resetForm = () => {
        setEmail(""); setPassword(""); setConfirmPassword(""); setFullName("");
        setError(null); setSuccess(null); setShowPassword(false); setShowConfirmPassword(false);
        setUnconfirmedEmail(null); setResendStatus("idle");
        setForgotStep("email"); setForgotEmail(""); setOtpCode("");
        setNewPassword(""); setConfirmNewPassword("");
        setShowNewPassword(false); setShowConfirmNewPassword(false);
    };

    const switchTab = (t: "login" | "signup" | "forgot") => { setTab(t); resetForm(); };

    const handleResendConfirmation = async () => {
        if (!unconfirmedEmail || resendStatus !== "idle") return;
        setResendStatus("sending");
        await supabase.auth.resend({ type: "signup", email: unconfirmedEmail });
        setResendStatus("sent");
    };

    // ── Login ──
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true); setError(null);
        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            if (!data.session) { setError("Could not sign in. Please confirm your email."); return; }
            onClose();
            router.refresh();
        } catch (err: any) {
            if (err.message?.toLowerCase().includes("email not confirmed")) {
                setUnconfirmedEmail(email);
                setError("Your email hasn't been confirmed. Check your inbox and click the confirmation link.");
            } else {
                setError(err.message || "Failed to login");
            }
        } finally {
            setLoading(false);
        }
    };

    // ── Signup ──
    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return;
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setLoading(true); setError(null);
        try {
            const { data, error: authError } = await supabase.auth.signUp({
                email, password,
                options: { data: { full_name: fullName } },
            });
            if (authError) throw authError;
            if (data.user) {
                await supabase.from("profiles").insert({ id: data.user.id, full_name: fullName, role: "user" });
                setSuccess("Account created! Check your email to confirm.");
            }
        } catch (err: any) {
            setError(err.message || "Failed to sign up");
        } finally {
            setLoading(false);
        }
    };

    // ── Google ──
    const handleGoogle = async () => {
        try {
            setLoading(true);
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback?next=/profile`,
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent',
                    },
                },
            });
            if (error) throw error;
        } catch (err: any) {
            setLoading(false);
            setError(err.message || "Failed to sign in with Google");
        }
    };

    // ── Forgot: Step 1 — send OTP ──
    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true); setError(null);
        try {
            const { error } = await supabase.auth.signInWithOtp({
                email: forgotEmail,
                options: { shouldCreateUser: false },
            });
            if (error) throw error;
            setForgotStep("otp");
        } catch (err: any) {
            if (err.message?.toLowerCase().includes("user not found") || err.message?.toLowerCase().includes("no user")) {
                setError("No account found with this email address.");
            } else {
                setError(err.message || "Failed to send OTP");
            }
        } finally {
            setLoading(false);
        }
    };

    // ── Forgot: Step 2 — verify OTP ──
    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true); setError(null);
        try {
            const { error } = await supabase.auth.verifyOtp({
                email: forgotEmail,
                token: otpCode,
                type: "email",
            });
            if (error) throw error;
            setForgotStep("reset");
        } catch (err: any) {
            setError("Invalid or expired code. Please check and try again.");
        } finally {
            setLoading(false);
        }
    };

    // ── Forgot: Step 3 — reset password ──
    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return;
        if (newPassword !== confirmNewPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }
        setLoading(true); setError(null);
        try {
            const { error } = await supabase.auth.updateUser({ password: newPassword });
            if (error) throw error;
            setSuccess("Password updated successfully!");
            setTimeout(() => { switchTab("login"); }, 1500);
        } catch (err: any) {
            setError(err.message || "Failed to update password");
        } finally {
            setLoading(false);
        }
    };

    const leftPanelText = {
        login: { title: "Good to see\nyou again.", sub: "Sign in to access your orders, wishlist and exclusive member offers." },
        signup: { title: "Start your\nherbal journey.", sub: "Join thousands who've switched to nature-first skincare & haircare." },
        forgot: { title: "Reset your\npassword.", sub: "We'll send a one-time code to verify your identity before you set a new password." },
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[200] flex items-center justify-center p-4"
                style={{ backgroundColor: "rgba(10,20,8,0.7)", backdropFilter: "blur(8px)" }}
                onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 24 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 24 }}
                    transition={{ type: "spring", stiffness: 340, damping: 30 }}
                    className="relative w-full max-w-[820px] rounded-3xl overflow-hidden shadow-2xl flex"
                    style={{ minHeight: 520 }}
                >
                    {/* ── Left panel ── */}
                    <div
                        className="hidden md:flex flex-col justify-between w-[42%] flex-shrink-0 p-10 relative overflow-hidden"
                        style={{ background: "linear-gradient(160deg, #1D3515 0%, #2a4a1f 60%, #3A5D20 100%)" }}
                    >
                        <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full opacity-10"
                            style={{ background: "radial-gradient(circle, #D4AF37, transparent)" }} />
                        <div className="absolute -bottom-20 -right-10 w-64 h-64 rounded-full opacity-10"
                            style={{ background: "radial-gradient(circle, #D4AF37, transparent)" }} />

                        <div>
                            <div className="flex items-center gap-2 mb-8">
                                <img src="/images/logo.png" alt="V Stories" className="w-10 h-10 rounded-full" />
                                <span className="text-white font-semibold tracking-wide text-lg">V Stories</span>
                            </div>
                            <h2 className="text-3xl font-medium leading-snug mb-3 whitespace-pre-line"
                                style={{ fontFamily: "var(--font-peachi)", color: "#ffffff", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>
                                {leftPanelText[tab].title}
                            </h2>
                            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
                                {leftPanelText[tab].sub}
                            </p>
                        </div>

                        <div className="space-y-3">
                            {benefits.map((b, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                                        style={{ background: "rgba(212,175,55,0.18)", color: "#D4AF37" }}>
                                        {b.icon}
                                    </div>
                                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.9)" }}>{b.text}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                            <div className="flex gap-0.5 mb-2">
                                {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />)}
                            </div>
                            <p className="text-xs leading-relaxed italic" style={{ color: "rgba(255,255,255,0.85)" }}>
                                "My hair transformed in 3 weeks. V Stories is the real deal."
                            </p>
                            <p className="text-xs mt-1.5" style={{ color: "rgba(255,255,255,0.6)" }}>— Priya R., Chennai</p>
                        </div>
                    </div>

                    {/* ── Right panel ── */}
                    <div className="flex-1 bg-white flex flex-col">
                        <button onClick={onClose}
                            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                            style={{ background: "rgba(0,0,0,0.06)" }}
                            aria-label="Close">
                            <X className="w-4 h-4 text-gray-500" />
                        </button>

                        <div className="flex-1 flex flex-col justify-center px-8 py-10 md:px-10">

                            {/* ═══════════════════════════════════════
                                FORGOT PASSWORD FLOW
                            ═══════════════════════════════════════ */}
                            {tab === "forgot" && (
                                <>
                                    <button onClick={() => switchTab("login")}
                                        className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition-colors mb-6 w-fit">
                                        <ArrowLeft className="w-3.5 h-3.5" /> Back to sign in
                                    </button>

                                    {/* Step indicators */}
                                    <div className="flex items-center gap-2 mb-6">
                                        {(["email", "otp", "reset"] as const).map((s, i) => (
                                            <div key={s} className="flex items-center gap-2">
                                                <div className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold transition-all"
                                                    style={{
                                                        background: forgotStep === s ? "#1D3515" : (["email", "otp", "reset"].indexOf(forgotStep) > i ? "#3A5D20" : "#e5e7eb"),
                                                        color: forgotStep === s || ["email", "otp", "reset"].indexOf(forgotStep) > i ? "#fff" : "#9ca3af"
                                                    }}>
                                                    {["email", "otp", "reset"].indexOf(forgotStep) > i ? "✓" : i + 1}
                                                </div>
                                                {i < 2 && <div className="w-8 h-px" style={{ background: ["email", "otp", "reset"].indexOf(forgotStep) > i ? "#3A5D20" : "#e5e7eb" }} />}
                                            </div>
                                        ))}
                                        <span className="text-xs text-gray-400 ml-1">
                                            {forgotStep === "email" ? "Enter email" : forgotStep === "otp" ? "Verify OTP" : "New password"}
                                        </span>
                                    </div>

                                    {/* Alerts */}
                                    {error && (
                                        <div className="flex items-start gap-2 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl mb-4 text-sm">
                                            <span className="mt-0.5">⚠</span> {error}
                                        </div>
                                    )}
                                    {success && (
                                        <div className="flex items-start gap-2 bg-green-50 border border-green-100 text-green-700 px-4 py-3 rounded-xl mb-4 text-sm">
                                            <span className="mt-0.5">✓</span> {success}
                                        </div>
                                    )}

                                    {/* Step 1: Email */}
                                    {forgotStep === "email" && (
                                        <>
                                            <h3 className="text-2xl font-semibold text-gray-900 mb-1">Forgot password?</h3>
                                            <p className="text-sm text-gray-400 mb-6">Enter your email and we'll send a 6-digit code</p>
                                            <form onSubmit={handleSendOtp} className="space-y-4">
                                                <div>
                                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email</label>
                                                    <input type="email" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} required
                                                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                                                        style={{ borderColor: "#e5e7eb" }}
                                                        onFocus={e => e.currentTarget.style.borderColor = "#1D3515"}
                                                        onBlur={e => e.currentTarget.style.borderColor = "#e5e7eb"}
                                                        placeholder="you@example.com" />
                                                </div>
                                                <button type="submit" disabled={loading}
                                                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-all"
                                                    style={{ background: loading ? "#6b7280" : "linear-gradient(135deg, #1D3515 0%, #3A5D20 100%)", boxShadow: loading ? "none" : "0 4px 16px rgba(29,53,21,0.35)" }}>
                                                    {loading ? "Sending code..." : <><span>Send OTP</span><ArrowRight className="w-4 h-4" /></>}
                                                </button>
                                            </form>
                                        </>
                                    )}

                                    {/* Step 2: OTP */}
                                    {forgotStep === "otp" && (
                                        <>
                                            <h3 className="text-2xl font-semibold text-gray-900 mb-1">Check your email</h3>
                                            <p className="text-sm text-gray-400 mb-1">
                                                We sent a 6-digit code to <span className="font-medium text-gray-600">{forgotEmail}</span>
                                            </p>
                                            <p className="text-xs text-gray-400 mb-6">Check your spam folder if you don't see it</p>
                                            <form onSubmit={handleVerifyOtp} className="space-y-4">
                                                <div>
                                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">6-Digit Code</label>
                                                    <input
                                                        type="text"
                                                        value={otpCode}
                                                        onChange={e => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                                        required
                                                        maxLength={6}
                                                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all tracking-[0.4em] font-mono text-center text-lg"
                                                        style={{ borderColor: "#e5e7eb" }}
                                                        onFocus={e => e.currentTarget.style.borderColor = "#1D3515"}
                                                        onBlur={e => e.currentTarget.style.borderColor = "#e5e7eb"}
                                                        placeholder="000000" />
                                                </div>
                                                <button type="submit" disabled={loading || otpCode.length < 6}
                                                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-60"
                                                    style={{ background: loading ? "#6b7280" : "linear-gradient(135deg, #1D3515 0%, #3A5D20 100%)", boxShadow: "0 4px 16px rgba(29,53,21,0.35)" }}>
                                                    {loading ? "Verifying..." : <><span>Verify Code</span><ArrowRight className="w-4 h-4" /></>}
                                                </button>
                                            </form>
                                            <button type="button" onClick={() => { setForgotStep("email"); setError(null); setOtpCode(""); }}
                                                className="mt-3 text-xs text-gray-400 underline underline-offset-2 hover:text-gray-600 w-full text-center">
                                                Didn't receive it? Go back and resend
                                            </button>
                                        </>
                                    )}

                                    {/* Step 3: New password */}
                                    {forgotStep === "reset" && (
                                        <>
                                            <h3 className="text-2xl font-semibold text-gray-900 mb-1">Set new password</h3>
                                            <p className="text-sm text-gray-400 mb-6">Choose a strong password for your account</p>
                                            <form onSubmit={handleResetPassword} className="space-y-4">
                                                <div>
                                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">New Password</label>
                                                    <div className="relative">
                                                        <input type={showNewPassword ? "text" : "password"} value={newPassword} onChange={e => setNewPassword(e.target.value)} required minLength={6}
                                                            className="w-full px-4 py-3 pr-11 rounded-xl border text-sm outline-none transition-all"
                                                            style={{ borderColor: "#e5e7eb" }}
                                                            onFocus={e => e.currentTarget.style.borderColor = "#1D3515"}
                                                            onBlur={e => e.currentTarget.style.borderColor = "#e5e7eb"}
                                                            placeholder="Min. 6 characters" />
                                                        <button type="button" onClick={() => setShowNewPassword(p => !p)}
                                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                                                            {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Confirm New Password</label>
                                                    <div className="relative">
                                                        <input type={showConfirmNewPassword ? "text" : "password"} value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} required
                                                            className="w-full px-4 py-3 pr-11 rounded-xl border text-sm outline-none transition-all"
                                                            style={{ borderColor: confirmNewPassword && confirmNewPassword !== newPassword ? "#ef4444" : "#e5e7eb" }}
                                                            onFocus={e => e.currentTarget.style.borderColor = confirmNewPassword !== newPassword ? "#ef4444" : "#1D3515"}
                                                            onBlur={e => e.currentTarget.style.borderColor = confirmNewPassword && confirmNewPassword !== newPassword ? "#ef4444" : "#e5e7eb"}
                                                            placeholder="Repeat password" />
                                                        <button type="button" onClick={() => setShowConfirmNewPassword(p => !p)}
                                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                                                            {showConfirmNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                        </button>
                                                    </div>
                                                    {confirmNewPassword && confirmNewPassword !== newPassword && (
                                                        <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                                                    )}
                                                </div>
                                                <button type="submit" disabled={loading || newPassword !== confirmNewPassword}
                                                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-60"
                                                    style={{ background: loading ? "#6b7280" : "linear-gradient(135deg, #1D3515 0%, #3A5D20 100%)", boxShadow: "0 4px 16px rgba(29,53,21,0.35)" }}>
                                                    {loading ? "Updating..." : <><span>Update Password</span><ArrowRight className="w-4 h-4" /></>}
                                                </button>
                                            </form>
                                        </>
                                    )}
                                </>
                            )}

                            {/* ═══════════════════════════════════════
                                LOGIN / SIGNUP FLOW
                            ═══════════════════════════════════════ */}
                            {tab !== "forgot" && (
                                <>
                                    {/* Tab switcher */}
                                    <div className="flex gap-1 p-1 rounded-xl mb-8 w-fit"
                                        style={{ background: "#f3f0eb" }}>
                                        {(["login", "signup"] as const).map(t => (
                                            <button key={t} onClick={() => switchTab(t)}
                                                className="px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                                                style={tab === t
                                                    ? { background: "#1D3515", color: "#fff", boxShadow: "0 2px 8px rgba(29,53,21,0.25)" }
                                                    : { color: "#6b7280" }}>
                                                {t === "login" ? "Sign In" : "Sign Up"}
                                            </button>
                                        ))}
                                    </div>

                                    <h3 className="text-2xl font-semibold text-gray-900 mb-1">
                                        {tab === "login" ? "Welcome back" : "Create account"}
                                    </h3>
                                    <p className="text-sm text-gray-400 mb-6">
                                        {tab === "login" ? "Enter your credentials to continue" : "It's free and takes 30 seconds"}
                                    </p>

                                    {/* Alerts */}
                                    {error && (
                                        <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl mb-4 text-sm">
                                            <div className="flex items-start gap-2">
                                                <span className="mt-0.5">⚠</span> {error}
                                            </div>
                                            {unconfirmedEmail && (
                                                <button type="button" onClick={handleResendConfirmation} disabled={resendStatus !== "idle"}
                                                    className="mt-2 text-xs font-semibold underline underline-offset-2 disabled:opacity-60">
                                                    {resendStatus === "sending" ? "Sending..." : resendStatus === "sent" ? "✓ Confirmation email sent!" : "Resend confirmation email →"}
                                                </button>
                                            )}
                                        </div>
                                    )}
                                    {success && (
                                        <div className="flex items-start gap-2 bg-green-50 border border-green-100 text-green-700 px-4 py-3 rounded-xl mb-4 text-sm">
                                            <span className="mt-0.5">✓</span> {success}
                                        </div>
                                    )}

                                    {/* Google */}
                                    <button onClick={handleGoogle}
                                        className="w-full flex items-center justify-center gap-3 py-2.5 rounded-xl border text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all mb-5"
                                        style={{ borderColor: "#e5e7eb" }}>
                                        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                                        Continue with Google
                                    </button>

                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="flex-1 h-px bg-gray-100" />
                                        <span className="text-xs text-gray-400">or with email</span>
                                        <div className="flex-1 h-px bg-gray-100" />
                                    </div>

                                    {/* Form */}
                                    <form onSubmit={tab === "login" ? handleLogin : handleSignup} className="space-y-4">
                                        {tab === "signup" && (
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Full Name</label>
                                                <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required
                                                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                                                    style={{ borderColor: "#e5e7eb" }}
                                                    onFocus={e => e.currentTarget.style.borderColor = "#1D3515"}
                                                    onBlur={e => e.currentTarget.style.borderColor = "#e5e7eb"}
                                                    placeholder="Your full name" />
                                            </div>
                                        )}
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email</label>
                                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                                                className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                                                style={{ borderColor: "#e5e7eb" }}
                                                onFocus={e => e.currentTarget.style.borderColor = "#1D3515"}
                                                onBlur={e => e.currentTarget.style.borderColor = "#e5e7eb"}
                                                placeholder="you@example.com" />
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-between mb-1.5">
                                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Password</label>
                                                {tab === "login" && (
                                                    <button type="button" onClick={() => switchTab("forgot")}
                                                        className="text-xs font-medium hover:underline"
                                                        style={{ color: "#1D3515" }}>
                                                        Forgot password?
                                                    </button>
                                                )}
                                            </div>
                                            <div className="relative">
                                                <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required
                                                    className="w-full px-4 py-3 pr-11 rounded-xl border text-sm outline-none transition-all"
                                                    style={{ borderColor: "#e5e7eb" }}
                                                    onFocus={e => e.currentTarget.style.borderColor = "#1D3515"}
                                                    onBlur={e => e.currentTarget.style.borderColor = "#e5e7eb"}
                                                    placeholder="••••••••" />
                                                <button type="button" onClick={() => setShowPassword(p => !p)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Confirm password — signup only */}
                                        {tab === "signup" && (
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Confirm Password</label>
                                                <div className="relative">
                                                    <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required
                                                        className="w-full px-4 py-3 pr-11 rounded-xl border text-sm outline-none transition-all"
                                                        style={{ borderColor: confirmPassword && confirmPassword !== password ? "#ef4444" : "#e5e7eb" }}
                                                        onFocus={e => e.currentTarget.style.borderColor = confirmPassword !== password ? "#ef4444" : "#1D3515"}
                                                        onBlur={e => e.currentTarget.style.borderColor = confirmPassword && confirmPassword !== password ? "#ef4444" : "#e5e7eb"}
                                                        placeholder="Repeat password" />
                                                    <button type="button" onClick={() => setShowConfirmPassword(p => !p)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                                                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                                {confirmPassword && confirmPassword !== password && (
                                                    <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                                                )}
                                            </div>
                                        )}

                                        <button type="submit" disabled={loading || (tab === "signup" && !!confirmPassword && confirmPassword !== password)}
                                            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-all mt-2 disabled:opacity-60"
                                            style={{
                                                background: loading ? "#6b7280" : "linear-gradient(135deg, #1D3515 0%, #3A5D20 100%)",
                                                boxShadow: loading ? "none" : "0 4px 16px rgba(29,53,21,0.35)"
                                            }}>
                                            {loading ? (
                                                <span className="flex items-center gap-2">
                                                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                                    </svg>
                                                    {tab === "login" ? "Signing in..." : "Creating account..."}
                                                </span>
                                            ) : (
                                                <>
                                                    {tab === "login" ? "Sign In" : "Create Account"}
                                                    <ArrowRight className="w-4 h-4" />
                                                </>
                                            )}
                                        </button>
                                    </form>

                                    <p className="text-center text-xs text-gray-400 mt-5">
                                        {tab === "login" ? "Don't have an account? " : "Already have an account? "}
                                        <button onClick={() => switchTab(tab === "login" ? "signup" : "login")}
                                            className="font-semibold underline underline-offset-2"
                                            style={{ color: "#1D3515" }}>
                                            {tab === "login" ? "Sign up free" : "Sign in"}
                                        </button>
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
