"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCartStore } from "@/lib/store";
import { toast } from "sonner";
import { Product } from "@/lib/services/product.service";

interface FeaturedBestsellersProps {
  dbProducts?: Product[];
  title?: string;
  hideSubtitle?: boolean;
  hideHeader?: boolean;
}

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

function StarIcon() {
  return (
    <svg width="14" height="13" viewBox="0 0 19 18" fill="#E8BF72" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.5 0L11.6329 6.56434H18.535L12.9511 10.6213L15.084 17.1857L9.5 13.1287L3.91604 17.1857L6.04894 10.6213L0.464966 6.56434H7.36712L9.5 0Z" />
    </svg>
  );
}

const fallbackProducts: Product[] = [
  {
    id: "1",
    name: "Prophetic-Face Serum",
    price: 250,
    original_price: 280,
    images: ["/images/products/serum1.png", "/images/products/serum.png"],
    rating: 4.8,
    reviews_count: 120,
    slug: "herbal-face-serum",
    is_bestseller: true,
    description: "A lightweight, day-use herbal formula.",
    short_description: "",
    category_id: "skin",
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
    original_price: 200,
    images: ["/images/products/facepack1.png", "/images/products/facepack.png"],
    rating: 4.8,
    reviews_count: 120,
    slug: "herbal-facepack",
    is_bestseller: true,
    description: "A gentle yet powerful herbal blend.",
    short_description: "",
    category_id: "skin",
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
    images: ["/images/products/shampoo1.png", "/images/products/shampoo.png"],
    rating: 4.8,
    reviews_count: 120,
    slug: "hibiscus-shampoo",
    is_bestseller: false,
    description: "A gentle cleanser enriched with hibiscus.",
    short_description: "",
    category_id: "hair",
    stock: 100,
    is_new: false,
    tags: [],
    ingredients: [],
    how_to_use: "",
  },
  {
    id: "4",
    name: "V Herbal Hair Oil",
    price: 230,
    original_price: 250,
    images: ["/images/products/hair oil1.png", "/images/products/hair oil.png"],
    rating: 4.8,
    reviews_count: 120,
    slug: "herbal-hair-oil",
    is_bestseller: false,
    description: "Nourishing herbal hair oil.",
    short_description: "",
    category_id: "hair",
    stock: 100,
    is_new: false,
    tags: [],
    ingredients: [],
    how_to_use: "",
  },
];

function BestsellerCard({ product, badge }: { product: any; badge?: string }) {

  return (
    <Link
      href={`/product/${product.slug}`}
      className="flex flex-col justify-center items-start gap-4 w-full max-w-[280px] mx-auto group cursor-pointer"
    >
      {/* Image box */}
      <div className="relative w-full aspect-square lg:w-[280px] lg:h-[280px] bg-[#EAEAEA] rounded-lg overflow-hidden transition-all duration-300 group-hover:shadow-[0px_10px_25px_rgba(0,0,0,0.08)]">
        <Image
          src={product.images?.[0] || "/images/products/prophetic-face-serum.png"}
          alt={product.name}
          fill
          className="object-cover"
        />
        {/* Badge */}
        {badge && (
          <div
            className="absolute font-inter font-medium text-[#1D3B29] shadow-sm"
            style={{
              top: "12px",
              right: "12px",
              background: "#FFFFFF",
              borderRadius: "20px",
              padding: "4px 12px",
              fontSize: "11px",
              lineHeight: "1.2",
            }}
          >
            {badge}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 w-full px-1">
        <h3 className="font-inter font-semibold text-[#1D3B29]" style={{ fontSize: "15px", lineHeight: "1.2" }}>
          {product.name}
        </h3>

        {/* Price + Rating row */}
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex items-center gap-1.5">
            <span className="font-inter font-semibold text-[#1D3B29]" style={{ fontSize: "15px" }}>
              ₹{product.price}
            </span>
            {product.original_price && (
              <span className="font-inter font-medium text-[#1D3B29] line-through opacity-50" style={{ fontSize: "11px" }}>
                (₹{product.original_price})
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <StarIcon />
            <span className="font-inter font-semibold text-[#1D3B29]" style={{ fontSize: "13px" }}>
              {product.rating || 4.8}
            </span>
            <span className="font-inter font-medium text-[#1D3B29] opacity-50" style={{ fontSize: "10px" }}>
              ({product.reviews_count || product.review_count || 120})
            </span>
          </div>
        </div>

        {/* Shop Now Button */}
        <div
          className="font-inter font-medium hover:opacity-90 transition-all flex items-center justify-center mt-1"
          style={{
            width: "86px",
            height: "28px",
            background: "#1A3E25",
            color: "#FFFFFF",
            borderRadius: "4px",
            fontSize: "11px",
          }}
        >
          Shop Now
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedBestsellers({ dbProducts = [], title = "Our Bestsellers", hideSubtitle = false, hideHeader = false }: FeaturedBestsellersProps) {
  const displayProducts = fallbackProducts.map((p, i) => ({ ...p, badge: i < 2 ? "Best seller" : i === 2 ? "Most Loved" : "New Launch" }));

  return (
    <section className="py-12 lg:py-20" style={{ background: "#FCFAF4" }}>
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[100px]">
        {/* Section Header */}
        {!hideHeader && (
          <div className="flex flex-col items-center text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-6 mb-4"
            >
              <LeafIcon />
              <h2
                className="font-playfair font-semibold text-[#2E2E2E]"
                style={{ fontSize: "36px", lineHeight: "1.2" }}
              >
                {title}
              </h2>
              <LeafIcon flipped />
            </motion.div>

            {!hideSubtitle && (
              <>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="font-playfair font-semibold text-[#2E2E2E] text-2xl sm:text-3xl md:text-4xl lg:text-[48px] lg:leading-[64px]"
                >
                  Real Ingredients, Real Results
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="font-inter font-normal text-[#2E2E2E] text-center mt-2 mb-8 text-base sm:text-lg lg:text-2xl lg:leading-[29px] max-w-[671px]"
                >
                  Handpicked by thousands of happy customers across India
                </motion.p>
              </>
            )}

            {!hideSubtitle && (
              <Link
                href="/shop"
                className="font-inter font-medium inline-flex items-center justify-center hover:opacity-90 transition-all"
                style={{
                  width: "162px",
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
            )}
          </div>
        )}

        {/* Products Grid - 4 columns */}
        <div className="flex flex-wrap justify-center gap-6">
          {displayProducts.map((product: any, index: number) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <BestsellerCard product={product} badge={product.badge} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
