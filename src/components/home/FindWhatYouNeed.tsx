"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/lib/services/product.service";
import Link from "next/link";

interface FindWhatYouNeedProps {
  products: Product[];
}

export default function FindWhatYouNeed({ products }: FindWhatYouNeedProps) {
  const [activeTab, setActiveTab] = useState("Skin Care");

  const tabs = ["Skin Care", "Hair Care", "Combo & Gift Packs", "Sample Packs"];

  const filteredProducts = products.filter(p => {
    // These IDs should match your database category_id or slugs
    if (activeTab === "Skin Care") return p.category_id === "skin" || p.category_id === "face"; 
    if (activeTab === "Hair Care") return p.category_id === "hair";
    if (activeTab === "Combo & Gift Packs") return p.category_id === "combos" || p.category_id === "gifts";
    if (activeTab === "Sample Packs") return p.category_id === "samples";
    return true;
  }).slice(0, 3); // Figma shows 3 cards

  return (
    <section className="py-20 bg-[var(--background)]">
      <div className="container-premium">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mb-2"
          >
            <div className="w-6 h-6 bg-[var(--primary)] rounded-full flex items-center justify-center rotate-[-18deg]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>
            </div>
            <h3 className="text-2xl font-playfair text-[var(--text-primary)]">Crafted For Your Everyday Care</h3>
            <div className="w-6 h-6 bg-[var(--primary)] rounded-full flex items-center justify-center rotate-[162deg]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>
            </div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6 font-playfair text-[var(--text-primary)]"
          >
            Find what your skin & hair truly needs
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-[var(--text-primary)] max-w-3xl mx-auto font-inter"
          >
            Discover gentle, plant-powered skincare and haircare made for Indian lifestyles, climates, and everyday routines.
          </motion.p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-full text-lg font-medium transition-all ${
                activeTab === tab
                  ? "bg-[var(--primary)] text-[var(--secondary-light)]"
                  : "border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link 
            href="/shop"
            className="inline-flex items-center justify-center px-10 py-3 bg-[var(--primary)] text-[var(--secondary-light)] rounded-lg text-lg font-medium hover:bg-[var(--primary-dark)] transition-all"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}
