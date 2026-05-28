"use client";

import { useState, useEffect } from "react";
import { Star, CheckCircle, X } from "lucide-react";
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
    onReviewAdded?: (rating: number) => void;
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

export default function ProductReviews({ productId, productName, onReviewAdded }: ProductReviewsProps) {
    const [reviews, setReviews] = useState<FeedbackEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [isWritingReview, setIsWritingReview] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [newReview, setNewReview] = useState({ rating: 0, comment: "", name: "", email: "" });
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch(`/api/feedback?product_id=${productId}&t=${Date.now()}`)
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
            const ratingSubmitted = newReview.rating;
            setReviews(prev => [optimistic, ...prev]);
            setPage(1);
            setSubmitted(true);
            setIsWritingReview(false);
            setNewReview({ rating: 5, comment: "", name: "", email: "" });
            if (onReviewAdded) onReviewAdded(ratingSubmitted);
        } catch {
            alert('Failed to submit review. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="py-12 bg-transparent">
            <div className="container-premium">
                <div className="max-w-[900px] mx-auto">
                    <h2
                        className="text-[28px] text-[var(--primary)] mb-6"
                        style={{ fontFamily: "var(--font-peachi)" }}
                    >
                        Customer Reviews
                    </h2>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                        {reviews.length > 0 && averageRating > 0 ? (
                            <div className="flex items-end gap-3">
                                <span className="text-[40px] font-bold text-[var(--primary)] leading-none tracking-tight">{averageRating.toFixed(1)}</span>
                                <div className="flex flex-col pb-1">
                                    <div className="flex text-[#E6B93D] gap-0.5 mb-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`w-[14px] h-[14px] ${star <= Math.round(averageRating) ? "fill-current" : ""}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-[13px] text-[var(--primary)] font-medium opacity-80">
                                        ({reviews.length} {reviews.length === 1 ? "Review" : "Reviews"})
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="text-[var(--primary)] opacity-70">No reviews yet.</div>
                        )}

                        <div>
                            {submitted ? (
                                <div className="flex items-center gap-2 text-[#4A785A] font-medium">
                                    <CheckCircle className="w-5 h-5" />
                                    Thank you!
                                </div>
                            ) : (
                                <button
                                    onClick={() => setIsWritingReview(true)}
                                    className="bg-[var(--primary)] text-white px-6 py-2 rounded text-[14px] font-medium transition-opacity hover:opacity-90"
                                    style={{ backgroundColor: 'var(--primary)' }}
                                >
                                    Write A Review
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Write Review Modal */}
                    {isWritingReview && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-[#F8F6EF] w-full max-w-[500px] rounded-[20px] p-8 shadow-2xl relative"
                            >
                                <button
                                    type="button"
                                    onClick={() => setIsWritingReview(false)}
                                    className="absolute top-6 right-6 text-[var(--primary)] hover:opacity-70 transition-opacity"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                <h3 className="text-2xl text-[var(--primary)] mb-8" style={{ fontFamily: "var(--font-peachi)" }}>
                                    Write A Review
                                </h3>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <input
                                                type="text"
                                                required
                                                value={newReview.name}
                                                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                                                className="w-full py-2 border-b border-[var(--primary)]/30 bg-transparent focus:outline-none focus:border-[var(--primary)] text-[var(--primary)] placeholder-[var(--primary)] placeholder-opacity-60 text-[14px]"
                                                placeholder="Name"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="email"
                                                required
                                                value={newReview.email}
                                                onChange={(e) => setNewReview({ ...newReview, email: e.target.value })}
                                                className="w-full py-2 border-b border-[var(--primary)]/30 bg-transparent focus:outline-none focus:border-[var(--primary)] text-[var(--primary)] placeholder-[var(--primary)] placeholder-opacity-60 text-[14px]"
                                                placeholder="Email"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 pt-2">
                                        <label className="text-[14px] text-[var(--primary)] placeholder-opacity-60">Rating</label>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setNewReview({ ...newReview, rating: star })}
                                                    className="focus:outline-none transition-transform hover:scale-110"
                                                >
                                                    <Star className={`w-[18px] h-[18px] transition-colors ${star <= newReview.rating ? "fill-[var(--primary)] text-[var(--primary)]" : "fill-transparent text-[var(--primary)] opacity-40 stroke-[1.5]"}`} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <textarea
                                            required
                                            rows={2}
                                            value={newReview.comment}
                                            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                            className="w-full py-2 border-b border-[var(--primary)]/30 bg-transparent focus:outline-none focus:border-[var(--primary)] text-[var(--primary)] placeholder-[var(--primary)] placeholder-opacity-60 resize-none text-[14px]"
                                            placeholder="Message"
                                        />
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="bg-[var(--primary)] text-white px-8 py-2 rounded text-[14px] font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
                                            style={{ backgroundColor: 'var(--primary)' }}
                                        >
                                            {submitting ? "Submitting..." : "Submit"}
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    )}

                    {/* Reviews List */}
                    {loading ? (
                        <div className="text-center py-10 text-[var(--primary)] opacity-70">Loading reviews...</div>
                    ) : reviews.length === 0 ? (
                        <div className="text-center py-10 text-[var(--primary)] opacity-70">
                            No reviews yet. Be the first to share your experience!
                        </div>
                    ) : (
                        <div className="border border-[var(--primary)]/20 rounded-[10px] overflow-hidden bg-[#FBF9F4]">
                            {paginatedReviews.map((review, idx) => (
                                <div
                                    key={review.id}
                                    className={`p-6 flex flex-col sm:flex-row sm:items-start gap-4 ${idx !== paginatedReviews.length - 1 ? 'border-b border-[var(--primary)]/20' : ''}`}
                                >
                                    <div className="flex flex-col gap-2 min-w-[200px]">
                                        <span className="font-semibold text-[14px] text-[var(--primary)] flex items-center gap-2">
                                            <span className="w-5 h-5 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[10px] text-[var(--primary)]">
                                                {review.name.charAt(0).toUpperCase()}
                                            </span>
                                            {review.name}
                                        </span>
                                        {review.rating && (
                                            <div className="flex text-[#E6B93D] gap-0.5">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        className={`w-3 h-3 ${star <= review.rating! ? "fill-current" : "fill-none opacity-30 stroke-current"}`}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[13px] text-[var(--primary)] opacity-90 leading-relaxed font-medium">
                                            {review.message}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            
                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="p-4 border-t border-[var(--primary)]/20 flex justify-center bg-white/50">
                                    <button
                                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                        disabled={page === totalPages}
                                        className="bg-[var(--primary)] text-white px-6 py-2 rounded text-[13px] font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
                                        style={{ backgroundColor: 'var(--primary)' }}
                                    >
                                        Load More Reviews
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
