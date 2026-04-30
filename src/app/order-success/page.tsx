"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import Link from "next/link";
import confetti from "canvas-confetti";

function OrderSuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const orderId = searchParams.get("orderId");
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        // Trigger confetti animation
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });

        // Countdown redirect
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    router.push("/profile/orders");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [router]);

    if (!orderId) {
        router.push("/");
        return null;
    }

    return (
        <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full text-center">
                <div className="bg-white rounded-3xl p-8 shadow-xl">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>

                    <h1 className="text-3xl font-bold text-[var(--primary)] mb-3" style={{ fontFamily: "var(--font-peachi)" }}>
                        Order Placed Successfully! 🎉
                    </h1>

                    <p className="text-gray-600 mb-6">
                        Thank you for your purchase. Your order has been confirmed and will be processed shortly.
                    </p>

                    <div className="bg-[var(--background)] rounded-xl p-4 mb-6">
                        <p className="text-sm text-gray-600 mb-1">Order ID</p>
                        <p className="text-lg font-bold text-[var(--primary)]">{orderId}</p>
                    </div>

                    <div className="space-y-3">
                        <Link
                            href={`/profile/orders`}
                            className="btn-primary w-full flex items-center justify-center gap-2"
                        >
                            <Package className="w-5 h-5" />
                            View Order Details
                        </Link>

                        <Link
                            href="/shop"
                            className="block w-full px-6 py-3 border-2 border-[var(--primary)] text-[var(--primary)] rounded-full font-semibold hover:bg-[var(--primary)] hover:text-white transition-all"
                        >
                            Continue Shopping
                        </Link>
                    </div>

                    <p className="text-sm text-gray-500 mt-6">
                        Redirecting to orders page in {countdown} seconds...
                    </p>

                    <div className="mt-8 pt-6 border-t">
                        <p className="text-xs text-gray-500 mb-2">
                            📧 Order confirmation sent to your email
                        </p>
                        <p className="text-xs text-gray-500">
                            🚚 Estimated delivery: 5-7 business days
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function OrderSuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        }>
            <OrderSuccessContent />
        </Suspense>
    );
}
