"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  const thumbnails = [
    "/images/thumb-1.png", // We'll need to make sure these exist or use placeholders
    "/images/thumb-2.png",
    "/images/thumb-3.png",
    "/images/thumb-4.png",
  ];

  return (
    <section className="relative w-full bg-[var(--background-warm)] overflow-hidden min-h-[600px] md:min-h-[762px] flex items-center">
      <div className="container-premium grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12 md:py-0">
        {/* Left Content */}
        <div className="z-10 order-2 lg:order-1 px-4 lg:px-0">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-[64px] font-semibold leading-tight lg:leading-[85px] text-black mb-8 max-w-[543px] font-playfair"
          >
            Nature’s Goodness Clinically Crafted
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl lg:text-[24px] text-black mb-12 max-w-[628px] font-inter lg:leading-[29px]"
          >
            Clean, effective & honest skincare and haircare enriched with natural ingredients & powerful herbs for real, visible results.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <Link 
              href="/shop" 
              className="inline-flex items-center justify-center px-10 py-4 bg-[var(--primary)] text-white rounded-lg text-lg font-bold hover:bg-[var(--primary-dark)] transition-all shadow-lg hover:shadow-xl uppercase tracking-wider"
            >
              Explore Products
            </Link>
          </motion.div>

          {/* Thumbnails */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-12 md:mt-20 flex flex-wrap gap-4 items-end"
          >
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="w-[60px] h-[60px] rounded-xl border border-[var(--primary)] overflow-hidden hover:scale-110 transition-transform cursor-pointer shadow-sm relative"
              >
                <Image
                  src={`/images/thumb-${i}.png`}
                  alt={`Product thumbnail ${i}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
            <div className="w-[30px] h-[2px] bg-[var(--primary)] mb-7 ml-2 hidden md:block" />
          </motion.div>
        </div>

        {/* Right Content - Hero Image */}
        <div className="relative h-[400px] md:h-[764px] w-full order-1 lg:order-2">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative w-full h-full"
          >
            {/* Main Product Image */}
            <Image
              src="/images/hero-main.png" // We'll use the generated image here
              alt="Nature's Goodness Product"
              fill
              className="object-cover lg:object-contain object-center lg:object-right"
              priority
            />
            
            {/* Floating Element - Ellipse in Figma */}
            <div className="absolute top-[-200px] right-[-400px] w-[759px] h-[759px] rounded-full bg-gradient-to-b from-[rgba(26,62,37,0.9)] to-[rgba(26,62,37,0.4)] blur-3xl opacity-20 -z-10 hidden lg:block" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
