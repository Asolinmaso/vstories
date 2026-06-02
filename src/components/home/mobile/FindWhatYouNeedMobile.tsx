"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Product } from "@/lib/services/product.service";
import { useCartStore } from "@/lib/store";
import { useWishlistStore } from "@/lib/wishlistStore";
import { toast } from "sonner";

interface FindWhatYouNeedProps {
  products: Product[];
}

// Decorative leaf icon (matches Figma vector)
function LeafIcon({ flipped = false }: { flipped?: boolean }) {
  return (
    <div className="relative w-6 h-6">
      <Image
        src={flipped ? "/images/icons/leafright.png" : "/images/icons/leafleft.png"}
        alt="Leaf"
        fill
        className="object-contain"
      />
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);

  const { hasItem, addItem: addWishlistItem, removeItem: removeWishlistItem, items: wishlistItems } = useWishlistStore();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(hasItem(product.id));
  }, [hasItem, product.id, wishlistItems]);

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLiked) {
      await removeWishlistItem(product.id);
      setIsLiked(false);
      toast.success("Removed from Wishlist");
    } else {
      await addWishlistItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || "",
        slug: product.slug || product.id,
      });
      setIsLiked(true);
      toast.success("Added to Wishlist");
    }
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || "",
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div
      className="relative flex flex-col bg-[#FCFAF4] w-full sm:max-w-[396px]"
      style={{
        border: "1px solid #D9D9D9",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      {/* Product Image */}
      <div className="relative w-full aspect-[4/3] sm:h-[387px] sm:aspect-auto shrink-0 bg-[#FCFAF4]">
        <Image
          src={product.images?.[0] || "/images/home/hero2.png"}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="relative flex flex-col flex-1 px-4 sm:px-6 pt-4 sm:pt-6 pb-4 sm:pb-6">
        {/* Name + Heart row */}
        <div className="flex items-start justify-between mb-2 sm:mb-3">
          <h3 className="font-inter font-bold text-[#2E2E2E] text-[18px] sm:text-[24px] leading-[24px] sm:leading-[29px] pr-2">
            {product.name}
          </h3>
          <button
            onClick={toggleWishlist}
            className="flex-shrink-0 w-7 h-6 flex items-center justify-center transition-colors hover:scale-110 mt-0.5"
            aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              size={20}
              strokeWidth={1.5}
              color={isLiked ? "#778E6B" : "#2E2E2E"}
              fill={isLiked ? "#778E6B" : "transparent"}
              className="transition-colors duration-300"
            />
          </button>
        </div>

        {/* Description */}
        <p className="font-inter font-normal text-[#2E2E2E] text-[13px] sm:text-[16px] leading-[18px] sm:leading-[19px] line-clamp-3 sm:h-[57px] sm:overflow-hidden mb-3">
          {product.description?.substring(0, 150) || "A gentle formula for visible, natural results."}
        </p>

        {/* Price + Rating row */}
        <div className="flex items-center justify-between mt-1 sm:mt-3 mb-3 sm:mb-4">
          {/* Price */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="font-inter font-semibold text-[#2E2E2E] text-[18px] sm:text-[24px] leading-[22px] sm:leading-[29px]">
              ₹{product.price}
            </span>
            {product.original_price && (
              <span className="font-inter font-normal text-[#2E2E2E] line-through text-[13px] sm:text-[16px] leading-[19px]">
                (₹{product.original_price})
              </span>
            )}
          </div>
          {/* Rating */}
          <div className="flex items-center gap-1 sm:gap-2">
            <svg width="18" height="18" viewBox="0 0 28 28" fill="#E8BF72" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 0L17.0623 9.44286H26.9656L19.2016 15.2857L22.2639 24.7286L14.5 18.8857L6.73607 24.7286L9.79837 15.2857L2.03444 9.44286H12.0377L14 0Z" />
            </svg>
            <span className="font-inter font-semibold text-[#2E2E2E] text-[14px] sm:text-[24px] leading-[19px] sm:leading-[29px]">
              {product.rating || 4.8}
            </span>
            <span className="font-inter font-normal text-[#2E2E2E] text-[13px] sm:text-[16px] leading-[19px]">
              ({product.reviews_count || 120})
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-[8px] sm:gap-[10px] mt-auto">
          <button
            onClick={handleAddToCart}
            className="flex flex-1 items-center justify-center font-inter font-medium text-[#1D3B29] transition-all hover:bg-[#F4F0EC] text-[13px] sm:text-[16px]"
            style={{
              height: "40px",
              border: "1px solid #1D3B29",
              borderRadius: "8px",
            }}
          >
            Add to cart
          </button>
          <Link
            href={`/product/${product.slug || product.id}`}
            className="flex flex-1 items-center justify-center font-inter font-medium transition-all hover:opacity-90 text-[13px] sm:text-[16px]"
            style={{
              height: "40px",
              background: "#1D3B29",
              color: "#F7EDE2",
              borderRadius: "8px",
            }}
          >
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
}

// Fallback product cards for when db products don't have matching categories
const fallbackProducts: Product[] = [
  {
    id: "1",
    name: "Prophetic-Face Serum",
    price: 250,
    original_price: 280,
    description: "A lightweight, day-use herbal formula that gently reduces dark spots and restores natural glow.",
    short_description: "Gentle daily serum",
    images: ["/images/products/serum.png"],
    rating: 4.8,
    reviews_count: 120,
    slug: "prophetic-face-serum",
    category_id: "skin",
    is_bestseller: true,
    stock: 100,
    is_new: false,
    tags: [],
    ingredients: [],
    how_to_use: "",
  },
  {
    id: "2",
    name: "Herbal Facepack",
    price: 180,
    original_price: 280,
    description: "A gentle yet powerful herbal blend that deeply cleanses and restores skin's natural radiance.",
    short_description: "Deep cleansing face pack",
    images: ["/images/products/facepack.png"],
    rating: 4.8,
    reviews_count: 120,
    slug: "herbal-facepack",
    category_id: "skin",
    is_bestseller: true,
    stock: 100,
    is_new: false,
    tags: [],
    ingredients: [],
    how_to_use: "",
  },
  {
    id: "3",
    name: "Hibiscus Shampoo",
    price: 250,
    original_price: 280,
    description: "A gentle cleanser enriched with hibiscus extract for stronger, healthier hair growth.",
    short_description: "Herbal hair cleanser",
    images: ["/images/products/shampoo.png"],
    rating: 4.8,
    reviews_count: 120,
    slug: "hibiscus-shampoo",
    category_id: "hair",
    is_bestseller: false,
    stock: 100,
    is_new: false,
    tags: [],
    ingredients: [],
    how_to_use: "",
  },
];

export default function FindWhatYouNeedMobile({ products }: FindWhatYouNeedProps) {
  const [activeTab, setActiveTab] = useState("Skin Care");
  const tabs = ["Skin Care", "Hair Care", "Combo & Gift Packs", "Sample Packs"];

  const filteredProducts = (() => {
    // Prefer real db products, fall back to static data
    const source = products && products.length > 0 ? products : fallbackProducts;
    return source.filter((p) => {
      // Safely handle both array and object for categories (depending on Supabase join type)
      const catSlug = (Array.isArray(p.categories) ? p.categories[0]?.slug : p.categories?.slug) || p.category_id;
      
      if (activeTab === "Skin Care") return catSlug === "skin" || catSlug === "face";
      if (activeTab === "Hair Care") return catSlug === "hair";
      if (activeTab === "Combo & Gift Packs") return catSlug === "combos" || catSlug === "combo" || catSlug === "gifts" || (p.combo_product_ids && p.combo_product_ids.length > 0);
      if (activeTab === "Sample Packs") return catSlug === "samples";
      return true;
    }).slice(0, 3) as any[];
  })();

  return (
    <section
      className="py-12 lg:py-20"
      style={{ background: "#FCFAF4" }}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[100px]">
        {/* Section header: subtitle row with decorative leaves */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 sm:gap-6 mb-3 sm:mb-4"
          >
            <LeafIcon />
            <span className="font-playfair font-normal text-[#2E2E2E] text-[14px] sm:text-[24px] leading-[20px] sm:leading-[32px]">
              Crafted For Your Everyday Care
            </span>
            <LeafIcon flipped />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-playfair font-semibold text-[#2E2E2E] text-[22px] sm:text-[32px] leading-[30px] sm:leading-[43px]"
          >
            Find what your skin &amp; hair truely needs
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-inter font-normal text-[#2E2E2E] text-center mt-4 sm:mt-6 text-[13px] sm:text-base leading-[18px] sm:leading-[19px] max-w-[320px] sm:max-w-[375px]"
          >
            Discover gentle, plant-powered skincare and haircare made for <br className="hidden sm:block" /> Indian lifestyles, climates, and everyday routines.
          </motion.p>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto gap-2 sm:gap-6 mb-8 sm:mb-12 lg:mb-16 pb-2 sm:justify-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none]">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="font-inter font-medium transition-all px-4 sm:px-8 py-2 sm:py-2.5 rounded-[32px] text-[13px] sm:text-base leading-[19px] whitespace-nowrap shrink-0"
              style={{
                background: activeTab === tab ? "#1D3B29" : "transparent",
                border: "1px solid #1D3B29",
                color: activeTab === tab ? "#F7EDE2" : "#1D3B29",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Product Cards */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-5 sm:gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-[#2E2E2E] font-inter text-lg">
              No products found in this category. Check back soon!
            </p>
          )}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-16">
          <Link
            href="/shop"
            className="font-inter font-medium inline-flex items-center justify-center hover:opacity-90 transition-all shadow-md"
            style={{
              width: "127px",
              height: "43px",
              background: "#1D3B29",
              color: "#F7EDE2",
              borderRadius: "8px",
              fontSize: "16px",
              lineHeight: "19px",
            }}
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}
