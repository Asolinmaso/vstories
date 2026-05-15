"use client";

import { motion } from "framer-motion";
import { Copy, Gift, Truck } from "lucide-react";
import { toast } from "sonner";

export default function OffersSection() {
  const offers = [
    {
      title: "20% OFF",
      subtitle: "On your 1st Purchase",
      code: "FIRST20",
      icon: <Copy className="w-6 h-6 text-white" />,
      bg: "bg-[#1D3B29]",
      textColor: "text-white",
      buttonBg: "bg-[#E8BF72]",
      buttonText: "text-[#1D3B29]",
      actionText: "Copy Code"
    },
    {
      title: "₹100 OFF",
      subtitle: "On orders above ₹999",
      code: "VSTORIES100",
      icon: <Copy className="w-6 h-6 text-[#1D3B29]" />,
      bg: "bg-[#F4EEE2]",
      textColor: "text-[#1D3B29]",
      buttonBg: "bg-[#1D3B29]",
      buttonText: "text-white",
      actionText: "Copy Code"
    },
    {
      title: "Free Shipping",
      subtitle: "On orders above ₹799",
      code: "No Code Required",
      icon: <Truck className="w-6 h-6 text-[#1D3B29]" />,
      bg: "bg-white border-2 border-[#1D3B29]/10",
      textColor: "text-[#1D3B29]",
      buttonBg: "bg-[#1D3B29]",
      buttonText: "text-white",
      actionText: "Shop Now"
    }
  ];

  const copyCode = (code: string) => {
    if (code === "No Code Required") return;
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard!");
  };

  return (
    <section className="py-20 bg-[var(--background)]">
      <div className="container-premium">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-6 h-6 bg-[var(--primary)] rounded-full flex items-center justify-center rotate-[-18deg]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>
            </div>
            <h3 className="text-2xl font-playfair text-[var(--text-primary)]">Exclusive Benefits</h3>
            <div className="w-6 h-6 bg-[var(--primary)] rounded-full flex items-center justify-center rotate-[162deg]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-playfair text-[var(--text-primary)]">Offers Crafted for You</h2>
          <p className="text-xl md:text-2xl text-[var(--text-primary)] max-w-4xl mx-auto font-inter">
            Enjoy thoughtful savings on skincare and haircare made for Indian skin and everyday needs.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((offer, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`${offer.bg} p-8 rounded-2xl shadow-lg flex flex-col items-start gap-6 relative overflow-hidden`}
            >
              <div className={`w-[60px] h-[60px] rounded-full flex items-center justify-center ${offer.bg === "bg-[#778E6B]" ? "bg-[#F4F0EC]" : "bg-[#1D3B29]"}`}>
                {offer.icon}
              </div>
              
              <div className="flex flex-col gap-2">
                <h4 className={`text-2xl font-bold font-inter ${offer.textColor}`}>{offer.title}</h4>
                <p className={`text-base font-inter ${offer.textColor} opacity-80`}>{offer.subtitle}</p>
                <p className={`text-base font-inter ${offer.textColor} opacity-80`}>{offer.code}</p>
              </div>
              
              <button
                onClick={() => copyCode(offer.code)}
                className={`${offer.buttonBg} ${offer.buttonText} px-8 py-3 rounded-lg text-base font-medium transition-all hover:scale-105 active:scale-95`}
              >
                {offer.actionText}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
