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
    Phone,
    Mail,
    MapPin,
    Clock,
} from "lucide-react";
import { toast } from "sonner";
import FadeIn from "@/components/ui/FadeIn";
import { useCartStore } from "@/lib/store";
import ProductCard from "@/components/ui/ProductCard";
import ProductReviews from "@/components/product/ProductReviews";

import { Product } from "@/lib/services/product.service";
import AddToWishlistButton from "@/components/products/AddToWishlistButton";
import YouMayAlsoLike from "@/components/products/YouMayAlsoLike";

const ingredientDescriptions: Record<string, string> = {
    "Hibiscus": "Helps nourish roots and supports healthier hair growth.",
    "Rosemary": "Known to improve circulation and support hair thickness.",
    "Aloe Vera": "Soothes scalp irritation and provides deep hydration.",
    "Fenugreek": "Helps reduce breakage and supports stronger-looking hair.",
    "Shikakai": "Traditionally used as a natural hair cleanser.",
    "Reetha": "Naturally cleanses without stripping natural oils.",
    "Moringa": "Rich in vitamins and minerals to nourish hair follicles.",
    "Amla": "Rich in nutrients that help improve shine and hair texture.",
    "Neem": "Helps keep the scalp healthy and clean.",
    "Sidr": "Provides natural cleansing and conditioning.",
    "Tea Tree Oil": "Known for its purifying and clarifying scalp benefits.",
    "Vitamin E": "Antioxidant that supports scalp health.",
    "Multani Mitti": "Deeply cleanses and detoxifies pores.",
    "Sandalwood": "Traditionally used to brighten and soothe skin.",
    "Manjistha": "Helps reduce pigmentation and improves skin tone.",
    "Kadukai": "Provides natural astringent benefits for skin health.",
    "Maysoor Daal": "Helps exfoliate and brighten the skin.",
    "Avarampoo": "Traditionally used to reduce tan and uneven skin tone.",
    "Licorice": "Brightens the skin and reduces appearance of dark spots.",
    "Frankincense": "Promotes skin elasticity and reduces appearance of blemishes.",
    "Frankincense Extract": "Promotes skin elasticity and reduces appearance of blemishes.",
    "Black Cumin Seed": "Nourishes the skin with essential fatty acids.",
    "Niacinamide": "Visibly improves uneven skin tone and refines pores.",
    "Hyaluronic Acid": "Deeply hydrates the skin for a plump, dewy look.",
    "Manjistha Extract": "Helps reduce pigmentation and improves skin tone.",
    "Bhringraj": "Traditionally used to strengthen hair and maintain scalp health.",
    "Coconut Oil": "Deeply moisturizes and nourishes dry scalp and hair."
};

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
                    style={{ fontFamily: "var(--font-inter)" }}
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
            <span key={index} style={{ fontFamily: "var(--font-inter)" }}>
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

    // Parse description and benefits
    const descriptionParts = product.description ? product.description.split(/Benefits:?/i) : [];
    const mainDescription = descriptionParts[0]?.trim() || product.description || "No description available.";
    const benefitsText = descriptionParts[1] || "";
    const parsedBenefits = benefitsText
        ? benefitsText.split('\n').map(b => b.replace(/^[•\*\-\s]+/, '').trim()).filter(Boolean)
        : [];

    const categorySlug = product.categories?.slug || "";
    const defaultBenefits = categorySlug === "skin" || categorySlug === "face"
        ? [
            "Brightens dull skin",
            "Reduces dark spots & tan",
            "Improves skin texture",
            "Deeply hydrates & nourishes",
            "Suitable for all skin types"
        ]
        : [
            "Helps reduce hair fall",
            "Strengthens hair roots",
            "Supports healthy hair growth",
            "Nourishes dry scalp",
            "Suitable for all hair types"
        ];

    const benefitsToShow = parsedBenefits.length > 0 ? parsedBenefits : defaultBenefits;

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
            id: product.id,
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
            id: product.id,
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
        <div className="bg-[var(--background)] min-h-screen font-sans pb-16 md:pb-24">
            <div className="pt-6 md:pt-[60px] pb-8 md:pb-16 px-4 md:px-8 max-w-[1200px] mx-auto">
                <div className="grid lg:grid-cols-[45%_55%] gap-6 lg:gap-16">
                    {/* Mobile Title Section (Hidden on Desktop) */}
                    <div className="lg:hidden mb-1">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-[14px] font-bold text-[#1D3B29]">
                                {product.categories?.name || "Hair Care"}
                            </span>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setIsLiked(!isLiked)}
                                    className="text-[#1D3B29] hover:opacity-70 transition-opacity"
                                >
                                    <Heart className={`w-5 h-5 stroke-[1.5] ${isLiked ? "fill-[#93B481] stroke-[#93B481]" : ""}`} />
                                </button>
                                <button className="text-[#1D3B29] hover:opacity-70 transition-opacity flex items-center justify-center">
                                    <div className="relative w-5 h-5">
                                        <Image src="/images/icons/share.png" alt="Share" fill className="object-contain" />
                                    </div>
                                </button>
                            </div>
                        </div>

                        <h1
                            className="text-[18px] font-semibold text-[#1D3B29] mb-2 leading-tight"
                            style={{ fontFamily: "var(--font-playfair), serif" }}
                        >
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex items-center gap-1">
                                {reviewCount !== null && reviewCount > 0 && avgRating > 0 && (
                                    <span className="text-[12px] font-bold text-[#1D3B29] hidden">{avgRating.toFixed(1)}</span>
                                )}
                                <div className="flex text-[#E6B93D]">
                                    {[1, 2, 3, 4, 4.5].map((i) => (
                                        <Star
                                            key={i}
                                            className={`w-3.5 h-3.5 fill-current`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <span className="text-[11px] text-[#1D3B29] opacity-80 cursor-pointer" onClick={() => {
                                setActiveTab("reviews");
                                setTimeout(() => reviewsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
                            }}>
                                ({reviewCount !== null ? reviewCount : 120} Reviews)
                            </span>
                        </div>
                    </div>

                    {/* Image Gallery */}
                    <div className="self-start lg:sticky lg:top-32">
                        <FadeIn>
                            <div className="rounded-2xl overflow-hidden relative mb-3 md:mb-4">
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
                            <div className="flex gap-4 mt-4">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => { setSelectedImage(index); setResetKey(k => k + 1); }}
                                        className={`w-16 h-16 md:w-24 md:h-24 shrink-0 rounded-lg overflow-hidden border transition-all ${selectedImage === index
                                            ? "border-[#1D3B29] shadow-sm"
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
                    <div className="pt-2 lg:pt-0">
                        <FadeIn direction="up" delay={0.2}>
                            <div className="hidden lg:block">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xl font-semibold text-[#1D3B29] opacity-90">
                                        {product.categories?.name || "Hair Care"}
                                    </span>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setIsLiked(!isLiked)}
                                            className="text-[#1D3B29] hover:opacity-70 transition-opacity"
                                        >
                                            <Heart className={`w-6 h-6 stroke-[1.5] ${isLiked ? "fill-[#93B481] stroke-[#93B481]" : ""}`} />
                                        </button>
                                        <button className="text-[#1D3B29] hover:opacity-70 transition-opacity flex items-center justify-center">
                                            <div className="relative w-6 h-6">
                                                <Image src="/images/icons/share.png" alt="Share" fill className="object-contain" />
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                <h1
                                    className="font-semibold text-[#1D3B29] mb-3 leading-tight"
                                    style={{ fontFamily: "var(--font-inter)", fontSize: "36px" }}
                                >
                                    {product.name}
                                </h1>

                                <div className="flex items-center gap-3 mb-8">
                                    <div className="flex items-center gap-2">
                                        {reviewCount !== null && reviewCount > 0 && avgRating > 0 && (
                                            <span className="text-[16px] font-bold text-[#1D3B29]">{avgRating.toFixed(1)}</span>
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
                                    <span className="text-[13px] text-[#1D3B29] opacity-90 font-semibold cursor-pointer hover:underline" onClick={() => {
                                        setActiveTab("reviews");
                                        setTimeout(() => reviewsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
                                    }}>
                                        ({reviewCount !== null ? reviewCount : 120} {reviewCount === 1 ? 'Review' : 'Reviews'})
                                    </span>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[24px] md:text-[32px] font-bold text-[#1D3B29] tracking-tight">
                                    ₹{currentPrice}
                                </span>
                                {product.original_price && (
                                    <span className="text-[14px] md:text-[20px] text-[#1D3B29] opacity-70 line-through decoration-1 font-medium mt-1">
                                        (₹{product.original_price})
                                    </span>
                                )}
                            </div>
                            <div className="text-[11px] md:text-[13px] text-[#1D3B29] opacity-80 mb-3 font-medium">
                                Inclusive of all taxes
                            </div>

                            <div className="border border-[#1D3B29] rounded px-2.5 py-1 mb-5 md:mb-8 flex items-center justify-between w-fit text-[10px] md:text-[11px] font-semibold text-[#1D3B29] bg-transparent">
                                <span>HAIR20 - 10% OFF</span>
                                <span className="mx-2 text-[#1D3B29] opacity-30 font-normal">|</span>
                                <span onClick={handleCopyCode} className="cursor-pointer font-medium hover:text-[#5B7258] transition-colors">{copied ? "Copied!" : "Copy Code"}</span>
                            </div>

                            <hr className="border-[#1D3B29] border-t-[1px] opacity-20 mb-5 md:mb-8" />

                            {/* Short Description */}
                            <p className="text-[#1D3B29] opacity-90 text-[11px] md:text-[15px] mb-5 leading-relaxed">
                                {product.short_description || "A nourishing blend of powerful herbs and cold-pressed oils crafted to strengthen roots, reduce hair fall, and support healthy, naturally shiny hair."}
                            </p>

                            {/* Bullet points with droplet icon */}
                            <div className="flex flex-col gap-2 mb-6">
                                {benefitsToShow.map((benefit, i) => (
                                    <div key={i} className="flex items-start gap-2.5 text-[11px] md:text-[15px] text-[#1D3B29] opacity-90 font-medium">
                                        <svg width="8" height="12" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5 shrink-0">
                                            <path d="M5 0C5 0 0 4.725 0 8.925C0 11.728 2.23858 14 5 14C7.76142 14 10 11.728 10 8.925C10 4.725 5 0 5 0Z" fill="#C39641" />
                                        </svg>
                                        <span className="leading-snug">{benefit}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Sizes */}
                            <div className="mb-6">
                                <h3 className="text-[16px] md:text-[22px] font-bold text-[#1D3B29] mb-3">Size</h3>
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
                                                    className={`flex flex-col items-start justify-center min-w-[70px] md:min-w-[90px] px-2.5 py-1.5 rounded-[4px] border transition-all ${isOutOfStock ? "cursor-not-allowed" : ""}`}
                                                    style={{
                                                        backgroundColor: isSelected ? '#1D3B29' : 'transparent',
                                                        border: `1px solid ${isSelected ? '#1D3B29' : isOutOfStock ? 'rgba(29, 59, 41, 0.3)' : '#1D3B29'}`,
                                                        color: isSelected ? 'white' : '#1D3B29'
                                                    }}
                                                    disabled={isOutOfStock}
                                                >
                                                    <span className={`text-[12px] md:text-[15px] font-semibold ${isSelected ? "text-white" : ""}`}>{size.label}</span>
                                                    <span className={`text-[9px] md:text-[11px]`} style={{ opacity: isSelected ? 0.9 : isOutOfStock ? 0.4 : 0.7 }}>{stockStatus}</span>
                                                </button>
                                            )
                                        })
                                    ) : (
                                        <button
                                            className={`flex flex-col items-start justify-center min-w-[70px] md:min-w-[90px] px-2.5 py-1.5 rounded-[4px] border`}
                                            style={{ backgroundColor: '#1D3B29', border: '1px solid #1D3B29', color: 'white' }}
                                        >
                                            <span className={`text-[12px] md:text-[15px] font-semibold`}>100 ml</span>
                                            <span className={`text-[9px] md:text-[11px] text-white opacity-90`}>In Stock</span>
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 w-full max-w-[400px]">
                                {/* Quantity */}
                                <div className="inline-flex items-center justify-between rounded-[4px] px-2 h-9 w-[80px] md:w-[110px] bg-transparent shrink-0" style={{ border: '1px solid #1D3B29' }}>
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="hover:opacity-70 transition-opacity p-1"
                                        style={{ color: '#1D3B29' }}
                                    >
                                        <Minus className="w-3.5 h-3.5" />
                                    </button>
                                    <span className="font-semibold text-[13px]" style={{ color: '#1D3B29' }}>
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="hover:opacity-70 transition-opacity p-1"
                                        style={{ color: '#1D3B29' }}
                                    >
                                        <Plus className="w-3.5 h-3.5" />
                                    </button>
                                </div>

                                {/* Add to Cart */}
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-1 text-white text-[12px] md:text-[15px] font-medium rounded-[4px] transition-opacity hover:opacity-90 h-9"
                                    style={{ backgroundColor: '#1D3B29' }}
                                >
                                    Add to Cart
                                </button>

                                {/* Buy Now */}
                                <button
                                    onClick={handleBuyNow}
                                    className="flex-1 bg-transparent text-[12px] md:text-[15px] font-medium rounded-[4px] hover:opacity-70 transition-colors h-9"
                                    style={{ border: '1px solid #1D3B29', color: '#1D3B29' }}
                                >
                                    Buy Now
                                </button>
                            </div>
                        </FadeIn>
                    </div>
                </div>

                <hr className="border-[#1D3B29] border-t-[1px] opacity-20 my-6 md:my-10" />

                {/* Bottom Section */}
                <div>
                    <div className="flex flex-wrap gap-2 md:gap-4 mb-6 md:mb-10">
                        {["Description", "How to use", "Reviews"].map((tab) => {
                            const tabId = tab.toLowerCase().replace(/\s+/g, '-');
                            const isActive = activeTab === tabId || (activeTab === "description" && tab === "Description");
                            return (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tabId)}
                                    className={`px-4 md:px-6 py-1.5 md:py-2.5 rounded-full border text-[11px] md:text-[15px] font-medium transition-colors hover:opacity-90 whitespace-nowrap`}
                                    style={{
                                        backgroundColor: isActive ? '#1D3B29' : 'transparent',
                                        border: '1px solid #1D3B29',
                                        color: isActive ? 'white' : '#1D3B29'
                                    }}
                                >
                                    {tab}
                                </button>
                            )
                        })}
                    </div>

                    <div className="grid lg:grid-cols-[1fr_400px] gap-8 md:gap-16 items-start">
                        {/* Left Side */}
                        <div className="max-w-[700px]">
                            {(!activeTab || activeTab === "description") && (
                                <FadeIn>
                                    <h2 className="text-[16px] md:text-3xl font-bold text-[#1D3B29] mb-3 md:mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>Product Description</h2>
                                    <p className="text-[#1D3B29] opacity-90 text-[11px] md:text-[15px] leading-relaxed mb-6 md:mb-10" style={{ whiteSpace: 'pre-line' }}>
                                        {mainDescription}
                                    </p>

                                    {product.ingredients && product.ingredients.length > 0 && (
                                        <>
                                            <h2 className="text-[16px] md:text-3xl font-bold text-[#1D3B29] mb-3 md:mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>Key Ingredients</h2>
                                            <div className="space-y-3 md:space-y-4">
                                                {product.ingredients.map(ingName => {
                                                    const desc = ingredientDescriptions[ingName] || "Herbal active ingredient for natural care.";
                                                    return (
                                                        <div key={ingName} className="text-[11px] md:text-[15px]">
                                                            <span className="font-bold text-[#1D3B29]">{ingName}</span>
                                                            <span className="text-[#1D3B29] opacity-90"> : {desc}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </>
                                    )}
                                </FadeIn>
                            )}
                            {activeTab === "how-to-use" && (
                                <FadeIn>
                                    <h2 className="text-[16px] md:text-3xl font-bold text-[#1D3B29] mb-3 md:mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>How to Use</h2>
                                    <p className="text-[#1D3B29] opacity-90 text-[11px] md:text-[15px] leading-relaxed">
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
                            {activeTab === "reviews" ? (
                                <div className="mt-16 lg:mt-0">
                                    <h2 className="text-[36px] text-[#2E2E2E] mb-6 font-medium leading-none" style={{ fontFamily: "var(--font-inter)" }}>Contact Us</h2>
                                    <div className="bg-[#F4F0EC] rounded-xl p-6 md:p-8 flex flex-col gap-6 relative">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center shrink-0 relative">
                                                <Image src="/images/icons/phone.png" alt="Phone" width={18} height={18} className="object-contain" />
                                            </div>
                                            <div>
                                                <h4 className="text-[16px] font-bold text-[#111111] mb-1 leading-tight font-inter">Contact</h4>
                                                <p className="text-[14px] text-[#333333] font-inter">+91 6383921957</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center shrink-0 relative">
                                                <Image src="/images/icons/mail.png" alt="Email" width={18} height={18} className="object-contain" />
                                            </div>
                                            <div>
                                                <h4 className="text-[16px] font-bold text-[#111111] mb-1 leading-tight font-inter">E-mail</h4>
                                                <p className="text-[14px] text-[#333333] font-inter">hello@vstories.in</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center shrink-0 relative">
                                                <Image src="/images/icons/Group.png" alt="Address" width={18} height={18} className="object-contain" />
                                            </div>
                                            <div>
                                                <h4 className="text-[16px] font-bold text-[#111111] mb-1 leading-tight font-inter">Address</h4>
                                                <p className="text-[14px] text-[#333333] leading-snug font-inter">Kilakarai, Tamil Nadu,<br />India</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center shrink-0 relative">
                                                <Image src="/images/icons/Mask group.png" alt="Business Hours" width={18} height={18} className="object-contain" />
                                            </div>
                                            <div>
                                                <h4 className="text-[16px] font-bold text-[#111111] mb-1 leading-tight font-inter">Business Hours</h4>
                                                <p className="text-[14px] text-[#333333] font-inter">Mon - Sat: 9AM - 6PM</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-[#E6DFD3] rounded-[16px] overflow-hidden flex flex-col relative mt-10 md:mt-16 lg:mt-0 shadow-sm border border-[#E6DFD3]">
                                    <div className="relative w-full h-[150px] md:h-[180px]">
                                        <Image
                                            src="/images/products/product.png"
                                            alt="Natural Care"
                                            fill
                                            className="object-cover object-center"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=600&auto=format&fit=crop';
                                            }}
                                        />
                                    </div>
                                    <div className="px-6 md:px-8 pb-8 pt-0 relative z-10 flex flex-col justify-end">
                                        <h3 className="text-[22px] md:text-[28px] text-[#1E382A] font-semibold mb-3 leading-[1.2]" style={{ fontFamily: "var(--font-playfair), serif" }}>
                                            Rooted In Nature,<br />Backed By Science
                                        </h3>
                                        <p className="text-[13px] md:text-[14px] text-[#111111] font-medium leading-[1.6]">
                                            {product.categories?.slug === 'skin'
                                                ? 'At Vstories we blend ancient wisdom with modern research to create clean, safe and effective skin care'
                                                : 'At Vstories we blend ancient wisdom with modern research to create clean, safe and effective hair care'
                                            }
                                        </p>
                                    </div>
                                    <div className="bg-[#1E382A] py-4 px-6 md:px-8 flex items-center gap-4 text-white">
                                        <div className="relative w-7 h-7 shrink-0 opacity-90">
                                            <Image src="/images/icons/product.png" alt="Sustainable Product" fill className="object-contain" />
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="text-[13px] md:text-[14px] font-medium text-white mb-0.5">Sustainable By Choice</div>
                                            <div className="text-[12px] md:text-[13px] text-white opacity-80">Better For You, Better For Earth</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </FadeIn>
                    </div>
                </div>
            </div>

            {/* You May Also Like Section */}
            <YouMayAlsoLike />
        </div>
    );
}
