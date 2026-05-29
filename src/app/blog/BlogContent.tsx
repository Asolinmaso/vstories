"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";

import { blogPosts as posts, type BlogPost } from "@/data/blogData";

const categories = ["All Articles", "Hair Care", "Skin Care", "Sustainability", "Wellness"];

/* ─── Blog Card ──────────────────────────────────────────────── */
function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="relative w-full bg-white rounded-[20px] overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col p-4"
    >
      <div className="relative w-full aspect-[4/3] bg-[#EBE7DF] rounded-[16px] overflow-hidden">
        <Image src={post.image} alt={post.title} fill className="object-cover object-top" />
        <div
          className="absolute left-3 bottom-3 px-3 py-1.5 flex items-center gap-1.5 text-xs font-semibold text-white bg-[#1D3B29] rounded-[6px] z-10"
        >
          {post.category}
        </div>
      </div>

      {/* Content */}
      <div className="relative pt-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Title */}
          <h3
            className="font-inter font-semibold text-[#2E2E2E] text-[18px] md:text-[22px] leading-tight mb-2.5"
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          <p
            className="font-inter font-normal text-[#2E2E2E]/70 text-[13px] md:text-[14px] leading-relaxed mb-4"
          >
            {post.excerpt}
          </p>
        </div>

        <div>
          {/* Meta row */}
          <div className="flex items-center gap-5 mb-4 text-[#2E2E2E]/60 text-xs md:text-sm">
            <div className="flex items-center gap-1.5">
              <Calendar size={15} className="text-[#2E2E2E]" />
              <span className="font-inter font-medium">
                {post.date}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={15} className="text-[#2E2E2E]" />
              <span className="font-inter font-medium">
                {post.readTime}
              </span>
            </div>
          </div>

          {/* CTA */}
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center justify-center font-inter font-medium hover:opacity-90 transition-all bg-[#1D3B29] !text-white text-[13px] md:text-[14px] rounded-[8px] px-5 py-2 w-fit"
          >
            Read Article
          </Link>
        </div>
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
    <div className="bg-[#FCFAF4]">
      <style dangerouslySetInnerHTML={{
        __html: `
        .scrollbar-none::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-none {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}} />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden flex flex-col items-center justify-start h-[440px] md:h-[580px] pt-20 md:pt-36 bg-[#F5F5F5]">
        <Image
          src="/images/blog/blog hero.png"
          alt="Our Blog"
          fill
          className="object-cover object-left md:object-center"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/35" />

        {/* Centered content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-[90%] md:max-w-[700px] gap-3 md:gap-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-playfair font-semibold text-center text-[44px] md:text-[64px] leading-tight"
            style={{ color: "#E8BF72" }}
          >
            Our Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-inter font-normal text-[15px] md:text-[24px] leading-[22px] md:leading-normal max-w-[340px] md:max-w-[576px]"
            style={{ color: "#E8BF72" }}
          >
            Natural care tips, ingredient stories, and wellness wisdom for a better you.
          </motion.p>
        </div>
      </section>

      {/* ── CATEGORY FILTERS ─────────────────────────────────── */}
      <section className="py-6 md:py-10 bg-[#FCFAF4]">
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-[100px]">
          <div className="flex items-center gap-3 md:gap-6 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0">
            {categories.map((cat) => {
              const active = cat === activeCategory;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`font-inter font-medium transition-all hover:opacity-80 rounded-full text-[14px] md:text-[16px] snap-start whitespace-nowrap px-5 py-2 md:py-2.5`}
                  style={{
                    backgroundColor: active ? "#1D3B29" : "#FFFFFF",
                    color: active ? "#F7EDE2" : "#1D3B29",
                    border: active ? "1px solid #1D3B29" : "1px solid rgba(29,59,41,0.5)"
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
      <section className="bg-[#FCFAF4] pb-16 md:pb-24">
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-[100px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-[24px]">
            {filtered.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-6 md:gap-10 mt-10 md:mt-12">
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


    </div>
  );
}
