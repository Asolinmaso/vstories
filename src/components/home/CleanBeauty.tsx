"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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

export default function CleanBeauty() {
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
    <section className="py-12 lg:py-20" style={{ background: "#FCFAF4" }}>
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[100px]">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end gap-6 mb-4"
          >
            <LeafIcon />
            <span className="font-playfair font-normal text-[#000000]" style={{ fontSize: "24px", lineHeight: "32px" }}>
              Safe Ingredients. Visible Results.
            </span>
            <LeafIcon flipped />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-playfair font-semibold text-[#2E2E2E] text-2xl sm:text-3xl md:text-4xl lg:text-[48px] lg:leading-[64px] max-w-[518px]"
          >
            Clean Beauty Essentials
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-inter font-normal text-[#2E2E2E] text-center mt-4 text-base sm:text-lg lg:text-2xl lg:leading-[29px] max-w-[768px]"
          >
            Designed with skin-safe ingredients and modern skincare science to deliver care you can trust.
          </motion.p>
        </div>

        {/* Certification Icons Row */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-8 sm:gap-12 lg:gap-20">
          {certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center gap-4 w-full max-w-[320px] px-4"
            >
              {/* Icon Image */}
              <div className="relative flex-shrink-0 w-28 h-28 sm:w-36 sm:h-36 lg:w-[180px] lg:h-[180px]">
                <Image
                  src={cert.image}
                  alt={cert.name}
                  fill
                  className="object-contain"
                />
              </div>

              <h4 className="font-inter font-semibold text-[#2E2E2E] text-center mt-4 text-lg lg:text-2xl lg:leading-[29px]">
                {cert.name}
              </h4>

              <p
                className="font-inter font-normal text-[#2E2E2E] text-center"
                style={{ fontSize: "16px", lineHeight: "19px" }}
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
