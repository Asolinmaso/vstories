"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    beforeImage: "/images/testimonials/hair-after-1.png",
    afterImage: "/images/testimonials/hair-before-1.png",
    name: "Priya S.",
    rating: 5,
    quote: "Your haircare combo gave me my hair back! After just 2 months of consistent use, I can see visible new growth.",
    productName: "Complete Hair Care Trio",
    productSlug: "complete-hair-care-trio",
  },
  {
    id: 2,
    beforeImage: "/images/testimonials/skin-after-1.png",
    afterImage: "/images/testimonials/skin-before-1.png",
    name: "Fathima R.",
    rating: 5,
    quote: "Finally, a brand that delivers what it promises. My skin has never looked this radiant and clear!",
    productName: "Prophetic-Face Serum",
    productSlug: "herbal-face-serum",
  },
  {
    id: 3,
    beforeImage: "/images/testimonials/hair-after-2.png",
    afterImage: "/images/testimonials/hair-before-2.png",
    name: "Rajesh K.",
    rating: 5,
    quote: "The herbal hair oil has transformed my thinning hair into thick, healthy locks. Amazing results!",
    productName: "V Herbal Hair Oil",
    productSlug: "herbal-hair-oil",
  },
];

function ComparisonCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div className="flex flex-col bg-white border border-[#EAEAEA] rounded-2xl overflow-hidden shadow-[0px_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0px_12px_36px_rgba(0,0,0,0.08)] transition-all duration-300 w-full max-w-[380px] mx-auto h-auto lg:h-[450px]">
      {/* Before/After Images top section */}
      <div
        className="relative w-full h-48 sm:h-56 lg:h-[276px] overflow-hidden select-none cursor-ew-resize touch-none"
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Base image (Before) */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${testimonial.beforeImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Overlay image (After) */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${testimonial.afterImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            clipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`,
          }}
        />
        {/* Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-white z-10 pointer-events-none"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        >
          {/* Handle */}
          <div
            className="absolute flex items-center justify-center bg-white rounded-full border border-[#D9D9D9] shadow-[0px_2px_6px_rgba(0,0,0,0.15)] pointer-events-none"
            style={{
              width: "36px",
              height: "36px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.5 7.5L4 12L8.5 16.5" stroke="#2E2E2E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15.5 7.5L20 12L15.5 16.5" stroke="#2E2E2E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="flex flex-col flex-grow justify-between p-6">
        <div>
          {/* Name + Stars */}
          <div className="flex items-center justify-between mb-3">
            <span className="font-inter font-bold text-[#2E2E2E]" style={{ fontSize: "16px", lineHeight: "19px" }}>
              {testimonial.name}
            </span>
            <div className="flex items-center gap-0.5">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} size={15} fill="#CBA45A" color="#CBA45A" />
              ))}
            </div>
          </div>

          {/* Quote */}
          <p
            className="font-inter font-normal text-[#4A4A4A] text-sm leading-relaxed"
            style={{ fontSize: "14px", lineHeight: "20px" }}
          >
            &ldquo;{testimonial.quote}&rdquo;
          </p>
        </div>

        {/* Product badge */}
        <div className="mt-4">
          <Link
            href={`/product/${testimonial.productSlug}`}
            className="inline-flex items-center justify-center font-inter font-semibold transition-all hover:opacity-90"
            style={{
              background: "#1D3B29",
              color: "#FFFFFF",
              borderRadius: "24px",
              padding: "6px 16px",
              fontSize: "12px",
              lineHeight: "15px",
              width: "fit-content",
            }}
          >
            Using {testimonial.productName}
          </Link>
        </div>
      </div>
    </div>
  );
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

export default function RealResults() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FCFAF4] py-12 sm:py-16 lg:py-20 lg:min-h-[750px]">
      {/* Background watermark pattern */}
      <Image
        src="/images/home/transformation.png"
        alt="Transformations Background"
        fill
        className="object-cover opacity-5 pointer-events-none"
        priority
      />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[100px]">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <LeafIcon />
            <span className="font-playfair font-normal text-[#1D3B29]" style={{ fontSize: "24px", lineHeight: "32px" }}>
              Transformation
            </span>
            <LeafIcon flipped />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-playfair font-bold text-[#1D3B29] text-2xl sm:text-3xl md:text-4xl lg:text-[48px] lg:leading-[64px]"
          >
            Visible Results, Naturally
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-inter font-normal text-[#4A4A4A] mt-4"
            style={{ fontSize: "18px", lineHeight: "26px", maxWidth: "650px" }}
          >
            See the transformations our customers have experienced
          </motion.p>
        </div>

        {/* Testimonial Cards */}
        <div className="flex flex-wrap justify-center gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <ComparisonCard testimonial={t} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
