"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
    const [copied, setCopied] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const reviewsSectionRef = useRef<HTMLDivElement>(null);

    const addItem = useCartStore((state) => state.addItem);
    const router = useRouter();

    const fetchReviews = () => {
        fetch(`/api/feedback?product_id=${product.id}&t=${Date.now()}`)
            .then(res => res.json())
            .then(data => {
                const feedback: { rating: number | null }[] = data.feedback || [];
                setReviewCount(feedback.length);
                const rated = feedback.filter(r => r.rating);
                if (rated.length > 0) {
                    setAvgRating(rated.reduce((acc, r) => acc + (r.rating ?? 0), 0) / rated.length);
                } else {
                    setAvgRating(0);
                }
            })
            .catch(() => { });
    };

    // Fetch review count and average rating for the header
    useEffect(() => {
        fetchReviews();
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

    const handleBuyNow = () => {
        addItem({
            id: `${product.id}-${selectedSize}`,
            name: product.name,
            price: currentPrice,
            image: product.images[0],
            size: product.sizes && product.sizes.length > 0 ? product.sizes[selectedSize]?.label : undefined,
        });
        router.push('/checkout');
    };

    const handleCopyCode = () => {
        navigator.clipboard.writeText("HAIR20");
        setCopied(true);
        toast.success("Coupon code copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
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
            <div className="container-premium pt-[40px] md:pt-[60px] pb-8 md:pb-16 px-4 md:px-8 max-w-[1200px] mx-auto">
                <div className="grid lg:grid-cols-[45%_55%] gap-8 lg:gap-16">
                    {/* Image Gallery */}
                    <div className="self-start lg:sticky lg:top-32">
                        <FadeIn>
                            <div className="rounded-2xl overflow-hidden relative mb-4">
                                <motion.div
                                    key={selectedImage}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full aspect-[4/4.2] relative bg-[#f4f0ec]"
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
                            </div>
                        </FadeIn>

                        {/* Thumbnails */}
                        {product.images.length > 1 && (
                            <div className="flex gap-4">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => { setSelectedImage(index); setResetKey(k => k + 1); }}
                                        className={`w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === index
                                            ? "border-[var(--primary)] shadow-sm"
                                            : "border-transparent opacity-70 hover:opacity-100"
                                            }`}
                                    >
                                        <div className="w-full h-full relative">
                                            <Image
                                                src={image}
                                                alt={`${product.name} thumbnail ${index + 1}`}
                                                fill
                                                sizes="96px"
                                                className="object-cover object-center"
                                            />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="pt-0 lg:pt-0">
                        <FadeIn direction="up" delay={0.2}>
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xl font-semibold text-[var(--primary)] opacity-90">Hair Care</span>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setIsLiked(!isLiked)}
                                        className="text-[var(--primary)] hover:opacity-70 transition-opacity"
                                    >
                                        <Heart className={`w-6 h-6 stroke-[1.5] ${isLiked ? "fill-[#e53e3e] stroke-[#e53e3e]" : ""}`} />
                                    </button>
                                    <button className="text-[var(--primary)] hover:opacity-70 transition-opacity">
                                        <Share2 className="w-6 h-6 stroke-[1.5]" />
                                    </button>
                                </div>
                            </div>

                            <h1
                                className="text-4xl md:text-[44px] font-medium text-[var(--primary)] mb-3 leading-tight"
                                style={{ fontFamily: "var(--font-peachi)" }}
                            >
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-3 mb-8">
                                <div className="flex items-center gap-2">
                                    {reviewCount !== null && reviewCount > 0 && avgRating > 0 && (
                                        <span className="text-[16px] font-bold text-[var(--primary)]">{avgRating.toFixed(1)}</span>
                                    )}
                                    <div className="flex text-[#E6B93D]">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 md:w-[18px] md:h-[18px] ${avgRating > 0 ? (i <= Math.round(avgRating) ? "fill-current" : "fill-transparent stroke-[1.5] opacity-50") : "fill-current"}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <span className="text-[13px] text-[var(--primary)] opacity-90 font-semibold cursor-pointer hover:underline" onClick={() => {
                                    setActiveTab("reviews");
                                    setTimeout(() => reviewsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
                                }}>
                                    ({reviewCount !== null ? reviewCount : 120} {reviewCount === 1 ? 'Review' : 'Reviews'})
                                </span>
                            </div>

                            {/* Price */}
                            <div className="flex items-center gap-3 mb-1">
                                <span className="text-[32px] font-bold text-[var(--primary)] tracking-tight">
                                    ₹{currentPrice}
                                </span>
                                {product.original_price && (
                                    <span className="text-[20px] text-[var(--primary)] opacity-60 line-through decoration-1 font-medium">
                                        ₹{product.original_price}
                                    </span>
                                )}
                                <div className="ml-2 border border-[var(--primary)] opacity-60 rounded-md px-3 py-1 flex items-center text-[11px] font-bold text-[var(--primary)] bg-transparent">
                                    HAIR20 - 10% OFF <span className="mx-2 text-[var(--primary)] opacity-40 font-normal">|</span> <span onClick={handleCopyCode} className="cursor-pointer font-medium hover:text-[#5B7258] transition-colors">{copied ? "Copied!" : "Copy Code"}</span>
                                </div>
                            </div>
                            <div className="text-[13px] text-[var(--primary)] opacity-90 mb-8 font-medium">
                                Inclusive of all taxes
                            </div>

                            <hr className="border-[var(--primary)] border-t-[1.5px] opacity-20 mb-8" />

                            {/* Short Description */}
                            <p className="text-[var(--primary)] opacity-90 text-[15px] mb-6 leading-relaxed">
                                {product.short_description || "A nourishing blend of powerful herbs and cold-pressed oils crafted to strengthen roots, reduce hair fall, and support healthy, naturally shiny hair."}
                            </p>

                            {/* Bullet points with droplet icon */}
                            <div className="flex flex-col gap-2.5 mb-8">
                                {[
                                    "Helps reduce hair fall",
                                    "Strengthens hair roots",
                                    "Supports healthy hair growth",
                                    "Nourishes dry scalp",
                                    "Suitable for all hair types"
                                ].map((benefit, i) => (
                                    <div key={i} className="flex items-center gap-3 text-[15px] text-[var(--primary)] opacity-90 font-medium">
                                        <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 0C5 0 0 4.725 0 8.925C0 11.728 2.23858 14 5 14C7.76142 14 10 11.728 10 8.925C10 4.725 5 0 5 0Z" fill="var(--highlight-dark)" />
                                        </svg>
                                        {benefit}
                                    </div>
                                ))}
                            </div>

                            {/* Sizes */}
                            <div className="mb-8">
                                <h3 className="text-[22px] font-semibold text-[var(--primary)] mb-4">Size</h3>
                                <div className="flex flex-wrap gap-4">
                                    {product.sizes && product.sizes.length > 0 ? (
                                        product.sizes.map((size, index) => {
                                            const isSelected = selectedSize === index;
                                            const stockStatus = index === 0 ? "In Stock" : index === 1 ? "Only 3 Left" : "Out Of Stock";
                                            const isOutOfStock = stockStatus === "Out Of Stock";

                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() => !isOutOfStock && setSelectedSize(index)}
                                                    className={`flex flex-col items-start justify-center min-w-[90px] px-3 py-1.5 rounded-[6px] border transition-all ${isOutOfStock ? "cursor-not-allowed" : ""}`}
                                                    style={{
                                                        backgroundColor: isSelected ? 'var(--primary)' : 'transparent',
                                                        border: `1px solid ${isSelected ? 'var(--primary)' : isOutOfStock ? 'rgba(29, 59, 41, 0.4)' : 'var(--primary)'}`,
                                                        color: isSelected ? 'white' : 'var(--primary)'
                                                    }}
                                                    disabled={isOutOfStock}
                                                >
                                                    <span className={`text-[15px] font-bold ${isSelected ? "text-white" : ""}`}>{size.label}</span>
                                                    <span className={`text-[11px]`} style={{ opacity: isSelected ? 0.8 : isOutOfStock ? 0.4 : 0.6 }}>{stockStatus}</span>
                                                </button>
                                            )
                                        })
                                    ) : (
                                        <button
                                            className={`flex flex-col items-start justify-center min-w-[90px] px-3 py-1.5 rounded-[6px] border`}
                                            style={{ backgroundColor: 'var(--primary)', border: '1px solid var(--primary)', color: 'white' }}
                                        >
                                            <span className={`text-[15px] font-bold`}>100 ml</span>
                                            <span className={`text-[11px] text-white opacity-80`}>In Stock</span>
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap sm:flex-nowrap gap-4">
                                {/* Quantity */}
                                <div className="inline-flex items-center justify-between rounded-[6px] px-3 py-2 w-[110px] bg-transparent" style={{ border: '1px solid var(--primary)' }}>
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="hover:opacity-70 transition-opacity"
                                        style={{ color: 'var(--primary)' }}
                                    >
                                        <Minus className="w-5 h-5" />
                                    </button>
                                    <span className="font-bold text-[17px]" style={{ color: 'var(--primary)' }}>
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="hover:opacity-70 transition-opacity"
                                        style={{ color: 'var(--primary)' }}
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Add to Cart */}
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 text-white text-[15px] font-medium rounded-[6px] transition-opacity hover:opacity-90 py-2.5"
                                    style={{ backgroundColor: 'var(--primary)' }}
                                >
                                    Add to Cart
                                </button>

                                {/* Buy Now */}
                                <button
                                    onClick={handleBuyNow}
                                    className="flex-1 bg-transparent text-[15px] font-medium rounded-[6px] hover:opacity-70 transition-colors py-2.5"
                                    style={{ border: '1px solid var(--primary)', color: 'var(--primary)' }}
                                >
                                    Buy Now
                                </button>
                            </div>
                        </FadeIn>
                    </div>
                </div>

                <hr className="border-[var(--primary)] border-t-[1.5px] opacity-20 my-10" />

                {/* Bottom Section */}
                <div>
                    <div className="flex gap-4 mb-10">
                        {["Description", "How to use", "Reviews"].map((tab) => {
                            const tabId = tab.toLowerCase().replace(/\s+/g, '-');
                            const isActive = activeTab === tabId || (activeTab === "description" && tab === "Description");
                            return (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tabId)}
                                    className={`px-6 py-2.5 rounded-full border text-[15px] font-medium transition-colors hover:opacity-90`}
                                    style={{
                                        backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                                        border: '1px solid var(--primary)',
                                        color: isActive ? 'white' : 'var(--primary)'
                                    }}
                                >
                                    {tab}
                                </button>
                            )
                        })}
                    </div>

                    <div className="grid lg:grid-cols-[1fr_400px] gap-16 items-start">
                        {/* Left Side */}
                        <div className="max-w-[700px]">
                            {(!activeTab || activeTab === "description") && (
                                <FadeIn>
                                    <h2 className="text-3xl text-[var(--primary)] mb-4" style={{ fontFamily: "var(--font-peachi)" }}>Product Description</h2>
                                    <p className="text-[var(--primary)] opacity-90 text-[15px] leading-relaxed mb-10">
                                        Our Herbal Hair Oil is carefully formulated using traditional herbal ingredients known for strengthening roots and improving overall scalp health. The lightweight, non-sticky formula deeply nourishes the scalp while promoting softer, healthier-looking hair.<br /><br />
                                        Regular use helps improve texture, reduce dryness, and support natural shine.
                                    </p>

                                    <h2 className="text-3xl text-[var(--primary)] mb-6" style={{ fontFamily: "var(--font-peachi)" }}>Key Ingredients</h2>
                                    <div className="space-y-4">
                                        {[
                                            { name: "Hibiscus", desc: "Helps nourish roots and supports healthier hair growth." },
                                            { name: "Bhringraj", desc: "Traditionally used to strengthen hair and maintain scalp health." },
                                            { name: "Amla", desc: "Rich in nutrients that help improve shine and hair texture." },
                                            { name: "Coconut Oil", desc: "Deeply moisturizes and nourishes dry scalp and hair." },
                                            { name: "Fenugreek", desc: "Helps reduce breakage and supports stronger-looking hair." },
                                        ].map(ing => (
                                            <div key={ing.name} className="text-[15px]">
                                                <span className="font-bold text-[var(--primary)]">{ing.name}</span>
                                                <span className="text-[var(--primary)] opacity-90 font-medium"> : {ing.desc}</span>
                                            </div>
                                        ))}
                                    </div>
                                </FadeIn>
                            )}
                            {activeTab === "how-to-use" && (
                                <FadeIn>
                                    <h2 className="text-3xl text-[var(--primary)] mb-4" style={{ fontFamily: "var(--font-peachi)" }}>How to Use</h2>
                                    <p className="text-[var(--primary)] opacity-90 text-[15px] leading-relaxed">
                                        {product.how_to_use || "Apply generously to scalp and hair. Massage gently and leave it on for at least an hour before washing off with a mild shampoo."}
                                    </p>
                                </FadeIn>
                            )}
                            {activeTab === "reviews" && (
                                <FadeIn>
                                    <div ref={reviewsSectionRef}>
                                        <ProductReviews productId={product.id} productName={product.name} onReviewAdded={fetchReviews} />
                                    </div>
                                </FadeIn>
                            )}
                        </div>

                        {/* Right Side Card */}
                        <FadeIn delay={0.2}>
                            <div className="bg-[var(--secondary-light)] rounded-xl overflow-hidden flex flex-col relative mt-16 lg:mt-0">
                                {/* The placeholder image representing the herbs/oil bowl */}
                                <div className="relative w-full h-[220px]">
                                    <Image
                                        src="/images/products/herbal-hair-oil.jpg"
                                        alt="Herbs and Oil"
                                        fill
                                        className="object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=600&auto=format&fit=crop';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--secondary-light)] via-transparent to-transparent"></div>
                                </div>
                                <div className="px-6 pb-6 pt-2 relative z-10">
                                    <h3 className="text-[26px] text-[var(--primary)] mb-3 leading-tight" style={{ fontFamily: "var(--font-peachi)" }}>
                                        Rooted In Nature,<br />Backed By Science
                                    </h3>
                                    <p className="text-[14px] text-[var(--primary)] font-medium leading-relaxed">
                                        At Vstories we blend ancient wisdom with modern research to create clean, safe and effective hair care
                                    </p>
                                </div>
                                <div className="bg-[var(--primary)] p-4 px-6 flex items-center gap-4 text-white">
                                    <div className="relative w-7 h-7 shrink-0">
                                        <Image src="/images/icons/product.png" alt="Sustainable Product" fill className="object-contain" />
                                    </div>
                                    <div>
                                        <div className="text-[15px] font-medium leading-tight mb-1">Sustainable By Choice</div>
                                        <div className="text-[13px] text-white opacity-80 leading-tight">Better For You, Better For Earth</div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>

            {/* You May Also Like Section */}
            <div className="relative z-10 py-16 mt-8 md:mt-16 bg-[#FCFAF4]">
                {/* Background Image */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <Image
                        src="/images/products/background.png"
                        alt="Background Pattern"
                        fill
                        className="object-cover"
                        priority={false}
                    />
                </div>

                <div className="container-premium max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
                    <div className="text-center mb-10 flex items-center justify-center gap-4">
                        <div className="relative w-6 h-6">
                            <Image src="/images/icons/leafleft.png" alt="Leaf Decoration Left" fill className="object-contain" />
                        </div>
                        <h2 className="text-4xl text-[var(--primary)]" style={{ fontFamily: "var(--font-peachi)" }}>You May Also Like</h2>
                        <div className="relative w-6 h-6">
                            <Image src="/images/icons/leafright.png" alt="Leaf Decoration Right" fill className="object-contain" />
                        </div>
                    </div>

                    <div
                        className="flex overflow-x-auto gap-4 sm:gap-6 pb-8 snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 hide-scroll"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        <style dangerouslySetInnerHTML={{
                            __html: `
                            .hide-scroll::-webkit-scrollbar {
                                display: none;
                            }
                        `}} />
                        {[
                            { name: "Prophetic-Face Serum", original: 280, price: 250, img: "/images/products/prophetic-face-serum.png" },
                            { name: "Herbal Facepack", original: 200, price: 180, img: "/images/products/herbal-face-pack.png" },
                            { name: "Hibiscus Shampoo", original: 280, price: 250, img: "/images/products/hibiscus-shampoo.png" },
                            { name: "V Herbal Hair Oil", original: 250, price: 230, img: "/images/products/herbal-hair-oil.jpg" },
                        ].map((prod, i) => (
                            <div key={i} className="flex-none w-[260px] sm:w-[280px] lg:w-[calc(25%-1.125rem)] snap-start flex flex-col group cursor-pointer">
                                <div className="bg-[#EBE7DF] rounded-xl overflow-hidden relative aspect-square mb-4 transition-transform duration-300 group-hover:scale-[1.02]">
                                    <Image
                                        src={prod.img}
                                        alt={prod.name}
                                        fill
                                        className="object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=600&auto=format&fit=crop';
                                        }}
                                    />
                                </div>
                                <h3 className="text-[17px] font-bold text-[var(--primary)] mb-1">{prod.name}</h3>
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[18px] font-bold text-[var(--primary)] tracking-tight">₹{prod.price}</span>
                                        <span className="text-[13px] text-[var(--primary)] opacity-60 line-through font-medium">₹{prod.original}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-[var(--highlight)] text-[var(--highlight)]" />
                                        <span className="text-[13px] font-bold text-[var(--primary)]">4.8</span>
                                        <span className="text-[11px] text-[var(--primary)] opacity-60 font-medium">(120)</span>
                                    </div>
                                </div>
                                <div className="mt-auto">
                                    <button className="bg-[var(--primary)] text-white text-[14px] font-medium px-6 py-2 rounded transition-opacity hover:opacity-90 shadow-sm w-max" style={{ backgroundColor: 'var(--primary)' }}>
                                        Shop Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Info Banner */}
            <div className="bg-[#F8F6EF] py-4 mt-4" style={{ borderTop: '1px solid rgba(29,59,41,0.08)' }}>
                <div className="container-premium max-w-[1000px] mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-[var(--primary)]" style={{ '--tw-divide-opacity': '0.1' } as any}>
                        <div className="flex flex-col items-center justify-center pt-4 md:pt-0 border-opacity-10" style={{ borderColor: 'var(--primary)' }}>
                            <div className="relative w-10 h-10 mb-2">
                                <Image src="/images/icons/shippings.png" alt="Free Shipping" fill className="object-contain" />
                            </div>
                            <h4 className="text-[19px] font-medium text-[var(--primary)] mb-1" style={{ fontFamily: "var(--font-peachi)" }}>Free Shipping</h4>
                            <p className="text-[13px] text-[var(--primary)] opacity-70 font-medium">On orders above ₹799</p>
                        </div>
                        <div className="flex flex-col items-center justify-center pt-4 md:pt-0 border-opacity-10" style={{ borderColor: 'var(--primary)' }}>
                            <div className="relative w-10 h-10 mb-2">
                                <Image src="/images/icons/savings.png" alt="Cash On Delivery" fill className="object-contain" />
                            </div>
                            <h4 className="text-[19px] font-medium text-[var(--primary)] mb-1" style={{ fontFamily: "var(--font-peachi)" }}>Cash On Delivery</h4>
                            <p className="text-[13px] text-[var(--primary)] opacity-70 font-medium">₹25 Per Order</p>
                        </div>
                        <div className="flex flex-col items-center justify-center pt-4 md:pt-0 border-opacity-10" style={{ borderColor: 'var(--primary)' }}>
                            <div className="relative w-10 h-10 mb-2">
                                <Image src="/images/icons/payments.png" alt="Secure Payments" fill className="object-contain" />
                            </div>
                            <h4 className="text-[19px] font-medium text-[var(--primary)] mb-1" style={{ fontFamily: "var(--font-peachi)" }}>Secure Payments</h4>
                            <p className="text-[13px] text-[var(--primary)] opacity-70 font-medium">Razor pay Payment</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
