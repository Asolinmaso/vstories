"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCartStore } from "@/lib/store";
import { toast } from "sonner";
import { Product } from "@/lib/services/product.service";

interface FeaturedBestsellersProps {
  dbProducts: Product[];
}

function LeafIcon({ flipped = false }: { flipped?: boolean }) {
  return (
    <div
      className="w-6 h-6"
      style={{
        background: flipped ? "" : "#1A3E25",
        transform: flipped ? "matrix(-0.95, -0.32, -0.32, 0.95, 0, 0)" : "rotate(-18.46deg)",
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#1A3E25" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.67806 0.393273C3.33698 0.746016 3.86524 1.26031 4.27352 1.86988C4.93665 2.86007 5.32531 4.08777 5.64054 5.36694C6.27084 7.92543 6.64437 10.715 7.77326 12.1466C8.83291 13.4904 10.0172 14.1032 11.144 14.2227C11.6287 14.2742 12.107 14.2325 12.5642 14.1104C12.5917 10.6285 11.032 6.71738 8.37049 4.61054C11.4761 6.14733 13.7451 9.27599 14.257 13.1784L13.89 13.4892C14.0091 13.4058 14.1242 13.3167 14.2348 13.2224C15.98 11.7396 16.8379 8.81822 14.9913 5.57157C14.1428 4.07991 12.3091 2.18967 9.91609 1.04988C7.84587 0.0639353 5.3733 -0.379387 2.67804 0.393385L2.67806 0.393273Z"/>
      </svg>
    </div>
  );
}

function StarIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="#E8BF72" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 0L17.0623 9.44286H26.9656L19.2016 15.2857L22.2639 24.7286L14.5 18.8857L6.73607 24.7286L9.79837 15.2857L2.03444 9.44286H12.0377L14 0Z"/>
    </svg>
  );
}

const fallbackProducts = [
  {
    id: "1",
    name: "Prophetic-Face Serum",
    price: 250,
    original_price: 280,
    image_url: "/images/products/prophetic-face-serum.png",
    rating: 4.8,
    review_count: 120,
    slug: "prophetic-face-serum",
    is_bestseller: true,
    badge: "Best seller",
  },
  {
    id: "2",
    name: "Herbal Facepack",
    price: 180,
    original_price: 200,
    image_url: "/images/products/herbal-face-pack.png",
    rating: 4.8,
    review_count: 120,
    slug: "herbal-facepack",
    is_bestseller: true,
    badge: "Best seller",
  },
  {
    id: "3",
    name: "Hibiscus Shampoo",
    price: 250,
    original_price: 280,
    image_url: "/images/products/hibiscus-shampoo.png",
    rating: 4.8,
    review_count: 120,
    slug: "hibiscus-shampoo",
    is_bestseller: false,
    badge: "Most Loved",
  },
  {
    id: "4",
    name: "V Herbal Hair Oil",
    price: 230,
    original_price: 250,
    image_url: "/images/products/herbal-hair-oil.jpg",
    rating: 4.8,
    review_count: 120,
    slug: "v-herbal-hair-oil",
    is_bestseller: false,
    badge: "New Launch",
  },
];

function BestsellerCard({ product, badge }: { product: any; badge?: string }) {
  const addItem = useCartStore((s) => s.addItem);

  const handleShop = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url || product.images?.[0] || "",
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div
      className="flex flex-col justify-center items-start gap-6"
      style={{ width: "292px" }}
    >
      {/* Image box */}
      <div
        className="relative"
        style={{
          width: "292px",
          height: "303px",
          background: "#EAEAEA",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <Image
          src={product.image_url || "/images/products/prophetic-face-serum.png"}
          alt={product.name}
          fill
          className="object-cover"
        />
        {/* Badge */}
        {badge && (
          <div
            className="absolute font-inter font-normal text-[#1D3B29]"
            style={{
              top: "16px",
              right: "16px",
              background: "#F7EDE2",
              borderRadius: "24px",
              padding: "10px",
              fontSize: "16px",
              lineHeight: "19px",
            }}
          >
            {badge}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-3" style={{ width: "292px" }}>
        <h3
          className="font-inter font-semibold text-[#2E2E2E]"
          style={{ fontSize: "24px", lineHeight: "29px" }}
        >
          {product.name}
        </h3>

        {/* Price + Rating row */}
        <div className="flex items-center justify-between" style={{ width: "292px" }}>
          <div className="flex items-center gap-2">
            <span className="font-inter font-semibold text-[#2E2E2E]" style={{ fontSize: "24px", lineHeight: "29px" }}>
              ₹{product.price}
            </span>
            {product.original_price && (
              <span className="font-inter font-normal text-[#2E2E2E] line-through" style={{ fontSize: "16px" }}>
                (₹{product.original_price})
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <StarIcon />
            <span className="font-inter font-semibold text-[#2E2E2E]" style={{ fontSize: "24px", lineHeight: "29px" }}>
              {product.rating || 4.8}
            </span>
            <span className="font-inter font-normal text-[#2E2E2E]" style={{ fontSize: "16px", lineHeight: "19px" }}>
              ({product.review_count || 120})
            </span>
          </div>
        </div>

        {/* Shop Now Button */}
        <button
          onClick={handleShop}
          className="font-inter font-medium text-[#F7EDE2] hover:opacity-90 transition-all flex items-center justify-center"
          style={{
            width: "127px",
            height: "43px",
            background: "#1A3E25",
            borderRadius: "8px",
            fontSize: "16px",
            lineHeight: "19px",
          }}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
}

export default function FeaturedBestsellers({ dbProducts = [] }: FeaturedBestsellersProps) {
  const bestsellerProducts = dbProducts.filter((p) => p.is_bestseller).slice(0, 4);
  const displayProducts = bestsellerProducts.length > 0
    ? bestsellerProducts.map((p, i) => ({ ...p, badge: i < 2 ? "Best seller" : i === 2 ? "Most Loved" : "New Launch" }))
    : fallbackProducts;

  return (
    <section className="py-20" style={{ background: "#FCFAF4" }}>
      <div className="w-full max-w-[1440px] mx-auto px-[100px]">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end gap-6 mb-4"
          >
            <div style={{ transform: "rotate(-18.46deg)" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#1A3E25" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.67806 0.393273C3.33698 0.746016 3.86524 1.26031 4.27352 1.86988C4.93665 2.86007 5.32531 4.08777 5.64054 5.36694C6.27084 7.92543 6.64437 10.715 7.77326 12.1466C8.83291 13.4904 10.0172 14.1032 11.144 14.2227C11.6287 14.2742 12.107 14.2325 12.5642 14.1104C12.5917 10.6285 11.032 6.71738 8.37049 4.61054C11.4761 6.14733 13.7451 9.27599 14.257 13.1784L13.89 13.4892C14.0091 13.4058 14.1242 13.3167 14.2348 13.2224C15.98 11.7396 16.8379 8.81822 14.9913 5.57157C14.1428 4.07991 12.3091 2.18967 9.91609 1.04988C7.84587 0.0639353 5.3733 -0.379387 2.67804 0.393385L2.67806 0.393273Z"/>
              </svg>
            </div>
            <span
              className="font-playfair font-normal text-[#2E2E2E]"
              style={{ fontSize: "24px", lineHeight: "32px" }}
            >
              Our Bestsellers
            </span>
            <div style={{ transform: "matrix(-0.95, -0.32, -0.32, 0.95, 0, 0)" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#1A3E25" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.67806 0.393273C3.33698 0.746016 3.86524 1.26031 4.27352 1.86988C4.93665 2.86007 5.32531 4.08777 5.64054 5.36694C6.27084 7.92543 6.64437 10.715 7.77326 12.1466C8.83291 13.4904 10.0172 14.1032 11.144 14.2227C11.6287 14.2742 12.107 14.2325 12.5642 14.1104C12.5917 10.6285 11.032 6.71738 8.37049 4.61054C11.4761 6.14733 13.7451 9.27599 14.257 13.1784L13.89 13.4892C14.0091 13.4058 14.1242 13.3167 14.2348 13.2224C15.98 11.7396 16.8379 8.81822 14.9913 5.57157C14.1428 4.07991 12.3091 2.18967 9.91609 1.04988C7.84587 0.0639353 5.3733 -0.379387 2.67804 0.393385L2.67806 0.393273Z"/>
              </svg>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-playfair font-semibold text-[#2E2E2E]"
            style={{ fontSize: "48px", lineHeight: "64px" }}
          >
            Real Ingredients, Real Results
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-inter font-normal text-[#2E2E2E] text-center mt-2"
            style={{ fontSize: "24px", lineHeight: "29px", maxWidth: "671px" }}
          >
            Handpicked by thousands of happy customers across India
          </motion.p>
        </div>

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
