"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase-browser";
import {
    AuthFieldErrors,
    hasFieldErrors,
    validateEmailField,
    validateLoginForm,
    validatePasswordField,
    validateSignupForm,
} from "@/lib/auth-validation";

interface LoginModalProps {
    onClose: () => void;
    initialTab?: "login" | "signup";
}

function UnderlineInput({
    type = "text",
    placeholder,
    value,
    onChange,
    required,
    maxLength,
    className = "",
    error,
    autoComplete,
}: {
    type?: string;
    placeholder: string;
    value: string;
    onChange: (v: string) => void;
    required?: boolean;
    maxLength?: number;
    className?: string;
    error?: string;
    autoComplete?: string;
}) {
    return (
        <div className="w-full">
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required={required}
                maxLength={maxLength}
                autoComplete={autoComplete}
                aria-invalid={!!error}
                className={`w-full bg-transparent border-0 border-b px-2.5 py-2.5 text-base text-black placeholder:text-[#8F8F8F] outline-none font-[family-name:var(--font-poppins)] ${
                    error ? "border-red-400" : "border-[#8F8F8F]"
                } ${className}`}
            />
            {error && <p className="mt-1.5 text-xs text-red-600 font-[family-name:var(--font-inter)]">{error}</p>}
        </div>
    );
}

function GoogleIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M19.6 10.2273C19.6 9.51818 19.5364 8.83636 19.4182 8.18182H10V12.05H15.3818C15.15 13.3 14.4455 14.3591 13.3864 15.0682V17.5773H16.6182C18.5091 15.8364 19.6 13.2727 19.6 10.2273Z" fill="#4285F4" />
            <path d="M10 20C12.7 20 14.9636 19.1045 16.6182 17.5773L13.3864 15.0682C12.4909 15.6682 11.3455 16.0227 10 16.0227C7.39545 16.0227 5.19091 14.2636 4.40455 11.9H1.06364V14.4909C2.70909 17.7591 6.09091 20 10 20Z" fill="#34A853" />
            <path d="M4.40455 11.9C4.20455 11.3 4.09091 10.6591 4.09091 10C4.09091 9.34091 4.20455 8.7 4.40455 8.1V5.50909H1.06364C0.386364 6.85909 0 8.38636 0 10C0 11.6136 0.386364 13.1409 1.06364 14.4909L4.40455 11.9Z" fill="#FBBC05" />
            <path d="M10 3.97727C11.3455 3.97727 12.4909 4.33182 13.3864 4.93182L16.0182 2.3C14.9591 1.34091 12.7 0.454545 10 0.454545C6.09091 0.454545 2.70909 2.69545 1.06364 5.96364L4.40455 8.55455C5.19091 6.19091 7.39545 4.43182 10 4.43182V3.97727Z" fill="#EA4335" />
        </svg>
    );
}

export default function LoginModal({ onClose, initialTab = "login" }: LoginModalProps) {
    const router = useRouter();
    const [tab, setTab] = useState<"login" | "signup" | "forgot">(initialTab);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<AuthFieldErrors>({});
    const [unconfirmedEmail, setUnconfirmedEmail] = useState<string | null>(null);
    const [resendStatus, setResendStatus] = useState<"idle" | "sending" | "sent">("idle");

    const [forgotStep, setForgotStep] = useState<"email" | "otp" | "reset">("email");
    const [forgotEmail, setForgotEmail] = useState("");
    const [otpCode, setOtpCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

    useEffect(() => {
        setTab(initialTab);
    }, [initialTab]);

    const clearFieldError = (field: keyof AuthFieldErrors) => {
        setFieldErrors((prev) => {
            if (!prev[field]) return prev;
            const next = { ...prev };
            delete next[field];
            return next;
        });
    };

    const resetForm = () => {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setFullName("");
        setError(null);
        setSuccess(null);
        setFieldErrors({});
        setShowPassword(false);
        setShowConfirmPassword(false);
        setUnconfirmedEmail(null);
        setResendStatus("idle");
        setForgotStep("email");
        setForgotEmail("");
        setOtpCode("");
        setNewPassword("");
        setConfirmNewPassword("");
        setShowNewPassword(false);
        setShowConfirmNewPassword(false);
    };

    const switchTab = (t: "login" | "signup" | "forgot") => {
        setTab(t);
        resetForm();
    };

    const handleResendConfirmation = async () => {
        if (!unconfirmedEmail || resendStatus !== "idle") return;
        setResendStatus("sending");
        await supabase.auth.resend({ type: "signup", email: unconfirmedEmail });
        setResendStatus("sent");
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return;

        const errors = validateLoginForm(email, password);
        setFieldErrors(errors);
        if (hasFieldErrors(errors)) return;

        setLoading(true);
        setError(null);
        try {
            const { data, error: authError } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password,
            });
            if (authError) throw authError;
            if (!data.session) {
                setError("Could not sign in. Please confirm your email.");
                return;
            }
            onClose();
            router.refresh();
            const redirect = new URLSearchParams(window.location.search).get("redirect");
            if (redirect && redirect.startsWith("/") && !redirect.startsWith("//")) {
                router.push(redirect);
            }
        } catch (err: any) {
            if (err.message?.toLowerCase().includes("email not confirmed")) {
                setUnconfirmedEmail(email.trim());
                setError("Your email hasn't been confirmed. Check your inbox and click the confirmation link.");
            } else if (err.message?.toLowerCase().includes("invalid login credentials")) {
                setError("Invalid email or password. Please try again.");
            } else {
                setError(err.message || "Failed to login");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return;

        const errors = validateSignupForm(fullName, email, password, confirmPassword);
        setFieldErrors(errors);
        if (hasFieldErrors(errors)) return;

        setLoading(true);
        setError(null);
        try {
            const { data, error: authError } = await supabase.auth.signUp({
                email: email.trim(),
                password,
                options: { data: { full_name: fullName.trim() } },
            });
            if (authError) throw authError;
            if (data.user) {
                await supabase.from("profiles").insert({
                    id: data.user.id,
                    full_name: fullName.trim(),
                    role: "user",
                });
                setSuccess("Account created! Check your email to confirm.");
            }
        } catch (err: any) {
            setError(err.message || "Failed to sign up");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogle = async () => {
        try {
            setLoading(true);
            const redirect = new URLSearchParams(window.location.search).get("redirect");
            const safeRedirect =
                redirect && redirect.startsWith("/") && !redirect.startsWith("//")
                    ? redirect
                    : window.location.pathname;
            const { error: authError } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(safeRedirect)}`,
                    queryParams: {
                        access_type: "offline",
                        prompt: "consent",
                    },
                },
            });
            if (authError) throw authError;
        } catch (err: any) {
            setLoading(false);
            setError(err.message || "Failed to sign in with Google");
        }
    };

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return;

        const emailError = validateEmailField(forgotEmail);
        if (emailError) {
            setFieldErrors({ email: emailError });
            return;
        }

        setLoading(true);
        setError(null);
        setFieldErrors({});
        try {
            const { error: authError } = await supabase.auth.signInWithOtp({
                email: forgotEmail.trim(),
                options: { shouldCreateUser: false },
            });
            if (authError) throw authError;
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

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return;
        if (otpCode.length < 6) {
            setFieldErrors({ password: "Please enter the 6-digit code." });
            return;
        }

        setLoading(true);
        setError(null);
        setFieldErrors({});
        try {
            const { error: authError } = await supabase.auth.verifyOtp({
                email: forgotEmail.trim(),
                token: otpCode,
                type: "email",
            });
            if (authError) throw authError;
            setForgotStep("reset");
        } catch {
            setError("Invalid or expired code. Please check and try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return;

        const errors: AuthFieldErrors = {};
        const passwordError = validatePasswordField(newPassword, "New password");
        if (passwordError) errors.password = passwordError;
        if (!confirmNewPassword) {
            errors.confirmPassword = "Please confirm your new password.";
        } else if (newPassword !== confirmNewPassword) {
            errors.confirmPassword = "Passwords do not match.";
        }

        setFieldErrors(errors);
        if (hasFieldErrors(errors)) return;

        setLoading(true);
        setError(null);
        try {
            const { error: authError } = await supabase.auth.updateUser({ password: newPassword });
            if (authError) throw authError;
            setSuccess("Password updated successfully!");
            setTimeout(() => switchTab("login"), 1500);
        } catch (err: any) {
            setError(err.message || "Failed to update password");
        } finally {
            setLoading(false);
        }
    };

    const welcomeName = email.includes("@")
        ? email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1)
        : "";

    const heading =
        tab === "forgot"
            ? "Reset Your Password"
            : tab === "signup"
              ? "Create Your Account"
              : welcomeName
                ? `Welcome Back ${welcomeName}!`
                : "Welcome Back!";

    const subtitle =
        tab === "forgot"
            ? "Enter your email to receive a verification code."
            : tab === "signup"
              ? "Create your account to continue."
              : "Enter Your Credentials To Continue.";

    const primaryLabel =
        tab === "forgot"
            ? forgotStep === "email"
                ? "Send OTP"
                : forgotStep === "otp"
                  ? "Verify Code"
                  : "Update Password"
            : tab === "signup"
              ? "Create Account"
              : "Continue";

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center sm:p-4"
                style={{ backgroundColor: "rgba(10,20,8,0.65)", backdropFilter: "blur(8px)" }}
                onClick={(e) => {
                    if (e.target === e.currentTarget) onClose();
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ type: "spring", stiffness: 340, damping: 30 }}
                    className="relative flex w-full max-w-[1074px] flex-col md:flex-row overflow-hidden rounded-t-[20px] sm:rounded-[24px] md:rounded-[40px] bg-[#FCFAF4] shadow-2xl h-[100dvh] sm:h-auto sm:max-h-[92vh] md:max-h-[90vh] md:min-h-[720px]"
                >
                    {/* Left visual panel — desktop only */}
                    <div className="relative hidden md:block w-[43%] max-w-[464px] shrink-0 overflow-hidden bg-[#1D3B29]">
                        <Image
                            src="/images/login-modal.png"
                            alt="V Stories herbal login"
                            width={1074}
                            height={720}
                            className="absolute left-0 top-0 h-full w-[1074px] max-w-none object-cover object-left"
                            priority
                        />
                    </div>

                    {/* Right form panel */}
                    <div className="relative flex flex-1 flex-col bg-[#FCFAF4] min-h-0 overflow-hidden">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/5 transition-colors hover:bg-black/10 sm:top-5 sm:right-5"
                            aria-label="Close"
                        >
                            <X className="h-4 w-4 text-gray-500" />
                        </button>

                        <div className="flex flex-1 flex-col overflow-y-auto overscroll-contain min-h-0">
                            <div className="flex flex-1 flex-col justify-start px-4 pb-6 pt-14 sm:justify-center sm:px-10 sm:py-10 md:px-12 lg:px-14">
                                <div className="mx-auto flex w-full max-w-[461px] flex-col gap-5 sm:gap-8">
                                    {tab === "forgot" && (
                                        <button
                                            type="button"
                                            onClick={() => switchTab("login")}
                                            className="flex w-fit items-center gap-1.5 text-sm text-black/60 transition-colors hover:text-black"
                                        >
                                            <ArrowLeft className="h-4 w-4" />
                                            Back to sign in
                                        </button>
                                    )}

                                    <div className="flex flex-col gap-1.5 sm:gap-2">
                                        <h2
                                            className="text-[22px] leading-tight font-semibold text-black sm:text-[28px] md:text-[32px] md:leading-[43px] pr-8"
                                            style={{ fontFamily: "var(--font-playfair)" }}
                                        >
                                            {heading}
                                        </h2>
                                        <p className="text-sm leading-relaxed text-black sm:text-base sm:leading-[19px] font-[family-name:var(--font-inter)]">
                                            {subtitle}
                                        </p>
                                    </div>

                                    {error && (
                                        <div className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                                            {error}
                                            {unconfirmedEmail && (
                                                <button
                                                    type="button"
                                                    onClick={handleResendConfirmation}
                                                    disabled={resendStatus !== "idle"}
                                                    className="mt-2 block text-xs font-semibold underline underline-offset-2 disabled:opacity-60"
                                                >
                                                    {resendStatus === "sending"
                                                        ? "Sending..."
                                                        : resendStatus === "sent"
                                                          ? "Confirmation email sent!"
                                                          : "Resend confirmation email"}
                                                </button>
                                            )}
                                        </div>
                                    )}

                                    {success && (
                                        <div className="rounded-lg border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-700">
                                            {success}
                                        </div>
                                    )}

                                    <form
                                        noValidate
                                        onSubmit={
                                            tab === "login"
                                                ? handleLogin
                                                : tab === "signup"
                                                  ? handleSignup
                                                  : forgotStep === "email"
                                                    ? handleSendOtp
                                                    : forgotStep === "otp"
                                                      ? handleVerifyOtp
                                                      : handleResetPassword
                                        }
                                        className="flex flex-col gap-5 sm:gap-8"
                                    >
                                        <div className="flex flex-col gap-4 sm:gap-6">
                                            <div className="flex flex-col gap-4 sm:gap-6">
                                                {tab === "signup" && (
                                                    <UnderlineInput
                                                        placeholder="Full Name"
                                                        value={fullName}
                                                        onChange={(v) => {
                                                            setFullName(v);
                                                            clearFieldError("fullName");
                                                        }}
                                                        error={fieldErrors.fullName}
                                                        autoComplete="name"
                                                    />
                                                )}

                                                {tab === "forgot" ? (
                                                    forgotStep === "email" ? (
                                                        <UnderlineInput
                                                            type="email"
                                                            placeholder="Email"
                                                            value={forgotEmail}
                                                            onChange={(v) => {
                                                                setForgotEmail(v);
                                                                clearFieldError("email");
                                                            }}
                                                            error={fieldErrors.email}
                                                            autoComplete="email"
                                                        />
                                                    ) : forgotStep === "otp" ? (
                                                        <UnderlineInput
                                                            placeholder="6-Digit Code"
                                                            value={otpCode}
                                                            onChange={(v) => {
                                                                setOtpCode(v.replace(/\D/g, "").slice(0, 6));
                                                                clearFieldError("password");
                                                            }}
                                                            maxLength={6}
                                                            error={fieldErrors.password}
                                                            className="tracking-[0.35em] text-center"
                                                        />
                                                    ) : (
                                                        <>
                                                            <div className="relative">
                                                                <UnderlineInput
                                                                    type={showNewPassword ? "text" : "password"}
                                                                    placeholder="New Password"
                                                                    value={newPassword}
                                                                    onChange={(v) => {
                                                                        setNewPassword(v);
                                                                        clearFieldError("password");
                                                                    }}
                                                                    error={fieldErrors.password}
                                                                    autoComplete="new-password"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setShowNewPassword((p) => !p)}
                                                                    className="absolute right-2 top-3 text-[#8F8F8F]"
                                                                    aria-label={showNewPassword ? "Hide password" : "Show password"}
                                                                >
                                                                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                                </button>
                                                            </div>
                                                            <div className="relative">
                                                                <UnderlineInput
                                                                    type={showConfirmNewPassword ? "text" : "password"}
                                                                    placeholder="Confirm Password"
                                                                    value={confirmNewPassword}
                                                                    onChange={(v) => {
                                                                        setConfirmNewPassword(v);
                                                                        clearFieldError("confirmPassword");
                                                                    }}
                                                                    error={fieldErrors.confirmPassword}
                                                                    autoComplete="new-password"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setShowConfirmNewPassword((p) => !p)}
                                                                    className="absolute right-2 top-3 text-[#8F8F8F]"
                                                                    aria-label={showConfirmNewPassword ? "Hide password" : "Show password"}
                                                                >
                                                                    {showConfirmNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                                </button>
                                                            </div>
                                                        </>
                                                    )
                                                ) : (
                                                    <>
                                                        <UnderlineInput
                                                            type="email"
                                                            placeholder="Email"
                                                            value={email}
                                                            onChange={(v) => {
                                                                setEmail(v);
                                                                clearFieldError("email");
                                                            }}
                                                            error={fieldErrors.email}
                                                            autoComplete="email"
                                                        />

                                                        <div className="flex flex-col gap-4 sm:gap-6">
                                                            <div className="relative">
                                                                <UnderlineInput
                                                                    type={showPassword ? "text" : "password"}
                                                                    placeholder="Password"
                                                                    value={password}
                                                                    onChange={(v) => {
                                                                        setPassword(v);
                                                                        clearFieldError("password");
                                                                    }}
                                                                    error={fieldErrors.password}
                                                                    autoComplete={tab === "signup" ? "new-password" : "current-password"}
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setShowPassword((p) => !p)}
                                                                    className="absolute right-2 top-3 text-[#8F8F8F]"
                                                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                                                >
                                                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                                </button>
                                                            </div>

                                                            {tab === "login" && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => switchTab("forgot")}
                                                                    className="text-right text-sm leading-[19px] text-black underline sm:text-base font-[family-name:var(--font-inter)]"
                                                                >
                                                                    Forgot Password?
                                                                </button>
                                                            )}
                                                        </div>

                                                        {tab === "signup" && (
                                                            <div className="relative">
                                                                <UnderlineInput
                                                                    type={showConfirmPassword ? "text" : "password"}
                                                                    placeholder="Confirm Password"
                                                                    value={confirmPassword}
                                                                    onChange={(v) => {
                                                                        setConfirmPassword(v);
                                                                        clearFieldError("confirmPassword");
                                                                    }}
                                                                    error={fieldErrors.confirmPassword}
                                                                    autoComplete="new-password"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setShowConfirmPassword((p) => !p)}
                                                                    className="absolute right-2 top-3 text-[#8F8F8F]"
                                                                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                                                >
                                                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                                </button>
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="flex h-11 sm:h-12 w-full items-center justify-center rounded-lg px-2.5 text-sm sm:text-base font-semibold transition-opacity disabled:opacity-60 font-[family-name:var(--font-poppins)]"
                                                style={{ backgroundColor: "#1D3B29", color: "#F7EDE2" }}
                                            >
                                                {loading ? "Please wait..." : primaryLabel}
                                            </button>
                                        </div>
                                    </form>

                                    {tab !== "forgot" && (
                                        <div className="flex flex-col items-center gap-4 sm:gap-6 pb-2">
                                            <div className="relative w-full">
                                                <div className="absolute inset-x-0 top-1/2 h-px bg-black" />
                                                <div className="relative mx-auto w-fit bg-[#FCFAF4] px-2.5">
                                                    <span className="text-xs leading-[15px] text-black font-[family-name:var(--font-inter)]">
                                                        or continue with
                                                    </span>
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={handleGoogle}
                                                disabled={loading}
                                                className="flex h-11 sm:h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#8F8F8F] px-2.5 transition-colors hover:bg-gray-50 disabled:opacity-60"
                                                style={{ backgroundColor: "#FFFFFF", color: "#000000" }}
                                            >
                                                <GoogleIcon />
                                                <span className="text-sm sm:text-base leading-6 text-black font-[family-name:var(--font-poppins)]">
                                                    {tab === "signup" ? "Sign Up With Google" : "Login With Google"}
                                                </span>
                                            </button>

                                            <p className="text-center text-sm leading-[19px] text-black sm:text-base font-[family-name:var(--font-inter)]">
                                                {tab === "login" ? "Dont Have An Account? " : "Already Have An Account? "}
                                                <button
                                                    type="button"
                                                    onClick={() => switchTab(tab === "login" ? "signup" : "login")}
                                                    className="underline"
                                                >
                                                    {tab === "login" ? "Sign Up" : "Sign In"}
                                                </button>
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
