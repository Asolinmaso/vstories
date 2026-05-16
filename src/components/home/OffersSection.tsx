"use client";

import { motion } from "framer-motion";
import { toast } from "sonner";

// Icon components
function GiftIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 12v10H4V12M22 7H2v5h20V7zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" stroke="#F4F0EC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1h16v16H1zM17 6h4l4 4v6h-8V6z" stroke="#F4F0EC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="5.5" cy="18.5" r="2.5" stroke="#F4F0EC" strokeWidth="1.5"/>
      <circle cx="22.5" cy="18.5" r="2.5" stroke="#F4F0EC" strokeWidth="1.5"/>
    </svg>
  );
}

export default function OffersSection() {
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied!");
  };

  return (
    <section className="py-20" style={{ background: "#FCFAF4" }}>
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-[100px]">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end gap-6 mb-4"
          >
            <div style={{ transform: "rotate(-18.46deg)" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#1D3B29" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.67806 0.393273C3.33698 0.746016 3.86524 1.26031 4.27352 1.86988C4.93665 2.86007 5.32531 4.08777 5.64054 5.36694C6.27084 7.92543 6.64437 10.715 7.77326 12.1466C8.83291 13.4904 10.0172 14.1032 11.144 14.2227C11.6287 14.2742 12.107 14.2325 12.5642 14.1104C12.5917 10.6285 11.032 6.71738 8.37049 4.61054C11.4761 6.14733 13.7451 9.27599 14.257 13.1784C14.0091 13.4058 14.1242 13.3167 14.2348 13.2224C15.98 11.7396 16.8379 8.81822 14.9913 5.57157C14.1428 4.07991 12.3091 2.18967 9.91609 1.04988C7.84587 0.0639353 5.3733 -0.379387 2.67804 0.393385L2.67806 0.393273Z"/>
              </svg>
            </div>
            <span className="font-playfair font-normal text-[#2E2E2E]" style={{ fontSize: "24px", lineHeight: "32px" }}>
              Exclusive Benefits
            </span>
            <div style={{ transform: "matrix(-0.95, -0.32, -0.32, 0.95, 0, 0)" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#1D3B29" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.67806 0.393273C3.33698 0.746016 3.86524 1.26031 4.27352 1.86988C4.93665 2.86007 5.32531 4.08777 5.64054 5.36694C6.27084 7.92543 6.64437 10.715 7.77326 12.1466C8.83291 13.4904 10.0172 14.1032 11.144 14.2227C11.6287 14.2742 12.107 14.2325 12.5642 14.1104C12.5917 10.6285 11.032 6.71738 8.37049 4.61054C11.4761 6.14733 13.7451 9.27599 14.257 13.1784C14.0091 13.4058 14.1242 13.3167 14.2348 13.2224C15.98 11.7396 16.8379 8.81822 14.9913 5.57157C14.1428 4.07991 12.3091 2.18967 9.91609 1.04988C7.84587 0.0639353 5.3733 -0.379387 2.67804 0.393385L2.67806 0.393273Z"/>
              </svg>
            </div>
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
            className="flex items-start gap-6 p-6 w-full md:w-auto md:min-w-[333px]"
            style={{
              minHeight: "182px",
              background: "#F9F6F1",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
              borderRadius: "12px",
            }}
          >
            {/* Icon */}
            <div
              className="flex-shrink-0 flex items-center justify-center"
              style={{
                width: "60px",
                height: "60px",
                background: "#1D3B29",
                borderRadius: "40px",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 12v10H4V12M22 7H2v5h20V7zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" stroke="#F4F0EC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
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
                className="font-inter font-medium text-[#F4F0EC] flex items-center justify-center hover:opacity-90 transition-all"
                style={{
                  width: "134px",
                  height: "43px",
                  background: "#1D3B29",
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
            className="flex items-start gap-6 p-6 w-full md:w-auto md:min-w-[315px]"
            style={{
              minHeight: "182px",
              background: "#778E6B",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
              borderRadius: "12px",
            }}
          >
            {/* Icon */}
            <div
              className="flex-shrink-0 flex items-center justify-center"
              style={{
                width: "60px",
                height: "60px",
                background: "#F4F0EC",
                borderRadius: "40px",
              }}
            >
              <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.5 2L11.5 22M4 7L4 17M19 7L19 17M4 7C4 4.791 7.358 3 11.5 3C15.642 3 19 4.791 19 7C19 9.209 15.642 11 11.5 11C7.358 11 4 9.209 4 7Z" stroke="#1D3B29" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
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
                className="font-inter font-medium text-[#1D3B29] flex items-center justify-center hover:opacity-90 transition-all"
                style={{
                  width: "127px",
                  height: "43px",
                  background: "#F4F0EC",
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
            className="flex items-start gap-6 p-6 w-full md:w-auto md:min-w-[300px]"
            style={{
              minHeight: "182px",
              background: "#F9F6F1",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
              borderRadius: "12px",
            }}
          >
            {/* Icon */}
            <div
              className="flex-shrink-0 flex items-center justify-center"
              style={{
                width: "60px",
                height: "60px",
                background: "#1D3B29",
                borderRadius: "40px",
              }}
            >
              <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1h16v16H1V1zM17 7h5l5 4v5h-10V7z" stroke="#F4F0EC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="6" cy="20" r="2.5" stroke="#F4F0EC" strokeWidth="1.5"/>
                <circle cx="23" cy="20" r="2.5" stroke="#F4F0EC" strokeWidth="1.5"/>
              </svg>
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
                className="font-inter font-medium text-[#F4F0EC] flex items-center justify-center hover:opacity-90 transition-all"
                style={{
                  width: "127px",
                  height: "43px",
                  background: "#1D3B29",
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
