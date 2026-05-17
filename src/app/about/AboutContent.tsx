"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Leaf, Heart, Award, Users } from "lucide-react";

/* ─── Section header row ──────────────────────────────────── */
function SectionTag({ label, dark = false }: { label: string; dark?: boolean }) {
  const tc = dark ? "#FFFFFF" : "#000000";
  const leafSuffix = dark ? "-w" : "";
  return (
    <div className="flex items-center gap-6">
      <div className="relative w-6 h-6">
        <Image src={`/images/icons/leafleft${leafSuffix}.png`} alt="Leaf Left" fill className="object-contain" />
      </div>
      <span className="font-playfair font-normal" style={{ fontSize: 24, lineHeight: "32px", color: tc }}>{label}</span>
      <div className="relative w-6 h-6">
        <Image src={`/images/icons/leafright${leafSuffix}.png`} alt="Leaf Right" fill className="object-contain" />
      </div>
    </div>
  );
}

/* ─── Value orb ───────────────────────────────────────────── */
function ValueOrb({ icon, title, desc, lineH }: { icon: React.ReactNode; title: string; desc: string; lineH: number }) {
  return (
    <div className="flex flex-col items-center" style={{ width: 207 }}>
      {/* vertical line connecting to banner */}
      <div className="relative" style={{ width: 1, height: lineH, zIndex: 0 }}>
        <div className="absolute top-0" style={{ width: 1, height: lineH + 104, marginTop: -204, background: "#1D3B29" }} />
      </div>
      {/* gold ring + green circle */}
      <div className="relative flex items-center justify-center" style={{ width: 150, height: 150, marginTop: -99 }}>
        <div className="absolute inset-0 rounded-full" style={{ background: "linear-gradient(231.77deg,#CBA45A 16.84%,#FFEAC3 54.23%,#C39641 91.63%)" }} />
        <div className="absolute flex items-center justify-center rounded-full" style={{ marginTop: -49, width: 100, height: 100, background: "#1D3B29", boxShadow: "0px 4px 20px rgba(0,0,0,0.25)" }}>
          {icon}
        </div>
      </div>
      {/* label */}
      <div className="flex flex-col items-center gap-3 mt-4 text-center">
        <span className="font-inter font-semibold text-[#2E2E2E]" style={{ fontSize: 24, lineHeight: "29px" }}>{title}</span>
        <span className="font-inter font-normal text-[#2E2E2E]" style={{ fontSize: 16, lineHeight: "19px" }}>{desc}</span>
      </div>
    </div>
  );
}

/* ─── Timeline item ───────────────────────────────────────── */
function TimelineItem({ year, title, desc }: { year: string; title: string; desc: string }) {
  return (
    <div className="relative flex flex-col items-center" style={{ width: 292 }}>
      {/* year orb */}
      <div className="flex items-center justify-center rounded-full" style={{ width: 100, height: 100, background: "linear-gradient(231.77deg,#CBA45A 16.84%,#FFEAC3 54.23%,#C39641 91.63%)" }}>
        <span className="font-inter font-normal text-[#1D3B29]" style={{ fontSize: 24 }}>{year}</span>
      </div>
      {/* card */}
      <div className="flex flex-col items-center justify-center text-center mt-4 relative z-10" style={{ width: 292, height: 177, background: "#F3EEE9", borderRadius: 24, padding: "0 24px" }}>
        <span className="font-inter font-semibold text-[#1D3B29] mb-2" style={{ fontSize: 24, lineHeight: "29px" }}>{title}</span>
        <span className="font-inter font-normal text-[#1D3B29]" style={{ fontSize: 16, lineHeight: "19px", maxWidth: 195 }}>{desc}</span>
      </div>
      {/* node dot */}
      <div className="flex items-center justify-center rounded-full mt-2" style={{ width: 24, height: 24, background: "#E8BF72" }}>
        <div style={{ width: 16, height: 16, background: "#1D3B29", borderRadius: "50%" }} />
      </div>
    </div>
  );
}

export default function AboutContent() {
  return (
    <div style={{ background: "#FCFAF4" }}>

      {/* ── 1. HERO ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ height: 781, background: "#F5F5F5" }}>
        <Image src="/images/about/hero-about.png" alt="About Hero" fill className="object-cover" priority />
        <div className="absolute inset-0 w-full max-w-[1440px] mx-auto" style={{ left: 107, top: 0 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="flex flex-col gap-8 absolute" style={{ width: 848, top: 200, left: 0 }}
          >
            <h1 className="font-playfair font-semibold text-[#000000]" style={{ fontSize: 64, lineHeight: "85px", maxWidth: 612, color: '#000000' }}>
              Born from Nature. Built for Indian Skin.
            </h1>
            <p className="font-inter font-normal text-[#000000]" style={{ fontSize: 24, lineHeight: "29px", width: 848, color: '#000000' }}>
              At Vstories, we blend time-tested herbs with modern formulation science to create skincare and haircare that actually works in Indian conditions — from heat and humidity to pollution and stress.
            </p>
            <Link href="#our-story" className="inline-flex items-center justify-center font-inter font-medium text-[#F7EDE2] hover:opacity-90 transition-all"
              style={{ width: 183, height: 43, background: "#1D3B29", borderRadius: 8, fontSize: 16, color: '#F7EDE2' }}>
              Explore Our Story
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 2. WHAT WE STAND FOR (hanging values) ────────────── */}
      <section className="relative overflow-hidden" style={{ background: "#FCFAF4", paddingTop: 60, paddingBottom: 80 }}>
        <div className="w-full max-w-[1440px] mx-auto px-[100px]">
          {/* header */}
          <div className="flex flex-col items-center text-center gap-4 mb-8 mx-auto w-max">
            <SectionTag label="Our Values" />
            <h2 className="font-playfair font-semibold text-[#2E2E2E]" style={{ fontSize: 48, lineHeight: "72px" }}>
              What We Stand For
            </h2>
          </div>

          {/* 4 hanging orbs — absolute positions to match Figma exactly */}
          <div className="relative w-full" style={{ height: 550 }}>
            {/* col 1 */}
            <div className="absolute top-0 left-0">
              <ValueOrb
                lineH={180}
                icon={<div className="relative w-12 h-12"><Image src="/images/icons/natural.png" alt="Natural" fill className="object-contain" /></div>}
                title="100% Natural"
                desc="Every ingredient is sourced from nature, ensuring purity and effectiveness."
              />
            </div>
            {/* col 2 */}
            <div className="absolute top-0" style={{ left: 280 }}>
              <ValueOrb
                lineH={300}
                icon={<div className="relative w-12 h-12"><Image src="/images/icons/heart.png" alt="Love" fill className="object-contain" /></div>}
                title="Made with Love"
                desc="Each product is crafted with care and passion for holistic beauty."
              />
            </div>
            {/* col 3 */}
            <div className="absolute top-0" style={{ right: 280 }}>
              <ValueOrb
                lineH={300}
                icon={<div className="relative w-12 h-12"><Image src="/images/icons/community.png" alt="Community" fill className="object-contain" /></div>}
                title="Community Focused"
                desc="We believe in empowering our community through natural wellness."
              />
            </div>
            {/* col 4 */}
            <div className="absolute top-0 right-0">
              <ValueOrb
                lineH={180}
                icon={<div className="relative w-12 h-12"><Image src="/images/icons/Quality.png" alt="Quality" fill className="object-contain" /></div>}
                title="Quality First"
                desc="We never compromise on quality, using only the finest herbs and oils."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. VISION & MISSION ──────────────────────────────── */}
      <section className="py-16" style={{ background: "#FCFAF4" }}>
        <div className="w-full max-w-[1440px] mx-auto" style={{ paddingLeft: 90 }}>
          <div className="flex gap-6" style={{ width: 1240, height: 338 }}>
            {/* Vision card */}
            <div className="relative overflow-hidden" style={{ width: 608, height: 338, background: "#F9F6F1", borderRadius: 12, flexShrink: 0 }}>
              <Image src="/images/about/vission.png" alt="Our Vision" fill className="object-cover" />
              <div className="absolute flex flex-col gap-4" style={{ left: 234, top: 35, width: 345 }}>
                <h3 className="font-playfair font-semibold text-[#2E2E2E]" style={{ fontSize: 32, lineHeight: "43px" }}>Our Vision</h3>
                <p className="font-inter font-normal text-[#2E2E2E]" style={{ fontSize: 16, lineHeight: "19px" }}>
                  To take nature-rooted Indian beauty from Keelakarai to the world, creating trusted skincare and haircare inspired by purity and care. We envision a future where traditional herbal wisdom meets modern science to create products that are safe, effective, and made for everyday lifestyles. Through honest formulations and thoughtful innovation, V Stories aims to bring authentic Indian wellness to homes across the globe.
                </p>
              </div>
            </div>
            {/* Mission card */}
            <div className="relative overflow-hidden" style={{ width: 608, height: 338, background: "#778E6B", borderRadius: 12, flexShrink: 0 }}>
              <Image src="/images/about/mission.png" alt="Our Mission" fill className="object-cover" />
              <div className="absolute flex flex-col gap-4" style={{ left: 257, top: 16, width: 324 }}>
                <h3 className="font-playfair font-semibold text-white" style={{ fontSize: 32, lineHeight: "43px" }}>Our Mission</h3>
                <p className="font-inter font-normal text-white" style={{ fontSize: 16, lineHeight: "19px" }}>
                  To craft honest herbal skincare and haircare for modern lifestyles, blending nature and science for safe, effective everyday wellness. We are committed to creating gentle, high-quality products using carefully selected herbal ingredients and skin-friendly formulations. Every V Stories product is designed to nourish, protect, and support healthy skin and hair while staying rooted in transparency, sustainability, and authentic Indian care traditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. GROWING TOGETHER (timeline) ───────────────────── */}
      <section className="relative overflow-hidden" style={{ background: "#1D3B29", minHeight: 645, paddingTop: 60, paddingBottom: 60 }}>
        <div className="w-full max-w-[1440px] mx-auto px-[100px]">
          {/* header */}
          <div className="flex flex-col items-center text-center gap-4 mb-8">
            <SectionTag label="Our Journey" dark />
            <div className="font-playfair font-bold" style={{ fontSize: 48, lineHeight: "64px", color: "#FFFFFF", zIndex: 10 }}>
              Growing Together
            </div>
            <div className="font-inter font-normal" style={{ fontSize: 24, lineHeight: "29px", maxWidth: 529, color: "#FFFFFF", zIndex: 10, opacity: 0.9 }}>
              Natural, effective &amp; made for indian skin &amp; hair.
            </div>
          </div>

          {/* timeline row */}
          <div className="relative mt-16">
            {/* golden rail */}
            <div className="absolute bottom-[-20px] left-0 w-full h-3 rounded-full" style={{ background: "linear-gradient(231.77deg,#CBA45A 16.84%,#FFEAC3 54.23%,#C39641 91.63%)" }} />
            <div className="flex justify-between gap-6">
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
      <section id="our-story" className="py-20" style={{ background: "#FCFAF4" }}>
        <div className="w-full max-w-[1440px] mx-auto" style={{ paddingLeft: 97, paddingRight: 97 }}>
          <div className="relative w-[1225px] h-[617px] mx-auto">
            {/* left image container */}
            <div className="absolute" style={{ left: 0, top: 0, width: 491, height: 589 }}>
              <div className="absolute overflow-hidden"
                style={{ width: 489, height: 584, left: 0, top: 15 }}>
                <Image src="/images/about/founder.png" alt="Founder" fill className="object-cover" />
              </div>
            </div>


            {/* right text content */}
            <div className="absolute flex flex-col items-start" style={{ left: 533, top: 47 }}>
              <SectionTag label="Founder's Message" />
              <h2 className="font-playfair font-semibold text-[#2E2E2E] mt-[23px]" style={{ fontSize: 48, lineHeight: "58px", width: 294 }}>
                Our Story,<br />Our Promise.
              </h2>
              <p className="font-inter font-normal text-[#2E2E2E] mt-[28px]" style={{ fontSize: 16, lineHeight: "19px", width: 692 }}>
                <strong>From Keelakarai to the Entire Globe - carrying the wisdom of nature beyond borders.</strong><br /><br />
                V STORIES began with a personal experience.<br /><br />
                My late mother had sensitive skin and struggled with skin issues for years. The products she used often made things worse instead of better.<br />
                That experience led me to question why skincare wasn't designed for real needs — for Indian skin, climate, and concerns.<br /><br />
                V STORIES was created to change that.<br /><br />
                We craft skincare and haircare that is rooted in nature, refined by science, and made for Indian conditions — gentle, effective, and honest.<br /><br />
                <strong>From Keelakarai to the Entire Globe, our mission is to share clean, conscious beauty inspired by tradition and trusted by modern lifestyles.</strong>
              </p>
              <Link href="/shop" className="inline-flex items-center justify-center font-inter font-medium hover:opacity-90 transition-all mt-[24px]"
                style={{ width: 211, height: 43, background: "#1D3B29", borderRadius: 8, fontSize: 16, color: "#FFFFFF" }}>
                Explore Our Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. TRUST BAR ─────────────────────────────────────── */}
      <div style={{ background: "#F7F3EF", height: 185, display: "flex", alignItems: "center" }}>
        <div className="w-full max-w-[1440px] mx-auto px-[100px]">
          <div className="flex items-center justify-around">
            {[
              {
                title: "Free Shipping",
                desc: "On orders above ₹799",
                icon: "/images/icons/shippings.png",
              },
              {
                title: "Cash On Delivery",
                desc: "₹25 Per Order",
                icon: "/images/icons/savings.png",
              },
              {
                title: "Secure Payments",
                desc: "Razor Pay Payment",
                icon: "/images/icons/payments.png",
              },
            ].map((f) => (
              <div key={f.title} className="flex flex-col items-center gap-3" style={{ width: 216 }}>
                <div className="relative w-10 h-10">
                  <Image src={f.icon} alt={f.title} fill className="object-contain" />
                </div>
                <h4 className="font-playfair font-semibold text-[#2E2E2E] text-center" style={{ fontSize: 24, lineHeight: "32px" }}>{f.title}</h4>
                <p className="font-inter font-normal text-[#2E2E2E] text-center" style={{ fontSize: 16, lineHeight: "19px" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
