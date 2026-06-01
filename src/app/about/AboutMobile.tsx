"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/* ─── Mobile value card ───────────────────────────────────── */
function MobileValueCard({
  iconSrc,
  title,
  desc,
}: {
  iconSrc: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col items-center text-center gap-3">
      {/* Circles Container */}
      <div className="relative w-[110px] h-[110px]">
        {/* Outer golden sphere */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(180deg, #CBA45A 0%, #FFEAC3 65%, #C39641 100%)"
          }}
        />
        {/* Inner green circle */}
        <div
          className="absolute rounded-full flex items-center justify-center bg-[#1D3B29] top-[px] left-1/2 -translate-x-1/2 w-[72px] h-[72px] shadow-[0px_4px_10px_rgba(0,0,0,0.15)]"
        >
          <Image src={iconSrc} alt={title} width={28} height={28} className="object-contain" />
        </div>
      </div>

      {/* Text Content */}
      <div className="flex flex-col items-center gap-[4px] mt-1">
        <span className="font-inter font-semibold text-[#2E2E2E]" style={{ fontSize: "16px", lineHeight: "22px" }}>
          {title}
        </span>
        <span className="font-inter font-normal text-[#333333]" style={{ fontSize: "12px", lineHeight: "16px", maxWidth: "165px" }}>
          {desc}
        </span>
      </div>
    </div>
  );
}

const VALUES = [
  {
    iconSrc: "/images/icons/natural.png",
    title: "100% Natural",
    desc: "Every ingredient is sourced from nature, ensuring purity and effectiveness.",
  },
  {
    iconSrc: "/images/icons/heart.png",
    title: "Made with Love",
    desc: "Each product is crafted with care and passion for holistic beauty.",
  },
  {
    iconSrc: "/images/icons/community.png",
    title: "Community Focused",
    desc: "We believe in empowering our community through natural wellness.",
  },
  {
    iconSrc: "/images/icons/Quality.png",
    title: "Quality First",
    desc: "We never compromise on quality, using only the finest herbs and oils.",
  },
];

const TIMELINE = [
  { year: "2021", title: "The Beginning", desc: "V Stories was born from a passion for ancient herbal remedies." },
  { year: "2022", title: "First Products", desc: "Launched our signature Herbal Hair Oil, now a bestseller." },
  { year: "2023", title: "Growing Family", desc: "Expanded to skin care and built a community of 10,000+ customers." },
  { year: "2024", title: "New Horizons", desc: "Introducing new product lines and B2B partnerships." },
];

export default function AboutMobile() {
  return (
    <div className="block lg:hidden" style={{ background: "#FCFAF4" }}>

      {/* ── 1. HERO ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#F5F5F5] h-[100svh] max-h-[900px] min-h-[700px]">
        <Image src="/images/about/hero-about.png" alt="About Hero" fill className="object-cover" style={{ objectPosition: "-600px 0px" }} priority />

        <div className="relative z-10 px-[24px] sm:px-[32px] pt-[12vh] sm:pt-[15vh]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start gap-[18px] w-full max-w-[360px]"
          >
            <h1 className="font-playfair font-semibold text-black text-[38px] sm:text-[44px] leading-[44px] sm:leading-[50px] tracking-tight">
              Born from Nature.<br />Built for Indian<br />Skin.
            </h1>
            <p className="font-inter font-normal text-[#1A1A1A] text-[14px] sm:text-[15px] leading-[22px] sm:leading-[24px]">
              At Vstories, we blend time-tested herbs with<br className="hidden sm:block" />
              <span className="sm:hidden"> </span>modern formulation science to create<br className="hidden sm:block" />
              <span className="sm:hidden"> </span>skincare and haircare that actually works in<br className="hidden sm:block" />
              <span className="sm:hidden"> </span>Indian conditions from heat and humidity to<br className="hidden sm:block" />
              <span className="sm:hidden"> </span>pollution and stress.
            </p>
            <Link
              href="#our-story"
              className="inline-flex justify-center items-center font-inter font-medium transition-all hover:bg-[#2A523A] mt-3"
              style={{
                background: "#1D3B29",
                borderRadius: "6px",
                color: "#FFFFFF",
                fontSize: "14px",
                padding: "11px 18px",
              }}
            >
              Explore Our Story
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 2. WHAT WE STAND FOR ─────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#FCFAF4] py-10 sm:py-12">
        <div className="px-4 sm:px-6">
          <div className="flex flex-col items-center text-center gap-[16px] mb-[40px]">
            <div className="flex items-center gap-[12px]">
              <div className="relative w-6 h-6">
                <Image src="/images/icons/leafleft.png" alt="Leaf Left" fill className="object-contain" />
              </div>
              <span className="font-playfair font-normal text-[#000000]" style={{ fontSize: "16px", lineHeight: "21px" }}>
                Our Values
              </span>
              <div className="relative w-6 h-6">
                <Image src="/images/icons/leafright.png" alt="Leaf Right" fill className="object-contain" />
              </div>
            </div>
            <h2 className="font-playfair font-semibold text-[#2E2E2E]" style={{ fontSize: "32px", lineHeight: "43px" }}>
              What We Stand For
            </h2>
          </div>
          <div className="flex flex-col gap-[40px] max-w-md mx-auto">
            {VALUES.map((value) => (
              <MobileValueCard key={value.title} {...value} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. VISION & MISSION ──────────────────────────────── */}
      <section className="py-10 sm:py-12 bg-[#FCFAF4]">
        <div className="px-4 sm:px-6 flex flex-col gap-[24px] items-center">
          {/* Vision */}
          <div className="relative w-full aspect-[4/5] max-h-[460px] max-w-[400px] rounded-[12px] overflow-hidden bg-[#F9F6F1] shadow-sm">
            <Image src="/images/about/vission.png" alt="Our Vission" fill className="object-cover object-[-70px_top]" />
            <div className="absolute inset-0 flex flex-col gap-[10px] pl-[38%] pr-[5%] pt-[12%] pb-[6%] z-10">
              <h3 className="font-playfair font-semibold text-[#2E2E2E]" style={{ fontSize: "24px", lineHeight: "32px" }}>
                Our Vission
              </h3>
              <p className="font-inter font-normal text-[#2E2E2E]" style={{ fontSize: "11px", lineHeight: "15px" }}>
                To take nature-rooted Indian beauty from Keelakarai to the world, creating trusted skincare and haircare inspired by purity and care.<br />
                We envision a future where traditional herbal wisdom meets modern science to create products that are safe, effective, and made for everyday lifestyles. Through honest formulations and thoughtful innovation, V Stories aims to bring authentic Indian wellness to homes across the globe.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="relative w-full aspect-[4/5] max-h-[460px] max-w-[400px] rounded-[12px] overflow-hidden bg-[#778E6B] shadow-sm">
            <Image src="/images/about/mission.png" alt="Our Mission" fill className="object-cover object-[-100px_top]" />
            <div className="absolute inset-0 flex flex-col gap-[12px] pl-[38%] pr-[5%] pt-[10%] pb-[6%] z-10">
              <h3 className="font-playfair font-semibold text-[#FFFFFF]" style={{ fontSize: "28px", lineHeight: "34px" }}>
                Our Mission
              </h3>
              <p className="font-inter font-normal text-[#FFFFFF]" style={{ fontSize: "11px", lineHeight: "15px" }}>
                To craft honest herbal skincare and haircare for modern lifestyles, blending nature and science for safe, effective everyday wellness.<br />
                We are committed to creating gentle, high-quality products using carefully selected herbal ingredients and skin-friendly formulations. Every V Stories product is designed to nourish, protect, and support healthy skin and hair while staying rooted in transparency, sustainability, and authentic Indian care traditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. GROWING TOGETHER (timeline) ───────────────────── */}
      <section className="relative overflow-hidden bg-[#1D3B29] py-12 sm:py-16">
        <div className="w-full">
          {/* Header */}
          <div className="flex flex-col items-center text-center gap-3 mb-12 px-4 sm:px-6">
            <div className="flex items-center gap-2">
              <div className="relative w-6 h-6"><Image src="/images/icons/leafleft-w.png" alt="Leaf" fill className="object-contain" /></div>
              <span className="font-playfair font-normal text-lg text-white">Our Journey</span>
              <div className="relative w-6 h-6"><Image src="/images/icons/leafright-w.png" alt="Leaf" fill className="object-contain" /></div>
            </div>
            <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-white z-10 mb-1">
              Growing Together
            </h2>
            <p className="font-inter font-normal text-[15px] leading-[20px] text-white opacity-90">
              Natural, effective & made for indian skin & hair.
            </p>
          </div>

          {/* Horizontal Scroll Timeline */}
          <div className="w-full overflow-x-auto snap-x snap-mandatory pb-[20px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex w-max px-4 pt-[45px] pb-[40px]">
              {TIMELINE.map((item, index) => (
                <div key={item.year} className="relative w-[320px] flex-shrink-0 snap-center mx-2 flex flex-col items-center">

                  {/* Card Container */}
                  <div className="relative w-full flex flex-col h-full items-center">
                    {/* Golden Sphere */}
                    <div
                      className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85px] h-[85px] rounded-full flex items-center justify-center z-20 shadow-[0_8px_16px_rgba(0,0,0,0.15)]"
                      style={{ background: "linear-gradient(180deg, #CBA45A 0%, #FFEAC3 65%, #C39641 100%)" }}
                    >
                      <span className="font-inter font-normal text-[#1D3B29] text-[22px]">{item.year}</span>
                    </div>

                    {/* White Card */}
                    <div className="w-full h-full bg-[#F9F6F1] rounded-[24px] pt-[55px] pb-8 px-6 text-center relative z-10 min-h-[170px] shadow-sm">
                      <h4 className="font-inter font-bold text-[#1D3B29] text-[22px] leading-[28px] mb-3">
                        {item.title}
                      </h4>
                      <p className="font-inter font-normal text-[#1D3B29] text-[15px] leading-[21px] opacity-90 max-w-[220px] mx-auto">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Horizontal Line Segment */}
                  <div
                    className="absolute -bottom-[22px] -left-[8px] -right-[8px] h-[10px] z-0"
                    style={{ background: "linear-gradient(90deg, #CBA45A 0%, #FFEAC3 50%, #C39641 100%)" }}
                  />

                  {/* Timeline Dot with Gradient Border */}
                  <div
                    className="absolute -bottom-[20px] left-1/2 -translate-x-1/2 w-[16px] h-[16px] rounded-full p-[2px] z-20"
                    style={{ background: "linear-gradient(90deg, #CBA45A 0%, #FFEAC3 50%, #C39641 100%)" }}
                  >
                    <div className="w-full h-full rounded-full bg-[#1D3B29]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. FOUNDER'S STORY ───────────────────────────────── */}
      <section id="our-story" className="py-10 sm:py-12 bg-[#FCFAF4]">
        <div className="px-4 sm:px-6 max-w-lg mx-auto flex flex-col items-center text-center gap-6 pb-12">
          {/* Blob Image with Badge */}
          <div className="relative w-[300px] sm:w-[340px] aspect-[4/5] mx-auto mt-8 mb-6">
            {/* Organic Blob Image Container */}
            <div
              className="w-full h-full relative overflow-hidden"
              style={{ borderRadius: "45% 55% 45% 55% / 55% 45% 55% 45%" }}
            >
              <Image src="/images/about/founder.png" alt="Our Story" fill className="object-cover object-center" />
            </div>

            {/* Neo-brutalism Badge */}
            <div className="absolute -bottom-0 -right-4 w-[140px] h-[140px] sm:w-[150px] sm:h-[150px] z-20">
              {/* Offset outline shadow */}
              <div className="absolute inset-0 translate-x-[4px] translate-y-[4px] rounded-full border border-black" />
              {/* Main badge body */}
              <div className="absolute inset-0 bg-[#E5B767] rounded-full border border-black flex items-center justify-center p-3">
                <p className="font-inter font-medium text-black text-[15px] sm:text-[16px] leading-[19px] text-center tracking-tight">
                  Rooted in<br />Tradition,<br />Refined by<br />Science.
                </p>
              </div>
            </div>
          </div>

          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="relative w-[18px] h-[18px]"><Image src="/images/icons/leafleft.png" alt="Leaf" fill className="object-contain" /></div>
            <span className="font-playfair text-[#1D3B29] text-[15px] sm:text-[16px] tracking-wide">Founder&apos;s Message</span>
            <div className="relative w-[18px] h-[18px]"><Image src="/images/icons/leafright.png" alt="Leaf" fill className="object-contain" /></div>
          </div>

          {/* Title */}
          <h2 className="font-playfair font-semibold text-[#1D3B29] text-[32px] sm:text-[36px] leading-[40px] sm:leading-[44px] mt-2 mb-2">
            Our Story,
            <br />
            Our Promise.
          </h2>

          {/* Text Content */}
          <div className="font-inter font-normal text-[#333333] text-[15px] sm:text-[16px] leading-[24px] px-2 flex flex-col gap-5 w-full max-w-[360px] mt-4">
            <p className="font-semibold text-[#2E2E2E] text-[15.5px] sm:text-[17px] leading-[22px]">
              From Keelakarai to the Entire Globe - carrying the wisdom of nature beyond borders.
            </p>

            <p>
              V STORIES began with a personal experience.
            </p>

            <p>
              My late mother had sensitive skin and struggled with skin issues for years. The products she used often made things worse instead of better. That experience led me to question why skincare wasn&apos;t designed for real needs — for Indian skin, climate, and concerns.
            </p>

            <p>
              V STORIES was created to change that.
            </p>

            <p>
              We craft skincare and haircare that is rooted in nature, refined by science, and made for Indian conditions — gentle, effective, and honest.
            </p>

            <p className="font-semibold text-[#2E2E2E] text-[15.5px] sm:text-[17px] leading-[22px]">
              From Keelakarai to the Entire Globe, our mission is to share clean, conscious beauty inspired by tradition and trusted by modern lifestyles.
            </p>
          </div>

          {/* Button */}
          <Link
            href="/shop"
            className="inline-flex items-center justify-center font-inter font-medium hover:opacity-90 transition-all mt-6 px-8 h-[48px] bg-[#1D3B29] rounded-[8px] text-[16px]"
            style={{ color: "#FFFFFF" }}
          >
            Explore Our Products
          </Link>
        </div>
      </section>
    </div>
  );
}
