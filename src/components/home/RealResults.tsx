"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    beforeImage: "/images/testimonials/hair-before-1.png",
    afterImage: "/images/testimonials/hair-after-1.png",
    name: "Priya S.",
    rating: 5,
    quote: "Your haircare combo gave me my hair back! After just 2 months of consistent use, I can see visible new growth.",
    productName: "Complete Hair Care Trio",
    productSlug: "complete-hair-care-trio",
  },
  {
    id: 2,
    beforeImage: "/images/testimonials/skin-before-1.png",
    afterImage: "/images/testimonials/skin-after-1.png",
    name: "Fathima R.",
    rating: 5,
    quote: "Finally, a brand that delivers what it promises. My skin has never looked this radiant and clear!",
    productName: "Prophetic-Face Serum",
    productSlug: "prophetic-face-serum",
  },
  {
    id: 3,
    beforeImage: "/images/testimonials/hair-before-2.png",
    afterImage: "/images/testimonials/hair-after-2.png",
    name: "Rajesh K.",
    rating: 5,
    quote: "The herbal hair oil has transformed my thinning hair into thick, healthy locks. Amazing results!",
    productName: "V Herbal Hair Oil",
    productSlug: "v-herbal-hair-oil",
  },
];

function ComparisonCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div
      className="relative flex-shrink-0"
      style={{
        width: "380px",
        height: "447px",
        background: "#FFFFFF",
        border: "1px solid #D9D9D9",
        boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      {/* Before/After Images top section */}
      <div className="relative" style={{ width: "380px", height: "276px" }}>
        {/* After image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${testimonial.afterImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Before image (clipped) */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${testimonial.beforeImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
          }}
        />
        {/* Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white z-10"
          style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
        >
          {/* Handle */}
          <div
            className="absolute flex items-center justify-center bg-white rounded-full"
            style={{
              width: "40px",
              height: "40px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <ChevronLeft size={12} color="#2E2E2E" />
            <ChevronRight size={12} color="#2E2E2E" />
          </div>
        </div>
        {/* Input */}
        <input
          type="range"
          min={0}
          max={100}
          value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
          aria-label="Compare before and after"
        />
        {/* Labels */}
        <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full z-10">Before</span>
        <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full z-10">After</span>
      </div>

      {/* Content section */}
      <div
        className="absolute flex flex-col gap-3"
        style={{
          left: "16px",
          top: "292px",
          width: "366px",
        }}
      >
        {/* Name + Stars */}
        <div className="flex items-center justify-between" style={{ width: "366px" }}>
          <span className="font-inter font-semibold text-[#2E2E2E]" style={{ fontSize: "16px", lineHeight: "19px" }}>
            {testimonial.name}
          </span>
          <div className="flex items-center gap-0.5">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} size={19} fill="#E8BF72" color="#E8BF72" />
            ))}
          </div>
        </div>

        {/* Quote */}
        <p
          className="font-inter font-normal text-[#2E2E2E]"
          style={{ fontSize: "16px", lineHeight: "19px", width: "366px" }}
        >
          &ldquo;{testimonial.quote}&rdquo;
        </p>

        {/* Product badge */}
        <Link
          href={`/product/${testimonial.productSlug}`}
          className="inline-flex items-center justify-center font-inter font-normal hover:opacity-90 transition-all"
          style={{
            background: "#1D3B29",
            color: "#F7EDE2",
            borderRadius: "24px",
            padding: "10px",
            fontSize: "16px",
            lineHeight: "19px",
            width: "fit-content",
          }}
        >
          Using {testimonial.productName}
        </Link>
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
    <section
      className="relative w-full"
      style={{ height: "780px", background: "#F4F0EC", overflow: "hidden" }}
    >
      {/* Background image */}
      <Image
        src="/images/home/transformation.png"
        alt="Transformations Background"
        fill
        className="object-cover opacity-10"
        priority
      />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-[100px] pt-16">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end gap-6 mb-4"
          >
            <LeafIcon />
            <span className="font-playfair font-normal text-[#000000]" style={{ fontSize: "24px", lineHeight: "32px" }}>
              Transformation
            </span>
            <LeafIcon flipped />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-playfair font-semibold text-[#2E2E2E]"
            style={{ fontSize: "48px", lineHeight: "64px" }}
          >
            Visible Results, Naturally
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-inter font-normal text-[#2E2E2E] mt-4"
            style={{ fontSize: "24px", lineHeight: "29px", maxWidth: "651px" }}
          >
            See the transformations our customers have experienced
          </motion.p>
        </div>

        {/* Testimonial Cards */}
        <div className="flex flex-wrap justify-center gap-6">
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
