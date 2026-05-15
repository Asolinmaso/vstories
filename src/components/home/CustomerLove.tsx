"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
    id: number;
    name: string;
    rating: number;
    text: string;
    image?: string;
    role?: string;
}

interface CustomerLoveProps {
    testimonials?: any[];
    title?: string;
    subtitle?: string;
}

export default function CustomerLove({ testimonials = [], title, subtitle }: CustomerLoveProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const defaultReviews = [
        {
            id: 1,
            text: "I love the milk drops. It's lightweight, absorbs quickly and gives a natural healthy glow.",
            name: "Dhipthi Kanagaraj",
            role: "College Student",
            image: "/images/testimonials/avatar-1.png",
            rating: 5
        },
        {
            id: 2,
            text: "Spending money on this brand is worth every penny. My skin feels so soft and hydrated after the first use.",
            name: "Nagaselvi",
            role: "College Student",
            image: "/images/testimonials/avatar-2.png",
            rating: 5
        },
        {
            id: 3,
            text: "The best chemical-free shampoo I've ever used. My hair fall has reduced significantly.",
            name: "Ananya R.",
            role: "Software Engineer",
            image: "/images/testimonials/avatar-3.png",
            rating: 5
        },
        {
            id: 4,
            text: "Their goat milk soap is a game changer for sensitive skin. Absolutely love the fragrance too!",
            name: "Sarah M.",
            role: "Homemaker",
            image: "/images/testimonials/avatar-4.png",
            rating: 5
        },
    ];

    const displayReviews = testimonials.length > 0 ? testimonials : defaultReviews;

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400;
            scrollContainerRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="py-20 bg-[var(--background)]">
            <div className="container-premium !px-4 md:!px-8">
                <div className="flex flex-col lg:flex-row gap-12 items-center">

                    {/* Left Side: Header Text */}
                    <div className="lg:w-1/3 text-center lg:text-left">
                        <h2
                            className="text-4xl md:text-5xl font-bold text-[var(--primary)] mb-6 font-playfair"
                        >
                            {title || "Trusted by thousands"}
                        </h2>
                        <p className="text-xl md:text-2xl text-[var(--text-primary)] mb-8 font-inter opacity-90 max-w-md mx-auto lg:mx-0">
                            {subtitle || "We value your trust & feedback. Our #VStoriesTribe results & reviews are 100% honest. No retouch."}
                        </p>

                        {/* Static Navigation Buttons (Visible on desktop on the left side in some designs, or we keep them with the slider) */}
                        <div className="hidden lg:flex gap-4">
                            <button
                                onClick={() => scroll("left")}
                                className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-[var(--primary)] hover:bg-[#9eb666] hover:text-white transition-all duration-300"
                                aria-label="Scroll left"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={() => scroll("right")}
                                className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-[var(--primary)] hover:bg-[#9eb666] hover:text-white transition-all duration-300"
                                aria-label="Scroll right"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Right Side: Review Carousel */}
                    <div className="lg:w-2/3 w-full overflow-hidden relative">
                        <div
                            ref={scrollContainerRef}
                            className="flex gap-4 md:gap-6 overflow-x-auto pb-8 pt-4 scrollbar-hide px-2 snap-x"
                            style={{ scrollSnapType: "x mandatory" }}
                        >
                            {displayReviews.map((review: any, index: number) => (
                                <motion.div
                                    key={review.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="min-w-[85vw] md:min-w-[400px] max-w-[400px] bg-white rounded-2xl p-6 md:p-8 shadow-sm flex-shrink-0 snap-center md:snap-start border border-gray-100"
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                                            {/* Placeholder for avatar if image fails */}
                                            {review.image ? (
                                                <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full bg-[#f0f0f0] flex items-center justify-center text-gray-400">
                                                    <span className="text-xl">{review.name?.charAt(0)}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            {/* Stars */}
                                            <div className="flex gap-1 mb-1">
                                                {[...Array(review.rating || 5)].map((_, i) => (
                                                    <Star key={i} className="w-3.5 h-3.5 fill-[#FFA800] text-[#FFA800]" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-[var(--text-primary)] text-lg mb-6 leading-relaxed font-inter italic opacity-90">
                                        "{review.text || review.content}"
                                    </p>

                                    <div>
                                        <h4 className="font-bold text-[var(--text-primary)] text-base font-inter">
                                            {review.name || review.author}
                                        </h4>
                                        <p className="text-sm text-[var(--text-primary)] opacity-60 font-inter">
                                            {review.role || "Verified Buyer"}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Mobile Navigation (Centered below) */}
                        <div className="flex lg:hidden justify-center gap-4 mt-4">
                            <button
                                onClick={() => scroll("left")}
                                className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-[var(--primary)] text-sm"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => scroll("right")}
                                className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-[var(--primary)] text-sm"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
