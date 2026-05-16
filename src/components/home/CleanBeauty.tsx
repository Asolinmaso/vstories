"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function CleanBeauty() {
  const certifications = [
    {
      name: "Dermatologically Tested",
      desc: "Clinically tested on sensitive skin for safe, gentle, and non-irritating skincare.",
      image: "/images/banner-skin.png",
    },
    {
      name: "FDA Approved",
      desc: "Made with trusted quality standards and carefully selected skin-safe ingredients.",
      image: "/images/banner-hair.png",
    },
    {
      name: "Made Safe Certified",
      desc: "Free from harsh chemicals and crafted with clean, skin-friendly ingredients.",
      image: "/images/cat-skin.png",
    },
  ];

  return (
    <section className="py-20" style={{ background: "#FCFAF4" }}>
      <div className="w-full max-w-[1440px] mx-auto" style={{ paddingLeft: "225px", paddingRight: "225px" }}>
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
            <span className="font-playfair font-normal text-[#000000]" style={{ fontSize: "24px", lineHeight: "32px" }}>
              Safe Ingredients. Visible Results.
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
            style={{ fontSize: "48px", lineHeight: "64px", maxWidth: "518px" }}
          >
            Clean Beauty Essentials
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-inter font-normal text-[#2E2E2E] text-center mt-4"
            style={{ fontSize: "24px", lineHeight: "29px", maxWidth: "768px" }}
          >
            Designed with skin-safe ingredients and modern skincare science to deliver care you can trust.
          </motion.p>
        </div>

        {/* Certification Icons Row */}
        <div className="flex flex-wrap justify-center gap-20">
          {certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center gap-4"
              style={{ width: "284px" }}
            >
              {/* Circle image */}
              <div
                className="relative flex-shrink-0 overflow-hidden"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "100px",
                }}
              >
                <Image
                  src={cert.image}
                  alt={cert.name}
                  fill
                  className="object-cover"
                />
              </div>

              <h4
                className="font-inter font-semibold text-[#2E2E2E] text-center"
                style={{ fontSize: "24px", lineHeight: "29px" }}
              >
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
