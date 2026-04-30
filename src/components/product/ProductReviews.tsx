"use client";

import { useState, useEffect } from "react";
import { Star, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface FeedbackEntry {
    id: string;
    name: string;
    rating: number | null;
    message: string;
    created_at: string;
}

interface ProductReviewsProps {
    productId: string;
    productName: string;
}

function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 30) return `${days} days ago`;
    const months = Math.floor(days / 30);
    if (months === 1) return "1 month ago";
    if (months < 12) return `${months} months ago`;
    return `${Math.floor(months / 12)} year${Math.floor(months / 12) > 1 ? "s" : ""} ago`;
}

const PAGE_SIZE = 10;

export default function ProductReviews({ productId, productName }: ProductReviewsProps) {
    const [reviews, setReviews] = useState<FeedbackEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [isWritingReview, setIsWritingReview] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [newReview, setNewReview] = useState({ rating: 0, comment: "", name: "", email: "" });
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch(`/api/feedback?product_id=${productId}`)
            .then(res => res.json())
            .then(data => setReviews(data.feedback || []))
            .finally(() => setLoading(false));
    }, [productId]);

    const totalPages = Math.ceil(reviews.length / PAGE_SIZE);
    const paginatedReviews = reviews.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const averageRating = reviews.length
        ? reviews.filter(r => r.rating).reduce((acc, r) => acc + (r.rating ?? 0), 0) /
          reviews.filter(r => r.rating).length
        : 0;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch('/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: newReview.name,
                    email: newReview.email,
                    product_id: productId,
                    product_name: productName,
                    rating: newReview.rating,
                    message: newReview.comment,
                }),
            });
            if (!res.ok) throw new Error('Submission failed');

            // Optimistically add the new review to the list
            const optimistic: FeedbackEntry = {
                id: Date.now().toString(),
                name: newReview.name,
                rating: newReview.rating,
                message: newReview.comment,
                created_at: new Date().toISOString(),
            };
            setReviews(prev => [optimistic, ...prev]);
            setPage(1);
            setSubmitted(true);
            setIsWritingReview(false);
            setNewReview({ rating: 5, comment: "", name: "", email: "" });
        } catch {
            alert('Failed to submit review. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="py-12 bg-[var(--background)]">
            <div className="container-premium">
                <div className="mb-10 text-center">
                    <h2
                        className="text-2xl md:text-3xl font-semibold text-[var(--primary)] mb-4"
                        style={{ fontFamily: "var(--font-peachi)" }}
                    >
                        Customer Reviews
                    </h2>
                    {reviews.length > 0 && averageRating > 0 && (
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <div className="flex text-[var(--highlight)]">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`w-5 h-5 ${star <= Math.round(averageRating) ? "fill-current" : ""}`}
                                    />
                                ))}
                            </div>
                            <span className="text-lg font-medium text-[var(--primary)]">
                                {averageRating.toFixed(1)}
                            </span>
                            <span className="text-[var(--text-muted)]">
                                ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
                            </span>
                        </div>
                    )}
                </div>

                <div className="max-w-4xl mx-auto">
                    {/* Write Review Button */}
                    <div className="mb-8 text-center">
                        {submitted ? (
                            <div className="flex items-center justify-center gap-2 text-[var(--secondary)] font-medium">
                                <CheckCircle className="w-5 h-5" />
                                Thank you for your review!
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsWritingReview(!isWritingReview)}
                                className={isWritingReview
                                    ? "px-6 py-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
                                    : "btn-primary px-8 py-3 flex items-center gap-2 mx-auto"
                                }
                            >
                                {!isWritingReview && (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                )}
                                {isWritingReview ? "Cancel" : "Write a Review"}
                            </button>
                        )}
                    </div>

                    {/* Write Review Form */}
                    {isWritingReview && (
                        <motion.form
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            onSubmit={handleSubmit}
                            className="bg-white p-6 rounded-xl shadow-sm mb-10 border border-[var(--primary)]/10"
                        >
                            <h3 className="text-lg font-semibold text-[var(--primary)] mb-4">
                                Share your experience with {productName}
                            </h3>
                            <div className="space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[var(--primary)] mb-1">Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={newReview.name}
                                            onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                                            className="w-full px-4 py-2 border border-[var(--primary)]/20 rounded-lg focus:outline-none focus:border-[var(--highlight)]"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[var(--primary)] mb-1">Email *</label>
                                        <input
                                            type="email"
                                            required
                                            value={newReview.email}
                                            onChange={(e) => setNewReview({ ...newReview, email: e.target.value })}
                                            className="w-full px-4 py-2 border border-[var(--primary)]/20 rounded-lg focus:outline-none focus:border-[var(--highlight)]"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--primary)] mb-2">Rating *</label>
                                    <div className="flex gap-1 text-[var(--highlight)]">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setNewReview({ ...newReview, rating: star })}
                                                className="focus:outline-none transition-transform hover:scale-110"
                                            >
                                                <Star className={`w-7 h-7 transition-colors ${star <= newReview.rating ? "fill-[var(--secondary)] text-[var(--secondary)]" : "fill-none text-gray-300"}`} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--primary)] mb-1">Review *</label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={newReview.comment}
                                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                        className="w-full px-4 py-2 border border-[var(--primary)]/20 rounded-lg focus:outline-none focus:border-[var(--highlight)] resize-none"
                                        placeholder="Tell us what you liked or didn't like..."
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="btn-primary w-full"
                                >
                                    {submitting ? "Submitting..." : "Submit Review"}
                                </button>
                            </div>
                        </motion.form>
                    )}

                    {/* Reviews List */}
                    {loading ? (
                        <div className="text-center py-10 text-[var(--text-muted)]">Loading reviews...</div>
                    ) : reviews.length === 0 ? (
                        <div className="text-center py-10 text-[var(--text-muted)]">
                            No reviews yet. Be the first to share your experience!
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {paginatedReviews.map((review) => (
                                <div
                                    key={review.id}
                                    className="bg-white p-6 rounded-xl shadow-sm border border-[var(--primary)]/5"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <span className="font-semibold text-[var(--primary)]">{review.name}</span>
                                            {review.rating && (
                                                <div className="flex text-[var(--highlight)] text-sm mt-1">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <Star
                                                            key={star}
                                                            className={`w-3.5 h-3.5 ${star <= review.rating! ? "fill-[var(--highlight)] text-[var(--highlight)]" : "fill-none text-gray-300"}`}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <span className="text-xs text-[var(--text-muted)]">
                                            {timeAgo(review.created_at)}
                                        </span>
                                    </div>
                                    <p className="text-[var(--text-secondary)] leading-relaxed">{review.message}</p>
                                </div>
                            ))}

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-center gap-2 pt-4">
                                    <button
                                        onClick={() => setPage(p => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                        className="px-4 py-2 text-sm rounded-lg border border-[var(--primary)]/20 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        ← Prev
                                    </button>
                                    <span className="text-sm text-[var(--text-muted)] px-2">
                                        {page} / {totalPages}
                                    </span>
                                    <button
                                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                        disabled={page === totalPages}
                                        className="px-4 py-2 text-sm rounded-lg border border-[var(--primary)]/20 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        Next →
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
