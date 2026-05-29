"use client";

import { useEffect, useState } from "react";
import { useWishlistStore } from "@/lib/wishlistStore";
import { useCartStore } from "@/lib/store";
import { supabase } from "@/lib/supabase-browser";
import { Product } from "@/lib/services/product.service";
import WishlistProductCard from "@/components/products/WishlistProductCard";
import { Heart } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import YouMayAlsoLike from "@/components/products/YouMayAlsoLike";

export default function WishlistClient() {
    const [mounted, setMounted] = useState(false);
    const { items, clearWishlist } = useWishlistStore();
    const { addItem } = useCartStore();
    
    const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);

    const itemIds = items.map(i => i.id).sort().join(',');

    useEffect(() => {
        setMounted(true);
    }, []);

    // Set initial fallback products instantly so UI never blocks
    useEffect(() => {
        if (!mounted || items.length === 0) {
            if (wishlistProducts.length > 0) setWishlistProducts([]);
            return;
        }

        const fallbackProducts: Product[] = items.map(item => ({
            id: item?.id || "",
            name: item?.name || "Unknown Product",
            price: item?.price || 0,
            original_price: (item?.price || 0) + 20,
            images: item?.image ? [item.image] : [],
            slug: item?.slug || "",
            rating: 4.8,
            reviews_count: 120,
            is_bestseller: false,
            description: "",
            short_description: "",
            category_id: "",
            stock: 100,
            is_new: false,
            tags: [],
            ingredients: [],
            how_to_use: "",
        } as Product));

        // Display immediately
        setWishlistProducts(fallbackProducts);

        // Fetch updates silently in the background
        const fetchUpdates = async () => {
            try {
                const ids = items.map(i => i?.id).filter(Boolean);
                const validIds = ids.filter(id => id && id.length > 20);
                
                if (validIds.length > 0) {
                    const { data } = await supabase
                        .from("products")
                        .select(`*, sizes:product_sizes(id, label, price)`)
                        .in("id", validIds);
                        
                    if (data && data.length > 0) {
                        setWishlistProducts(prev => prev.map(fb => {
                            const dbMatch = data.find(db => db.id === fb.id);
                            return dbMatch ? (dbMatch as Product) : fb;
                        }));
                    }
                }
            } catch (error) {
                console.error("Silently caught wishlist fetch error:", error);
            }
        };

        fetchUpdates();
    }, [itemIds, mounted]);

    const handleMoveAllToCart = () => {
        wishlistProducts.forEach(product => {
            const primarySize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : null;
            addItem({
                id: product.id,
                name: product.name,
                price: primarySize ? primarySize.price : product.price,
                image: product.images[0],
                size: primarySize?.label || "200 ml",
            });
        });
        
        toast.success("Moved all items to cart");
    };

    if (!mounted) return null;

    return (
        <div className="w-full" style={{ background: "#FDFCF8", minHeight: "100vh", paddingBottom: 60 }}>
            {/* Header */}
            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[100px] pt-12 pb-8">
                <h1 className="font-playfair font-semibold text-[#2E2E2E] mb-2" style={{ fontSize: 42, lineHeight: "56px" }}>
                    My Wishlist ({items.length.toString().padStart(2, '0')})
                </h1>
                <p className="font-inter font-normal text-[#2E2E2E]" style={{ fontSize: 16 }}>
                    Your favorite herbal essentials, saved in one place.
                </p>
            </div>

            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[100px] pb-16">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    
                    {/* Left Column - Products List */}
                    <div className="flex-1 w-full">
                        {wishlistProducts.length > 0 ? (
                            <div className="flex flex-col gap-4">
                                {wishlistProducts.map(product => (
                                    <WishlistProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl border border-[#D9D9D9] p-16 text-center flex flex-col items-center">
                                <div className="w-16 h-16 bg-[#1D3B29]/5 rounded-full flex items-center justify-center mb-4">
                                    <Heart className="w-8 h-8 text-[#1D3B29]/40" strokeWidth={1.5} />
                                </div>
                                <h2 className="text-2xl font-semibold text-[#1D3B29] mb-2 font-inter">Your wishlist is empty</h2>
                                <p className="text-gray-500 font-inter mb-6">Explore our products and find something you love!</p>
                                <Link href="/shop" className="font-inter font-medium text-white flex items-center justify-center rounded transition-all hover:opacity-90" style={{ background: "#1D3B29", color: "white", width: 180, height: 44, fontSize: 16 }}>
                                    Start Shopping
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Summary Box */}
                    {wishlistProducts.length > 0 && (
                        <div className="w-full lg:w-[360px] shrink-0">
                            <div 
                                className="sticky top-24 bg-white rounded-xl flex flex-col items-center text-center px-8 py-10"
                                style={{ border: "1px solid #D9D9D9" }}
                            >
                                <p className="font-inter font-semibold text-[#2E2E2E] text-xs mb-6">
                                    Wishlist Summary
                                </p>
                                
                                <div className="w-14 h-14 bg-[#EBEFE6] rounded-full flex items-center justify-center mb-6">
                                    <Heart className="w-6 h-6 text-[#98B582]" fill="#98B582" strokeWidth={1} />
                                </div>

                                <h3 className="font-inter font-semibold text-[#2E2E2E] text-lg mb-4 leading-snug">
                                    {items.length} items saved in<br />your wishlist
                                </h3>

                                <p className="font-inter text-sm text-[#666666] mb-8 leading-relaxed">
                                    Save your favorite products and move them to cart anytime for quick checkout.
                                </p>

                                <button
                                    onClick={handleMoveAllToCart}
                                    className="w-full font-inter font-semibold text-white rounded hover:opacity-90 transition-all flex items-center justify-center"
                                    style={{ height: 48, background: "#1D3B29", fontSize: 16 }}
                                >
                                    Move All To Cart
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* You May Also Like Section */}
            <YouMayAlsoLike />
        </div>
    );
}
