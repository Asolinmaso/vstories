"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: "hero-banner",
    image: "/images/home/hero-banner.png",
    alt: "Vstories Hibiscus Shampoo",
  },
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

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];

  return (
    <section className="relative w-full overflow-hidden bg-[#F4EEE2]">
      <div className="relative w-full h-[420px] sm:h-[560px] lg:h-[764px]">
        {/* Full-width background image — Figma Rectangle 23 */}
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
              className="object-cover object-right"
              priority={activeIndex === 0}
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Text overlay — left side over empty banner space */}
        <div className="relative z-10 flex h-full items-center">
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[100px]">
            <div className="max-w-[628px] pt-6 sm:pt-10 lg:pt-[100px] pb-24 sm:pb-28 lg:pb-[120px]">
              <motion.h1
                key={`title-${activeIndex}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="font-playfair font-semibold text-black text-[28px] leading-[1.15] sm:text-4xl md:text-5xl lg:text-[64px] lg:leading-[85px] max-w-[543px]"
              >
                Nature&apos;s Goodness Clinically Crafted
              </motion.h1>

              <motion.p
                key={`desc-${activeIndex}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="mt-4 sm:mt-5 font-inter font-normal text-black text-sm sm:text-base lg:text-2xl lg:leading-[29px] max-w-[628px]"
              >
                Clean, effective &amp; honest skincare and haircare enriched with
                natural ingredients &amp; powerful herbs for real, visible results.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="mt-5 sm:mt-6"
              >
                <Link
                  href="/shop"
                  className="inline-flex h-[43px] min-w-[179px] items-center justify-center rounded-[8px] px-6 font-inter text-base font-medium transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#1D3B29", color: "#F7EDE2" }}
                >
                  Explore Products
                </Link>
              </motion.div>

              {/* Thumbnail navigation */}
              <div className="mt-6 sm:mt-7 flex items-end gap-3 sm:gap-4">
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Show slide ${index + 1}`}
                    aria-current={index === activeIndex ? "true" : undefined}
                    className={`relative h-[42px] w-[42px] sm:h-[55px] sm:w-[55px] shrink-0 overflow-hidden rounded-[8px] sm:rounded-[10px] border transition-all ${
                      index === activeIndex
                        ? "border-[#1A3026] border-2 shadow-md -translate-y-0.5"
                        : "border-[#1A3026] border-[1.5px] opacity-90 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={slide.image}
                      alt=""
                      fill
                      className="object-cover object-right"
                      sizes="55px"
                    />
                    {index === activeIndex && (
                      <span className="absolute -bottom-2 left-1/2 h-[3px] w-5 sm:w-8 -translate-x-1/2 rounded-full bg-[#1A3026]" />
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
