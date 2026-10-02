"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle, Clock, Loader2 } from "lucide-react";
import Link from "next/link";
import confetti from "canvas-confetti";

type OrderState = "loading" | "success" | "processing" | "failed" | "not-found";

interface OrderSummary {
    id: string;
    status: string;
    amount: number;
    payment_method: string | null;
}

// What the customer should be told for a given order record
function resolveState(order: OrderSummary): OrderState {
    if (order.status === "paid") return "success";
    // Cash on Delivery orders are placed as soon as they are created
    if (order.payment_method === "cod" && order.status === "pending") return "success";
    if (order.status === "failed" || order.status === "cancelled") return "failed";
    if (order.status === "pending") return "processing";
    return "success"; // refunded etc. — the order itself exists
}

const MAX_POLLS = 10;

function OrderSuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const orderId = searchParams.get("orderId");
    const [state, setState] = useState<OrderState>("loading");
    const [order, setOrder] = useState<OrderSummary | null>(null);
    const [countdown, setCountdown] = useState(10);

    // Always confirm the real status with the server — never trust the URL alone
    useEffect(() => {
        if (!orderId) {
            router.replace("/");
            return;
        }

        let cancelled = false;
        let timer: ReturnType<typeof setTimeout>;
        let polls = 0;

        const check = async () => {
            try {
                // Also re-checks a still-unpaid online order with the payment gateway
                const res = await fetch("/api/payment/status", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ orderId }),
                });
                if (cancelled) return;

                if (res.status === 401) {
                    router.replace(`/?login=1&redirect=${encodeURIComponent(`/order-success?orderId=${orderId}`)}`);
                    return;
                }
                if (res.status === 404) {
                    setState("not-found");
                    return;
                }

                const data = await res.json();
                if (!res.ok || !data.order) throw new Error(data.error || "Could not load order");

                const next = resolveState(data.order);
                setOrder(data.order);
                setState(next);

                // Online payment still being confirmed (bank/UPI delay) — keep checking
                if (next === "processing" && polls < MAX_POLLS) {
                    polls += 1;
                    timer = setTimeout(check, 3000);
                }
            } catch {
                if (cancelled) return;
                if (polls < MAX_POLLS) {
                    polls += 1;
                    timer = setTimeout(check, 3000);
                } else {
                    setState("processing");
                }
            }
        };

        check();
        return () => {
            cancelled = true;
            clearTimeout(timer);
        };
    }, [orderId, router]);

    // Celebrate and head home only for a confirmed order
    useEffect(() => {
        if (state !== "success") return;

        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });

        const timer = setInterval(() => {
            setCountdown((prev) => Math.max(prev - 1, 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [state]);

    useEffect(() => {
        if (state === "success" && countdown === 0) router.push("/");
    }, [state, countdown, router]);

    if (!orderId || state === "loading") {
        return (
            <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-[var(--primary)] animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Checking your order...</p>
                </div>
            </div>
        );
    }

    const isCod = order?.payment_method === "cod";

    return (
        <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full text-center">
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl">
                    {state === "success" && (
                        <>
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-12 h-12 text-green-600" />
                            </div>

                            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--primary)] mb-3" style={{ fontFamily: "var(--font-peachi)" }}>
                                Order Placed Successfully! 🎉
                            </h1>

                            <p className="text-gray-600 mb-6">
                                {isCod
                                    ? `Thank you for your order. Please keep ₹${order?.amount} ready to pay on delivery.`
                                    : "Thank you for your purchase. Your payment was received and your order will be processed shortly."}
                            </p>
                        </>
                    )}

                    {state === "processing" && (
                        <>
                            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Clock className="w-12 h-12 text-amber-600" />
                            </div>

                            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--primary)] mb-3" style={{ fontFamily: "var(--font-peachi)" }}>
                                Confirming Your Payment
                            </h1>

                            <p className="text-gray-600 mb-6">
                                We haven&apos;t received the payment confirmation yet. If money was deducted, your order will be
                                confirmed automatically — please don&apos;t pay again. You can check the status in My Orders.
                            </p>
                        </>
                    )}

                    {state === "failed" && (
                        <>
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <XCircle className="w-12 h-12 text-red-600" />
                            </div>

                            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--primary)] mb-3" style={{ fontFamily: "var(--font-peachi)" }}>
                                Payment Not Completed
                            </h1>

                            <p className="text-gray-600 mb-6">
                                {order?.status === "cancelled"
                                    ? "The payment was cancelled, so this order was not placed. You have not been charged."
                                    : "The payment did not go through, so this order was not placed. Any amount deducted will be refunded by your bank."}
                            </p>
                        </>
                    )}

                    {state === "not-found" && (
                        <>
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <XCircle className="w-12 h-12 text-gray-500" />
                            </div>

                            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--primary)] mb-3" style={{ fontFamily: "var(--font-peachi)" }}>
                                Order Not Found
                            </h1>

                            <p className="text-gray-600 mb-6">
                                We couldn&apos;t find this order on your account.
                            </p>
                        </>
                    )}

                    {state !== "not-found" && (
                        <div className="bg-[var(--background)] rounded-xl p-4 mb-6">
                            <p className="text-sm text-gray-600 mb-1">Order ID</p>
                            <p className="text-sm sm:text-lg font-bold text-[var(--primary)] break-all">{orderId}</p>
                        </div>
                    )}

                    <div className="space-y-3">
                        {state === "failed" && (
                            <Link
                                href="/checkout"
                                className="block w-full px-6 py-3 bg-[var(--primary)] text-white rounded-full font-semibold hover:opacity-90 transition-all"
                            >
                                Try Again
                            </Link>
                        )}

                        {(state === "success" || state === "processing") && (
                            <Link
                                href="/profile/orders"
                                className="block w-full px-6 py-3 bg-[var(--primary)] text-white rounded-full font-semibold hover:opacity-90 transition-all"
                            >
                                View My Orders
                            </Link>
                        )}

                        <Link
                            href="/shop"
                            className="block w-full px-6 py-3 border-2 border-[var(--primary)] text-[var(--primary)] rounded-full font-semibold hover:bg-[var(--primary)] hover:text-white transition-all"
                        >
                            Continue Shopping
                        </Link>
                    </div>

                    {state === "success" && (
                        <>
                            <p className="text-sm text-gray-500 mt-6">
                                Redirecting to home in {countdown} seconds...
                            </p>

                            <div className="mt-8 pt-6 border-t">
                                <p className="text-xs text-gray-500 mb-2">
                                    📧 Order confirmation sent to your email
                                </p>
                                <p className="text-xs text-gray-500">
                                    🚚 Estimated delivery: 5-7 business days
                                </p>
                            </div>
                        </>
                    )}
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
