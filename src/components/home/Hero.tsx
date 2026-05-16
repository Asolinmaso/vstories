"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ background: "#F4EEE2", minHeight: "762px" }}>
      {/* Full-width background image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/hero-main.png"
          alt="Nature's Goodness Clinically Crafted"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Content positioned absolutely over image, left-aligned per Figma */}
      <div className="relative z-10 w-full min-h-[762px] flex items-center">
        <div className="w-full max-w-[1440px] mx-auto px-[100px]">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-playfair font-semibold text-black"
            style={{
              width: "543px",
              fontSize: "64px",
              lineHeight: "85px",
              marginTop: "204px",
              maxWidth: "100%",
            }}
          >
            Nature&apos;s Goodness Clinically Crafted
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="font-inter font-normal text-black"
            style={{
              width: "628px",
              fontSize: "24px",
              lineHeight: "29px",
              marginTop: "20px",
              maxWidth: "100%",
            }}
          >
            Clean, effective &amp; honest skincare and haircare enriched with natural ingredients &amp; powerful herbs for real, visible results.
          </motion.p>

          {/* Explore Products Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            style={{ marginTop: "24px" }}
          >
            <Link
              href="/shop"
              className="inline-flex items-center justify-center font-inter font-medium hover:opacity-90 transition-all"
              style={{
                width: "179px",
                height: "43px",
                background: "#1D3B29",
                borderRadius: "8px",
                color: "#F7EDE2",
                fontSize: "16px",
                lineHeight: "19px",
              }}
            >
              Explore Products
            </Link>
          </motion.div>

          {/* Thumbnails row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex items-end gap-0"
            style={{ marginTop: "28px", marginBottom: "0" }}
          >
            {[
              "/images/thumb-1.png",
              "/images/thumb-2.png",
              "/images/thumb-3.png",
              "/images/thumb-4.png",
            ].map((src, i) => (
              <div
                key={i}
                className="relative overflow-hidden hover:scale-110 transition-transform cursor-pointer"
                style={{
                  width: "60px",
                  height: "60px",
                  border: "1px solid #1D3B29",
                  borderRadius: "12px",
                  marginLeft: i === 0 ? "0" : "16px",
                }}
              >
                <Image
                  src={src}
                  alt={`Product ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
            {/* Indicator line under first thumbnail per Figma */}
            <div
              className="hidden md:block"
              style={{
                width: "30px",
                height: "0",
                border: "2px solid #1A3E25",
                marginLeft: "15px",
                marginBottom: "15px",
              }}
            />
          </motion.div>
          {/* Spacer to push content down and match 762px height */}
          <div style={{ paddingBottom: "80px" }} />
        </div>
      </div>
    </section>
  );
}
