"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Leaf, Heart, Award, Users } from "lucide-react";

/* ─── Shared leaf SVG ─────────────────────────────────────── */
function LeafSVG({ color = "#1D3B29", flipped = false }: { color?: string; flipped?: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={color}
      style={{ transform: flipped ? "matrix(-0.95,-0.32,-0.32,0.95,0,0)" : "rotate(-18.46deg)" }}
      xmlns="http://www.w3.org/2000/svg">
      <path d="M2.67806 0.393273C3.33698 0.746016 3.86524 1.26031 4.27352 1.86988C4.93665 2.86007 5.32531 4.08777 5.64054 5.36694C6.27084 7.92543 6.64437 10.715 7.77326 12.1466C8.83291 13.4904 10.0172 14.1032 11.144 14.2227C11.6287 14.2742 12.107 14.2325 12.5642 14.1104C12.5917 10.6285 11.032 6.71738 8.37049 4.61054C11.4761 6.14733 13.7451 9.27599 14.257 13.1784C14.0091 13.4058 14.1242 13.3167 14.2348 13.2224C15.98 11.7396 16.8379 8.81822 14.9913 5.57157C14.1428 4.07991 12.3091 2.18967 9.91609 1.04988C7.84587 0.0639353 5.3733 -0.379387 2.67804 0.393385L2.67806 0.393273Z"/>
    </svg>
  );
}

/* ─── Section tag ─────────────────────────────────────────── */
function SectionTag({ label, dark = false }: { label: string; dark?: boolean }) {
  const c = dark ? "#F7EDE2" : "#1D3B29";
  const tc = dark ? "#F7EDE2" : "#000000";
  return (
    <div className="flex items-end gap-4">
      <LeafSVG color={c} />
      <span className="font-playfair font-normal text-xl md:text-2xl" style={{ color: tc }}>{label}</span>
      <LeafSVG color={c} flipped />
    </div>
  );
}

/* ─── Value card (responsive, no fixed positioning) ───────── */
function ValueCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center text-center gap-4 px-4">
      <div className="relative flex items-center justify-center w-32 h-32 md:w-36 md:h-36 rounded-full"
        style={{ background: "linear-gradient(231.77deg,#CBA45A 16.84%,#FFEAC3 54.23%,#C39641 91.63%)" }}>
        <div className="flex items-center justify-center rounded-full w-24 h-24"
          style={{ background: "#1D3B29", boxShadow: "0px 4px 20px rgba(0,0,0,0.25)" }}>
          {icon}
        </div>
      </div>
      <span className="font-inter font-semibold text-[#2E2E2E] text-lg md:text-2xl">{title}</span>
      <span className="font-inter font-normal text-[#2E2E2E] text-sm md:text-base max-w-[200px]">{desc}</span>
    </div>
  );
}

/* ─── Timeline item ───────────────────────────────────────── */
function TimelineItem({ year, title, desc }: { year: string; title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-center rounded-full w-20 h-20 md:w-24 md:h-24 flex-shrink-0"
        style={{ background: "linear-gradient(231.77deg,#CBA45A 16.84%,#FFEAC3 54.23%,#C39641 91.63%)" }}>
        <span className="font-inter font-normal text-[#1D3B29] text-lg md:text-2xl">{year}</span>
      </div>
      <div className="flex flex-col items-center justify-center text-center rounded-3xl p-6"
        style={{ background: "#F3EEE9", minHeight: 140 }}>
        <span className="font-inter font-semibold text-[#1D3B29] mb-2 text-base md:text-xl">{title}</span>
        <span className="font-inter font-normal text-[#1D3B29] text-sm md:text-base">{desc}</span>
      </div>
      <div className="flex items-center justify-center rounded-full w-6 h-6"
        style={{ background: "#E8BF72" }}>
        <div className="w-4 h-4 rounded-full" style={{ background: "#1D3B29" }} />
      </div>
    </div>
  );
}

export default function AboutContent() {
  return (
    <div style={{ background: "#FCFAF4" }}>

      {/* ── 1. HERO ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[60vh] md:min-h-[781px]" style={{ background: "#F5F5F5" }}>
        <Image src="/images/hero-main.png" alt="About Hero" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center">
          <div className="w-full max-w-[1440px] mx-auto px-6 md:px-[100px]">
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              className="flex flex-col gap-6 max-w-2xl"
            >
              <h1 className="font-playfair font-semibold text-black text-3xl md:text-5xl lg:text-[64px] leading-tight md:leading-[85px]">
                Born from Nature. Built for Indian Skin.
              </h1>
              <p className="font-inter font-normal text-black text-base md:text-xl lg:text-2xl">
                At Vstories, we blend time-tested herbs with modern formulation science to create skincare and haircare that actually works in Indian conditions.
              </p>
              <Link href="#our-story"
                className="inline-flex items-center justify-center font-inter font-medium text-[#F7EDE2] hover:opacity-90 transition-all rounded-lg self-start"
                style={{ padding: "12px 24px", background: "#1D3B29", fontSize: 16 }}>
                Explore Our Story
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. WHAT WE STAND FOR ─────────────────────────────── */}
      <section className="py-16 md:py-20" style={{ background: "#FCFAF4" }}>
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-[100px]">
          <div className="flex flex-col items-center text-center gap-4 mb-12">
            <SectionTag label="Our Values" />
            <h2 className="font-playfair font-semibold text-[#2E2E2E] text-2xl md:text-4xl lg:text-[48px]">
              What We Stand For
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            <ValueCard icon={<Leaf className="w-8 h-8 text-[#F4F0EC]" />} title="100% Natural" desc="Every ingredient is sourced from nature, ensuring purity and effectiveness." />
            <ValueCard icon={<Heart className="w-8 h-8 text-[#F4F0EC]" />} title="Made with Love" desc="Each product is crafted with care and passion for holistic beauty." />
            <ValueCard icon={<Users className="w-8 h-8 text-[#F4F0EC]" />} title="Community Focused" desc="We believe in empowering our community through natural wellness." />
            <ValueCard icon={<Award className="w-8 h-8 text-[#F4F0EC]" />} title="Quality First" desc="We never compromise on quality, using only the finest herbs and oils." />
          </div>
        </div>
      </section>

      {/* ── 3. VISION & MISSION ──────────────────────────────── */}
      <section className="py-12 md:py-16" style={{ background: "#FCFAF4" }}>
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-[90px]">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Vision card */}
            <div className="relative overflow-hidden rounded-xl flex-1 min-h-[300px] md:min-h-[338px]"
              style={{ background: "#F9F6F1" }}>
              <Image src="/images/banner-hair.png" alt="Our Vision" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex flex-col gap-4 justify-center p-6 md:pl-[40%]">
                <h3 className="font-playfair font-semibold text-white text-2xl md:text-[32px]">Our Vision</h3>
                <p className="font-inter font-normal text-white text-sm md:text-base leading-relaxed">
                  To take nature-rooted Indian beauty from Keelakarai to the world, creating trusted skincare and haircare inspired by purity and care.
                </p>
              </div>
            </div>
            {/* Mission card */}
            <div className="relative overflow-hidden rounded-xl flex-1 min-h-[300px] md:min-h-[338px]"
              style={{ background: "#778E6B" }}>
              <Image src="/images/banner-skin.png" alt="Our Mission" fill className="object-cover" style={{ transform: "scaleX(-1)" }} />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex flex-col gap-4 justify-center p-6 md:pl-[40%]">
                <h3 className="font-playfair font-semibold text-white text-2xl md:text-[32px]">Our Mission</h3>
                <p className="font-inter font-normal text-white text-sm md:text-base leading-relaxed">
                  To craft honest herbal skincare and haircare for modern lifestyles, blending nature and science for safe, effective everyday wellness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. GROWING TOGETHER (timeline) ───────────────────── */}
      <section className="relative py-16 md:py-20 overflow-hidden" style={{ background: "#1D3B29" }}>
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-[100px]">
          <div className="flex flex-col items-center text-center gap-4 mb-12">
            <SectionTag label="Our Journey" dark />
            <h2 className="font-playfair font-semibold text-[#F4F0EC] text-2xl md:text-4xl lg:text-[48px]">Growing Together</h2>
            <p className="font-inter font-normal text-[#F4F0EC] text-base md:text-2xl max-w-xl">
              Natural, effective &amp; made for indian skin &amp; hair.
            </p>
          </div>
          {/* Timeline – horizontal on desktop, vertical on mobile */}
          <div className="relative">
            {/* golden rail – horizontal desktop */}
            <div className="hidden md:block absolute bottom-[28px] left-0 right-0 h-3 rounded-full"
              style={{ background: "linear-gradient(231.77deg,#CBA45A 16.84%,#FFEAC3 54.23%,#C39641 91.63%)" }} />
            {/* vertical rail – mobile */}
            <div className="md:hidden absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 rounded-full"
              style={{ background: "linear-gradient(180deg,#CBA45A 0%,#FFEAC3 50%,#C39641 100%)" }} />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
              {[
                { year: "2021", title: "The Beginning", desc: "V Stories was born from a passion for ancient herbal remedies." },
                { year: "2022", title: "First Products", desc: "Launched our signature Herbal Hair Oil, now a bestseller." },
                { year: "2023", title: "Growing Family", desc: "Expanded to skin care and built a community of 10,000+ customers." },
                { year: "2024", title: "New Horizons", desc: "Introducing new product lines and B2B partnerships." },
              ].map((item) => (
                <motion.div key={item.year} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <TimelineItem {...item} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. FOUNDER'S STORY ───────────────────────────────── */}
      <section id="our-story" className="py-16 md:py-20" style={{ background: "#FCFAF4" }}>
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-[97px]">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            {/* Left image with badge */}
            <div className="relative flex-shrink-0 w-full lg:w-[420px]">
              <div className="relative w-full aspect-[4/5] rounded-[150px_150px_150px_30px] overflow-hidden">
                <Image src="/images/founder.png" alt="Founder" fill className="object-cover" />
              </div>
              {/* Gold badge */}
              <div className="absolute -bottom-6 -right-4 md:right-4 w-36 h-40 md:w-44 md:h-52">
                <div className="absolute inset-0 rounded-full" style={{ background: "#E8BF72" }} />
                <div className="absolute inset-0 rounded-full border border-black" />
                <p className="absolute inset-0 flex items-center justify-center font-inter font-medium text-black text-center text-xs md:text-base px-4">
                  Rooted in Tradition,<br />Refined by Science.
                </p>
              </div>
            </div>

            {/* Right text */}
            <div className="flex flex-col gap-6 flex-1 pt-4 lg:pt-0">
              <SectionTag label="Founder's Message" />
              <h2 className="font-playfair font-semibold text-[#2E2E2E] text-2xl md:text-4xl lg:text-[48px] leading-tight">
                Our Story,<br />Our Promise.
              </h2>
              <div className="font-inter font-normal text-[#2E2E2E] text-sm md:text-base leading-relaxed space-y-4">
                <p><strong>From Keelakarai to the Entire Globe - carrying the wisdom of nature beyond borders.</strong></p>
                <p>V STORIES began with a personal experience. My late mother had sensitive skin and struggled with skin issues for years. The products she used often made things worse instead of better.</p>
                <p>That experience led me to question why skincare wasn't designed for real needs — for Indian skin, climate, and concerns.</p>
                <p>V STORIES was created to change that. We craft skincare and haircare that is rooted in nature, refined by science, and made for Indian conditions — gentle, effective, and honest.</p>
                <p><strong>From Keelakarai to the Entire Globe, our mission is to share clean, conscious beauty inspired by tradition and trusted by modern lifestyles.</strong></p>
              </div>
              <Link href="/shop"
                className="inline-flex items-center justify-center font-inter font-medium text-[#F7EDE2] hover:opacity-90 transition-all rounded-lg self-start"
                style={{ padding: "12px 24px", background: "#1D3B29", fontSize: 16 }}>
                Explore Our Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

