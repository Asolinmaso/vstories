"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { User, ShoppingBag, Heart, Settings, LogIn } from "lucide-react";

export default function AccountPage() {
    return (
        <div className="bg-[var(--background)] min-h-screen">
            {/* Hero Section */}
            <section className="py-16 md:py-20 bg-[var(--primary)] dark-section">
                <div className="container-premium">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1
                            className="text-4xl md:text-5xl font-semibold text-white mb-4"
                        >
                            My Account
                        </h1>
                        <p className="text-white/80">
                            Manage your orders, wishlist, and account settings
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Account Section */}
            <section className="section-padding">
                <div className="container-premium max-w-3xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 text-center">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--secondary-light)]/20 flex items-center justify-center">
                            <User className="w-10 h-10 text-[var(--secondary)]" />
                        </div>

                        <h2
                            className="text-2xl font-semibold text-[var(--primary)] mb-4"
                        >
                            Welcome to V Stories
                        </h2>

                        <p className="text-[var(--text-muted)] mb-8 max-w-md mx-auto">
                            Sign in to track your orders, save your favorites, and get personalized recommendations.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                            <button className="btn-primary flex items-center justify-center gap-2">
                                <LogIn className="w-4 h-4" />
                                Sign In
                            </button>
                            <button className="btn-outline">
                                Create Account
                            </button>
                        </div>

                        <div className="border-t border-[var(--primary)]/10 pt-8 mt-8">
                            <p className="text-sm text-[var(--text-muted)] mb-6">
                                Or continue shopping as a guest
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <Link
                                    href="/shop"
                                    className="p-4 rounded-xl bg-[var(--background)] hover:bg-[var(--background-dark)] transition-colors text-center group"
                                >
                                    <ShoppingBag className="w-6 h-6 mx-auto mb-2 text-[var(--secondary)] group-hover:text-[var(--highlight)] transition-colors" />
                                    <span className="text-sm font-medium text-[var(--primary)]">
                                        Shop Products
                                    </span>
                                </Link>
                                <Link
                                    href="/about"
                                    className="p-4 rounded-xl bg-[var(--background)] hover:bg-[var(--background-dark)] transition-colors text-center group"
                                >
                                    <Heart className="w-6 h-6 mx-auto mb-2 text-[var(--secondary)] group-hover:text-[var(--highlight)] transition-colors" />
                                    <span className="text-sm font-medium text-[var(--primary)]">
                                        Our Story
                                    </span>
                                </Link>
                                <Link
                                    href="/contact"
                                    className="p-4 rounded-xl bg-[var(--background)] hover:bg-[var(--background-dark)] transition-colors text-center group"
                                >
                                    <Settings className="w-6 h-6 mx-auto mb-2 text-[var(--secondary)] group-hover:text-[var(--highlight)] transition-colors" />
                                    <span className="text-sm font-medium text-[var(--primary)]">
                                        Contact Us
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
