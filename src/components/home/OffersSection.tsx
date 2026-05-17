"use client";

import { motion } from "framer-motion";
import { toast } from "sonner";
import Image from "next/image";

// Icon components
function GiftIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 12v10H4V12M22 7H2v5h20V7zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" stroke="#F4F0EC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1h16v16H1zM17 6h4l4 4v6h-8V6z" stroke="#F4F0EC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="5.5" cy="18.5" r="2.5" stroke="#F4F0EC" strokeWidth="1.5" />
      <circle cx="22.5" cy="18.5" r="2.5" stroke="#F4F0EC" strokeWidth="1.5" />
    </svg>
  );
}

function LeafIcon({ flipped = false }: { flipped?: boolean }) {
  return (
    <div className="relative w-6 h-6">
      <Image
        src={flipped ? "/images/icons/leafright.png" : "/images/icons/leafleft.png"}
        alt="Leaf"
        fill
        className="object-contain"
      />
    </div>
  );
}

export default function OffersSection() {
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied!");
  };

  return (
    <section className="py-20" style={{ background: "#FCFAF4" }}>
      <div className="w-full max-w-[1440px] mx-auto px-[100px]">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end gap-6 mb-4"
          >
            <LeafIcon />
            <span className="font-playfair font-normal text-[#2E2E2E]" style={{ fontSize: "24px", lineHeight: "32px" }}>
              Exclusive Benefits
            </span>
            <LeafIcon flipped />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-playfair font-semibold text-[#2E2E2E]"
            style={{ fontSize: "48px", lineHeight: "64px" }}
          >
            Offers Crafted for You
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-inter font-normal text-[#2E2E2E] text-center mt-2"
            style={{ fontSize: "24px", lineHeight: "29px", maxWidth: "1041px" }}
          >
            Enjoy thoughtful savings on skincare and haircare made for Indian skin and everyday needs.
          </motion.p>
        </div>

        {/* Offer Cards */}
        <div className="flex flex-wrap justify-center gap-6">
          {/* Card 1: Get ₹200 OFF */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-start gap-6 p-6"
            style={{
              width: "333px",
              height: "182px",
              background: "#F9F6F1",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
              borderRadius: "12px",
            }}
          >
            {/* Icon */}
            <div
              className="flex-shrink-0 flex items-center justify-center relative"
              style={{
                width: "60px",
                height: "60px",
                background: "#1D3B29",
                borderRadius: "40px",
              }}
            >
              <div className="relative w-8 h-8">
                <Image
                  src="/images/icons/benefits.png"
                  alt="Benefit"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            {/* Content */}
            <div className="flex flex-col gap-2">
              <h4 className="font-inter font-semibold text-[#1D3B29]" style={{ fontSize: "24px", lineHeight: "29px" }}>
                Get ₹200 OFF
              </h4>
              <p className="font-inter font-normal text-[#1D3B29]" style={{ fontSize: "16px", lineHeight: "19px" }}>
                On orders above ₹999
              </p>
              <p className="font-inter font-normal text-[#1D3B29]" style={{ fontSize: "16px", lineHeight: "19px" }}>
                Use Code : VSTORIES200
              </p>
              <button
                onClick={() => copyCode("VSTORIES200")}
                className="font-inter font-medium flex items-center justify-center hover:opacity-90 transition-all"
                style={{
                  width: "134px",
                  height: "43px",
                  background: "#1D3B29",
                  color: "#F4F0EC",
                  borderRadius: "8px",
                  fontSize: "16px",
                  lineHeight: "19px",
                  marginTop: "4px",
                }}
              >
                Copy Code
              </button>
            </div>
          </motion.div>

          {/* Card 2: Free Sample Kit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-start gap-6 p-6"
            style={{
              width: "315px",
              height: "182px",
              background: "#778E6B",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
              borderRadius: "12px",
            }}
          >
            {/* Icon */}
            <div
              className="flex-shrink-0 flex items-center justify-center relative"
              style={{
                width: "60px",
                height: "60px",
                background: "#F4F0EC",
                borderRadius: "40px",
              }}
            >
              <div className="relative w-8 h-8">
                <Image
                  src="/images/icons/benefits-1.png"
                  alt="Benefit"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            {/* Content */}
            <div className="flex flex-col gap-2">
              <h4 className="font-inter font-semibold text-[#F4F0EC]" style={{ fontSize: "24px", lineHeight: "29px" }}>
                Free Sample Kit
              </h4>
              <p className="font-inter font-normal text-[#F4F0EC]" style={{ fontSize: "16px", lineHeight: "19px" }}>
                On your first order
              </p>
              <p className="font-inter font-normal text-[#F4F0EC]" style={{ fontSize: "16px", lineHeight: "19px" }}>
                No Code Required
              </p>
              <a
                href="/shop"
                className="font-inter font-medium flex items-center justify-center hover:opacity-90 transition-all"
                style={{
                  width: "127px",
                  height: "43px",
                  background: "#F4F0EC",
                  color: "#1D3B29",
                  borderRadius: "8px",
                  fontSize: "16px",
                  lineHeight: "19px",
                  marginTop: "4px",
                }}
              >
                Shop Now
              </a>
            </div>
          </motion.div>

          {/* Card 3: Free Shipping */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-start gap-6 p-6"
            style={{
              width: "300px",
              height: "182px",
              background: "#F9F6F1",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
              borderRadius: "12px",
            }}
          >
            {/* Icon */}
            <div
              className="flex-shrink-0 flex items-center justify-center relative"
              style={{
                width: "60px",
                height: "60px",
                background: "#1D3B29",
                borderRadius: "40px",
              }}
            >
              <div className="relative w-8 h-8">
                <Image
                  src="/images/icons/ship-white.png"
                  alt="Shipping"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            {/* Content */}
            <div className="flex flex-col gap-2">
              <h4 className="font-inter font-semibold text-[#2E2E2E]" style={{ fontSize: "24px", lineHeight: "29px" }}>
                Free Shipping
              </h4>
              <p className="font-inter font-normal text-[#2E2E2E]" style={{ fontSize: "16px", lineHeight: "19px" }}>
                On orders above ₹799
              </p>
              <p className="font-inter font-normal text-[#2E2E2E]" style={{ fontSize: "16px", lineHeight: "19px" }}>
                No Code Required
              </p>
              <a
                href="/shop"
                className="font-inter font-medium flex items-center justify-center hover:opacity-90 transition-all"
                style={{
                  width: "127px",
                  height: "43px",
                  background: "#1D3B29",
                  color: "#F4F0EC",
                  borderRadius: "8px",
                  fontSize: "16px",
                  lineHeight: "19px",
                  marginTop: "4px",
                }}
              >
                Shop Now
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
