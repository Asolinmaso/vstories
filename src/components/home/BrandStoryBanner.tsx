"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function BrandStoryBanner() {
  return (
    <section
      className="relative w-full overflow-hidden dark-section min-h-[260px] sm:min-h-[320px] lg:h-[377px] mt-6 lg:mt-[50px]"
    >
      {/* Background image */}
      <Image
        src="/images/home/homebg.png"
        alt="More Than Skincare. A Story of Care."
        fill
        className="object-cover object-center lg:object-[center_-280px]"
        priority
      />

      {/* Content - left aligned per Figma */}
      <div className="absolute inset-0 w-full flex items-center">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[100px]">
          <div className="max-w-full lg:max-w-[562px]">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-playfair font-semibold text-white text-2xl sm:text-3xl md:text-4xl lg:text-[48px] lg:leading-[1.2] max-w-[486px]"
            >
              More Than Skincare.<br />A Story of Care.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-inter font-normal mt-4 text-white font-light text-base sm:text-lg lg:text-[22px] lg:leading-[1.4] max-w-[562px]"
            >
              Inspired by real experiences, built for Indian skin,<br />our journey blends tradition with modern science.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                href="/about"
                className="inline-flex items-center justify-center font-inter font-medium mt-6 hover:opacity-90 transition-all"
                style={{
                  width: "160px",
                  height: "40px",
                  border: "1px solid #E8BF72",
                  borderRadius: "6px",
                  color: "#E8BF72",
                  fontSize: "14px",
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
