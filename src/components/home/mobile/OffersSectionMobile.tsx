"use client";

import { motion } from "framer-motion";
import { toast } from "sonner";
import Image from "next/image";

function LeafIcon({ flipped = false }: { flipped?: boolean }) {
  return (
    <div className="relative w-4 h-4 sm:w-5 sm:h-5">
      <Image
        src={flipped ? "/images/icons/leafright.png" : "/images/icons/leafleft.png"}
        alt="Leaf"
        fill
        className="object-contain"
      />
    </div>
  );
}

export default function OffersSectionMobile() {
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied!");
  };

  return (
    <section className="py-10" style={{ background: "#FCFAF4" }}>
      <div className="w-full mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-2"
          >
            <LeafIcon />
            <span className="font-playfair font-normal text-[#2E2E2E] text-[13px] sm:text-[14px]">
              Exclusive Benefits
            </span>
            <LeafIcon flipped />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-playfair font-semibold text-[#2E2E2E] text-[22px] sm:text-[26px] leading-[1.2]"
          >
            Offers Crafted for You
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-inter font-normal text-[#2E2E2E] text-center mt-3 text-[11px] sm:text-[12px] leading-[1.5] max-w-[320px]"
          >
            Enjoy thoughtful savings on skincare and haircare made for Indian skin and everyday needs.
          </motion.p>
        </div>

        {/* Offer Cards */}
        <div className="flex flex-col items-center gap-[16px]">
          {/* Card 1: Get ₹200 OFF */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-row items-start gap-[16px] p-[20px] w-full max-w-[340px] rounded-[12px] border border-black/5"
            style={{
              background: "#F9F6F1",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.04)",
            }}
          >
            {/* Icon */}
            <div
              className="flex-shrink-0 flex items-center justify-center"
              style={{
                width: "44px",
                height: "44px",
                background: "#1D3B29",
                borderRadius: "50%",
              }}
            >
              <div className="relative w-5 h-5">
                <Image
                  src="/images/icons/benefits.png"
                  alt="Benefit"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            {/* Content */}
            <div className="flex flex-col gap-[4px] mt-[2px]">
              <h4 className="font-inter font-semibold text-[#1D3B29] text-[16px] leading-[1.2]">
                Get ₹200 OFF
              </h4>
              <p className="font-inter font-normal text-[#2E2E2E] text-[11px] leading-[1.4] mt-1">
                On orders above ₹999
              </p>
              <p className="font-inter font-normal text-[#2E2E2E] text-[11px] leading-[1.4]">
                Use Code : <strong>VSTORIES200</strong>
              </p>
              <button
                onClick={() => copyCode("VSTORIES200")}
                className="font-inter font-medium flex items-center justify-center hover:opacity-90 transition-all text-[11px] mt-2"
                style={{
                  width: "85px",
                  height: "28px",
                  background: "#1D3B29",
                  color: "#F4F0EC",
                  borderRadius: "6px",
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
            className="flex flex-row items-start gap-[16px] p-[20px] w-full max-w-[340px] rounded-[12px] border border-black/5"
            style={{
              background: "#778E6B",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.04)",
            }}
          >
            {/* Icon */}
            <div
              className="flex-shrink-0 flex items-center justify-center"
              style={{
                width: "44px",
                height: "44px",
                background: "#F4F0EC",
                borderRadius: "50%",
              }}
            >
              <div className="relative w-5 h-5">
                <Image
                  src="/images/icons/benefits-1.png"
                  alt="Benefit"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            {/* Content */}
            <div className="flex flex-col gap-[4px] mt-[2px]">
              <h4 className="font-inter font-semibold text-[#F4F0EC] text-[16px] leading-[1.2]">
                Free Sample Kit
              </h4>
              <p className="font-inter font-normal text-[#F4F0EC] text-[11px] leading-[1.4] mt-1">
                On your first order
              </p>
              <p className="font-inter font-normal text-[#F4F0EC] text-[11px] leading-[1.4]">
                No Code Required
              </p>
              <a
                href="/shop"
                className="font-inter font-medium flex items-center justify-center hover:opacity-90 transition-all text-[11px] mt-2"
                style={{
                  width: "85px",
                  height: "28px",
                  background: "#F4F0EC",
                  color: "#1D3B29",
                  borderRadius: "6px",
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
            className="flex flex-row items-start gap-[16px] p-[20px] w-full max-w-[340px] rounded-[12px] border border-black/5"
            style={{
              background: "#F9F6F1",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.04)",
            }}
          >
            {/* Icon */}
            <div
              className="flex-shrink-0 flex items-center justify-center"
              style={{
                width: "44px",
                height: "44px",
                background: "#1D3B29",
                borderRadius: "50%",
              }}
            >
              <div className="relative w-6 h-6">
                <Image
                  src="/images/icons/ship-white.png"
                  alt="Shipping"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            {/* Content */}
            <div className="flex flex-col gap-[4px] mt-[2px]">
              <h4 className="font-inter font-semibold text-[#2E2E2E] text-[16px] leading-[1.2]">
                Free Shipping
              </h4>
              <p className="font-inter font-normal text-[#2E2E2E] text-[11px] leading-[1.4] mt-1">
                On orders above ₹799
              </p>
              <p className="font-inter font-normal text-[#2E2E2E] text-[11px] leading-[1.4]">
                No Code Required
              </p>
              <a
                href="/shop"
                className="font-inter font-medium flex items-center justify-center hover:opacity-90 transition-all text-[11px] mt-2"
                style={{
                  width: "85px",
                  height: "28px",
                  background: "#1D3B29",
                  color: "#F4F0EC",
                  borderRadius: "6px",
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
