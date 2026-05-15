"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function CategoryBanners() {
  const banners = [
    {
      title: "Experience Hair Care",
      desc: "Revive and nourish from root to tip.",
      link: "/shop/hair",
      image: "/images/banner-hair.png",
    },
    {
      title: "Experience Skin Care",
      desc: "Revive and nourish from root to tip.", // Same as hair in Figma
      link: "/shop/skin",
      image: "/images/banner-skin.png",
    }
  ];

  return (
    <section className="py-12 bg-[var(--background)]">
      <div className="container-premium grid grid-cols-1 md:grid-cols-2 gap-8">
        {banners.map((banner, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
            className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden group shadow-lg"
          >
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/30 z-10" />
            
            <div className="absolute inset-0 z-20 p-10 flex flex-col items-start justify-end gap-4">
              <h3 className="text-3xl md:text-5xl font-bold text-white font-playfair">{banner.title}</h3>
              <p className="text-lg md:text-xl text-white opacity-90 font-inter">{banner.desc}</p>
              <Link 
                href={banner.link}
                className="mt-4 px-8 py-2 border border-white text-white rounded-lg font-medium hover:bg-white hover:text-black transition-all"
              >
                Explore Now
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
