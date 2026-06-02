"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCartStore } from "@/lib/store";
import { toast } from "sonner";
import { Product } from "@/lib/services/product.service";

interface FeaturedBestsellersProps {
  dbProducts: Product[];
  hideHeader?: boolean;
}

function LeafIcon({ flipped = false }: { flipped?: boolean }) {
  return (
    <div className="relative w-[18px] h-[18px]">
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
    <svg width="12" height="12" viewBox="0 0 28 28" fill="#E8BF72" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 0L17.0623 9.44286H26.9656L19.2016 15.2857L22.2639 24.7286L14.5 18.8857L6.73607 24.7286L9.79837 15.2857L2.03444 9.44286H12.0377L14 0Z" />
    </svg>
  );
}

const fallbackProducts: Product[] = [
  {
    id: "1",
    name: "Prophetic-Face Serum",
    price: 250,
    original_price: 280,
    images: ["/images/products/serum.png"],
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
    images: ["/images/products/facepack.png"],
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
    images: ["/images/products/shampoo.png"],
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
    images: ["/images/products/hari oil.png"],
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
    <div className="flex flex-col w-full max-w-[400px] mx-auto gap-3">
      {/* Image box — landscape on mobile per Figma */}
      <div className="relative w-full bg-[#EAEAEA] rounded-[8px] overflow-hidden aspect-[4/3] sm:aspect-[3/2]">
        <Image
          src={product.images?.[0] || "/images/products/prophetic-face-serum.png"}
          alt={product.name}
          fill
          className="object-cover"
        />
        {/* Badge */}
        {badge && (
          <div
            className="absolute font-inter font-medium text-[#1D3B29] bg-[#F7EDE2] rounded-full px-[8px] py-[4px]"
            style={{
              top: "8px",
              right: "8px",
              fontSize: "10px",
              lineHeight: "1.2",
            }}
          >
            {badge}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 w-full">
        <h3 className="font-inter font-medium text-[#2E2E2E] text-[13px] leading-tight">
          {product.name}
        </h3>

        {/* Price + Rating row */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-1.5">
            <span className="font-inter font-semibold text-[#2E2E2E] text-[13px]">
              ₹{product.price}
            </span>
            {product.original_price && (
              <span className="font-inter font-normal text-[#2E2E2E]/60 line-through text-[11px]">
                (₹{product.original_price})
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <StarIcon />
            <span className="font-inter font-medium text-[#2E2E2E] text-[12px]">
              {product.rating || 4.8}
            </span>
            <span className="font-inter font-normal text-[#2E2E2E]/60 text-[11px]">
              ({product.reviews_count || product.review_count || 120})
            </span>
          </div>
        </div>

        {/* Shop Now Button */}
        <Link
          href={`/product/${product.slug || product.id}`}
          className="font-inter font-medium flex items-center justify-center bg-[#1A3E25] rounded-[4px] hover:opacity-90 transition-all text-[11px] px-4 py-1.5 w-fit"
          style={{ color: "#F7EDE2" }}
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}

export default function FeaturedBestsellersMobile({ dbProducts = [], hideHeader = false }: FeaturedBestsellersProps) {
  // Use real DB products if available, filter for bestsellers, fallback to regular products if needed
  const realProducts = dbProducts && dbProducts.length > 0
    ? (dbProducts.filter(p => p.is_bestseller).length >= 4
      ? dbProducts.filter(p => p.is_bestseller)
      : dbProducts).slice(0, 4)
    : fallbackProducts;

  const displayProducts = realProducts.map((p, i) => ({
    ...p,
    badge: i < 2 ? "Best seller" : i === 2 ? "Most Loved" : "New Launch"
  }));

  return (
    <section className="py-10" style={{ background: "#FCFAF4" }}>
      <div className="w-full max-w-[1440px] mx-auto px-4">
        {/* Section Header */}
        {!hideHeader && (
          <div className="flex flex-col items-center text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-2"
            >
              <LeafIcon />
              <span
                className="font-playfair font-normal text-[#2E2E2E] text-[14px]"
              >
                Our Bestsellers
              </span>
              <LeafIcon flipped />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-playfair font-semibold text-[#2E2E2E] text-[24px] leading-[1.3] mb-2"
            >
              Real Ingredients,<br />Real Results
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-inter font-normal text-[#2E2E2E] text-center text-[13px] leading-[1.4] max-w-[280px] mb-5 mt-2"
            >
              Handpicked by thousands of happy customers across India
            </motion.p>

            <Link
              href="/shop"
              className="font-inter font-medium inline-flex items-center justify-center bg-[#1D3B29] rounded-[6px] hover:opacity-90 transition-all text-[11px] px-6 py-2"
              style={{ color: "#F7EDE2" }}
            >
              View All
            </Link>
          </div>
        )}

        {/* Products — vertical stack on mobile */}
        <div className="flex flex-col items-center gap-8">
          {displayProducts.map((product: any, index: number) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="w-full"
            >
              <BestsellerCard product={product} badge={product.badge} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
