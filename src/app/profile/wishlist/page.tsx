"use client";

import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWishlistStore } from "@/lib/wishlistStore";

export default function WishlistPage() {
    const router = useRouter();
    const { items } = useWishlistStore();

    return (
        <div className="rounded-[24px] border border-[#C6C6C6] bg-[#F4F0EC] p-6">
            <h2 className="font-inter text-xl lg:text-2xl font-semibold text-[#2E2E2E] mb-6">
                My Wishlist
            </h2>

            {items.length === 0 ? (
                <div className="rounded-[24px] bg-white px-6 py-12 text-center flex flex-col items-center justify-center min-h-[220px]">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F4F0EC]">
                        <Heart className="h-8 w-8 text-[#1D3B29]" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-inter text-lg font-semibold text-[#2E2E2E] mb-2">
                        Your wishlist is empty
                    </h3>
                    <p className="font-inter text-sm text-[#2E2E2E]/70 max-w-sm mx-auto mb-6">
                        Save items you love here. Review them anytime and easily move them to the bag.
                    </p>
                    <button
                        type="button"
                        onClick={() => router.push("/shop")}
                        className="rounded-[8px] bg-[#1D3B29] px-6 py-3 font-inter text-base font-medium text-[#F7EDE2] hover:bg-[#2A4F38] transition-colors"
                    >
                        Start Shopping
                    </button>
                </div>
            ) : (
                <p className="font-inter text-[#2E2E2E]">
                    {items.length} item{items.length !== 1 ? "s" : ""} in your wishlist.
                </p>
            )}
        </div>
    );
}
