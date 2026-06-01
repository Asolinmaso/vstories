"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function CategoryBannersMobile() {
  return (
    <section className="py-8" style={{ background: "#FCFAF4" }}>
      <div className="w-full mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-[16px]">
          {/* Banner 1: Hair Care */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden w-full h-[280px] rounded-[12px]"
            style={{ background: "#F9F6F1" }}
          >
            <Image
              src="/images/home/bestseller.png"
              alt="Hair Care Banner"
              fill
              className="object-cover"
              style={{ objectPosition: "38% center" }}
            />
            {/* Text overlay */}
            <div className="absolute top-[50%] -translate-y-[50%] left-[45%] right-[12px] flex flex-col items-start gap-[10px]">
              {/* Discount badge */}
              <div
                className="font-inter font-medium text-[#F7EDE2] flex items-center justify-center text-[10px]"
                style={{
                  width: "115px",
                  height: "24px",
                  background: "#1D3B29",
                  borderRadius: "24px",
                }}
              >
                Flat 25% Discount
              </div>

              <h3 className="font-playfair font-semibold text-[#2E2E2E] text-[19px] leading-[1.2] w-full">
                Stronger, Healthier<br />Hair Starts Here
              </h3>

              <p
                className="font-inter font-normal text-[#2E2E2E] text-[11px] leading-[1.4] w-[95%]"
              >
                Discover herbal oils and cleansers designed to nourish roots and improve hair strength.
              </p>

              <Link
                href="/shop/hair"
                className="font-inter font-medium flex items-center justify-center hover:opacity-90 transition-all text-[11px] mt-1"
                style={{
                  width: "110px",
                  height: "30px",
                  background: "#1D3B29",
                  color: "#F7EDE2",
                  borderRadius: "6px",
                }}
              >
                Shop Hair Care
              </Link>
            </div>
          </motion.div>

          {/* Banner 2: Skin Care */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative overflow-hidden w-full h-[280px] rounded-[12px]"
            style={{ background: "#778E6B" }}
          >
            <Image
              src="/images/home/bestseller2.png"
              alt="Skin Care Banner"
              fill
              className="object-cover"
              style={{ objectPosition: "60% center" }}
            />
            {/* Text overlay */}
            <div className="absolute top-[50%] -translate-y-[50%] left-[45%] right-[12px] flex flex-col items-start gap-[10px]">
              {/* Discount badge - light bg for dark banner */}
              <div
                className="font-inter font-medium text-[#1D3B29] flex items-center justify-center text-[10px]"
                style={{
                  width: "115px",
                  height: "24px",
                  background: "#F4F0EC",
                  borderRadius: "24px",
                }}
              >
                Flat 25% Discount
              </div>

              <h3 className="font-playfair font-semibold text-white text-[19px] leading-[1.2] w-full">
                Clear, Balanced,<br />Healthy Skin
              </h3>

              <p
                className="font-inter font-normal text-[11px] leading-[1.4] w-[95%]"
                style={{ color: "#FFFFFF" }}
              >
                Explore gentle, plant-based skincare for everyday glow and long-term skin health.
              </p>

              <Link
                href="/shop/skin"
                className="font-inter font-medium flex items-center justify-center hover:opacity-90 transition-all text-[11px] mt-1"
                style={{
                  width: "110px",
                  height: "30px",
                  background: "#F4F0EC",
                  color: "#1D3B29",
                  borderRadius: "6px",
                }}
              >
                Explore Skin Care
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
