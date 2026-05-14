"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCartStore } from "@/lib/store";
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

export default function CheckoutPage() {
    const router = useRouter();
    const { user } = useAuth();
    const { items, getTotal, clearCart } = useCartStore();
    
    const [loading, setLoading] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<any>(null);
    const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "cod">("razorpay");
    const [couponCode, setCouponCode] = useState("");
    const [discount, setDiscount] = useState(0);

    const subtotal = getTotal();
    const shippingFee = subtotal >= 999 ? 0 : 60;
    const total = subtotal + shippingFee - discount;

    useEffect(() => {
        if (!user) {
            router.push("/login?redirect=/checkout");
            return;
        }
        if (items.length === 0) {
            router.push("/shop");
            return;
        }

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, [user, items, router]);

    const handleCheckout = async () => {
        if (!selectedAddress) {
            toast.error("Please select a shipping address");
            return;
        }

        setLoading(true);

        try {
            // Step 1: Create order on server
            const response = await fetch("/api/payment/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: total,
                    currency: "INR",
                    items: items.map(item => ({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        image: item.image,
                    })),
                    shippingAddress: selectedAddress,
                    paymentMethod,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || "Failed to create order");
            }

            if (paymentMethod === "cod") {
                clearCart();
                router.push(`/order-success?orderId=${data.orderId}`);
                return;
            }

            // Step 2: Initialize Razorpay checkout
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: data.amount,
                currency: data.currency,
                name: "V STORIES",
                description: "Premium Herbal Products",
                image: "/images/logo.png",
                order_id: data.orderId,
                handler: async function (response: any) {
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

                        const verifyData = await verifyResponse.json();

                        if (verifyResponse.ok && verifyData.success) {
                            clearCart();
                            router.push(`/order-success?orderId=${verifyData.orderId}`);
                        } else {
                            throw new Error(verifyData.error || "Payment verification failed");
                        }
                    } catch (error: any) {
                        toast.error(error.message);
                    }
                },
                prefill: {
                    name: selectedAddress.name,
                    email: user?.email || "",
                    contact: selectedAddress.phone,
                },
                theme: {
                    color: "#1A3026",
                },
                modal: {
                    ondismiss: function() {
                        setLoading(false);
                    }
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();

        } catch (error: any) {
            console.error("Payment error:", error);
            toast.error(error.message || "Failed to initiate payment");
            setLoading(false);
        }
    };

    if (!user || items.length === 0) return null;

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
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <button
                                    onClick={() => setPaymentMethod("razorpay")}
                                    className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left ${
                                        paymentMethod === "razorpay"
                                            ? "border-[var(--primary)] bg-[var(--primary)]/5 shadow-sm"
                                            : "border-gray-100 bg-white hover:border-gray-200"
                                    }`}
                                >
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === "razorpay" ? "border-[var(--primary)]" : "border-gray-300"}`}>
                                        {paymentMethod === "razorpay" && <div className="w-3 h-3 rounded-full bg-[var(--primary)]" />}
                                    </div>
                                    <div>
                                        <p className="font-bold text-[var(--primary)]">Online Payment</p>
                                        <p className="text-xs text-gray-500">Cards, UPI, NetBanking</p>
                                    </div>
                                </button>

                                <button
                                    onClick={() => setPaymentMethod("cod")}
                                    className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left ${
                                        paymentMethod === "cod"
                                            ? "border-[var(--primary)] bg-[var(--primary)]/5 shadow-sm"
                                            : "border-gray-100 bg-white hover:border-gray-200"
                                    }`}
                                >
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === "cod" ? "border-[var(--primary)]" : "border-gray-300"}`}>
                                        {paymentMethod === "cod" && <div className="w-3 h-3 rounded-full bg-[var(--primary)]" />}
                                    </div>
                                    <div>
                                        <p className="font-bold text-[var(--primary)]">Cash on Delivery</p>
                                        <p className="text-xs text-gray-500">Pay when you receive</p>
                                    </div>
                                </button>
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
                                        {paymentMethod === "cod" ? "Place Order" : `Pay ₹${total}`}
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
