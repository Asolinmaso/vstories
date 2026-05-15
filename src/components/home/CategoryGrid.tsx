"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Skin Care",
    image: "/images/cat-skin.png",
    href: "/shop/skin",
    count: "24 Products"
  },
  {
    name: "Hair Care",
    image: "/images/cat-hair.png",
    href: "/shop/hair",
    count: "18 Products"
  },
  {
    name: "Combo Packs",
    image: "/images/cat-combos.png",
    href: "/shop/combos",
    count: "12 Products"
  },
  {
    name: "Sample Packs",
    image: "/images/cat-samples.png",
    href: "/shop/samples",
    count: "6 Products"
  }
];

export default function CategoryGrid() {
  return (
    <section className="py-20 bg-[var(--background)]">
      <div className="container-premium">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-playfair text-[var(--primary)] mb-4">Browse by category</h2>
          <div className="w-24 h-1 bg-[var(--highlight)] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={cat.href} className="group block">
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 shadow-md group-hover:shadow-xl transition-all duration-500">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold font-inter text-[var(--primary)] mb-1 group-hover:text-[var(--highlight)] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm font-medium text-black/50 uppercase tracking-widest font-poppins">
                    {cat.count}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
