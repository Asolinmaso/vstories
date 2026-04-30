"use client";

import { Heart, Search, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWishlistStore } from "@/lib/wishlistStore";

export default function WishlistPage() {
    const router = useRouter();
    const { items } = useWishlistStore();
    // Usually wishlist store has product details or just IDs. Ideally we fetch products.
    // For now, assuming standard empty state or basic list if store has data.

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-heading font-bold text-[var(--primary)]">My Wishlist</h1>

            {items.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 shadow-sm border border-[var(--primary)]/5 text-center flex flex-col items-center justify-center min-h-[400px]">
                    <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mb-6">
                        <Heart className="w-10 h-10 text-pink-300 fill-pink-100" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-500 max-w-sm mx-auto mb-8">
                        Save items you love here. Review them anytime and easily move them to the bag.
                    </p>
                    <button
                        onClick={() => router.push('/shop')}
                        className="bg-[#1D3515] text-white px-8 py-3 rounded-full font-medium hover:bg-[#162810] transition-all shadow-lg hover:shadow-xl"
                        style={{
                            backgroundColor: '#1D3515',
                            color: '#ffffff',
                            opacity: 1
                        }}
                    >
                        Explore Products
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Render wishlist items here */}
                    <p className="col-span-full text-center text-gray-500">You have items in your wishlist.</p>
                </div>
            )}
        </div>
    );
}
