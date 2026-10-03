"use client";

import { useEffect, useState } from "react";
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

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#F4EEE2]">
      {/* Hero */}
      <div className="relative w-full h-[480px] xs:h-[520px] sm:h-[560px] lg:h-[560px]">

        {/* Background / Hero Image */}
        <div className="absolute inset-0">
          <Image
            key={activeSlide.id}
            src={activeSlide.image}
            alt={activeSlide.alt}
            fill
            priority
            sizes="100vw"
            className="
      object-cover
      object-[-450px]
      sm:object-[-300px]
      md:object-[-180px]
      lg:object-right
    "
          />
        </div>

        {/* Mobile Overlay */}
        <div
          className="
            absolute inset-0
            lg:hidden
            bg-gradient-to-r
            from-black/40
            via-black/20
            to-transparent
            pointer-events-none
          "
        />

        {/* Hero Content */}
        <div className="relative z-10 h-full">
          <div
            className="
              w-full
              max-w-[1440px]
              h-full
              mx-auto
              px-4
              sm:px-6
              lg:px-[94px]
            "
          >
            {/* Desktop content is positioned similar to Figma */}
            <div
              className="
                w-full
                max-w-[560px]
                pt-8
                sm:pt-10
                lg:pt-[96px]
              "
            >
              {/* Heading */}
              <motion.h1
                key={`title-${activeIndex}`}
                initial={{
                  opacity: 0,
                  y: 24,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                }}
                className="
                  font-playfair
                  font-semibold
                  text-white
                  lg:text-black
                  text-[26px]
                  sm:text-[34px]
                  md:text-5xl
                  lg:text-[60px]
                  leading-[1.15]
                  lg:leading-[1.18]
                  max-w-[300px]
                  sm:max-w-[520px]
                "
              >
                Nature&apos;s Goodness
                <br />
                Clinically Crafted
              </motion.h1>

              {/* Description */}
              <motion.p
                key={`desc-${activeIndex}`}
                initial={{
                  opacity: 0,
                  y: 16,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                  ease: "easeOut",
                }}
                className="
                  mt-4
                  sm:mt-5
                  font-inter
                  font-normal
                  text-white
                  lg:text-black
                  text-[13px]
                  sm:text-base
                  lg:text-[20px]
                  leading-[20px]
                  lg:leading-[28px]
                  max-w-[300px]
                  sm:max-w-[520px]
                "
              >
                Clean, effective &amp; honest skincare and haircare enriched
                with natural ingredients &amp; powerful herbs for real, visible
                results.
              </motion.p>

              {/* Explore Products */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 16,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                  ease: "easeOut",
                }}
                className="mt-5 sm:mt-6"
              >
                <Link
                  href="/shop"
                  className="
                    inline-flex
                    h-[40px]
                    sm:h-[43px]
                    min-w-[150px]
                    sm:min-w-[151px]
                    items-center
                    justify-center
                    rounded-[7px]
                    px-5
                    sm:px-6
                    font-inter
                    text-[13px]
                    sm:text-base
                    font-medium
                    transition-opacity
                    hover:opacity-90
                  "
                  style={{
                    backgroundColor: "#1D3B29",
                    color: "#F7EDE2",
                  }}
                >
                  Explore Products
                </Link>
              </motion.div>

              {/* Thumbnail Navigation */}
              <div
                className="
    hidden
    lg:flex
    mt-7
    items-start
    gap-4
  "
              >
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className="relative flex flex-col items-center"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Show slide ${index + 1}`}
                      aria-current={
                        index === activeIndex ? "true" : undefined
                      }
                      className={`
          relative
          h-[55px]
          w-[55px]
          shrink-0
          overflow-hidden
          rounded-[9px]
          border
          transition-all
          ${index === activeIndex
                          ? "border-[#1A3026] border-2 shadow-md"
                          : "border-[#1A3026] border-[1.5px] opacity-70 hover:opacity-100"
                        }
        `}
                    >
                      <Image
                        src={slide.image}
                        alt=""
                        fill
                        sizes="55px"
                        className="object-cover object-center"
                      />
                    </button>

                    {/* Active thumbnail indicator */}
                    {index === activeIndex && (
                      <span
                        className="
            mt-2
            h-[2px]
            w-[26px]
            rounded-full
            bg-[#1A3026]
          "
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}