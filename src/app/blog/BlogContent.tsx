"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────── */
interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
}

/* ─── Static blog data ───────────────────────────────────────── */
const posts: BlogPost[] = [
  {
    id: 1,
    slug: "7-natural-ways-to-strengthen-hair-roots",
    title: "7 Natural Ways to Strengthen Your Hair Roots",
    excerpt: "Discover time-tested, natural tips to nourish your scalp and strengthen hair from the roots.",
    date: "20 Feb, 2026",
    readTime: "5 Min Read",
    image: "/images/banner-hair.png",
    category: "Hair Care",
  },
  {
    id: 2,
    slug: "the-power-of-bhringraj-for-healthy-hair",
    title: "The Power of Bhringraj for Healthy Hair",
    excerpt: "A closer look at the ancient herb Bhringraj and its amazing benefits for hair growth.",
    date: "20 Feb, 2026",
    readTime: "5 Min Read",
    image: "/images/cat-hair.png",
    category: "Ingredients",
  },
  {
    id: 3,
    slug: "ayurvedic-skincare-ancient-wisdom-for-glowing-skin",
    title: "Ayurvedic Skincare: Ancient Wisdom for Glowing Skin",
    excerpt: "How Ayurveda helps balance your skin naturally for a healthy, radiant glow.",
    date: "20 Feb, 2026",
    readTime: "7 Min Read",
    image: "/images/banner-skin.png",
    category: "Skin Care",
  },
  {
    id: 4,
    slug: "5-herbs-that-improve-scalp-health-naturally",
    title: "5 Herbs That Improve Scalp Health Naturally",
    excerpt: "These powerful herbs can help reduce dandruff, irritation & promote scalp wellness.",
    date: "20 Feb, 2026",
    readTime: "5 Min Read",
    image: "/images/cat-skin.png",
    category: "Wellness",
  },
  {
    id: 5,
    slug: "our-commitment-to-sustainable-beauty",
    title: "Our Commitment to Sustainable Beauty",
    excerpt: "From clean ingredients to eco-friendly packaging, here's how we care for you & planet.",
    date: "20 Feb, 2026",
    readTime: "5 Min Read",
    image: "/images/brand-story-bg.png",
    category: "Sustainability",
  },
  {
    id: 6,
    slug: "how-to-build-a-natural-hair-care-routine",
    title: "How to Build a Natural Hair Care Routine",
    excerpt: "Simple steps to create a natural hair care routine that works for your hair type.",
    date: "20 Feb, 2026",
    readTime: "5 Min Read",
    image: "/images/category-hair.png",
    category: "Hair Care",
  },
];

const categories = ["All Articles", "Hair Care", "Skin Care", "Sustainability", "Wellness"];

/* ─── Blog Card ──────────────────────────────────────────────── */
function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="relative flex-shrink-0"
      style={{
        width: 396,
        background: "#FCFAF4",
        border: "1px solid #D9D9D9",
        boxShadow: index % 3 === 0 ? "0px 20px 20px rgba(0,0,0,0.1)" : undefined,
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      {/* Image */}
      <div className="relative" style={{ width: 396, height: 387 }}>
        <Image src={post.image} alt={post.title} fill className="object-cover" />
        {/* Category badge */}
        <span
          className="absolute bottom-3 left-3 font-inter font-medium text-white px-3 py-1 rounded-full"
          style={{ fontSize: 13, background: "rgba(29,59,41,0.85)" }}
        >
          {post.category}
        </span>
      </div>

      {/* Content */}
      <div className="relative" style={{ padding: "24px 24px 28px" }}>
        {/* Title */}
        <h3
          className="font-inter font-semibold text-[#2E2E2E]"
          style={{ fontSize: 24, lineHeight: "29px", marginBottom: 12 }}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p
          className="font-inter font-normal text-[#2E2E2E]"
          style={{ fontSize: 16, lineHeight: "19px", marginBottom: 16 }}
        >
          {post.excerpt}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-16 mb-5" style={{ width: 348 }}>
          <div className="flex items-center gap-2">
            <Calendar size={16} color="#000" />
            <span className="font-inter font-normal text-[#2E2E2E]" style={{ fontSize: 16, lineHeight: "19px" }}>
              {post.date}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} color="#2E2E2E" />
            <span className="font-inter font-normal text-[#2E2E2E]" style={{ fontSize: 16, lineHeight: "19px" }}>
              {post.readTime}
            </span>
          </div>
        </div>

        {/* CTA */}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center justify-center font-inter font-medium text-[#F7EDE2] hover:opacity-90 transition-all"
          style={{
            width: 162,
            height: 43,
            background: "#1D3B29",
            borderRadius: 8,
            fontSize: 16,
            lineHeight: "19px",
          }}
        >
          Read Article
        </Link>
      </div>
    </motion.div>
  );
}

/* ─── Leaf SVG ───────────────────────────────────────────────── */
function LeafSVG({ color = "#1D3B29", flipped = false }: { color?: string; flipped?: boolean }) {
  return (
    <svg
      width="24" height="24" viewBox="0 0 24 24" fill={color}
      style={{ transform: flipped ? "matrix(-0.95,-0.32,-0.32,0.95,0,0)" : "rotate(-18.46deg)" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2.67806 0.393273C3.33698 0.746016 3.86524 1.26031 4.27352 1.86988C4.93665 2.86007 5.32531 4.08777 5.64054 5.36694C6.27084 7.92543 6.64437 10.715 7.77326 12.1466C8.83291 13.4904 10.0172 14.1032 11.144 14.2227C11.6287 14.2742 12.107 14.2325 12.5642 14.1104C12.5917 10.6285 11.032 6.71738 8.37049 4.61054C11.4761 6.14733 13.7451 9.27599 14.257 13.1784C14.0091 13.4058 14.1242 13.3167 14.2348 13.2224C15.98 11.7396 16.8379 8.81822 14.9913 5.57157C14.1428 4.07991 12.3091 2.18967 9.91609 1.04988C7.84587 0.0639353 5.3733 -0.379387 2.67804 0.393385L2.67806 0.393273Z" />
    </svg>
  );
}

/* ─── Main Component ─────────────────────────────────────────── */
export default function BlogContent() {
  const [activeCategory, setActiveCategory] = useState("All Articles");

  const filtered =
    activeCategory === "All Articles"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <div style={{ background: "#FCFAF4" }}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ height: 581, background: "#F5F5F5" }}>
        <Image
          src="/images/banner-hair.png"
          alt="Our Blog"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.35)" }} />

        {/* Centered content */}
        <div
          className="absolute flex flex-col gap-8"
          style={{ left: 536, top: 171, width: 609 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-playfair font-semibold text-center"
            style={{ fontSize: 64, lineHeight: "85px", color: "#E8BF72", width: 262 }}
          >
            Our Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-inter font-normal"
            style={{ fontSize: 24, lineHeight: "29px", color: "#E8BF72", width: 576 }}
          >
            Natural care tips, ingredient stories, and wellness wisdom for a better you.
          </motion.p>
        </div>
      </section>

      {/* ── CATEGORY FILTERS ─────────────────────────────────── */}
      <section className="py-10" style={{ background: "#FCFAF4" }}>
        <div className="w-full max-w-[1440px] mx-auto px-[100px]">
          <div className="flex items-center gap-6" style={{ width: 738 }}>
            {categories.map((cat) => {
              const active = cat === activeCategory;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="font-inter font-medium transition-all hover:opacity-80"
                  style={{
                    height: 43,
                    padding: "12px 24px",
                    borderRadius: 32,
                    fontSize: 16,
                    lineHeight: "19px",
                    background: active ? "#1D3B29" : "transparent",
                    color: active ? "#F7EDE2" : "#1D3B29",
                    border: active ? "none" : "1px solid #1D3B29",
                    whiteSpace: "nowrap",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BLOG GRID ────────────────────────────────────────── */}
      <section style={{ background: "#FCFAF4", paddingBottom: 80 }}>
        <div className="w-full max-w-[1440px] mx-auto px-[100px]">
          <div className="flex flex-col gap-[21px]">
            {/* Row 1 */}
            <div className="flex gap-6">
              {filtered.slice(0, 3).map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} />
              ))}
            </div>
            {/* Row 2 */}
            {filtered.length > 3 && (
              <div className="flex gap-6">
                {filtered.slice(3, 6).map((post, i) => (
                  <BlogCard key={post.id} post={post} index={i + 3} />
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex items-center gap-10 mt-10">
            <button
              className="flex items-center justify-center"
              style={{
                width: 40,
                height: 40,
                border: "1px solid rgba(29,59,41,0.5)",
                borderRadius: 10,
              }}
              aria-label="Previous page"
            >
              <ChevronLeft size={16} color="rgba(29,59,41,0.5)" />
            </button>
            <button
              className="flex items-center justify-center"
              style={{
                width: 40,
                height: 40,
                border: "1px solid #1D3B29",
                borderRadius: 10,
              }}
              aria-label="Next page"
            >
              <ChevronRight size={16} color="#1D3B29" />
            </button>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ────────────────────────────────────────── */}
      <div style={{ background: "#F7F3EF", height: 185, display: "flex", alignItems: "center" }}>
        <div className="w-full max-w-[1440px] mx-auto px-[100px]">
          <div className="flex items-center justify-around">
            {[
              {
                title: "Free Shipping",
                desc: "On orders above ₹799",
                icon: (
                  <svg width="50" height="40" viewBox="0 0 50 40" fill="none">
                    <rect x="1.25" y="1.25" width="30" height="22.5" rx="1" stroke="#1D3B29" strokeWidth="2.5" />
                    <path d="M31.25 11.25H42.5L48.75 20V31.25H31.25V11.25Z" stroke="#1D3B29" strokeWidth="2.5" strokeLinejoin="round" />
                    <circle cx="11.25" cy="33.75" r="5" stroke="#1D3B29" strokeWidth="2.5" />
                    <circle cx="40" cy="33.75" r="5" stroke="#1D3B29" strokeWidth="2.5" />
                  </svg>
                ),
              },
              {
                title: "Cash On Delivery",
                desc: "₹25 Per Order",
                icon: (
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <rect x="2" y="10" width="36" height="26" rx="3" stroke="#1D3B29" strokeWidth="2.5" />
                    <path d="M2 18H38" stroke="#1D3B29" strokeWidth="2.5" />
                    <path d="M10 26H16M22 26H30" stroke="#1D3B29" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                ),
              },
              {
                title: "Secure Payments",
                desc: "Razor Pay Payment",
                icon: (
                  <svg width="35" height="40" viewBox="0 0 35 40" fill="none">
                    <path d="M17.5 2L3 8V20C3 28.284 9.64 35.944 17.5 38C25.36 35.944 32 28.284 32 20V8L17.5 2Z" stroke="#1D3B29" strokeWidth="2.5" strokeLinejoin="round" />
                    <path d="M12 20L16 24L24 16" stroke="#1D3B29" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
            ].map((f) => (
              <div key={f.title} className="flex flex-col items-center gap-3" style={{ width: 216 }}>
                <div style={{ height: 40 }}>{f.icon}</div>
                <h4 className="font-playfair font-semibold text-[#2E2E2E] text-center" style={{ fontSize: 24, lineHeight: "32px" }}>
                  {f.title}
                </h4>
                <p className="font-inter font-normal text-[#2E2E2E] text-center" style={{ fontSize: 16, lineHeight: "19px" }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer style={{ background: "#1D3B29" }}>
        <div className="w-full max-w-[1440px] mx-auto" style={{ padding: "84px 98px 0" }}>
          <div className="flex gap-20">
            {/* Brand */}
            <div className="flex flex-col gap-8" style={{ width: 220 }}>
              <Image src="/images/logo.png" alt="V Stories" width={160} height={51} className="object-contain brightness-[10]" />
              <p className="font-inter font-normal text-[#F7EDE2]" style={{ fontSize: 16, lineHeight: "19px" }}>
                Reviving ancient herbal practices with modern standards. 100% natural, chemical-free products crafted with love.
              </p>
              <div className="flex gap-6">
                {[
                  { label: "f", href: "#" },
                  { label: "in", href: "#" },
                  { label: "tw", href: "#" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="flex items-center justify-center rounded-full"
                    style={{ width: 40, height: 40, border: "1px solid #E8BF72" }}
                  >
                    <span className="font-inter text-xs text-[#E8BF72]">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col gap-6" style={{ width: 89 }}>
              <span className="font-inter font-medium text-[#F7EDE2]" style={{ fontSize: 16 }}>Quick Links</span>
              <div className="flex flex-col gap-4">
                {[["Home", "/"], ["About Us", "/about"], ["Products", "/shop"], ["Blog", "/blog"], ["Career", "#"]].map(([l, h]) => (
                  <Link key={l} href={h} className="font-inter font-normal text-[#F7EDE2] hover:text-[#E8BF72] transition-colors" style={{ fontSize: 16 }}>{l}</Link>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-col gap-6" style={{ width: 138 }}>
              <span className="font-inter font-medium text-[#F7EDE2]" style={{ fontSize: 16 }}>Categories</span>
              <div className="flex flex-col gap-4">
                {[["Skin Care", "/shop?cat=skin"], ["Hair Care", "/shop?cat=hair"], ["Combo/Gift Packs", "/shop?cat=combos"], ["Sample Packs", "/shop?cat=samples"]].map(([l, h]) => (
                  <Link key={l} href={h} className="font-inter font-normal text-[#F7EDE2] hover:text-[#E8BF72] transition-colors" style={{ fontSize: 16 }}>{l}</Link>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div className="flex flex-col gap-6" style={{ width: 208 }}>
              <span className="font-inter font-medium text-[#F7EDE2]" style={{ fontSize: 16 }}>Policies</span>
              <div className="flex flex-col gap-4">
                {[
                  "Privacy Policies",
                  "Terms & Conditions",
                  "Shipping & Cancellations",
                  "Returns & Refunds",
                  "Collaboration & Partnership",
                ].map((l) => (
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
                    <div
                      className="flex items-center justify-center rounded-full flex-shrink-0"
                      style={{ width: 24, height: 24, border: "1px solid #E8BF72" }}
                    >
                      <span style={{ fontSize: 10, color: "#E8BF72" }}>{c.icon}</span>
                    </div>
                    <span className="font-inter font-normal text-[#F7EDE2]" style={{ fontSize: 16 }}>{c.text}</span>
                  </div>
                ))}
              </div>
              <span className="font-inter font-medium text-[#F7EDE2]" style={{ fontSize: 16 }}>Join Our Community</span>
              <div
                className="flex items-center justify-center rounded-full"
                style={{ width: 40, height: 40, border: "1px solid #E8BF72" }}
              >
                <span style={{ fontSize: 12, color: "#E8BF72" }}>W</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider + copyright */}
        <div className="relative mt-12" style={{ height: 80 }}>
          <div style={{ position: "absolute", bottom: 40, left: 0, right: 0, height: 2, background: "#B99757" }} />
          <p
            className="absolute font-inter font-normal text-[#F7EDE2] text-center"
            style={{ bottom: 12, left: "50%", transform: "translateX(-50%)", fontSize: 16, lineHeight: "19px", whiteSpace: "nowrap" }}
          >
            © 2026 Vstories. All rights reserved. | Designed &amp; Developed By Manvian
          </p>
        </div>
      </footer>
    </div>
  );
}
