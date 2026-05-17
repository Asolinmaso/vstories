"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function BrandStoryBanner() {
  return (
    <section
      className="relative w-full overflow-hidden dark-section"
      style={{
        height: "377px",
        marginTop: "50px"
      }}
    >
      {/* Background image */}
      <Image
        src="/images/home/homebg.png"
        alt="More Than Skincare. A Story of Care."
        fill
        className="object-cover"
        style={{ objectPosition: "center -280px" }}
        priority
      />

      {/* Content - left aligned per Figma */}
      <div className="absolute inset-0 w-full flex items-center">
        <div className="w-full max-w-[1440px] mx-auto px-[100px]">
          <div style={{ maxWidth: "562px" }}>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-playfair font-semibold"
              style={{
                fontSize: "48px",
                lineHeight: "64px",
                maxWidth: "486px",
                color: "#FFFFFF",
              }}
            >
              More Than Skincare. <br /> A Story of Care.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-inter font-normal mt-4"
              style={{
                fontSize: "24px",
                lineHeight: "29px",
                maxWidth: "562px",
                color: "#FFFFFF",
                fontWeight: 300,
              }}
            >
              Inspired by real experiences, built for Indian skin, our journey blends tradition with modern science.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                href="/about"
                className="inline-flex items-center justify-center font-inter font-medium mt-8 hover:opacity-90 transition-all"
                style={{
                  width: "181px",
                  height: "43px",
                  border: "1px solid #E8BF72",
                  borderRadius: "8px",
                  color: "#E8BF72",
                  fontSize: "16px",
                  lineHeight: "19px",
                }}
              >
                Know Our Story
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
