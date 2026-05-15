"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function BrandStoryBanner() {
  return (
    <section className="relative h-[500px] md:h-[600px] w-full overflow-hidden flex items-center justify-center text-center">
      <Image
        src="/images/brand-story-bg.png"
        alt="Vstories Brand Story"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40 z-10" />
      
      <div className="container-premium relative z-20 px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-[48px] font-bold text-white mb-6 font-playfair"
        >
          More Than Skincare. A Story of Care.
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-white max-w-3xl mx-auto mb-10 font-inter leading-relaxed opacity-90"
        >
          Inspired by real experiences, built for Indian skin, our journey blends tradition with modern science.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link 
            href="/about" 
            className="inline-flex items-center justify-center px-10 py-3 border-2 border-[var(--highlight)] text-[var(--highlight)] rounded-lg text-lg font-medium hover:bg-[var(--highlight)] hover:text-[var(--primary)] transition-all"
          >
            Know Our Story
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
