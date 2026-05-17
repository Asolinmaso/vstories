"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface HeroCarouselProps {
  images?: string[];
}

export default function HeroCarousel({ images = [] }: HeroCarouselProps) {
  const slides = [
    {
      id: "hero-1",
      image: "/images/home/hero4.png",
      title: "Nature's Goodness",
      subtitle: "Clinically Crafted",
      cta: "Explore Products",
      link: "/shop",
    },
    {
      id: "hero-2",
      image: "/images/home/hero3.png",
      title: "Nature's Goodness",
      subtitle: "Clinically Crafted",
      cta: "Explore Products",
      link: "/shop",
    },
    {
      id: "hero-3",
      image: "/images/home/hero2.png",
      title: "Nature's Goodness",
      subtitle: "Clinically Crafted",
      cta: "Explore Products",
      link: "/shop",
    },
    {
      id: "hero-4",
      image: "/images/home/hero1.png",
      title: "Nature's Goodness",
      subtitle: "Clinically Crafted",
      cta: "Explore Products",
      link: "/shop",
    },
    ...(images.length > 4
      ? images.slice(4).map((img, idx) => ({
        id: `extra-${idx}`,
        image: img,
        title: "",
        subtitle: "",
        cta: "Shop Now",
        link: "/shop",
      }))
      : [])
  ];

  return (
    <section className="relative w-full overflow-hidden" style={{ background: "#F4EEE2", minHeight: "762px" }}>
      <div className="relative w-full h-full">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          speed={1000}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className} hero-thumb-bullet">
                                <img src="${slides[index].image}" alt="slide ${index + 1}" />
                                <div class="thumb-indicator"></div>
                            </span>`;
            },
          }}
          className="w-full"
          style={{ height: "762px" }}
        >
          {slides.map((slide, idx) => (
            <SwiperSlide key={slide.id} className="relative w-full h-full">
              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover object-center"
                  priority={idx === 0}
                  sizes="100vw"
                />
              </div>

              {/* Content positioned absolutely over image, left-aligned per Hero.tsx */}
              <div className="relative z-10 w-full h-full flex items-center">
                <div className="w-full max-w-[1440px] mx-auto px-[100px]">
                  {/* Heading */}
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="font-playfair font-semibold text-black"
                    style={{
                      width: "543px",
                      fontSize: "64px",
                      lineHeight: "85px",
                      marginTop: "100px",
                      maxWidth: "100%",
                    }}
                  >
                    {slide.title} {slide.subtitle}
                  </motion.h1>

                  {/* Subtext */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
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
                    Clean, effective & honest skincare and haircare enriched with natural ingredients & powerful herbs for real, visible results.
                  </motion.p>

                  {/* Explore Products Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    style={{ marginTop: "24px" }}
                  >
                    <Link
                      href={slide.link}
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
                      {slide.cta}
                    </Link>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Styles for Swiper Pagination - Thumbnail Style */}
      <style jsx global>{`
        .swiper-pagination {
          position: absolute;
          bottom: 3rem !important;
          left: 9% !important;
          right: auto !important;
          width: auto !important;
          display: flex;
          gap: 1.25rem;
          z-index: 30;
          padding: 0.5rem 0;
        }
        
        .hero-thumb-bullet {
          width: 55px !important;
          height: 55px !important;
          background: none !important;
          opacity: 1 !important;
          border-radius: 10px !important;
          border: 1.5px solid #1A3026 !important;
          overflow: hidden !important;
          cursor: pointer;
          position: relative;
          transition: all 0.3s ease;
          margin: 0 !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .hero-thumb-bullet img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.85;
          transition: all 0.3s ease;
        }

        .hero-thumb-bullet .thumb-indicator {
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 3px;
          background: #1A3026;
          transition: width 0.3s ease;
          border-radius: 4px;
        }

        .swiper-pagination-bullet-active {
          border-width: 2px !important;
          transform: translateY(-2px);
        }

        .swiper-pagination-bullet-active img {
          opacity: 1 !important;
          transform: scale(1.05);
        }

        .swiper-pagination-bullet-active .thumb-indicator {
          width: 32px;
        }

        @media (max-width: 768px) {
          .swiper-pagination {
            bottom: 1.5rem !important;
            left: 5% !important;
            gap: 0.75rem;
          }
          .hero-thumb-bullet {
            width: 42px !important;
            height: 42px !important;
            border-radius: 8px !important;
          }
          .hero-thumb-bullet .thumb-indicator {
            bottom: -6px;
            height: 2px;
          }
          .swiper-pagination-bullet-active .thumb-indicator {
            width: 20px;
          }
        }
      `}</style>
    </section>
  );
}
