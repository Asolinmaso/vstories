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
      className="relative flex flex-col bg-[#FFFFFF] w-full sm:w-[calc(33.33%-16px)] transition-all duration-300 hover:shadow-[0px_10px_25px_rgba(0,0,0,0.08)] hover:-translate-y-1"
      style={{
        border: "1px solid rgba(29, 59, 41, 0.1)",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      {/* Product Image */}
      <Link href={`/product/${product.slug || product.id}`} className="relative w-full h-48 sm:h-64 lg:h-[387px] shrink-0 block">
        <Image
          src={product.images?.[0] || "/images/home/hero2.png"}
          alt={product.name}
          fill
          className="object-cover"
        />
      </Link>

      {/* Product Info */}
      <div className="relative flex flex-col flex-1 px-4 pt-5 pb-5">
        {/* Name row */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <Link href={`/product/${product.slug || product.id}`} className="flex-1 pt-0.5">
            <h3
              className="font-inter font-semibold text-[#1D3B29] line-clamp-1 hover:opacity-80 transition-opacity"
              style={{ fontSize: "18px", lineHeight: "1.2" }}
            >
              {product.name}
            </h3>
          </Link>
          <button
            onClick={toggleWishlist}
            className="text-gray-400 hover:text-[#1D3B29] transition-colors p-0.5 -mt-1 -mr-1"
            aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-[22px] h-[22px] ${isLiked ? "fill-current text-[#1D3B29]" : ""}`} strokeWidth={1.5} />
          </button>
        </div>

        {/* Description */}
        <p
          className="font-inter font-normal text-[#1D3B29] opacity-80"
          style={{ fontSize: "13px", lineHeight: "1.4", height: "36px", overflow: "hidden" }}
        >
          {product.description?.substring(0, 100) || "A gentle formula for visible, natural results."}
        </p>

        {/* Price + Rating row */}
        <div className="flex flex-row items-center justify-between mt-4">
          {/* Price */}
          <div className="flex items-center gap-1.5">
            <span className="font-inter font-semibold text-[#1D3B29]" style={{ fontSize: "18px" }}>
              ₹{product.price}
            </span>
            {product.original_price && (
              <span className="font-inter font-medium text-[#1D3B29] line-through opacity-50" style={{ fontSize: "12px" }}>
                (₹{product.original_price})
              </span>
            )}
          </div>
          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <svg width="14" height="13" viewBox="0 0 19 18" fill="#E8BF72" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.5 0L11.6329 6.56434H18.535L12.9511 10.6213L15.084 17.1857L9.5 13.1287L3.91604 17.1857L6.04894 10.6213L0.464966 6.56434H7.36712L9.5 0Z" />
            </svg>
            <span className="font-inter font-semibold text-[#1D3B29]" style={{ fontSize: "14px" }}>
              {product.rating || 4.8}
            </span>
            <span className="font-inter font-medium text-[#1D3B29] opacity-50" style={{ fontSize: "11px" }}>
              ({product.reviews_count || 120})
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-row items-center gap-3 mt-5 auto">
          <button
            onClick={handleAddToCart}
            className="flex-1 font-inter font-medium text-[#1D3B29] transition-all hover:bg-[#1D3B29]/5"
            style={{
              height: "36px",
              border: "1px solid #1D3B29",
              borderRadius: "4px",
              fontSize: "13px",
            }}
          >
            Add to cart
          </button>
          <Link
            href={`/product/${product.slug || product.id}`}
            className="flex-1 font-inter font-medium transition-all hover:opacity-90"
            style={{
              height: "36px",
              background: "#1D3B29",
              color: "#FFFFFF",
              borderRadius: "4px",
              fontSize: "13px",
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
    images: ["/images/products/serum1.png", "/images/products/serum.png"],
    rating: 4.8,
    reviews_count: 120,
    slug: "herbal-face-serum",
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
    images: ["/images/products/facepack1.png", "/images/products/facepack.png"],
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
    images: ["/images/products/shampoo1.png", "/images/products/shampoo.png"],
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
  {
    id: "4",
    name: "Complete Hair Care Trio",
    price: 600,
    original_price: 680,
    description: "Hair Oil + Shampoo + Hair Mask - Complete hair transformation set.",
    short_description: "Complete hair transformation set.",
    images: ["/images/products/combo-hair-trio.png"],
    rating: 5,
    reviews_count: 120,
    slug: "complete-hair-care-trio",
    category_id: "combos",
    is_bestseller: true,
    stock: 100,
    is_new: false,
    tags: [],
    ingredients: [],
    how_to_use: "",
  },
  {
    id: "5",
    name: "V Glow Face Duo",
    price: 369,
    original_price: 500,
    description: "Herbal Face Pack + Glow Serum - For instant radiance & glow.",
    short_description: "For instant radiance & glow.",
    images: ["/images/products/combo-face-duo.png"],
    rating: 5,
    reviews_count: 120,
    slug: "v-glow-face-duo",
    category_id: "combos",
    is_bestseller: true,
    stock: 100,
    is_new: false,
    tags: [],
    ingredients: [],
    how_to_use: "",
  },
  {
    id: "6",
    name: "Rosemary Hairmask",
    price: 220,
    original_price: 280,
    description: "Deeply nourishing hair mask enriched with rosemary to strengthen roots and improve hair texture.",
    short_description: "Strengthening hair mask",
    images: ["/images/products/hairpack1.png", "/images/products/hairpack.png"],
    rating: 4.8,
    reviews_count: 120,
    slug: "rosemary-hairmask",
    category_id: "hair",
    is_bestseller: true,
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
    return fallbackProducts.filter((p) => {
      if (activeTab === "Skin Care") return p.category_id === "skin" || p.category_id === "face";
      if (activeTab === "Hair Care") return p.category_id === "hair";
      if (activeTab === "Combo & Gift Packs") return p.category_id === "combos" || p.category_id === "gifts";
      if (activeTab === "Sample Packs") return p.category_id === "samples";
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
            className="font-playfair font-semibold text-[#1D3B29] text-3xl sm:text-4xl md:text-5xl lg:text-[64px] leading-tight sm:leading-snug lg:leading-[85px] max-w-full"
          >
            Find what your skin &amp; hair truely needs
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-inter font-normal text-[#2E2E2E] text-center mt-6 text-base sm:text-lg lg:text-2xl lg:leading-[29px] max-w-[800px]"
          >
            Discover gentle, plant-powered skincare and haircare made for <br className="hidden sm:block" /> Indian lifestyles, climates, and everyday routines.
          </motion.p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-12 lg:mb-16">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="font-inter font-medium transition-all px-4 py-2 sm:px-8 sm:py-2.5 rounded-[32px] text-sm sm:text-base leading-[19px]"
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
        <div className="flex flex-wrap justify-center gap-6">
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
