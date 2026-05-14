"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
    ChevronRight,
    ChevronDown,
    Minus,
    Plus,
    Heart,
    Share2,
    Truck,
    ShieldCheck,
    Leaf,
    Star,
} from "lucide-react";
import { toast } from "sonner";
import FadeIn from "@/components/ui/FadeIn";
import { useCartStore } from "@/lib/store";
import ProductCard from "@/components/ui/ProductCard";
import ProductReviews from "@/components/product/ProductReviews";

import { Product } from "@/lib/services/product.service";
import AddToWishlistButton from "@/components/products/AddToWishlistButton";

// Helper to highlight specific text portions and fix symbol fonts
const formatDescription = (text: string) => {
    // Split by "40+" or any non-word character (symbols) to handle fonts
    // 1. "40+" -> Special highlight
    // 2. Symbols ([^a-zA-Z0-9\s]) -> San-serif font
    // 3. TextWords -> Peachi font
    const parts = text.split(/(40\+)|([^a-zA-Z0-9\s])/g);

    return parts.map((part, index) => {
        if (!part) return null;

        if (part === "40+") {
            return (
                <span
                    key={index}
                    style={{ fontFamily: "var(--font-peachi)" }}
                    className="text-xl md:text-2xl font-bold text-[var(--secondary)] px-1"
                >
                    40+
                </span>
            );
        }

        // If it's a symbol (not a word character or whitespace), reset font
        // We use a regex test to confirm it's a symbol we want to fix
        if (/^[^a-zA-Z0-9\s]+$/.test(part)) {
            return (
                <span
                    key={index}
                    style={{ fontFamily: "var(--font-fira-sans)" }}
                    className="inline-block"
                >
                    {part}
                </span>
            );
        }

        // Default text - apply Peachi here directly since we remove it from parent
        return (
            <span key={index} style={{ fontFamily: "var(--font-peachi)" }}>
                {part}
            </span>
        );
    });
};

export default function ProductDetailClient({ product, includedProducts = [] }: { product: Product; includedProducts?: Product[] }) {
    const [selectedSize, setSelectedSize] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("description");
    const [selectedImage, setSelectedImage] = useState(0);
    const [resetKey, setResetKey] = useState(0);
    const [reviewCount, setReviewCount] = useState<number | null>(null);
    const [avgRating, setAvgRating] = useState<number>(0);
    const reviewsSectionRef = useRef<HTMLDivElement>(null);

    const addItem = useCartStore((state) => state.addItem);

    // Fetch review count and average rating for the header
    useEffect(() => {
        fetch(`/api/feedback?product_id=${product.id}`)
            .then(res => res.json())
            .then(data => {
                const feedback: { rating: number | null }[] = data.feedback || [];
                setReviewCount(feedback.length);
                const rated = feedback.filter(r => r.rating);
                if (rated.length > 0) {
                    setAvgRating(rated.reduce((acc, r) => acc + (r.rating ?? 0), 0) / rated.length);
                }
            })
            .catch(() => {});
    }, [product.id]);

    // Auto-advance images every 30 seconds; resets when user manually picks a thumbnail
    useEffect(() => {
        if (product.images.length <= 1) return;
        const timer = setInterval(() => {
            setSelectedImage(prev => (prev + 1) % product.images.length);
        }, 30000);
        return () => clearInterval(timer);
    }, [product.images.length, resetKey]);

    const currentPrice = product.sizes && product.sizes.length > 0
        ? product.sizes[selectedSize]?.price || product.price
        : product.price;

    const handleAddToCart = () => {
        addItem({
            id: `${product.id}-${selectedSize}`,
            name: product.name,
            price: currentPrice,
            image: product.images[0],
            size: product.sizes && product.sizes.length > 0 ? product.sizes[selectedSize]?.label : undefined,
        });
        toast.success("Added to Cart", {
            description: `${product.name} has been added to your cart.`
        });
    };

    // Related Products - Ideally fetched from props or another service
    // For now we can skip or pass empty array since they need separate fetching
    const relatedProducts: any[] = [];

    const tabs = [
        { id: "description", label: "Description" },
        { id: "ingredients", label: "Ingredients" },
        { id: "howToUse", label: "How to Use" },
    ];

    return (
        <div className="bg-[var(--background)] min-h-screen font-sans">
            {/* Breadcrumb */}
            <div className="container-premium py-4 md:py-6 px-4 md:px-8">
                <nav className="flex items-center gap-2 text-xs md:text-sm text-[var(--text-muted)] flex-wrap">
                    <Link
                        href="/"
                        className="hover:text-[var(--primary)] transition-colors"
                    >
                        Home
                    </Link>
                    <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                    <Link
                        href="/shop"
                        className="hover:text-[var(--primary)] transition-colors"
                    >
                        Shop
                    </Link>
                    <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="text-[var(--primary)] font-medium line-clamp-1">{product.name}</span>
                </nav>
            </div>

            {/* Product Section */}
            <section className="container-premium pb-10 md:pb-16 px-4 md:px-8">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-20">
                    {/* Image Gallery */}
                    <div className="lg:sticky lg:top-24 self-start">
                        <FadeIn>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white rounded-3xl p-2 shadow-sm mb-4 md:mb-6"
                            >
                                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[var(--secondary-light)] relative">
                                    <motion.div
                                        key={selectedImage}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className="w-full h-full relative"
                                    >
                                        <Image
                                            src={product.images[selectedImage]}
                                            alt={`${product.name} - View ${selectedImage + 1}`}
                                            fill
                                            priority={selectedImage === 0}
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="object-cover object-center"
                                        />
                                    </motion.div>
                                    {product.is_bestseller && (
                                        <div className="absolute top-4 left-4 bg-[var(--highlight)] text-white text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1 uppercase tracking-wider rounded-sm">
                                            Bestseller
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </FadeIn>

                        {/* Thumbnails */}
                        {product.images.length > 1 && (
                            <div className="flex gap-2 md:gap-4 justify-center">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => { setSelectedImage(index); setResetKey(k => k + 1); }}
                                        className={`w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all transform hover:-translate-y-1 ${selectedImage === index
                                            ? "border-[var(--highlight)] shadow-md"
                                            : "border-transparent opacity-70 hover:opacity-100"
                                            }`}
                                    >
                                        <div className="w-full h-full relative">
                                            <Image
                                                src={image}
                                                alt={`${product.name} thumbnail ${index + 1}`}
                                                fill
                                                sizes="80px"
                                                className="object-cover object-center"
                                            />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="pt-0 md:pt-4">
                        <FadeIn direction="up" delay={0.2}>
                            <div className="product-info-container">
                                {/* Title & Rating */}
                                <h1
                                    className="text-3xl md:text-5xl font-medium text-[var(--primary)] mb-2 md:mb-4 leading-tight"
                                    style={{ fontFamily: "var(--font-peachi)" }}
                                >
                                    {product.name}
                                </h1>

                                <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                                    <div className="flex text-[var(--highlight)]">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 md:w-5 md:h-5 ${avgRating > 0 ? (i <= Math.round(avgRating) ? "fill-current" : "fill-none") : "fill-current"}`}
                                            />
                                        ))}
                                    </div>
                                    {reviewCount !== null && reviewCount > 0 && (
                                        <button
                                            onClick={() => reviewsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                                            className="text-xs md:text-sm text-[var(--text-muted)] underline cursor-pointer hover:text-[var(--primary)] transition-colors bg-transparent border-0 p-0"
                                        >
                                            Read {reviewCount} {reviewCount === 1 ? "Review" : "Reviews"}
                                        </button>
                                    )}
                                </div>

                                {/* Price */}
                                <div className="flex items-baseline gap-3 md:gap-4 mb-6 md:mb-8 pb-6 md:pb-8 border-b border-[var(--primary)]/10">
                                    <span className="text-3xl md:text-4xl font-bold text-[var(--primary)] tracking-tight">
                                        ₹{currentPrice}
                                    </span>
                                    {product.original_price && (
                                        <>
                                            <span className="text-lg md:text-xl text-[var(--text-muted)] line-through decoration-1">
                                                ₹{product.original_price}
                                            </span>
                                            <span className="text-xs md:text-sm font-medium text-green-700 bg-green-100 px-1.5 py-0.5 md:px-2 md:py-1 rounded">
                                                {Math.round(((product.original_price - currentPrice) / product.original_price) * 100)}% OFF
                                            </span>
                                        </>
                                    )}
                                </div>
                                {product.sizes && product.sizes.length > 0 && (
                                    <div className="mb-8">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">Select Size</span>
                                            <span className="text-xs text-[var(--text-muted)] italic">Net Volume: {product.sizes[selectedSize]?.label}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            {product.sizes.map((size, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setSelectedSize(index)}
                                                    className={`px-6 py-2.5 rounded-lg border-2 text-sm font-medium transition-all ${selectedSize === index
                                                        ? "border-[var(--primary)] bg-[var(--primary)] text-white shadow-md"
                                                        : "border-[var(--primary)]/10 text-[var(--primary)] hover:border-[var(--primary)] bg-white"
                                                        }`}
                                                >
                                                    {size.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Short Description */}
                                <p className="text-[var(--text-secondary)] text-base md:text-lg mb-6 md:mb-8 leading-relaxed font-light">
                                    {product.short_description}
                                </p>

                                {/* Actions */}
                                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                                    {/* Quantity */}
                                    <div className="inline-flex items-center justify-between border border-[var(--primary)]/20 rounded-xl px-4 py-3 sm:w-40 bg-white">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="text-[var(--primary)] hover:text-[var(--highlight)] transition-colors p-1"
                                            aria-label="Decrease quantity"
                                        >
                                            <Minus className="w-5 h-5" />
                                        </button>
                                        <span className="font-semibold text-[var(--primary)] text-lg">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="text-[var(--primary)] hover:text-[var(--highlight)] transition-colors p-1"
                                            aria-label="Increase quantity"
                                        >
                                            <Plus className="w-5 h-5" />
                                        </button>
                                    </div>

                                    {/* Add to Cart */}
                                    <button
                                        onClick={handleAddToCart}
                                        className="flex-1 btn-primary py-4 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                                    >
                                        Add to Cart — ₹{currentPrice * quantity}
                                    </button>

                                    <div className="flex gap-2">
                                        <div className="tooltip" data-tip="Add to Wishlist">
                                            <AddToWishlistButton
                                                product={{
                                                    id: product.id,
                                                    name: product.name,
                                                    price: currentPrice,
                                                    image: product.images[0],
                                                    slug: product.slug
                                                }}
                                                className="p-4 border border-[var(--primary)]/20 rounded-xl w-14 h-14"
                                            />
                                        </div>
                                        <button className="p-4 border border-[var(--primary)]/20 rounded-xl text-[var(--primary)] hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 transition-all bg-white w-14 h-14 flex items-center justify-center" aria-label="Share Product" title="Share Product">
                                            <Share2 className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>

                                {/* Trust Badges */}
                                <div className="grid grid-cols-3 gap-4 py-6 border-t border-[var(--primary)]/10">
                                    <div className="flex flex-col items-center gap-2 text-center">
                                        <div className="w-10 h-10 rounded-full bg-[var(--highlight)]/10 flex items-center justify-center">
                                            <Truck className="w-5 h-5 text-[var(--highlight)]" />
                                        </div>
                                        <span className="text-xs font-medium text-[var(--primary)]">Free Shipping ₹999+</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 text-center">
                                        <div className="w-10 h-10 rounded-full bg-[var(--highlight)]/10 flex items-center justify-center">
                                            <ShieldCheck className="w-5 h-5 text-[var(--highlight)]" />
                                        </div>
                                        <span className="text-xs font-medium text-[var(--primary)]">100% Authentic</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 text-center">
                                        <div className="w-10 h-10 rounded-full bg-[var(--highlight)]/10 flex items-center justify-center">
                                            <Leaf className="w-5 h-5 text-[var(--highlight)]" />
                                        </div>
                                        <span className="text-xs font-medium text-[var(--primary)]">Chemical Free</span>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Product Accordion (Description, Ingredients, etc.) */}
            <section className="bg-white py-12 md:py-20 border-t border-[var(--primary)]/5">
                <div className="container-premium">
                    <FadeIn className="max-w-3xl mx-auto space-y-4">
                        {tabs.map((tab) => {
                            const isOpen = activeTab === tab.id;

                            return (
                                <div
                                    key={tab.id}
                                    className="border border-[var(--primary)]/10 rounded-2xl overflow-hidden bg-[var(--background)]/10"
                                >
                                    <button
                                        onClick={() => setActiveTab(isOpen ? "" : tab.id)}
                                        className="w-full flex items-center justify-between p-6 md:p-8 text-left transition-colors hover:bg-[var(--background)]/30"
                                    >
                                        <span
                                            className="text-xl md:text-2xl font-medium text-[var(--primary)]"
                                            style={{ fontFamily: "var(--font-peachi)" }}
                                        >
                                            {tab.label}
                                        </span>
                                        <div className={`w-8 h-8 rounded-full border border-[var(--primary)]/20 flex items-center justify-center transition-transform duration-300 ${isOpen ? "rotate-180 bg-[var(--primary)] text-white" : "text-[var(--primary)]"}`}>
                                            <ChevronDown className="w-5 h-5" />
                                        </div>
                                    </button>

                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-6 md:p-8 pt-0 border-t border-[var(--primary)]/5">
                                                    <motion.div
                                                        initial={{ x: -20, opacity: 0 }}
                                                        animate={{ x: 0, opacity: 1 }}
                                                        transition={{ duration: 0.4, delay: 0.1 }}
                                                    >
                                                        {tab.id === "description" && (
                                                            <div className="prose prose-lg prose-green max-w-none text-[var(--text-secondary)]">
                                                                <p className="leading-loose">
                                                                    {formatDescription(product.description)}
                                                                </p>
                                                            </div>
                                                        )}

                                                        {tab.id === "ingredients" && (
                                                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                                {product.ingredients.map((ingredient) => (
                                                                    <li
                                                                        key={ingredient}
                                                                        className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-[var(--primary)]/5"
                                                                    >
                                                                        <div className="w-8 h-8 rounded-full bg-[var(--secondary)]/10 flex items-center justify-center flex-shrink-0">
                                                                            <Leaf className="w-4 h-4 text-[var(--secondary)]" />
                                                                        </div>
                                                                        <span className="text-[var(--primary)] font-medium">{ingredient}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}

                                                        {tab.id === "howToUse" && (
                                                            <div className="flex gap-6 items-start">
                                                                <div className="text-6xl text-[var(--highlight)]/20 font-serif leading-none">"</div>
                                                                <p className="text-[var(--text-secondary)] text-xl leading-relaxed font-light italic">
                                                                    {product.how_to_use}
                                                                </p>
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </FadeIn>
                </div>
            </section>

            {/* Reviews Section */}
            <div ref={reviewsSectionRef}>
                <FadeIn>
                    <ProductReviews productId={product.id} productName={product.name} />
                </FadeIn>
            </div>

            {/* Included Products for Combos */}
            {includedProducts.length > 0 && (
                <section className="bg-[var(--secondary)]/5 py-12 md:py-20 border-t border-[var(--primary)]/5">
                    <div className="container-premium">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-4xl font-heading text-[var(--primary)] mb-4">What's Inside</h2>
                            <p className="text-[var(--text-secondary)]">This power-packed combo contains:</p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                            {includedProducts.map((item) => (
                                <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-[var(--primary)]/10 w-full max-w-[280px] flex flex-col items-center text-center">
                                    <div className="relative w-32 h-32 mb-4 rounded-xl overflow-hidden bg-gray-50">
                                        <div
                                            className="w-full h-full"
                                            style={{
                                                backgroundImage: `url(${item.images[0]})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                            }}
                                        />
                                    </div>
                                    <h3 className="font-heading text-lg text-[var(--primary)] mb-1">{item.name}</h3>
                                    <p className="text-sm text-[var(--text-secondary)] line-clamp-2">{item.short_description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Related Products Section Removed from Client Component for simplicity, or we can fetch them separately */}
        </div>
    );
}
