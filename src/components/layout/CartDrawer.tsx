"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store";
import Link from "next/link";

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const { items, removeItem, updateQuantity, getTotal } = useCartStore();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50"
                        onClick={onClose}
                    />

                    {/* Drawer Panel */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-[400px] max-w-[90vw] bg-[var(--background)] z-50 shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-[var(--primary)]/10">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="w-5 h-5 text-[var(--primary)]" />
                                <span
                                    className="text-xl font-bold text-[var(--primary)]"
                                    style={{ fontFamily: "var(--font-peachi)" }}
                                >
                                    Your Cart
                                </span>
                                <span className="text-sm text-[var(--text-muted)]">
                                    ({items.length} items)
                                </span>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 text-[var(--primary)] hover:text-[var(--secondary)] transition-colors"
                                aria-label="Close cart"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <ShoppingBag className="w-16 h-16 text-[var(--secondary-light)] mb-4" />
                                    <h3
                                        className="text-xl font-semibold text-[var(--primary)] mb-2"
                                        style={{ fontFamily: "var(--font-peachi)" }}
                                    >
                                        Your cart is empty
                                    </h3>
                                    <p className="text-sm text-[var(--text-muted)] mb-6">
                                        Start adding some herbal goodness!
                                    </p>
                                    <Link
                                        href="/shop"
                                        onClick={onClose}
                                        className="btn-primary"
                                    >
                                        Shop Now
                                    </Link>
                                </div>
                            ) : (
                                <ul className="space-y-6">
                                    {items.map((item, index) => (
                                        <motion.li
                                            key={item.cartItemId || `${item.id}-${item.size || 'default'}-${index}`}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: 50 }}
                                            className="flex gap-4 pb-6 border-b border-[var(--primary)]/10"
                                        >
                                            {/* Product Image */}
                                            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-[var(--secondary-light)]/20 relative">
                                                {item.image ? (
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fill
                                                        sizes="80px"
                                                        className="object-cover object-center"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-[var(--primary)] font-semibold text-lg">
                                                        {item.name?.charAt(0) || "?"}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Product Details */}
                                            <div className="flex-1 min-w-0">
                                                <h4
                                                    className="font-medium text-[var(--primary)] text-sm mb-1 truncate"
                                                    style={{ fontFamily: "var(--font-fira-sans)" }}
                                                >
                                                    {item.name}
                                                </h4>
                                                {item.size && (
                                                    <p className="text-xs text-[var(--text-muted)] mb-2">
                                                        Size: {item.size}
                                                    </p>
                                                )}
                                                <p className="text-sm font-semibold text-[var(--highlight)]">
                                                    ₹{item.price}
                                                </p>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center justify-between mt-3">
                                                    <div className="flex items-center gap-2 bg-[var(--white)] rounded-md border border-[var(--primary)]/10">
                                                        <button
                                                            onClick={() =>
                                                                item.cartItemId && updateQuantity(
                                                                    item.cartItemId,
                                                                    Math.max(1, item.quantity - 1)
                                                                )
                                                            }
                                                            className="p-1.5 text-[var(--primary)] hover:text-[var(--highlight)] transition-colors"
                                                            aria-label="Decrease quantity"
                                                        >
                                                            <Minus className="w-3.5 h-3.5" />
                                                        </button>
                                                        <span className="text-sm font-medium w-6 text-center">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() =>
                                                                item.cartItemId && updateQuantity(item.cartItemId, item.quantity + 1)
                                                            }
                                                            className="p-1.5 text-[var(--primary)] hover:text-[var(--highlight)] transition-colors"
                                                            aria-label="Increase quantity"
                                                        >
                                                            <Plus className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => item.cartItemId && removeItem(item.cartItemId)}
                                                        className="p-1.5 text-[var(--text-muted)] hover:text-red-500 transition-colors"
                                                        aria-label="Remove item"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Footer - Subtotal & Checkout */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-[var(--primary)]/10 bg-[var(--white)]">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm text-[var(--text-muted)]">
                                        Subtotal
                                    </span>
                                    <span
                                        className="text-xl font-semibold text-[var(--primary)]"
                                        style={{ fontFamily: "var(--font-fira-sans)" }}
                                    >
                                        ₹{getTotal()}
                                    </span>
                                </div>
                                <p className="text-xs text-[var(--text-muted)] mb-4">
                                    Shipping calculated at checkout
                                </p>
                                <Link
                                    href="/checkout"
                                    onClick={onClose}
                                    className="w-full btn-primary"
                                >
                                    Proceed to Checkout
                                </Link>
                                <button
                                    onClick={onClose}
                                    className="w-full mt-3 text-sm text-[var(--primary)] hover:text-[var(--highlight)] transition-colors"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
