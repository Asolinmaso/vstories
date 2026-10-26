"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCartStore } from "@/lib/store";
import { calculateOrderTotal } from "@/lib/order-pricing";
import { ShoppingBag, CreditCard, Loader2, Tag, ChevronLeft, Truck, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AddressSelection from "@/components/checkout/AddressSelection";
import { toast } from "sonner";

declare global {
    interface Window {
        Razorpay: any;
    }
}

const RAZORPAY_SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";

// Resolves true once Razorpay Checkout is usable, false if it could not load
// (offline, blocked by an ad blocker, etc.) so the caller can tell the user.
function loadRazorpay(): Promise<boolean> {
    return new Promise((resolve) => {
        if (typeof window === "undefined") return resolve(false);
        if (window.Razorpay) return resolve(true);

        let script = document.querySelector<HTMLScriptElement>(`script[src="${RAZORPAY_SCRIPT}"]`);
        if (!script) {
            script = document.createElement("script");
            script.src = RAZORPAY_SCRIPT;
            script.async = true;
            document.body.appendChild(script);
        }
        const el = script;
        el.addEventListener("load", () => resolve(!!window.Razorpay));
        el.addEventListener("error", () => {
            el.remove(); // allow a clean retry on the next attempt
            resolve(false);
        });
    });
}

// Tell the server a payment attempt did not go through, so the order is not
// left "pending". The server double-checks with Razorpay and answers
// { status: "paid" } if the money was in fact captured.
async function reportUnpaid(
    razorpayOrderId: string,
    reason: "failed" | "cancelled"
): Promise<{ status?: string; orderId?: string }> {
    try {
        const res = await fetch("/api/payment/fail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ razorpay_order_id: razorpayOrderId, reason }),
            keepalive: true,
        });
        return await res.json();
    } catch {
        return {};
    }
}

export default function CheckoutPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const { items, getTotal, clearCart } = useCartStore();

    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<any>(null);
    const [couponCode, setCouponCode] = useState("");
    // Set once an order is placed so emptying the cart doesn't flash the empty state
    const orderPlacedRef = useRef(false);

    const subtotal = getTotal();
    const { shippingFee, total } = calculateOrderTotal(subtotal);
    const discount = 0;

    useEffect(() => {
        setMounted(true);
        // Warm up the payment script so the popup opens instantly on "Pay"
        void loadRazorpay();
    }, []);

    // Wait for the session to be restored before deciding the user is signed out
    useEffect(() => {
        if (authLoading || orderPlacedRef.current) return;
        if (!user) {
            router.replace("/?login=1&redirect=/checkout");
        }
    }, [authLoading, user, router]);

    const finishOrder = async (orderId: string) => {
        orderPlacedRef.current = true;
        router.push(`/order-success?orderId=${orderId}`);
        await clearCart();
    };

    const handleCheckout = async () => {
        if (loading) return;

        if (!selectedAddress) {
            toast.error("Please add a delivery address to continue");
            return;
        }

        setLoading(true);

        try {
            // Step 1: Create order on server (prices are recalculated there)
            const response = await fetch("/api/payment/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: total,
                    items: items.map(item => ({
                        id: item.id,
                        quantity: item.quantity,
                        size: item.size,
                    })),
                    shippingAddress: selectedAddress,
                }),
            });

            const data = await response.json().catch(() => ({}));

            if (response.status === 401) {
                toast.error("Your session has expired. Please login again.");
                router.replace("/?login=1&redirect=/checkout");
                return;
            }

            if (response.status === 409 && data.code === "AMOUNT_MISMATCH") {
                // Refresh cart prices from the server so the next attempt matches
                await useCartStore.getState().syncCart();
                throw new Error(data.error);
            }

            if (!response.ok || !data.success) {
                throw new Error(data.error || "Failed to create order");
            }

            // Step 2: Open Razorpay checkout
            const razorpayReady = await loadRazorpay();
            if (!razorpayReady) {
                void reportUnpaid(data.orderId, "cancelled");
                throw new Error("Could not load the payment gateway. Please check your internet connection (or disable any ad blocker) and try again.");
            }

            let paymentCompleted = false;

            // On phones, let Razorpay redirect back to us after paying. Switching to
            // a UPI app or an in-app browser can lose the popup's JavaScript callback.
            const useRedirect = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

            const options: Record<string, any> = {
                ...(useRedirect
                    ? { redirect: true, callback_url: `${window.location.origin}/api/payment/callback` }
                    : {}),
                key: data.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: data.amount,
                currency: data.currency,
                name: "V STORIES",
                description: "Premium Herbal Products",
                image: `${window.location.origin}/images/logo.png`,
                order_id: data.orderId,
                handler: async function (response: any) {
                    paymentCompleted = true;
                    try {
                        const verifyResponse = await fetch("/api/payment/verify", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            }),
                        });

                        const verifyData = await verifyResponse.json().catch(() => ({}));

                        if (verifyResponse.ok && verifyData.success) {
                            await finishOrder(verifyData.orderId);
                            return;
                        }

                        if (verifyResponse.status >= 500) {
                            // Paid, but we couldn't confirm it yet. The order page keeps
                            // checking, so the customer is never told to pay twice.
                            orderPlacedRef.current = true;
                            router.push(`/order-success?orderId=${data.dbOrderId}`);
                            return;
                        }

                        throw new Error(verifyData.error || "Payment verification failed");
                    } catch (error: any) {
                        toast.error(error.message || "Payment verification failed. If money was deducted, please contact us with your payment details.", { duration: 10000 });
                        setLoading(false);
                    }
                },
                prefill: {
                    name: selectedAddress.name,
                    email: user?.email || "",
                    // Razorpay expects the country code; without a usable contact
                    // it asks the customer to type the number again
                    contact: /^\d{10}$/.test(selectedAddress.phone || "") ? `+91${selectedAddress.phone}` : selectedAddress.phone,
                },
                // UPI first: on phones Razorpay lists the installed UPI apps (Google Pay,
                // PhonePe, Paytm...) here; on desktop it offers UPI ID / QR code.
                config: {
                    display: {
                        blocks: {
                            upi: { name: "Pay via UPI", instruments: [{ method: "upi" }] },
                            other: {
                                name: "Cards, Netbanking & Wallets",
                                instruments: [{ method: "card" }, { method: "netbanking" }, { method: "wallet" }],
                            },
                        },
                        sequence: ["block.upi", "block.other"],
                        preferences: { show_default_blocks: false },
                    },
                },
                theme: {
                    color: "#1A3026",
                },
                modal: {
                    // Customer closed the popup without completing a payment
                    ondismiss: async function () {
                        if (paymentCompleted) return;
                        const result = await reportUnpaid(data.orderId, "cancelled");
                        if (paymentCompleted) return;
                        if (result.status === "paid" && result.orderId) {
                            // The payment went through even though the popup was closed
                            await finishOrder(result.orderId);
                            return;
                        }
                        toast.info("Payment cancelled. You have not been charged.");
                        setLoading(false);
                    }
                }
            };

            const razorpay = new window.Razorpay(options);

            // A failed attempt (declined card, wrong OTP, bank error...). The popup
            // stays open so the customer can retry with another method.
            razorpay.on("payment.failed", function (response: any) {
                void reportUnpaid(data.orderId, "failed");
                toast.error(response?.error?.description || "Payment failed. Please try again or use another payment method.");
            });

            razorpay.open();

        } catch (error: any) {
            console.error("Payment error:", error);
            toast.error(error.message || "Failed to initiate payment");
            setLoading(false);
        }
    };

    if (!mounted || authLoading || !user) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center bg-[var(--background)]">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--primary)]" />
            </div>
        );
    }

    if (items.length === 0) {
        // An order was just placed and we're on the way to the confirmation page
        if (orderPlacedRef.current) {
            return (
                <div className="min-h-[60vh] flex items-center justify-center bg-[var(--background)]">
                    <Loader2 className="w-8 h-8 animate-spin text-[var(--primary)]" />
                </div>
            );
        }
        return (
            <div className="min-h-[60vh] flex items-center justify-center bg-[var(--background)] px-4">
                <div className="text-center">
                    <ShoppingBag className="w-12 h-12 text-[var(--primary)] mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-[var(--primary)] mb-2" style={{ fontFamily: "var(--font-peachi)" }}>
                        Your cart is empty
                    </h1>
                    <p className="text-gray-600 mb-6">Add a product to your cart to checkout.</p>
                    <Link href="/shop" className="btn-primary px-8 py-3 inline-block">
                        Browse Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--background)] pb-20">
            {/* Header / Progress */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
                <div className="container-premium py-4 flex items-center justify-between">
                    <Link href="/shop" className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[var(--primary)] transition-colors">
                        <ChevronLeft className="w-4 h-4" />
                        Back to Shop
                    </Link>
                    <div className="flex items-center gap-2">
                        <Image src="/images/logo.png" alt="V Stories" width={40} height={40} className="rounded-full" />
                        <span className="font-bold tracking-tight text-[var(--primary)] uppercase text-xs">V STORIES</span>
                    </div>
                    <div className="w-20" /> {/* Spacer */}
                </div>
            </div>

            <div className="container-premium max-w-6xl mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    
                    {/* Left: Shipping & Payment (8 cols) */}
                    <div className="lg:col-span-7 space-y-8">
                        
                        {/* 1. Address Section */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-sm font-bold">1</div>
                                <h2 className="text-2xl font-bold text-[var(--primary)]" style={{ fontFamily: "var(--font-peachi)" }}>Delivery Address</h2>
                            </div>
                            <AddressSelection 
                                onSelect={(addr) => setSelectedAddress(addr)} 
                                selectedId={selectedAddress?.id} 
                            />
                        </section>

                        {/* 2. Payment Method Section */}
                        <section className="pt-4">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-sm font-bold">2</div>
                                <h2 className="text-2xl font-bold text-[var(--primary)]" style={{ fontFamily: "var(--font-peachi)" }}>Payment Method</h2>
                            </div>
                            
                            <div className="flex items-center gap-4 p-5 rounded-2xl border-2 border-[var(--primary)] bg-[var(--primary)]/5 shadow-sm">
                                <div className="w-6 h-6 rounded-full border-2 border-[var(--primary)] flex items-center justify-center shrink-0">
                                    <div className="w-3 h-3 rounded-full bg-[var(--primary)]" />
                                </div>
                                <div>
                                    <p className="font-bold text-[var(--primary)]">Pay Online</p>
                                    <p className="text-xs text-gray-500">UPI (Google Pay, PhonePe, Paytm &amp; more), Cards, NetBanking, Wallets</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right: Order Summary (5 cols) */}
                    <div className="lg:col-span-5">
                        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 sticky top-28 border border-gray-100">
                            <h3 className="text-xl font-bold text-[var(--primary)] mb-6 flex items-center gap-2" style={{ fontFamily: "var(--font-peachi)" }}>
                                <ShoppingBag className="w-5 h-5" />
                                Order Summary
                            </h3>

                            {/* Cart Items List */}
                            <div className="space-y-4 mb-8 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                {items.map((item) => (
                                    <div key={item.cartItemId || item.id} className="flex gap-4">
                                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 relative border border-gray-100">
                                            <Image src={item.image || "/images/placeholder.png"} alt={item.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-gray-900 truncate">{item.name}</p>
                                            <p className="text-xs text-gray-500">{item.size || "Standard Size"}</p>
                                            <div className="flex justify-between items-center mt-1">
                                                <p className="text-xs font-medium text-gray-600">Qty: {item.quantity}</p>
                                                <p className="text-sm font-bold text-[var(--primary)]">₹{item.price * item.quantity}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Coupon Input */}
                            <div className="mb-8">
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Apply Coupon</label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input 
                                            type="text" 
                                            placeholder="Coupon Code"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-[var(--primary)]/10 outline-none text-sm font-bold uppercase"
                                        />
                                    </div>
                                    <button className="px-6 py-2 bg-[var(--primary)] text-white rounded-xl text-sm font-bold hover:bg-[var(--primary-dark)] transition-colors">
                                        Apply
                                    </button>
                                </div>
                            </div>

                            {/* Totals */}
                            <div className="space-y-3 border-t border-dashed border-gray-100 pt-6">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-bold text-gray-900">₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <span>Shipping</span>
                                        {shippingFee === 0 && <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-bold uppercase">Free</span>}
                                    </div>
                                    <span className={`font-bold ${shippingFee === 0 ? "text-green-600" : "text-gray-900"}`}>
                                        {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                                    </span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-sm text-green-600 font-medium">
                                        <span>Discount</span>
                                        <span>-₹{discount}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-xl font-bold pt-4 border-t border-gray-100 mt-2 text-[var(--primary)]">
                                    <span style={{ fontFamily: "var(--font-peachi)" }}>Total Amount</span>
                                    <span>₹{total}</span>
                                </div>
                            </div>

                            {/* Trust Features */}
                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium">
                                    <Truck className="w-3 h-3 text-[var(--primary)]" />
                                    Express Delivery
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium">
                                    <ShieldCheck className="w-3 h-3 text-[var(--primary)]" />
                                    Secure Payments
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={loading}
                                className="w-full mt-8 btn-primary py-4 text-lg shadow-xl shadow-[var(--primary)]/20 flex items-center justify-center gap-3 active:scale-95 transition-transform"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <CreditCard className="w-5 h-5" />
                                        Pay ₹{total}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
