"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";

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

const posts: BlogPost[] = [
  { id: 1, slug: "7-natural-ways-to-strengthen-hair-roots", title: "7 Natural Ways to Strengthen Your Hair Roots", excerpt: "Discover time-tested, natural tips to nourish your scalp and strengthen hair from the roots.", date: "20 Feb, 2026", readTime: "5 Min Read", image: "/images/banner-hair.png", category: "Hair Care" },
  { id: 2, slug: "the-power-of-bhringraj-for-healthy-hair", title: "The Power of Bhringraj for Healthy Hair", excerpt: "A closer look at the ancient herb Bhringraj and its amazing benefits for hair growth.", date: "20 Feb, 2026", readTime: "5 Min Read", image: "/images/cat-hair.png", category: "Ingredients" },
  { id: 3, slug: "ayurvedic-skincare-ancient-wisdom-for-glowing-skin", title: "Ayurvedic Skincare: Ancient Wisdom for Glowing Skin", excerpt: "How Ayurveda helps balance your skin naturally for a healthy, radiant glow.", date: "20 Feb, 2026", readTime: "7 Min Read", image: "/images/banner-skin.png", category: "Skin Care" },
  { id: 4, slug: "5-herbs-that-improve-scalp-health-naturally", title: "5 Herbs That Improve Scalp Health Naturally", excerpt: "These powerful herbs can help reduce dandruff, irritation & promote scalp wellness.", date: "20 Feb, 2026", readTime: "5 Min Read", image: "/images/cat-skin.png", category: "Wellness" },
  { id: 5, slug: "our-commitment-to-sustainable-beauty", title: "Our Commitment to Sustainable Beauty", excerpt: "From clean ingredients to eco-friendly packaging, here's how we care for you & planet.", date: "20 Feb, 2026", readTime: "5 Min Read", image: "/images/brand-story-bg.png", category: "Sustainability" },
  { id: 6, slug: "how-to-build-a-natural-hair-care-routine", title: "How to Build a Natural Hair Care Routine", excerpt: "Simple steps to create a natural hair care routine that works for your hair type.", date: "20 Feb, 2026", readTime: "5 Min Read", image: "/images/category-hair.png", category: "Hair Care" },
];

const categories = ["All Articles", "Hair Care", "Skin Care", "Sustainability", "Wellness"];

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="flex flex-col rounded-xl overflow-hidden border border-[#D9D9D9] bg-[#FCFAF4]"
      style={{ boxShadow: index % 3 === 0 ? "0px 20px 20px rgba(0,0,0,0.1)" : undefined }}
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/3]">
        <Image src={post.image} alt={post.title} fill className="object-cover" />
        <span className="absolute bottom-3 left-3 font-inter font-medium text-white px-3 py-1 rounded-full text-xs"
          style={{ background: "rgba(29,59,41,0.85)" }}>
          {post.category}
        </span>
      </div>
      {/* Content */}
      <div className="flex flex-col gap-3 p-5 md:p-6 flex-1">
        <h3 className="font-inter font-semibold text-[#2E2E2E] text-base md:text-xl leading-snug">{post.title}</h3>
        <p className="font-inter font-normal text-[#2E2E2E] text-sm md:text-base leading-relaxed flex-1">{post.excerpt}</p>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Calendar size={14} color="#000" />
            <span className="font-inter font-normal text-[#2E2E2E] text-xs md:text-sm">{post.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} color="#2E2E2E" />
            <span className="font-inter font-normal text-[#2E2E2E] text-xs md:text-sm">{post.readTime}</span>
          </div>
        </div>
        <Link href={`/blog/${post.slug}`}
          className="inline-flex items-center justify-center font-inter font-medium text-[#F7EDE2] hover:opacity-90 transition-all rounded-lg self-start mt-1"
          style={{ padding: "10px 20px", background: "#1D3B29", fontSize: 14 }}>
          Read Article
        </Link>
      </div>
    </motion.div>
  );
}

export default function BlogContent() {
  const [activeCategory, setActiveCategory] = useState("All Articles");

  const filtered = activeCategory === "All Articles" ? posts : posts.filter((p) => p.category === activeCategory);

  return (
    <div style={{ background: "#FCFAF4" }}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[50vh] md:min-h-[581px] flex items-center justify-center" style={{ background: "#F5F5F5" }}>
        <Image src="/images/banner-hair.png" alt="Our Blog" fill className="object-cover" priority />
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.35)" }} />
        <div className="relative z-10 flex flex-col items-center gap-4 px-6 text-center max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="font-playfair font-semibold text-4xl md:text-5xl lg:text-[64px]"
            style={{ color: "#E8BF72" }}>
            Our Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="font-inter font-normal text-base md:text-xl lg:text-2xl"
            style={{ color: "#E8BF72" }}>
            Natural care tips, ingredient stories, and wellness wisdom for a better you.
          </motion.p>
        </div>
      </section>

      {/* ── CATEGORY FILTERS ─────────────────────────────────── */}
      <section className="py-8 md:py-10" style={{ background: "#FCFAF4" }}>
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-[100px]">
          <div className="flex items-center gap-3 flex-wrap">
            {categories.map((cat) => {
              const active = cat === activeCategory;
              return (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className="font-inter font-medium transition-all hover:opacity-80 text-sm md:text-base whitespace-nowrap"
                  style={{
                    padding: "10px 20px", borderRadius: 32,
                    background: active ? "#1D3B29" : "transparent",
                    color: active ? "#F7EDE2" : "#1D3B29",
                    border: active ? "none" : "1px solid #1D3B29",
                  }}>
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BLOG GRID ────────────────────────────────────────── */}
      <section className="pb-16 md:pb-20" style={{ background: "#FCFAF4" }}>
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-[100px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {filtered.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
          {/* Pagination */}
          <div className="flex items-center gap-8 mt-10">
            <button className="flex items-center justify-center w-10 h-10 rounded-xl"
              style={{ border: "1px solid rgba(29,59,41,0.5)" }} aria-label="Previous page">
              <ChevronLeft size={16} color="rgba(29,59,41,0.5)" />
            </button>
            <button className="flex items-center justify-center w-10 h-10 rounded-xl"
              style={{ border: "1px solid #1D3B29" }} aria-label="Next page">
              <ChevronRight size={16} color="#1D3B29" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
