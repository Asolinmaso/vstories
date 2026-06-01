"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: "hero-4",
    image: "/images/home/hero4.png",
    alt: "Vstories Herbal Hair Oil",
  },
  {
    id: "hero-3",
    image: "/images/home/hero3.png",
    alt: "Vstories skincare collection",
  },
  {
    id: "hero-2",
    image: "/images/home/hero2.png",
    alt: "Vstories natural products",
  },
  {
    id: "hero-1",
    image: "/images/home/hero1.png",
    alt: "Vstories herbal care",
  },
];

export default function HeroCarouselMobile() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];

  return (
    <section className="relative w-full overflow-hidden bg-[#F4EEE2]">
      <div className="relative w-full h-[480px] xs:h-[520px] sm:h-[560px] lg:h-[764px]">
        {/* Full-width background image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={activeSlide.image}
              alt={activeSlide.alt}
              fill
              className="object-cover object-[-450px] lg:object-right"
              priority={activeIndex === 0}
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Mobile gradient overlay — left side for text readability */}
        <div className="absolute inset-0 lg:hidden bg-gradient-to-r from-black/40 via-black/20 to-transparent pointer-events-none" />

        {/* Text overlay */}
        <div className="relative z-10 flex h-full items-start lg:items-center">
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[100px]">
            <div className="max-w-[628px] pt-8 sm:pt-10 lg:pt-[100px] pb-24 sm:pb-28 lg:pb-[120px]">
              <motion.h1
                key={`title-${activeIndex}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="font-playfair font-semibold text-white lg:text-black text-[26px] sm:text-[34px] leading-[1.15] md:text-5xl lg:text-[64px] lg:leading-[85px] max-w-[280px] sm:max-w-full"
              >
                Nature&apos;s Goodness<br />Clinically Crafted
              </motion.h1>

              <motion.p
                key={`desc-${activeIndex}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="mt-3 sm:mt-5 font-inter font-normal text-white lg:text-black text-[13px] sm:text-base lg:text-2xl lg:leading-[29px] max-w-[290px] sm:max-w-[628px] leading-[20px]"
              >
                Clean, effective &amp; honest skincare and haircare enriched with
                natural ingredients &amp; powerful herbs for real, visible results.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="mt-4 sm:mt-6"
              >
                <Link
                  href="/shop"
                  className="inline-flex h-[40px] sm:h-[43px] min-w-[150px] sm:min-w-[179px] items-center justify-center rounded-[8px] px-5 sm:px-6 font-inter text-[13px] sm:text-base font-medium transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#1D3B29", color: "#F7EDE2" }}
                >
                  Explore Products
                </Link>
              </motion.div>

              {/* Thumbnail navigation */}
              <div className="hidden lg:flex mt-5 sm:mt-7 items-end gap-2 sm:gap-4">
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Show slide ${index + 1}`}
                    aria-current={index === activeIndex ? "true" : undefined}
                    className={`relative h-[36px] w-[36px] sm:h-[55px] sm:w-[55px] shrink-0 overflow-hidden rounded-[6px] sm:rounded-[10px] border transition-all ${index === activeIndex
                      ? "border-white lg:border-[#1A3026] border-2 shadow-md -translate-y-0.5"
                      : "border-white/70 lg:border-[#1A3026] border-[1.5px] opacity-70 hover:opacity-100"
                      }`}
                  >
                    <Image
                      src={slide.image}
                      alt=""
                      fill
                      className="object-cover object-center"
                      sizes="55px"
                    />
                    {index === activeIndex && (
                      <span className="absolute -bottom-2 left-1/2 h-[3px] w-4 sm:w-8 -translate-x-1/2 rounded-full bg-white lg:bg-[#1A3026]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
