"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/* ─── Section header row ──────────────────────────────────── */
function SectionTag({ label, dark = false }: { label: string; dark?: boolean }) {
  const tc = dark ? "#FFFFFF" : "#000000";
  const leafSuffix = dark ? "-w" : "";
  return (
    <div className="flex items-center gap-2 lg:gap-3">
      <div className="relative w-5 h-5 lg:w-6 lg:h-6">
        <Image src={`/images/icons/leafleft${leafSuffix}.png`} alt="Leaf Left" fill className="object-contain" />
      </div>
      <span className="font-playfair font-normal text-lg leading-7 lg:text-2xl lg:leading-8" style={{ color: tc }}>
        {label}
      </span>
      <div className="relative w-5 h-5 lg:w-6 lg:h-6">
        <Image src={`/images/icons/leafright${leafSuffix}.png`} alt="Leaf Right" fill className="object-contain" />
      </div>
    </div>
  );
}

/* ─── Desktop value orb (Figma layout) ────────────────────── */
function ValueOrb({
  icon,
  title,
  desc,
  top,
  left,
  right,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  top: number;
  left?: string | number;
  right?: string | number;
}) {
  return (
    <div className="absolute flex flex-col items-center" style={{ width: 207, top, left, right }}>
      <div
        className="absolute"
        style={{
          width: 1,
          height: 1000,
          bottom: "calc(100% - 75px)",
          background: "rgba(29, 59, 41, 0.3)",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 0,
        }}
      />
      <div className="relative flex items-center justify-center" style={{ width: 140, height: 140 }}>
        <div className="absolute inset-0 rounded-full" style={{ background: "linear-gradient(135deg, #CBA45A 0%, #FFEAC3 50%, #C39641 100%)" }} />
        <div
          className="absolute flex items-center justify-center rounded-full"
          style={{ width: 100, height: 100, marginTop: -45, background: "#1D3B29", boxShadow: "0px 4px 15px rgba(0,0,0,0.2)" }}
        >
          {icon}
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 mt-4 text-center relative z-10">
        <span className="font-inter font-semibold text-[#2E2E2E]" style={{ fontSize: 20, lineHeight: "24px" }}>
          {title}
        </span>
        <span className="font-inter font-normal text-[#2E2E2E]" style={{ fontSize: 13, lineHeight: "17px", maxWidth: 170 }}>
          {desc}
        </span>
      </div>
    </div>
  );
}

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
    <div className="flex flex-col items-center text-center gap-3 px-2">
      <div className="relative flex items-center justify-center w-[100px] h-[100px]">
        <div className="absolute inset-0 rounded-full" style={{ background: "linear-gradient(135deg, #CBA45A 0%, #FFEAC3 50%, #C39641 100%)" }} />
        <div className="relative flex items-center justify-center w-[72px] h-[72px] rounded-full bg-[#1D3B29] shadow-md">
          <div className="relative w-8 h-8">
            <Image src={iconSrc} alt={title} fill className="object-contain" />
          </div>
        </div>
      </div>
      <span className="font-inter font-semibold text-[#2E2E2E] text-base leading-5">{title}</span>
      <span className="font-inter font-normal text-[#2E2E2E] text-xs leading-4 max-w-[150px]">{desc}</span>
    </div>
  );
}

/* ─── Desktop timeline item ───────────────────────────────── */
function TimelineItem({ year, title, desc }: { year: string; title: string; desc: string }) {
  return (
    <div className="relative flex flex-col items-center" style={{ width: 292 }}>
      <div
        className="flex items-center justify-center rounded-full relative z-20"
        style={{ width: 100, height: 100, background: "linear-gradient(231.77deg,#CBA45A 16.84%,#FFEAC3 54.23%,#C39641 91.63%)" }}
      >
        <span className="font-inter font-normal text-[#1D3B29]" style={{ fontSize: 24 }}>
          {year}
        </span>
      </div>
      <div
        className="flex flex-col items-center justify-center text-center relative z-10"
        style={{ width: 292, height: 177, marginTop: -50, background: "#F3EEE9", borderRadius: 24, padding: "30px 24px 0" }}
      >
        <span className="font-inter font-semibold text-[#1D3B29] mb-2" style={{ fontSize: 24, lineHeight: "29px" }}>
          {title}
        </span>
        <span className="font-inter font-normal text-[#1D3B29]" style={{ fontSize: 16, lineHeight: "19px", maxWidth: 195 }}>
          {desc}
        </span>
      </div>
      <div className="flex items-center justify-center rounded-full relative z-10" style={{ width: 16, height: 16, marginTop: 24, background: "linear-gradient(135deg, #CBA45A 0%, #FFEAC3 50%, #C39641 100%)" }}>
        <div style={{ width: 10, height: 10, background: "#1D3B29", borderRadius: "50%" }} />
      </div>
    </div>
  );
}

/* ─── Mobile timeline item ────────────────────────────────── */
function MobileTimelineItem({ year, title, desc, isLast }: { year: string; title: string; desc: string; isLast?: boolean }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center shrink-0">
        <div className="flex items-center justify-center w-[72px] h-[72px] rounded-full bg-gradient-to-br from-[#CBA45A] via-[#FFEAC3] to-[#C39641]">
          <span className="font-inter font-normal text-[#1D3B29] text-lg">{year}</span>
        </div>
        {!isLast && <div className="w-0.5 flex-1 min-h-[24px] bg-gradient-to-b from-[#CBA45A] via-[#FFEAC3] to-[#C39641] opacity-60 my-1" />}
      </div>
      <div className="flex-1 min-w-0 pb-6">
        <div className="bg-[#F3EEE9] rounded-2xl px-4 py-5 text-center">
          <span className="font-inter font-semibold text-[#1D3B29] text-lg leading-6 block mb-2">{title}</span>
          <span className="font-inter font-normal text-[#1D3B29] text-sm leading-5">{desc}</span>
        </div>
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


export default function AboutContent() {
  return (
    <div style={{ background: "#FCFAF4" }}>
      {/* ── 1. HERO ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#F5F5F5] min-h-[420px] sm:min-h-[500px] lg:min-h-0 lg:h-[781px]">
        <Image src="/images/about/hero-about.png" alt="About Hero" fill className="object-cover" priority />

        {/* Mobile hero */}
        <div className="lg:hidden relative z-10 px-4 sm:px-6 pt-20 pb-10 sm:pt-24 sm:pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-4 sm:gap-6 max-w-full"
          >
            <h1 className="font-playfair font-semibold text-[#000000] text-[28px] sm:text-4xl leading-tight sm:leading-[1.2] max-w-full">
              Born from Nature. Built for Indian Skin.
            </h1>
            <p className="font-inter font-normal text-[#000000] text-sm sm:text-base leading-relaxed max-w-full">
              At Vstories, we blend time-tested herbs with modern formulation science to create skincare and haircare that actually works in Indian conditions from heat and humidity to pollution and stress.
            </p>
            <Link
              href="#our-story"
              className="inline-flex items-center justify-center font-inter font-medium hover:opacity-90 transition-all w-full sm:w-auto sm:min-w-[183px] h-11 px-6 bg-[#1D3B29] rounded-lg text-sm sm:text-base"
              style={{ color: "#F7EDE2" }}
            >
              Explore Our Story
            </Link>
          </motion.div>
        </div>

        {/* Desktop hero — unchanged */}
        <div className="hidden lg:block absolute inset-0 w-full max-w-[1440px] mx-auto" style={{ left: 107, top: 0 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8 absolute"
            style={{ width: 848, top: 200, left: 0 }}
          >
            <h1
              className="font-playfair font-semibold text-[#000000]"
              style={{ fontSize: 64, lineHeight: "85px", maxWidth: 612, color: "#000000" }}
            >
              Born from Nature. Built for Indian Skin.
            </h1>
            <p className="font-inter font-normal text-[#000000]" style={{ fontSize: 24, lineHeight: "29px", width: 848, color: "#000000" }}>
              At Vstories, we blend time-tested herbs with modern formulation science to create skincare and haircare that actually works in Indian conditions from heat and humidity to pollution and stress.
            </p>
            <Link
              href="#our-story"
              className="inline-flex items-center justify-center font-inter font-medium text-[#F7EDE2] hover:opacity-90 transition-all"
              style={{ width: 183, height: 43, background: "#1D3B29", borderRadius: 8, fontSize: 16, color: "#F7EDE2" }}
            >
              Explore Our Story
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 2. WHAT WE STAND FOR ─────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#FCFAF4] py-10 sm:py-12 lg:pt-[60px] lg:pb-10">
        {/* Mobile values grid */}
        <div className="lg:hidden px-4 sm:px-6">
          <div className="flex flex-col items-center text-center gap-3 mb-8">
            <SectionTag label="Our Values" />
            <h2 className="font-playfair font-semibold text-[#1D3B29] text-2xl sm:text-3xl leading-tight">
              What We Stand For
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:gap-8 max-w-md mx-auto">
            {VALUES.map((value) => (
              <MobileValueCard key={value.title} {...value} />
            ))}
          </div>
        </div>

        {/* Desktop values — unchanged */}
        <div className="hidden lg:block relative w-full max-w-[1440px] mx-auto px-[100px]" style={{ height: 550 }}>
          <div className="absolute top-[40px] left-1/2 -translate-x-1/2 flex flex-col items-center text-center gap-4 w-max z-10">
            <SectionTag label="Our Values" />
            <h2 className="font-playfair font-semibold text-[#1D3B29]" style={{ fontSize: 48, lineHeight: "54px" }}>
              What We Stand For
            </h2>
          </div>

          <ValueOrb
            top={110}
            left="0%"
            icon={
              <div className="relative w-10 h-10">
                <Image src="/images/icons/natural.png" alt="Natural" fill className="object-contain" />
              </div>
            }
            title="100% Natural"
            desc="Every ingredient is sourced from nature, ensuring purity and effectiveness."
          />
          <ValueOrb
            top={280}
            left="20%"
            icon={
              <div className="relative w-10 h-10">
                <Image src="/images/icons/heart.png" alt="Love" fill className="object-contain" />
              </div>
            }
            title="Made with Love"
            desc="Each product is crafted with care and passion for holistic beauty."
          />
          <ValueOrb
            top={280}
            right="20%"
            icon={
              <div className="relative w-10 h-10">
                <Image src="/images/icons/community.png" alt="Community" fill className="object-contain" />
              </div>
            }
            title="Community Focused"
            desc="We believe in empowering our community through natural wellness."
          />
          <ValueOrb
            top={110}
            right="0%"
            icon={
              <div className="relative w-10 h-10">
                <Image src="/images/icons/Quality.png" alt="Quality" fill className="object-contain" />
              </div>
            }
            title="Quality First"
            desc="We never compromise on quality, using only the finest herbs and oils."
          />
        </div>
      </section>

      {/* ── 3. VISION & MISSION ──────────────────────────────── */}
      <section className="py-10 sm:py-12 lg:py-16 bg-[#FCFAF4]">
        {/* Mobile cards */}
        <div className="lg:hidden px-4 sm:px-6 flex flex-col gap-6 max-w-lg mx-auto">
          <div className="relative overflow-hidden rounded-xl bg-[#F9F6F1]">
            <div className="relative w-full h-44 sm:h-52">
              <Image src="/images/about/vission.png" alt="Our Vision" fill className="object-cover" />
            </div>
            <div className="px-4 sm:px-6 py-5 flex flex-col gap-3">
              <h3 className="font-playfair font-semibold text-[#2E2E2E] text-xl sm:text-2xl leading-snug">Our Vision</h3>
              <p className="font-inter font-normal text-[#2E2E2E] text-sm sm:text-base leading-relaxed">
                To take nature-rooted Indian beauty from Keelakarai to the world, creating trusted skincare and haircare inspired by purity and care.<br></br> We envision a future where traditional herbal wisdom meets modern science to create products that are safe, effective, and made for everyday lifestyles. Through honest formulations and thoughtful innovation, V Stories aims to bring authentic Indian wellness to homes across the globe.
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-[#778E6B]">
            <div className="relative w-full h-44 sm:h-52">
              <Image src="/images/about/mission.png" alt="Our Mission" fill className="object-cover" />
            </div>
            <div className="px-4 sm:px-6 py-5 flex flex-col gap-3">
              <h3 className="font-playfair font-semibold text-white text-xl sm:text-2xl leading-snug" style={{ color: "#FFFFFF" }}>Our Mission</h3>
              <p className="font-inter font-normal text-white text-sm sm:text-base leading-relaxed" style={{ color: "#FFFFFF" }}>
                To craft honest herbal skincare and haircare for modern lifestyles, blending nature and science for safe, effective everyday wellness.<br />
                We are committed to creating gentle, high-quality products using carefully selected herbal ingredients and skin-friendly formulations. Every V Stories product is designed to nourish, protect, and support healthy skin and hair while staying rooted in transparency, sustainability, and authentic Indian care traditions.
              </p>
            </div>
          </div>
        </div>

        {/* Desktop cards — unchanged */}
        <div className="hidden lg:block w-full max-w-[1440px] mx-auto" style={{ paddingLeft: 90 }}>
          <div className="flex gap-6" style={{ width: 1240, height: 338 }}>
            <div className="relative overflow-hidden" style={{ width: 608, height: 338, background: "#F9F6F1", borderRadius: 12, flexShrink: 0 }}>
              <Image src="/images/about/vission.png" alt="Our Vision" fill className="object-cover" />
              <div className="absolute flex flex-col justify-center" style={{ left: 234, top: 0, bottom: 0, width: 345, paddingRight: 20 }}>
                <h3 className="font-playfair font-semibold text-[#2E2E2E] mb-2" style={{ fontSize: 32, lineHeight: "43px" }}>
                  Our Vission
                </h3>
                <p className="font-inter font-normal text-[#2E2E2E]" style={{ fontSize: 14, lineHeight: "20px" }}>
                  To take nature-rooted Indian beauty from Keelakarai to the world, creating trusted skincare and haircare inspired by purity and care.
                  <br />
                  We envision a future where traditional herbal wisdom meets modern science to create products that are safe, effective, and made for everyday lifestyles. Through honest formulations and thoughtful innovation, V Stories aims to bring authentic Indian wellness to homes across the globe.
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden" style={{ width: 608, height: 338, background: "#778E6B", borderRadius: 12, flexShrink: 0 }}>
              <Image src="/images/about/mission.png" alt="Our Mission" fill className="object-cover" />
              <div className="absolute flex flex-col justify-center" style={{ left: 257, top: 0, bottom: 0, width: 324, paddingRight: 20 }}>
                <h3 className="font-playfair font-semibold text-white mb-2" style={{ fontSize: 32, lineHeight: "43px", color: "#FFFFFF" }}>
                  Our Mission
                </h3>
                <p className="font-inter font-normal text-white" style={{ fontSize: 14, lineHeight: "20px", color: "#FFFFFF" }}>
                  To craft honest herbal skincare and haircare for modern lifestyles, blending nature and science for safe, effective everyday wellness.
                  <br />
                  We are committed to creating gentle, high-quality products using carefully selected herbal ingredients and skin-friendly formulations. Every V Stories product is designed to nourish, protect, and support healthy skin and hair while staying rooted in transparency, sustainability, and authentic Indian care traditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. GROWING TOGETHER (timeline) ───────────────────── */}
      <section className="relative overflow-hidden bg-[#1D3B29] py-10 sm:py-12 lg:pt-[60px] lg:pb-[60px]">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[100px]">
          <div className="flex flex-col items-center text-center gap-3 sm:gap-4 mb-8 lg:mb-8">
            <SectionTag label="Our Journey" dark />
            <div className="font-playfair font-bold text-2xl sm:text-3xl lg:text-[48px] lg:leading-[64px] text-white z-10">
              Growing Together
            </div>
            <div className="font-inter font-normal text-sm sm:text-base lg:text-2xl lg:leading-[29px] max-w-full lg:max-w-[529px] text-white z-10 opacity-90">
              Natural, effective &amp; made for indian skin &amp; hair.
            </div>
          </div>

          {/* Mobile timeline */}
          <div className="lg:hidden max-w-md mx-auto">
            {TIMELINE.map((item, index) => (
              <motion.div key={item.year} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <MobileTimelineItem {...item} isLast={index === TIMELINE.length - 1} />
              </motion.div>
            ))}
          </div>

          {/* Desktop timeline — unchanged */}
          <div className="hidden lg:block relative mt-16">
            <div
              className="absolute left-0 w-full"
              style={{
                height: "12px",
                top: "259px",
                backgroundImage: "url('/images/about/our%20journey.png')",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                paddingBottom: 10,
              }}
            />
            <div className="flex justify-between gap-6">
              {TIMELINE.map((item) => (
                <motion.div key={item.year} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <TimelineItem {...item} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. FOUNDER'S STORY ───────────────────────────────── */}
      <section id="our-story" className="py-10 sm:py-12 lg:py-20 bg-[#FCFAF4]">
        {/* Mobile founder */}
        <div className="lg:hidden px-4 sm:px-6 max-w-lg mx-auto flex flex-col gap-6 sm:gap-8">
          <div className="relative w-full aspect-[4/5] max-h-[420px] sm:max-h-[480px] overflow-hidden rounded-lg">
            <Image src="/images/about/founder.png" alt="Founder" fill className="object-cover object-top" />
          </div>
          <div className="flex flex-col items-start">
            <SectionTag label="Founder's Message" />
            <h2 className="font-playfair font-semibold text-[#2E2E2E] mt-4 text-2xl sm:text-3xl leading-tight">
              Our Story,
              <br />
              Our Promise.
            </h2>
            <p className="font-inter font-normal text-[#2E2E2E] mt-5 text-sm sm:text-base leading-relaxed">
              <strong>From Keelakarai to the Entire Globe - carrying the wisdom of nature beyond borders.</strong>
              <br />
              <br />
              V STORIES began with a personal experience.
              <br />
              <br />
              My late mother had sensitive skin and struggled with skin issues for years. The products she used often made things worse instead of better.
              <br />
              That experience led me to question why skincare wasn&apos;t designed for real needs — for Indian skin, climate, and concerns.
              <br />
              <br />
              V STORIES was created to change that.
              <br />
              <br />
              We craft skincare and haircare that is rooted in nature, refined by science, and made for Indian conditions — gentle, effective, and honest.
              <br />
              <br />
              <strong>From Keelakarai to the Entire Globe, our mission is to share clean, conscious beauty inspired by tradition and trusted by modern lifestyles.</strong>
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center font-inter font-medium hover:opacity-90 transition-all mt-6 w-full sm:w-auto sm:min-w-[211px] h-11 px-6 bg-[#1D3B29] rounded-lg text-sm sm:text-base"
              style={{ color: "#FFFFFF" }}
            >
              Explore Our Products
            </Link>
          </div>
        </div>

        {/* Desktop founder — unchanged */}
        <div className="hidden lg:block w-full max-w-[1440px] mx-auto" style={{ paddingLeft: 97, paddingRight: 97 }}>
          <div className="relative w-[1225px] h-[617px] mx-auto">
            <div className="absolute" style={{ left: 0, top: 0, width: 491, height: 589 }}>
              <div className="absolute overflow-hidden" style={{ width: 489, height: 584, left: 0, top: 15 }}>
                <Image src="/images/about/founder.png" alt="Founder" fill className="object-cover" />
              </div>
            </div>

            <div className="absolute flex flex-col items-start" style={{ left: 533, top: 47 }}>
              <SectionTag label="Founder's Message" />
              <h2 className="font-playfair font-semibold text-[#2E2E2E] mt-[23px]" style={{ fontSize: 48, lineHeight: "58px", width: 294 }}>
                Our Story,
                <br />
                Our Promise.
              </h2>
              <p className="font-inter font-normal text-[#2E2E2E] mt-[28px]" style={{ fontSize: 16, lineHeight: "19px", width: 692 }}>
                <strong>From Keelakarai to the Entire Globe - carrying the wisdom of nature beyond borders.</strong>
                <br />
                <br />
                V STORIES began with a personal experience.
                <br />
                <br />
                My late mother had sensitive skin and struggled with skin issues for years. The products she used often made things worse instead of better.
                <br />
                That experience led me to question why skincare wasn&apos;t designed for real needs — for Indian skin, climate, and concerns.
                <br />
                <br />
                V STORIES was created to change that.
                <br />
                <br />
                We craft skincare and haircare that is rooted in nature, refined by science, and made for Indian conditions — gentle, effective, and honest.
                <br />
                <br />
                <strong>From Keelakarai to the Entire Globe, our mission is to share clean, conscious beauty inspired by tradition and trusted by modern lifestyles.</strong>
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center font-inter font-medium hover:opacity-90 transition-all mt-[24px]"
                style={{ width: 211, height: 43, background: "#1D3B29", borderRadius: 8, fontSize: 16, color: "#FFFFFF" }}
              >
                Explore Our Products
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
