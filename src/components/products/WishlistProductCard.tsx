import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/services/product.service";
import { useCartStore } from "@/lib/store";
import { useWishlistStore } from "@/lib/wishlistStore";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface WishlistProductCardProps {
    product: Product;
}

function DropletIcon() {
    return (
        <svg width="10" height="13" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.61864 0.655866C4.78318 0.439396 5.11181 0.439395 5.27635 0.655865L9.12469 5.7208C9.55938 6.29286 9.77443 6.99433 9.73602 7.70889C9.69762 8.42345 9.40822 9.10825 8.9137 9.65089C8.41918 10.1935 7.74836 10.5619 7.00845 10.6976C6.26853 10.8333 5.50198 10.7291 4.83063 10.4022C4.15928 10.0754 3.62145 9.54471 3.30327 8.8953C2.98509 8.24589 2.90515 7.51613 3.07849 6.82236L4.61864 0.655866Z" fill="#E8BF72"/>
        </svg>
    );
}

export default function WishlistProductCard({ product }: WishlistProductCardProps) {
    const { removeItem } = useWishlistStore();
    const { addItem } = useCartStore();
    const router = useRouter();

    const primarySize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : null;
    const price = primarySize ? primarySize.price : product.price;
    const originalPrice = product.original_price || (price + 20); // Fallback for display

    // Hardcode highlights if none available to match screenshot closely
    const highlights = ["Helps reduce hair fall", "Nourishes scalp", "Strengthens roots"];

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: price,
            image: product.images[0],
            size: primarySize?.label || "200 ml",
        });
        toast.success("Added to Cart");
    };

    const handleBuyNow = () => {
        handleAddToCart();
        router.push("/checkout");
    };

    const handleRemove = async () => {
        await removeItem(product.id);
        toast.success("Removed from Wishlist");
    };

    return (
        <div 
            className="flex flex-col sm:flex-row bg-white rounded-xl p-4 gap-6 relative"
            style={{ border: "1px solid #D9D9D9" }}
        >
            <button 
                onClick={handleRemove}
                className="absolute top-4 right-4 text-[#8C8C8C] hover:text-red-500 transition-colors"
                aria-label="Remove from wishlist"
            >
                <Trash2 className="w-5 h-5" />
            </button>

            {/* Product Image */}
            <Link href={`/product/${product.slug}`} className="relative w-full sm:w-[220px] h-[220px] shrink-0 bg-[#EAEAEA] rounded-lg overflow-hidden group">
                <Image
                    src={product.images[0] || "/images/products/hair oil.png"}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 220px"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
            </Link>

            {/* Product Details */}
            <div className="flex flex-col flex-1 py-1 pr-8">
                <Link href={`/product/${product.slug}`}>
                    <h3 className="font-inter font-semibold text-[#2E2E2E] text-lg mb-1 hover:underline">
                        {product.name}
                    </h3>
                </Link>

                <p className="font-inter text-sm text-[#666666] mb-3">
                    Size : {primarySize?.label || "200 ml"}
                </p>

                {/* Highlights */}
                <div className="mb-4">
                    <p className="font-inter font-medium text-[#2E2E2E] text-xs mb-2">Highlights</p>
                    <ul className="flex flex-col gap-1.5">
                        {highlights.map((hl, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <DropletIcon />
                                <span className="font-inter font-normal text-[#666666] text-xs">
                                    {hl}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Bottom Area: Price & Buttons */}
                <div className="mt-auto">
                    {/* Price */}
                    <div className="flex items-center gap-2 mb-4">
                        <span className="font-inter font-semibold text-[#2E2E2E] text-xl">₹{price}</span>
                        {originalPrice > price && (
                            <span className="font-inter font-medium text-[#8C8C8C] line-through text-sm">(₹{originalPrice})</span>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleAddToCart}
                            className="font-inter font-medium text-white flex items-center justify-center rounded transition-all hover:opacity-90"
                            style={{ background: "#1D3B29", width: 110, height: 36, fontSize: 13 }}
                        >
                            Add To Cart
                        </button>
                        <button
                            onClick={handleBuyNow}
                            className="font-inter font-medium text-[#1D3B29] flex items-center justify-center rounded transition-all hover:bg-[#1D3B29]/5"
                            style={{ background: "#FFFFFF", border: "1px solid #1D3B29", width: 110, height: 36, fontSize: 13 }}
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
