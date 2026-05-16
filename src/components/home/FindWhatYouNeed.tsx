"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Product } from "@/lib/services/product.service";
import { useCartStore } from "@/lib/store";
import { toast } from "sonner";

interface FindWhatYouNeedProps {
  products: Product[];
}

// Decorative leaf icon (matches Figma vector)
function LeafIcon({ flipped = false }: { flipped?: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: flipped ? "matrix(-0.95, -0.32, -0.32, 0.95, 0, 0)" : "rotate(-18.46deg)" }}
    >
      <path d="M2.67806 0.393273C3.33698 0.746016 3.86524 1.26031 4.27352 1.86988C4.93665 2.86007 5.32531 4.08777 5.64054 5.36694C6.27084 7.92543 6.64437 10.715 7.77326 12.1466C8.83291 13.4904 10.0172 14.1032 11.144 14.2227C11.6287 14.2742 12.107 14.2325 12.5642 14.1104C12.5917 10.6285 11.032 6.71738 8.37049 4.61054C11.4761 6.14733 13.7451 9.27599 14.257 13.1784L13.89 13.4892C14.0091 13.4058 14.1242 13.3167 14.2348 13.2224C15.98 11.7396 16.8379 8.81822 14.9913 5.57157C14.1428 4.07991 12.3091 2.18967 9.91609 1.04988C7.84587 0.0639353 5.3733 -0.379387 2.67804 0.393385L2.67806 0.393273Z" fill="#1D3B29"/>
    </svg>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} width="19" height="18" viewBox="0 0 19 18" fill={star <= rating ? "#E8BF72" : "#D9D9D9"} xmlns="http://www.w3.org/2000/svg">
          <path d="M9.5 0L11.6329 6.56434H18.535L12.9511 10.6213L15.084 17.1857L9.5 13.1287L3.91604 17.1857L6.04894 10.6213L0.464966 6.56434H7.36712L9.5 0Z"/>
        </svg>
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);

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
      className="relative flex flex-col bg-[#FCFAF4] w-full rounded-xl overflow-hidden"
      style={{
        border: "1px solid #D9D9D9",
        boxShadow: "0px 20px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Product Image */}
      <div className="relative w-full aspect-[396/387] flex-shrink-0">
        <Image
          src={product.images?.[0] || "/images/products/prophetic-face-serum.png"}
          alt={product.name}
          fill
          className="object-cover"
        />
        {/* Wishlist heart */}
        <button
          className="absolute top-4 right-4 w-7 h-6 flex items-center justify-center"
          aria-label="Add to wishlist"
        >
          <Heart size={24} strokeWidth={1.5} color="#2E2E2E" />
        </button>
      </div>

      {/* Product Info */}
      <div className="relative flex flex-col flex-1 px-6 pt-6">
        {/* Name */}
        <h3
          className="font-inter font-semibold text-[#2E2E2E]"
          style={{ fontSize: "24px", lineHeight: "29px" }}
        >
          {product.name}
        </h3>

        {/* Description */}
        <p
          className="font-inter font-normal text-[#2E2E2E] mt-3"
          style={{ fontSize: "16px", lineHeight: "19px" }}
        >
          {product.description?.substring(0, 100) || "A gentle formula for visible, natural results."}
        </p>

        {/* Price + Rating row */}
        <div className="flex items-center justify-between mt-4 w-full flex-wrap gap-2">
          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-inter font-semibold text-[#2E2E2E]" style={{ fontSize: "24px", lineHeight: "29px" }}>
              ₹{product.price}
            </span>
            {product.original_price && (
              <span className="font-inter font-normal text-[#2E2E2E] line-through" style={{ fontSize: "16px", lineHeight: "19px" }}>
                (₹{product.original_price})
              </span>
            )}
          </div>
          {/* Rating */}
          <div className="flex items-center gap-2">
            <StarRating rating={product.rating || 5} />
            <span className="font-inter font-semibold text-[#2E2E2E]" style={{ fontSize: "24px", lineHeight: "29px" }}>
              {product.rating || 4.8}
            </span>
            <span className="font-inter font-normal text-[#2E2E2E]" style={{ fontSize: "16px", lineHeight: "19px" }}>
              ({product.reviews_count || 120})
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={handleAddToCart}
            className="font-inter font-medium text-[#1D3B29] transition-all hover:bg-[#1D3B29] hover:text-white rounded-lg flex-1"
            style={{
              padding: "10px",
              border: "1px solid #1D3B29",
              fontSize: "14px",
            }}
          >
            Add to cart
          </button>
          <Link
            href={`/product/${product.slug || product.id}`}
            className="font-inter font-medium text-[#F7EDE2] transition-all hover:opacity-90 flex-1 flex items-center justify-center rounded-lg"
            style={{
              padding: "10px",
              background: "#1D3B29",
              fontSize: "14px",
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
const fallbackProducts = [
  {
    id: "1",
    name: "Prophetic-Face Serum",
    price: 250,
    original_price: 280,
    description: "A lightweight, day-use herbal formula that gently reduces dark spots and restores natural glow.",
    image_url: "/images/products/prophetic-face-serum.png",
    rating: 4.8,
    review_count: 120,
    slug: "prophetic-face-serum",
    category_id: "skin",
    is_bestseller: true,
  },
  {
    id: "2",
    name: "Herbal Facepack",
    price: 180,
    original_price: 280,
    description: "A gentle yet powerful herbal blend that deeply cleanses and restores skin's natural radiance.",
    image_url: "/images/products/herbal-face-pack.png",
    rating: 4.8,
    review_count: 120,
    slug: "herbal-facepack",
    category_id: "skin",
    is_bestseller: true,
  },
  {
    id: "3",
    name: "Hibiscus Shampoo",
    price: 250,
    original_price: 280,
    description: "A gentle cleanser enriched with hibiscus extract for stronger, healthier hair growth.",
    image_url: "/images/products/hibiscus-shampoo.png",
    rating: 4.8,
    review_count: 120,
    slug: "hibiscus-shampoo",
    category_id: "hair",
    is_bestseller: false,
  },
];

export default function FindWhatYouNeed({ products }: FindWhatYouNeedProps) {
  const [activeTab, setActiveTab] = useState("Skin Care");
  const tabs = ["Skin Care", "Hair Care", "Combo & Gift Packs", "Sample Packs"];

  const filteredProducts = (() => {
    const filtered = products.filter((p) => {
      if (activeTab === "Skin Care") return p.category_id === "skin" || p.category_id === "face";
      if (activeTab === "Hair Care") return p.category_id === "hair";
      if (activeTab === "Combo & Gift Packs") return p.category_id === "combos" || p.category_id === "gifts";
      if (activeTab === "Sample Packs") return p.category_id === "samples";
      return true;
    }).slice(0, 3);

    if (filtered.length === 0) {
      return fallbackProducts.filter((p) => {
        if (activeTab === "Skin Care") return p.category_id === "skin";
        if (activeTab === "Hair Care") return p.category_id === "hair";
        return false;
      }).slice(0, 3) as any[];
    }
    return filtered;
  })();

  return (
    <section
      className="py-20"
      style={{ background: "#FCFAF4" }}
    >
      <div className="w-full max-w-[1440px] mx-auto px-[100px]">
        {/* Section header: subtitle row with decorative leaves */}
        <div className="flex flex-col items-center text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end gap-6 mb-4"
          >
            <LeafIcon />
            <span
              className="font-playfair font-normal text-[#2E2E2E]"
              style={{ fontSize: "24px", lineHeight: "32px" }}
            >
              Crafted For Your Everyday Care
            </span>
            <LeafIcon flipped />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-playfair font-semibold text-[#2E2E2E]"
            style={{ fontSize: "48px", lineHeight: "64px", maxWidth: "877px" }}
          >
            Find what your skin &amp; hair truly needs
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-inter font-normal text-[#2E2E2E] text-center mt-4"
            style={{ fontSize: "24px", lineHeight: "29px", maxWidth: "716px" }}
          >
            Discover gentle, plant-powered skincare and haircare made for Indian lifestyles, climates, and everyday routines.
          </motion.p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="font-inter font-medium transition-all"
              style={{
                padding: "12px 24px",
                borderRadius: "32px",
                fontSize: "16px",
                lineHeight: "19px",
                background: activeTab === tab ? "#1D3B29" : "transparent",
                border: activeTab === tab ? "none" : "1px solid #1D3B29",
                color: activeTab === tab ? "#F7EDE2" : "#1D3B29",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Product Cards - grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
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
        <div className="flex justify-center mt-12">
          <Link
            href="/shop"
            className="font-inter font-medium text-[#F7EDE2] inline-flex items-center justify-center hover:opacity-90 transition-all"
            style={{
              width: "162px",
              height: "43px",
              background: "#1D3B29",
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
