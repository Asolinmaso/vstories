"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCartStore } from "@/lib/store";
import { ShoppingBag, MapPin, CreditCard, Loader2 } from "lucide-react";
import Image from "next/image";

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
    const [shippingAddress, setShippingAddress] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
    });

    useEffect(() => {
        // Redirect if not logged in
        if (!user) {
            router.push("/login?redirect=/checkout");
            return;
        }

        // Redirect if cart is empty
        if (items.length === 0) {
            router.push("/shop");
            return;
        }

        // Load Razorpay script
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [user, items, router]);

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!user) {
            alert("Please login to continue");
            return;
        }

        setLoading(true);

        try {
            // Step 1: Create order on server
            const response = await fetch("/api/payment/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: getTotal(),
                    currency: "INR",
                    items: items.map(item => ({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        image: item.image,
                    })),
                    shippingAddress,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || "Failed to create order");
            }

            // Step 2: Initialize Razorpay checkout
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: data.amount,
                currency: data.currency,
                name: "V Stories",
                description: "Premium Herbal Products",
                image: "/images/logo.png",
                order_id: data.orderId,
                handler: async function (response: any) {
                    // Step 3: Verify payment on server
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
                            // Clear cart
                            clearCart();
                            
                            // Redirect to success page
                            router.push(`/order-success?orderId=${verifyData.orderId}`);
                        } else {
                            throw new Error(verifyData.error || "Payment verification failed");
                        }
                    } catch (error: any) {
                        alert("Payment verification failed: " + error.message);
                        router.push("/checkout");
                    }
                },
                prefill: {
                    name: shippingAddress.name,
                    email: user.email,
                    contact: shippingAddress.phone,
                },
                notes: {
                    address: shippingAddress.address,
                },
                theme: {
                    color: "#1D3515",
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
            alert(error.message || "Failed to initiate payment");
            setLoading(false);
        }
    };

    if (!user || items.length === 0) {
        return null;
    }

    return (
        <div className="min-h-screen bg-[var(--background)] py-12">
            <div className="container-premium max-w-6xl">
                <h1 className="text-3xl font-bold text-[var(--primary)] mb-8" style={{ fontFamily: "var(--font-peachi)" }}>
                    Checkout
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Shipping Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handlePayment} className="bg-white rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <MapPin className="w-6 h-6 text-[var(--primary)]" />
                                <h2 className="text-xl font-semibold text-[var(--primary)]">Shipping Address</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={shippingAddress.name}
                                        onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                                    <input
                                        type="tel"
                                        required
                                        pattern="[0-9]{10}"
                                        value={shippingAddress.phone}
                                        onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none"
                                        placeholder="10-digit mobile number"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                                    <textarea
                                        required
                                        rows={3}
                                        value={shippingAddress.address}
                                        onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none"
                                        placeholder="House no., Street, Area"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                                    <input
                                        type="text"
                                        required
                                        value={shippingAddress.city}
                                        onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                                    <input
                                        type="text"
                                        required
                                        value={shippingAddress.state}
                                        onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code *</label>
                                    <input
                                        type="text"
                                        required
                                        pattern="[0-9]{6}"
                                        value={shippingAddress.pincode}
                                        onChange={(e) => setShippingAddress({ ...shippingAddress, pincode: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] outline-none"
                                        placeholder="6-digit PIN code"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full mt-6 btn-primary py-3 flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <CreditCard className="w-5 h-5" />
                                        Proceed to Payment
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                            <div className="flex items-center gap-3 mb-6">
                                <ShoppingBag className="w-6 h-6 text-[var(--primary)]" />
                                <h2 className="text-xl font-semibold text-[var(--primary)]">Order Summary</h2>
                            </div>

                            <div className="space-y-4 mb-6">
                                {items.map((item) => (
                                    <div key={item.cartItemId || item.id} className="flex gap-3">
                                        {item.image && (
                                            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    width={64}
                                                    height={64}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                            <p className="text-sm font-semibold text-[var(--primary)]">₹{item.price * item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t pt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium">₹{getTotal()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-medium text-green-600">FREE</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                                    <span>Total</span>
                                    <span className="text-[var(--primary)]">₹{getTotal()}</span>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-green-50 rounded-lg">
                                <p className="text-xs text-green-800 text-center">
                                    🔒 Secure payment powered by Razorpay
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
