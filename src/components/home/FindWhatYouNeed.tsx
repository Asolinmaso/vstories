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
      className="relative flex flex-col bg-[#FFFFFF]"
      style={{
        width: "396px",
        height: "641px",
        maxWidth: "100%",
        border: "1px solid #D9D9D9",
        boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.08)",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      {/* Product Image */}
      <div className="relative" style={{ width: "100%", height: "387px", flexShrink: 0 }}>
        <Image
          src={product.images?.[0] || "/images/home/hero2.png"}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="relative flex flex-col flex-1 px-6 pt-6 pb-6">
        {/* Name + Heart row */}
        <div className="flex items-center justify-between mb-3">
          <h3
            className="font-inter font-semibold text-[#2E2E2E]"
            style={{ fontSize: "24px", lineHeight: "29px" }}
          >
            {product.name}
          </h3>
          <button
            className="w-8 h-8 flex items-center justify-center transition-colors hover:scale-110"
            aria-label="Add to wishlist"
          >
            <Heart size={24} strokeWidth={1.5} color="#2E2E2E" />
          </button>
        </div>

        {/* Description */}
        <p
          className="font-inter font-normal text-[#2E2E2E]"
          style={{ fontSize: "16px", lineHeight: "19px", height: "38px", overflow: "hidden" }}
        >
          {product.description?.substring(0, 100) || "A gentle formula for visible, natural results."}
        </p>

        {/* Price + Rating row */}
        <div className="flex items-center justify-between mt-6">
          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-inter font-semibold text-[#2E2E2E]" style={{ fontSize: "24px", lineHeight: "29px" }}>
              ₹{product.price}
            </span>
            {product.original_price && (
              <span className="font-inter font-normal text-[#2E2E2E] line-through opacity-50" style={{ fontSize: "16px", lineHeight: "19px" }}>
                (₹{product.original_price})
              </span>
            )}
          </div>
          {/* Rating */}
          <div className="flex items-center gap-2">
            <svg width="19" height="18" viewBox="0 0 19 18" fill="#E8BF72" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.5 0L11.6329 6.56434H18.535L12.9511 10.6213L15.084 17.1857L9.5 13.1287L3.91604 17.1857L6.04894 10.6213L0.464966 6.56434H7.36712L9.5 0Z" />
            </svg>
            <span className="font-inter font-semibold text-[#2E2E2E]" style={{ fontSize: "24px", lineHeight: "29px" }}>
              {product.rating || 4.8}
            </span>
            <span className="font-inter font-normal text-[#2E2E2E] opacity-50" style={{ fontSize: "16px", lineHeight: "19px" }}>
              ({product.reviews_count || 120})
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4 mt-auto">
          <button
            onClick={handleAddToCart}
            className="flex-1 font-inter font-medium text-[#1D3B29] transition-all hover:bg-[#F4F0EC]"
            style={{
              height: "43px",
              border: "1px solid #1D3B29",
              borderRadius: "8px",
              fontSize: "16px",
              lineHeight: "19px",
            }}
          >
            Add to cart
          </button>
          <Link
            href={`/product/${product.slug || product.id}`}
            className="flex-1 font-inter font-medium transition-all hover:opacity-90"
            style={{
              height: "43px",
              background: "#1D3B29",
              color: "#F7EDE2",
              borderRadius: "8px",
              fontSize: "16px",
              lineHeight: "19px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
    images: ["/images/products/prophetic-face-serum.png"],
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
    images: ["/images/products/herbal-face-pack.png"],
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
    images: ["/images/products/hibiscus-shampoo.png"],
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
        <div className="flex flex-col items-center text-center mb-12">
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
            className="font-playfair font-semibold text-[#1D3B29]"
            style={{ fontSize: "64px", lineHeight: "85px", maxWidth: "100%" }}
          >
            Find what your skin &amp; hair truely needs
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-inter font-normal text-[#2E2E2E] text-center mt-6"
            style={{ fontSize: "24px", lineHeight: "29px", maxWidth: "800px" }}
          >
            Discover gentle, plant-powered skincare and haircare made for <br /> Indian lifestyles, climates, and everyday routines.
          </motion.p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="font-inter font-medium transition-all"
              style={{
                padding: "10px 32px",
                borderRadius: "32px",
                fontSize: "16px",
                lineHeight: "19px",
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
        <div className="flex flex-wrap justify-center gap-8">
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
              width: "202px",
              height: "48px",
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
