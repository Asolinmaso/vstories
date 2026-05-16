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

/* ─── Section header row ──────────────────────────────────── */
function SectionTag({ label, dark = false }: { label: string; dark?: boolean }) {
  const c = dark ? "#F7EDE2" : "#1D3B29";
  const tc = dark ? "#F7EDE2" : "#000000";
  return (
    <div className="flex items-end gap-6">
      <LeafSVG color={c} />
      <span className="font-playfair font-normal" style={{ fontSize: 24, lineHeight: "32px", color: tc }}>{label}</span>
      <LeafSVG color={c} flipped />
    </div>
  );
}

/* ─── Value orb ───────────────────────────────────────────── */
function ValueOrb({ icon, title, desc, lineH }: { icon: React.ReactNode; title: string; desc: string; lineH: number }) {
  return (
    <div className="flex flex-col items-center" style={{ width: 207 }}>
      {/* vertical line connecting to banner */}
      <div className="relative" style={{ width: 1, height: lineH, zIndex: 0 }}>
        <div className="absolute top-0" style={{ width: 1, height: lineH + 204, marginTop: -204, background: "#1D3B29" }} />
      </div>
      {/* gold ring + green circle */}
      <div className="relative flex items-center justify-center" style={{ width: 150, height: 150, marginTop: 8 }}>
        <div className="absolute inset-0 rounded-full" style={{ background: "linear-gradient(231.77deg,#CBA45A 16.84%,#FFEAC3 54.23%,#C39641 91.63%)" }} />
        <div className="absolute flex items-center justify-center rounded-full" style={{ width: 100, height: 100, background: "#1D3B29", boxShadow: "0px 4px 20px rgba(0,0,0,0.25)" }}>
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
        <Image src="/images/hero-main.png" alt="About Hero" fill className="object-cover" priority />
        <div className="absolute inset-0 w-full max-w-[1440px] mx-auto" style={{ left: 107, top: 0 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="flex flex-col gap-8 absolute" style={{ width: 848, top: 200, left: 0 }}
          >
            <h1 className="font-playfair font-semibold text-black" style={{ fontSize: 64, lineHeight: "85px", maxWidth: 612 }}>
              Born from Nature. Built for Indian Skin.
            </h1>
            <p className="font-inter font-normal text-black" style={{ fontSize: 24, lineHeight: "29px", width: 848 }}>
              At Vstories, we blend time-tested herbs with modern formulation science to create skincare and haircare that actually works in Indian conditions — from heat and humidity to pollution and stress.
            </p>
            <Link href="#our-story" className="inline-flex items-center justify-center font-inter font-medium text-[#F7EDE2] hover:opacity-90 transition-all"
              style={{ width: 183, height: 43, background: "#1D3B29", borderRadius: 8, fontSize: 16 }}>
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
            <h2 className="font-playfair font-semibold text-[#2E2E2E]" style={{ fontSize: 48, lineHeight: "64px" }}>
              What We Stand For
            </h2>
          </div>

          {/* 4 hanging orbs — absolute positions to match Figma exactly */}
          <div className="relative w-full" style={{ height: 550 }}>
            {/* col 1 */}
            <div className="absolute top-0 left-0">
              <ValueOrb lineH={235} icon={<Leaf className="w-8 h-8 text-[#F4F0EC]" />} title="100% Natural" desc="Every ingredient is sourced from nature, ensuring purity and effectiveness." />
            </div>
            {/* col 2 */}
            <div className="absolute top-0" style={{ left: 220 }}>
              <ValueOrb lineH={345} icon={<Heart className="w-8 h-8 text-[#F4F0EC]" />} title="Made with Love" desc="Each product is crafted with care and passion for holistic beauty." />
            </div>
            {/* col 3 */}
            <div className="absolute top-0" style={{ left: 798 }}>
              <ValueOrb lineH={345} icon={<Users className="w-8 h-8 text-[#F4F0EC]" />} title="Community Focused" desc="We believe in empowering our community through natural wellness." />
            </div>
            {/* col 4 */}
            <div className="absolute top-0 right-0">
              <ValueOrb lineH={217} icon={<Award className="w-8 h-8 text-[#F4F0EC]" />} title="Quality First" desc="We never compromise on quality, using only the finest herbs and oils." />
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
              <Image src="/images/banner-hair.png" alt="Our Vision" fill className="object-cover" />
              <div className="absolute flex flex-col gap-4" style={{ left: 234, top: 35, width: 345 }}>
                <h3 className="font-playfair font-semibold text-[#2E2E2E]" style={{ fontSize: 32, lineHeight: "43px" }}>Our Vision</h3>
                <p className="font-inter font-normal text-[#2E2E2E]" style={{ fontSize: 16, lineHeight: "19px" }}>
                  To take nature-rooted Indian beauty from Keelakarai to the world, creating trusted skincare and haircare inspired by purity and care. We envision a future where traditional herbal wisdom meets modern science to create products that are safe, effective, and made for everyday lifestyles. Through honest formulations and thoughtful innovation, V Stories aims to bring authentic Indian wellness to homes across the globe.
                </p>
              </div>
            </div>
            {/* Mission card */}
            <div className="relative overflow-hidden" style={{ width: 608, height: 338, background: "#778E6B", borderRadius: 12, flexShrink: 0 }}>
              <Image src="/images/banner-skin.png" alt="Our Mission" fill className="object-cover" style={{ transform: "scaleX(-1)" }} />
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
            <h2 className="font-playfair font-semibold text-[#F4F0EC]" style={{ fontSize: 48, lineHeight: "64px" }}>Growing Together</h2>
            <p className="font-inter font-normal text-[#F4F0EC]" style={{ fontSize: 24, lineHeight: "29px", maxWidth: 529 }}>
              Natural, effective &amp; made for indian skin &amp; hair.
            </p>
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
            <div className="absolute" style={{ left: 0, top: 0, width: 491, height: 589.45 }}>
              <div className="absolute" style={{ width: 465, height: 584, left: 0, top: 0 }}>
                {/* using a blob mask or just rounded borders depending on asset. The asset provided is image.png */}
                <Image src="/images/founder.png" alt="Founder" fill className="object-cover" style={{ borderRadius: "200px 200px 200px 40px" }} />
              </div>
              {/* gold badge offset */}
              <div className="absolute" style={{ width: 206, height: 226.45, left: 285, top: 363 }}>
                <div className="absolute rounded-full" style={{ width: 192.16, height: 226.45, left: 7, top: 0, background: "#E8BF72" }} />
                <div className="absolute rounded-full" style={{ width: 206, height: 219, left: 0, top: 0, border: "1px solid #000000", boxSizing: "border-box" }} />
                <p className="absolute font-inter font-medium text-black text-center" style={{ fontSize: 24, lineHeight: "29px", width: 128, left: 39, top: 58 }}>
                  Rooted in<br />Tradition,<br />Refined by<br />Science.
                </p>
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
              <Link href="/shop" className="inline-flex items-center justify-center font-inter font-medium text-[#F7EDE2] hover:opacity-90 transition-all mt-[24px]"
                style={{ width: 211, height: 43, background: "#1D3B29", borderRadius: 8, fontSize: 16 }}>
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
                title: "Free Shipping", desc: "On orders above ₹799",
                icon: <svg width="50" height="40" viewBox="0 0 50 40" fill="none"><rect x="1.25" y="1.25" width="30" height="22.5" rx="1" stroke="#1D3B29" strokeWidth="2.5"/><path d="M31.25 11.25H42.5L48.75 20V31.25H31.25V11.25Z" stroke="#1D3B29" strokeWidth="2.5" strokeLinejoin="round"/><circle cx="11.25" cy="33.75" r="5" stroke="#1D3B29" strokeWidth="2.5"/><circle cx="40" cy="33.75" r="5" stroke="#1D3B29" strokeWidth="2.5"/></svg>
              },
              {
                title: "Cash On Delivery", desc: "₹25 Per Order",
                icon: <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="2" y="10" width="36" height="26" rx="3" stroke="#1D3B29" strokeWidth="2.5"/><path d="M2 18H38" stroke="#1D3B29" strokeWidth="2.5"/><path d="M10 26H16M22 26H30" stroke="#1D3B29" strokeWidth="2.5" strokeLinecap="round"/></svg>
              },
              {
                title: "Secure Payments", desc: "Razor Pay Payment",
                icon: <svg width="35" height="40" viewBox="0 0 35 40" fill="none"><path d="M17.5 2L3 8V20C3 28.284 9.64 35.944 17.5 38C25.36 35.944 32 28.284 32 20V8L17.5 2Z" stroke="#1D3B29" strokeWidth="2.5" strokeLinejoin="round"/><path d="M12 20L16 24L24 16" stroke="#1D3B29" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              },
            ].map((f) => (
              <div key={f.title} className="flex flex-col items-center gap-3" style={{ width: 216 }}>
                <div style={{ height: 40 }}>{f.icon}</div>
                <h4 className="font-playfair font-semibold text-[#2E2E2E] text-center" style={{ fontSize: 24, lineHeight: "32px" }}>{f.title}</h4>
                <p className="font-inter font-normal text-[#2E2E2E] text-center" style={{ fontSize: 16, lineHeight: "19px" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 7. FOOTER ────────────────────────────────────────── */}
      <footer style={{ background: "#1D3B29" }}>
        <div className="w-full max-w-[1440px] mx-auto" style={{ padding: "84px 98px 0" }}>
          <div className="flex gap-20">
            {/* Brand column */}
            <div className="flex flex-col gap-8" style={{ width: 220 }}>
              <Image src="/images/logo.png" alt="V Stories" width={160} height={51} className="object-contain brightness-[10]" />
              <p className="font-inter font-normal text-[#F7EDE2]" style={{ fontSize: 16, lineHeight: "19px" }}>
                Reviving ancient herbal practices with modern standards. 100% natural, chemical-free products crafted with love.
              </p>
              <div className="flex gap-6">
                {["f", "in", "tw"].map((s) => (
                  <div key={s} className="flex items-center justify-center rounded-full" style={{ width: 40, height: 40, border: "1px solid #E8BF72" }}>
                    <span className="font-inter text-xs text-[#E8BF72]">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col gap-6" style={{ width: 89 }}>
              <span className="font-inter font-medium text-[#F7EDE2]" style={{ fontSize: 16 }}>Quick Links</span>
              <div className="flex flex-col gap-4">
                {["Home", "About Us", "Products", "Blog", "Career"].map((l) => (
                  <Link key={l} href={l === "Home" ? "/" : l === "About Us" ? "/about" : l === "Products" ? "/shop" : l === "Blog" ? "/blog" : "#"}
                    className="font-inter font-normal text-[#F7EDE2] hover:text-[#E8BF72] transition-colors" style={{ fontSize: 16 }}>{l}</Link>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-col gap-6" style={{ width: 138 }}>
              <span className="font-inter font-medium text-[#F7EDE2]" style={{ fontSize: 16 }}>Categories</span>
              <div className="flex flex-col gap-4">
                {["Skin Care", "Hair Care", "Combo/Gift Packs", "Sample Packs"].map((l) => (
                  <Link key={l} href="/shop" className="font-inter font-normal text-[#F7EDE2] hover:text-[#E8BF72] transition-colors" style={{ fontSize: 16 }}>{l}</Link>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div className="flex flex-col gap-6" style={{ width: 208 }}>
              <span className="font-inter font-medium text-[#F7EDE2]" style={{ fontSize: 16 }}>Policies</span>
              <div className="flex flex-col gap-4">
                {["Privacy Policies", "Terms & Conditions", "Shipping & Cancellations", "Returns & Refunds", "Collaboration & Partnership"].map((l) => (
                  <Link key={l} href="#" className="font-inter font-normal text-[#F7EDE2] hover:text-[#E8BF72] transition-colors" style={{ fontSize: 16 }}>{l}</Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-6" style={{ width: 250 }}>
              <span className="font-inter font-medium text-[#F7EDE2]" style={{ fontSize: 16 }}>Contact Us</span>
              <div className="flex flex-col gap-4">
                {[
                  { icon: "📞", text: "+91 6383921957" },
                  { icon: "✉", text: "hello@vstories.in" },
                  { icon: "📍", text: "Kilakarai, Tamil Nadu" },
                ].map((c) => (
                  <div key={c.text} className="flex items-center gap-4">
                    <div className="flex items-center justify-center rounded-full flex-shrink-0" style={{ width: 24, height: 24, border: "1px solid #E8BF72" }}>
                      <span style={{ fontSize: 10, color: "#E8BF72" }}>{c.icon}</span>
                    </div>
                    <span className="font-inter font-normal text-[#F7EDE2]" style={{ fontSize: 16 }}>{c.text}</span>
                  </div>
                ))}
              </div>
              <span className="font-inter font-medium text-[#F7EDE2]" style={{ fontSize: 16 }}>Join Our Community</span>
              <div className="flex items-center justify-center rounded-full" style={{ width: 40, height: 40, border: "1px solid #E8BF72" }}>
                <span style={{ fontSize: 12, color: "#E8BF72" }}>W</span>
              </div>
            </div>
          </div>
        </div>

        {/* Gold divider + copyright */}
        <div className="relative mt-12" style={{ height: 80 }}>
          <div style={{ position: "absolute", bottom: 40, left: 0, right: 0, height: 2, background: "#B99757" }} />
          <p className="absolute font-inter font-normal text-[#F7EDE2] text-center" style={{ bottom: 12, left: "50%", transform: "translateX(-50%)", fontSize: 16, lineHeight: "19px", whiteSpace: "nowrap" }}>
            © 2026 Vstories. All rights reserved. | Designed &amp; Developed By Manvian
          </p>
        </div>
      </footer>
    </div>
  );
}
