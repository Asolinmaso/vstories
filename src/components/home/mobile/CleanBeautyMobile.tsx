"use client";

import { motion } from "framer-motion";
import Image from "next/image";

function LeafIcon({ flipped = false }: { flipped?: boolean }) {
  return (
    <div className="relative w-[16px] h-[16px]">
      <Image 
        src={flipped ? "/images/icons/leafright.png" : "/images/icons/leafleft.png"} 
        alt="Leaf" 
        fill 
        className="object-contain" 
      />
    </div>
  );
}

export default function CleanBeautyMobile() {
  const certifications = [
    {
      name: "Dermatologically Tested",
      desc: "Clinically tested on sensitive skin for safe, gentle, and non-irritating skincare.",
      image: "/images/icons/derm test.png",
    },
    {
      name: "FDA Approved",
      desc: "Made with trusted quality standards and carefully selected skin-safe ingredients.",
      image: "/images/icons/FDA.png",
    },
    {
      name: "Made Safe Certified",
      desc: "Free from harsh chemicals and crafted with clean, skin-friendly ingredients.",
      image: "/images/icons/made safe.png",
    },
  ];

  return (
    <section className="py-10" style={{ background: "#FCFAF4" }}>
      <div className="w-full max-w-[1440px] mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-3"
          >
            <LeafIcon />
            <span className="font-playfair font-normal text-[#2E2E2E] whitespace-nowrap text-center text-[12px] sm:text-[14px]">
              Safe Ingredients. Visible Results.
            </span>
            <LeafIcon flipped />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-playfair font-semibold text-[#2E2E2E] text-[26px] leading-[1.2]"
          >
            Clean Beauty Essentials
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-inter font-normal text-[#2E2E2E] text-center mt-3 text-[13px] leading-[1.4] max-w-[320px]"
          >
            Designed with skin-safe ingredients and modern skincare science to deliver care you can trust.
          </motion.p>
        </div>

        {/* Certification Icons Row */}
        <div className="flex flex-col items-center justify-center gap-8">
          {certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center gap-2 w-full max-w-[240px]"
            >
              {/* Icon Image */}
              <div className="relative flex-shrink-0 w-[80px] h-[80px]">
                <Image
                  src={cert.image}
                  alt={cert.name}
                  fill
                  className="object-contain"
                />
              </div>

              <h4 className="font-inter font-semibold text-[#2E2E2E] text-center text-[15px] mt-1">
                {cert.name}
              </h4>

              <p
                className="font-inter font-normal text-[#2E2E2E] text-center text-[12px] leading-[1.4]"
              >
                {cert.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
