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
    const defaultSlides = [
        {
            id: 1,
            image: "/images/category-hair.png", // Using available images as placeholder
            title: "Discover Nature's Secret",
            subtitle: "Premium Herbal Hair Care",
            cta: "Shop Hair Care",
            link: "/shop/hair",
        },
        {
            id: 2,
            image: "/images/category-face.png",
            title: "Radiant Skin Awaits",
            subtitle: "100% Natural Skincare",
            cta: "Shop Skincare",
            link: "/shop/face",
        },
        {
            id: 3,
            image: "/images/category-best.png",
            title: "Our Best Sellers",
            subtitle: "Loved by Thousands",
            cta: "View Bestsellers",
            link: "/shop/bestsellers",
        },
    ];

    const slides = images.length > 0
        ? images.map((img, idx) => ({
            id: idx,
            image: img,
            title: "", // For user uploaded banners, text is usually in the image
            subtitle: "",
            cta: "Shop Now",
            link: "/shop",
        }))
        : defaultSlides;

    return (
        <section className="relative w-full bg-[var(--background)] px-1 md:px-1 pt-2 md:pt-4 pb-2">
            <div className="relative h-[28vh] md:h-[80vh] w-full overflow-hidden rounded-[2.5rem] md:rounded-[4rem] shadow-md border border-white/20">
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
                    }}
                    className="h-full w-full"
                >
                    {slides.map((slide, idx) => (
                        <SwiperSlide key={slide.id} className="relative h-full w-full">
                            {/* Background Image */}
                            <div className="absolute inset-0 h-full w-full">
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    fill
                                    className="object-cover object-center"
                                    priority={idx === 0}
                                    sizes="100vw"
                                />
                                {/* Overlay - lighter for better visibility of products */}
                                <div className="absolute inset-0 bg-black/10" />
                            </div>

                            {/* Link overlay for entire slide */}
                            <Link href={slide.link} className="absolute inset-0 z-20">
                                <span className="sr-only">{slide.title || "Shop Now"}</span>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Custom Styles for Swiper Pagination */}
            <style jsx global>{`
        .swiper-pagination {
          position: absolute;
          bottom: 2rem !important;
          right: 3rem !important;
          left: auto !important;
          width: auto !important;
          display: flex;
          gap: 0.5rem;
          z-index: 30;
        }
        .swiper-pagination-bullet {
          width: 8px !important;
          height: 8px !important;
          background: rgba(255, 255, 255, 0.6) !important;
          opacity: 1 !important;
          border-radius: 999px !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          margin: 0 !important;
        }
        .swiper-pagination-bullet-active {
          width: 24px !important;
          background: white !important;
        }
      `}</style>
        </section>
    );
}
