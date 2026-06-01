"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function CategoryBanners() {
  return (
    <section className="py-12" style={{ background: "#FCFAF4" }}>
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[100px]">
        <div className="flex flex-col md:flex-row gap-[24px]">
          {/* Banner 1: Hair Care */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden w-full h-[338px] lg:max-w-[608px] flex-1"
            style={{
              background: "#F9F6F1",
              borderRadius: "12px",
            }}
          >
            <Image
              src="/images/home/bestseller.png"
              alt="Hair Care Banner"
              fill
              className="object-cover"
              style={{ objectPosition: "left center" }}
            />
            {/* Text overlay */}
            <div className="absolute top-[40px] right-[16px] md:right-[36px] lg:left-[280px] lg:right-auto w-[260px] sm:w-[330px] lg:w-[300px] flex flex-col items-start gap-[16px]">
              {/* Discount badge */}
              <div
                className="font-inter font-medium text-[#F7EDE2] flex items-center justify-center"
                style={{
                  width: "162px",
                  height: "35px",
                  background: "#1D3B29",
                  borderRadius: "24px",
                  fontSize: "16px",
                  lineHeight: "19px",
                }}
              >
                Flat 25% Discount
              </div>

              <h3 className="font-playfair font-semibold text-[#2E2E2E] text-[28px] sm:text-[32px] leading-[1.2] sm:leading-[43px] w-full lg:max-w-[330px]">
                Stronger, Healthier Hair Starts Here
              </h3>

              <p
                className="font-inter font-normal text-[#2E2E2E]"
                style={{ fontSize: "16px", lineHeight: "19px", maxWidth: "300px" }}
              >
                Discover herbal oils and cleansers designed to nourish roots and improve hair strength.
              </p>

              <Link
                href="/shop/hair"
                className="font-inter font-medium flex items-center justify-center hover:opacity-90 transition-all"
                style={{
                  width: "148px",
                  height: "43px",
                  background: "#1D3B29",
                  color: "#F7EDE2",
                  borderRadius: "8px",
                  fontSize: "16px",
                  lineHeight: "19px",
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
            className="relative overflow-hidden w-full h-[338px] lg:max-w-[608px] flex-1"
            style={{
              background: "#778E6B",
              borderRadius: "12px",
            }}
          >
            <Image
              src="/images/home/bestseller2.png"
              alt="Skin Care Banner"
              fill
              className="object-cover"
              style={{ objectPosition: "left center" }}
            />
            {/* Text overlay */}
            <div className="absolute top-[40px] right-[16px] md:right-[36px] lg:left-[280px] lg:right-auto w-[240px] sm:w-[330px] lg:w-[300px] flex flex-col items-start gap-[16px]">
              {/* Discount badge - light bg for dark banner */}
              <div
                className="font-inter font-medium text-[#1D3B29] flex items-center justify-center"
                style={{
                  width: "162px",
                  height: "35px",
                  background: "#F4F0EC",
                  borderRadius: "24px",
                  fontSize: "16px",
                  lineHeight: "19px",
                }}
              >
                Flat 25% Discount
              </div>

              <h3 className="font-playfair font-semibold text-white text-[28px] sm:text-[32px] leading-[1.2] sm:leading-[43px] w-full lg:max-w-[330px]">
                Clear, Balanced, Healthy Skin
              </h3>

              <p
                className="font-inter font-normal"
                style={{ fontSize: "16px", lineHeight: "19px", maxWidth: "290px", color: "#FFFFFF" }}
              >
                Explore gentle, plant-based skincare for everyday glow and long-term skin health.
              </p>

              <Link
                href="/shop/skin"
                className="font-inter font-medium flex items-center justify-center hover:opacity-90 transition-all"
                style={{
                  width: "167px",
                  height: "43px",
                  background: "#F4F0EC",
                  color: "#1D3B29",
                  borderRadius: "8px",
                  fontSize: "16px",
                  lineHeight: "19px",
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
