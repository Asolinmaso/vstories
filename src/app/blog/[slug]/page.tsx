import Image from "next/image";
import Link from "next/link";
import { Search, Share, ThumbsUp, ThumbsDown } from "lucide-react";
import { blogPosts } from "@/data/blogData";
import { notFound } from "next/navigation";
import ArticleFeedback from "./ArticleFeedback";
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = blogPosts.find((p) => p.slug === slug);

  if (!article) {
    notFound();
  }

  // Get the latest 3 articles excluding the current one
  const latestArticles = blogPosts
    .filter((p) => p.id !== article.id)
    .slice(0, 3);

  return (
    <div className="bg-[#FCFAF4] min-h-screen py-10 md:py-16">
      <div className="w-full max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12">
        {/* 1. Search & Categories (visible at the top on mobile) */}
        <div className="lg:col-start-2 lg:row-start-1">
          {/* Search */}
          <div className="bg-[#F3EFE6] p-6 rounded-xl mb-8">
            <h3 className="font-inter text-xl md:text-2xl font-semibold text-[#2E2E2E] mb-4">Search Articles</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded border border-[#D9D9D9] bg-transparent text-[#2E2E2E] focus:outline-none focus:border-[#1D3B29]"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="bg-[#F3EFE6] p-6 rounded-xl">
            <h3 className="font-inter text-xl md:text-2xl font-semibold text-[#2E2E2E] mb-4">Categories</h3>
            <ul className="space-y-2">
              {["All Articles", "Hair Care", "Skin Care", "Sustainability", "Wellness"].map((cat) => (
                <li key={cat}>
                  <Link
                    href="/blog"
                    className={`block px-3 py-2 rounded transition ${article.category === cat
                      ? "bg-[#E8DFCF] text-[#2E2E2E] font-medium"
                      : "hover:bg-[#e8dfcf] text-[#2E2E2E]"
                      }`}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 2. Main Content (Article) */}
        <article className="lg:col-start-1 lg:row-start-1 lg:row-span-2">
          {/* Category Badge */}
          <div className="mb-6">
            <span
              className="inline-block px-4 py-1 rounded-full text-sm font-medium"
              style={{ background: "#1D3B29", color: "#FFFFFF" }}
            >
              {article.category}
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-inter font-semibold text-[#2E2E2E] text-[28px] md:text-[48px] leading-tight mb-6 tracking-normal"
          >
            {article.title}
          </h1>

          {/* Meta & Share */}
          <div className="flex flex-wrap items-center justify-between mb-8 pb-4 border-b border-[#D9D9D9] gap-4">
            <div className="text-[#2E2E2E] text-sm">
              By Vstories Team &bull; May 15, 2024 &bull; {article.readTime}
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-[#2E2E2E] text-sm hover:opacity-80 transition border border-[#767676] rounded-[8px] w-fit">
              <Image src="/images/icons/share.png" alt="Share" width={16} height={16} className="object-contain" />
              Share this article
            </button>
          </div>

          {/* Featured Image */}
          <div className="relative w-full h-[300px] sm:h-[500px] rounded-xl overflow-hidden mb-8">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover object-top"
              priority
            />
          </div>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none text-[#2E2E2E]">
            {article.content.intro && (
              <p className="mb-6">{article.content.intro}</p>
            )}

            {article.content.sections.map((section, index) => (
              <div key={index} className="mb-6">
                <h3 className="font-playfair text-2xl font-semibold mb-2">{section.title}</h3>
                <p className="mb-6">{section.body}</p>
              </div>
            ))}

            {article.content.outro && (
              <p className="mb-8 font-medium">{article.content.outro}</p>
            )}
          </div>

          {/* Feedback & Share Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-[#D9D9D9] pt-6 mt-8 gap-6 sm:gap-4">
            <ArticleFeedback />
            <button className="flex items-center gap-2 px-4 py-2 text-[#2E2E2E] text-sm hover:opacity-80 transition border border-[#767676] rounded-[8px] w-fit">
              <Image src="/images/icons/share.png" alt="Share" width={16} height={16} className="object-contain" />
              Share this article
            </button>
          </div>
        </article>

        {/* 3. Latest Articles (visible at the bottom on mobile) */}
        <div className="lg:col-start-2 lg:row-start-2">
          <h3 className="font-inter text-xl md:text-2xl font-semibold text-[#2E2E2E] mb-6">Latest Articles</h3>
          <div className="flex flex-col gap-6">
            {latestArticles.map((latest) => (
              <Link key={latest.id} href={`/blog/${latest.slug}`} className="flex gap-4 group">
                <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                  <Image
                    src={latest.image}
                    alt={latest.title}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div>
                  <h4 
                    className="font-medium text-[#2E2E2E] mb-1 group-hover:text-[#1D3B29] transition line-clamp-2"
                    style={{ fontSize: "16px", lineHeight: "1.3" }}
                  >
                    {latest.title}
                  </h4>
                  <p className="text-xs text-gray-500">{latest.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
