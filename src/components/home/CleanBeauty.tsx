"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Leaf, Heart, Droplets, CheckCircle } from "lucide-react";

export default function CleanBeauty() {
  const certifications = [
    { name: "Dermatologically Tested", icon: <ShieldCheck className="w-10 h-10" /> },
    { name: "FDA Approved", icon: <CheckCircle className="w-10 h-10" /> },
    { name: "Made Safe Certified", icon: <Leaf className="w-10 h-10" /> },
    { name: "Cruelty Free", icon: <Heart className="w-10 h-10" /> },
    { name: "100% Vegan", icon: <Droplets className="w-10 h-10" /> },
  ];

  return (
    <section className="py-24 bg-[#FCFAF4]">
      <div className="container-premium">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 font-playfair text-[var(--primary)]"
          >
            Clean, effective & honest
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-black/70 max-w-3xl mx-auto font-inter"
          >
            Skincare and haircare enriched with natural ingredients & powerful herbs for real, visible results.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-8">
          {certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-6"
            >
              <div className="w-24 h-24 rounded-full bg-white shadow-md border border-[#1D3B29]/5 flex items-center justify-center text-[var(--primary)] hover:scale-110 transition-all duration-500 hover:shadow-xl group">
                <div className="group-hover:rotate-[360deg] transition-transform duration-700">
                  {cert.icon}
                </div>
              </div>
              <p className="text-sm font-bold text-[var(--primary)] text-center max-w-[140px] font-inter uppercase tracking-widest leading-tight">
                {cert.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
