"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  text: string;
  image?: string;
  role?: string;
  location?: string;
}

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
    text: "I first tried the sample pack and instantly loved the formulations. The textures, fragrance, and results felt genuinely different from regular products.",
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
    text: "The Prophetic Serum feels very gentle on my skin. It helped reduce dullness and gave my skin a fresh, natural glow without irritation.",
    bgColor: "#E8BF72",
    cardBg: "#FFFFFF",
    textColor: "#2E2E2E",
  },
];

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
    <section className="py-20" style={{ background: "#FCFAF4" }}>
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-[100px]">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end gap-6 mb-4"
          >
            <div style={{ transform: "rotate(-18.46deg)" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#1D3B29" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.67806 0.393273C3.33698 0.746016 3.86524 1.26031 4.27352 1.86988C4.93665 2.86007 5.32531 4.08777 5.64054 5.36694C6.27084 7.92543 6.64437 10.715 7.77326 12.1466C8.83291 13.4904 10.0172 14.1032 11.144 14.2227C11.6287 14.2742 12.107 14.2325 12.5642 14.1104C12.5917 10.6285 11.032 6.71738 8.37049 4.61054C11.4761 6.14733 13.7451 9.27599 14.257 13.1784C14.0091 13.4058 14.1242 13.3167 14.2348 13.2224C15.98 11.7396 16.8379 8.81822 14.9913 5.57157C14.1428 4.07991 12.3091 2.18967 9.91609 1.04988C7.84587 0.0639353 5.3733 -0.379387 2.67804 0.393385L2.67806 0.393273Z"/>
              </svg>
            </div>
            <span className="font-playfair font-normal text-[#000000]" style={{ fontSize: "24px", lineHeight: "32px" }}>
              Real Experiences, Real Confidence
            </span>
            <div style={{ transform: "matrix(-0.95, -0.32, -0.32, 0.95, 0, 0)" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#1D3B29" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.67806 0.393273C3.33698 0.746016 3.86524 1.26031 4.27352 1.86988C4.93665 2.86007 5.32531 4.08777 5.64054 5.36694C6.27084 7.92543 6.64437 10.715 7.77326 12.1466C8.83291 13.4904 10.0172 14.1032 11.144 14.2227C11.6287 14.2742 12.107 14.2325 12.5642 14.1104C12.5917 10.6285 11.032 6.71738 8.37049 4.61054C11.4761 6.14733 13.7451 9.27599 14.257 13.1784C14.0091 13.4058 14.1242 13.3167 14.2348 13.2224C15.98 11.7396 16.8379 8.81822 14.9913 5.57157C14.1428 4.07991 12.3091 2.18967 9.91609 1.04988C7.84587 0.0639353 5.3733 -0.379387 2.67804 0.393385L2.67806 0.393273Z"/>
              </svg>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-playfair font-semibold text-[#2E2E2E]"
            style={{ fontSize: "48px", lineHeight: "64px", maxWidth: "774px" }}
          >
            {title || "Trusted By Thousands Across India"}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-inter font-normal text-[#2E2E2E] text-center mt-4"
            style={{ fontSize: "24px", lineHeight: "29px", maxWidth: "768px" }}
          >
            {subtitle || "Thousands across India trust Vstories for gentle, plant-powered skincare and haircare that truly works with their everyday routines."}
          </motion.p>
        </div>

        {/* Review Cards */}
        <div className="flex flex-wrap justify-center gap-6">
          {displayReviews.slice(0, 3).map((review: any, index: number) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative flex-shrink-0"
              style={{
                width: "397px",
                height: "262px",
                background: review.cardBg,
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              {/* Stars row */}
              <div
                className="absolute flex items-center justify-between"
                style={{ left: "40px", top: "40px", width: "317px" }}
              >
                <div className="flex gap-0.5">
                  {[...Array(review.rating || 5)].map((_, i) => (
                    <Star key={i} size={19} fill="#E8BF72" color="#E8BF72" />
                  ))}
                </div>
                {/* Quote icon */}
                <svg width="22" height="16" viewBox="0 0 22 16" fill={review.cardBg === "#778E6B" ? "#1D3B29" : "#E8BF72"} xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.6 0v6.4H6.4C6.4 9.92 7.84 12 10.4 12V16C5.12 16 0 12.48 0 6.4V0H9.6ZM22 0v6.4h-3.2c0 3.52 1.44 5.6 4 5.6V16c-5.28 0-10.4-3.52-10.4-9.6V0H22Z"/>
                </svg>
              </div>

              {/* Review text */}
              <p
                className="absolute font-inter font-normal"
                style={{
                  left: "40px",
                  top: "83px",
                  width: "317px",
                  fontSize: "16px",
                  lineHeight: "19px",
                  color: review.textColor,
                }}
              >
                {review.text || review.content}
              </p>

              {/* Author info */}
              <div
                className="absolute flex items-center gap-3"
                style={{ left: "40px", top: "183px" }}
              >
                {/* Avatar */}
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: "40px",
                    height: "40px",
                    background: review.bgColor,
                    borderRadius: "40px",
                  }}
                >
                  <span
                    className="font-inter font-normal text-white"
                    style={{ fontSize: "12px", lineHeight: "15px" }}
                  >
                    {review.initials}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span
                    className="font-inter font-normal"
                    style={{ fontSize: "16px", lineHeight: "19px", color: review.textColor }}
                  >
                    {review.name || review.author}
                  </span>
                  <span
                    className="font-inter font-normal"
                    style={{ fontSize: "12px", lineHeight: "15px", color: review.textColor }}
                  >
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
