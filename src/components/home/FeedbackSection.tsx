"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Star } from "lucide-react";
import { Product } from "@/lib/services/product.service";

interface FeedbackFormData {
    name: string;
    email: string;
    phone: string;
    product_id: string;
    rating: number;
    message: string;
}

interface FeedbackSectionProps {
    products: Product[];
}

export default function FeedbackSection({ products }: FeedbackSectionProps) {
    const [formData, setFormData] = useState<FeedbackFormData>({
        name: "",
        email: "",
        phone: "",
        product_id: "",
        rating: 0,
        message: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone || undefined,
                    product_id: formData.product_id || undefined,
                    product_name: formData.product_id
                        ? products.find(p => p.id === formData.product_id)?.name
                        : undefined,
                    rating: formData.rating || undefined,
                    message: formData.message,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            setIsSubmitted(true);
            setTimeout(() => {
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    product_id: "",
                    rating: 0,
                    message: "",
                });
                setIsSubmitted(false);
            }, 3000);
        } catch (error) {
            console.error('Submission error:', error);
            alert('Failed to submit feedback. Please try again.');
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value,
        }));
    };

    return (
        <section className="section-padding bg-gradient-to-b from-[var(--background)] via-[var(--secondary)]/5 to-[var(--background)]">
            <div className="container-premium">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2
                        className="text-4xl md:text-5xl font-semibold text-[var(--primary)] mb-4"
                        style={{ fontFamily: "var(--font-peachi)" }}
                    >
                        Share Your Feedback
                    </h2>
                    <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto">
                        We'd love to hear your thoughts! Your feedback helps us create better products and improve your experience.
                    </p>
                </motion.div>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="max-w-2xl mx-auto"
                >
                    <div className="bg-white rounded-2xl p-8 shadow-lg">
                        {isSubmitted ? (
                            <div className="text-center py-12">
                                <CheckCircle className="w-16 h-16 text-[var(--secondary)] mx-auto mb-4" />
                                <h3
                                    className="text-2xl font-semibold text-[var(--primary)] mb-2"
                                    style={{ fontFamily: "var(--font-peachi)" }}
                                >
                                    Thank You!
                                </h3>
                                <p className="text-[var(--text-muted)]">
                                    We've received your feedback and appreciate it.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name & Email */}
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium text-[var(--primary)] mb-2"
                                        >
                                            Your Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-[var(--primary)]/20 rounded-lg focus:outline-none focus:border-[var(--highlight)] transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-[var(--primary)] mb-2"
                                        >
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-[var(--primary)]/20 rounded-lg focus:outline-none focus:border-[var(--highlight)] transition-colors"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                {/* Phone */}
                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="block text-sm font-medium text-[var(--primary)] mb-2"
                                    >
                                        Phone Number (optional)
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-[var(--primary)]/20 rounded-lg focus:outline-none focus:border-[var(--highlight)] transition-colors"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>

                                {/* Product Selector */}
                                <div>
                                    <label
                                        htmlFor="product"
                                        className="block text-sm font-medium text-[var(--primary)] mb-2"
                                    >
                                        Select a Product (optional)
                                    </label>
                                    <select
                                        id="product_id"
                                        name="product_id"
                                        value={formData.product_id}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-[var(--primary)]/20 rounded-lg focus:outline-none focus:border-[var(--highlight)] transition-colors bg-white"
                                    >
                                        <option value="">— Select a product (optional) —</option>
                                        {products.map((product) => (
                                            <option key={product.id} value={product.id}>
                                                {product.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Rating */}
                                <div>
                                    <label className="block text-sm font-medium text-[var(--primary)] mb-3">
                                        Rate Your Experience (optional)
                                    </label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        rating: formData.rating === star ? 0 : star,
                                                    }))
                                                }
                                                className="transition-transform hover:scale-110"
                                            >
                                                <Star
                                                    className={`w-8 h-8 transition-colors ${
                                                        star <= formData.rating
                                                            ? "fill-[var(--secondary)] text-[var(--secondary)]"
                                                            : "fill-none text-gray-300"
                                                    }`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Feedback Message */}
                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-sm font-medium text-[var(--primary)] mb-2"
                                    >
                                        Your Feedback *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-[var(--primary)]/20 rounded-lg focus:outline-none focus:border-[var(--highlight)] transition-colors resize-none"
                                        placeholder="Share your thoughts, suggestions, or experience with us..."
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full btn-primary py-4 flex items-center justify-center gap-2"
                                >
                                    Submit Feedback
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
