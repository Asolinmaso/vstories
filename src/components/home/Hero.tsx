"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden min-h-[60vh] md:min-h-[762px]" style={{ background: "#F4EEE2" }}>
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/hero-main.png"
          alt="Nature's Goodness Clinically Crafted"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full min-h-[60vh] md:min-h-[762px] flex items-center">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-[100px] py-16 md:py-0 md:pt-[204px] md:pb-20">

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-playfair font-semibold text-black text-3xl md:text-5xl lg:text-[64px] leading-tight md:leading-[85px] max-w-xl"
          >
            Nature&apos;s Goodness Clinically Crafted
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="font-inter font-normal text-black text-base md:text-xl lg:text-2xl mt-4 md:mt-5 max-w-xl"
          >
            Clean, effective &amp; honest skincare and haircare enriched with natural ingredients &amp; powerful herbs for real, visible results.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-6"
          >
            <Link
              href="/shop"
              className="inline-flex items-center justify-center font-inter font-medium hover:opacity-90 transition-all rounded-lg"
              style={{
                padding: "12px 24px",
                background: "#1D3B29",
                color: "#F7EDE2",
                fontSize: "16px",
              }}
            >
              Explore Products
            </Link>
          </motion.div>

          {/* Thumbnails */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex items-center gap-3 mt-6"
          >
            {["/images/thumb-1.png", "/images/thumb-2.png", "/images/thumb-3.png", "/images/thumb-4.png"].map((src, i) => (
              <div
                key={i}
                className="relative overflow-hidden hover:scale-110 transition-transform cursor-pointer flex-shrink-0 w-12 h-12 md:w-14 md:h-14 lg:w-[60px] lg:h-[60px] rounded-xl"
                style={{ border: "1px solid #1D3B29" }}
              >
                <Image src={src} alt={`Product ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
            <div className="hidden md:block w-8 h-0 border-t-2 border-[#1A3E25]" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
