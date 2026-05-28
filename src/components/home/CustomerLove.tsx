"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

interface CustomerLoveProps {
  testimonials?: any[];
  title?: string;
  subtitle?: string;
}

const defaultReviews = [
  {
    id: 1,
    initials: "PS",
    name: "Priya S.",
    location: "Chennai",
    rating: 5,
    text: "I struggled with hair fall for months, but the Herbal Hair Oil made a noticeable difference within weeks. My hair feels healthier, softer, and much stronger now.",
    bgColor: "#E8BF72",
    cardBg: "#FFFFFF",
    textColor: "#2E2E2E",
  },
  {
    id: 2,
    initials: "SA",
    name: "Sneha A.",
    location: "Pune",
    rating: 5,
    text: "I first tried the sample pack and instantly loved the formulations. The textures, fragrance, and results felt genuinely different from regular products",
    bgColor: "#1D3B29",
    cardBg: "#778E6B",
    textColor: "#FFFFFF",
  },
  {
    id: 3,
    initials: "AK",
    name: "Aarav K.",
    location: "Bangalore",
    rating: 5,
    text: "The Prophetic Serum feels very gentle on my skin. It helped reduce dullness and gave my skin a fresh, natural glow without irritation",
    bgColor: "#E8BF72",
    cardBg: "#FFFFFF",
    textColor: "#2E2E2E",
  },
];

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

export default function CustomerLove({ testimonials = [], title, subtitle }: CustomerLoveProps) {
  const displayReviews = testimonials.length > 0
    ? testimonials.map((t, i) => ({
        ...t,
        initials: (t.name || t.author || "A").substring(0, 2).toUpperCase(),
        bgColor: i % 2 === 0 ? "#E8BF72" : "#1D3B29",
        cardBg: i % 2 === 1 ? "#778E6B" : "#FFFFFF",
        textColor: i % 2 === 1 ? "#FFFFFF" : "#2E2E2E",
        location: t.role || "Verified Buyer",
        text: t.text || t.content || "",
      }))
    : defaultReviews;

  return (
    <section className="py-12 lg:py-20 bg-[#FCFAF4]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[100px]">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end gap-4 sm:gap-6 mb-4"
          >
            <LeafIcon />
            <span className="font-playfair font-normal text-[#000000] text-lg lg:text-2xl lg:leading-8">
              Real Experiences, Real Confidence
            </span>
            <LeafIcon flipped />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-playfair font-semibold text-[#2E2E2E] text-2xl sm:text-3xl md:text-4xl lg:text-[48px] lg:leading-[64px] max-w-[774px]"
          >
            {title || "Trusted By Thousands Across India"}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-inter font-normal text-[#2E2E2E] text-center mt-4 text-base sm:text-lg lg:text-xl lg:leading-7 max-w-[768px]"
          >
            {subtitle || "Thousands across India trust Vstories for gentle, plant-powered skincare and haircare that truly works with their everyday routines."}
          </motion.p>
        </div>

        {/* Review Cards */}
        <div className="flex flex-col items-center sm:flex-row sm:flex-wrap sm:justify-center gap-4 sm:gap-6">
          {displayReviews.slice(0, 3).map((review: any, index: number) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative flex-shrink-0 w-full max-w-[397px] min-h-[262px] p-6 sm:p-8 lg:p-10 flex flex-col gap-5"
              style={{
                background: review.cardBg,
                boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.08)",
                borderRadius: "12px",
                border: review.cardBg === "#FFFFFF" ? "1px solid #EAEAEA" : "none",
              }}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex gap-1">
                  {[...Array(review.rating || 5)].map((_, i) => (
                    <Star key={i} size={14} fill="#E8BF72" color="#E8BF72" />
                  ))}
                </div>
                <svg width="22" height="16" viewBox="0 0 22 16" fill={review.cardBg === "#778E6B" ? "#1D3B29" : "#E8BF72"} xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.6 0v6.4H6.4C6.4 9.92 7.84 12 10.4 12V16C5.12 16 0 12.48 0 6.4V0H9.6ZM22 0v6.4h-3.2c0 3.52 1.44 5.6 4 5.6V16c-5.28 0-10.4-3.52-10.4-9.6V0H22Z"/>
                </svg>
              </div>

              <p
                className="font-inter font-normal text-[15px] leading-[22px] flex-1"
                style={{ color: review.textColor }}
              >
                {review.text || review.content}
              </p>

              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-full"
                  style={{ background: review.bgColor }}
                >
                  <span className="font-inter font-medium text-white text-sm leading-[17px]">
                    {review.initials}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-inter font-medium text-sm leading-[17px]" style={{ color: review.textColor }}>
                    {review.name || review.author}
                  </span>
                  <span className="font-inter font-normal text-xs leading-[15px] opacity-90" style={{ color: review.textColor }}>
                    {review.location}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
