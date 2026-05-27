"use client";

import Image from "next/image";
import Link from "next/link";
import { Share, Search, ThumbsUp, ThumbsDown } from "lucide-react";
import { useState, use, useRef, useEffect } from "react";
import { toast } from "sonner";

import { posts, categories } from "../../../data/blogData";

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [yesCount, setYesCount] = useState(24);
    const [noCount, setNoCount] = useState(2);
    const [userVote, setUserVote] = useState<"yes" | "no" | null>(null);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const shareMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
                setShowShareMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const resolvedParams = use(params);
    const post = posts.find((p) => p.slug === resolvedParams.slug);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FCFAF4]">
                <h1 className="text-2xl font-inter text-[#1A3026]">Article not found</h1>
            </div>
        );
    }

    const latestArticles = posts.slice(0, 4);

    return (
        <div className="min-h-screen" style={{ background: "#FCFAF4" }}>
            <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[100px] py-12 lg:py-20">
                <div className="grid lg:grid-cols-[1fr_360px] gap-12 lg:gap-20 items-start">

                    {/* Main Article Content */}
                    <div>
                        <div className="mb-10">
                            <span
                                className="inline-block px-4 py-1.5 rounded-full font-inter text-[12px] md:text-[13px] text-white mb-8"
                                style={{ backgroundColor: "#1D3B29" }}
                            >
                                {post.category}
                            </span>

                            <h1 className="font-inter font-semibold text-[#1A3026] leading-tight mb-8" style={{ fontSize: "46px" }}>
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <p className="font-inter font-medium text-[#1A3026] text-[12px] md:text-[13px]">
                                    By Vstories Team • {post.date} • {post.readTime}
                                </p>

                                <button className="flex items-center gap-2 px-4 py-1.5 border border-[#2E2E2E] rounded-md font-inter text-[#2E2E2E] text-[12px] md:text-[14px] hover:bg-black/5 transition-colors">
                                    <Image src="/images/icons/share.png" alt="Share" width={18} height={18} className="object-contain" />
                                    Share this article
                                </button>
                            </div>
                        </div>

                        <div className="relative w-full aspect-[16/9] mb-10 overflow-hidden">
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="font-inter text-[#2E2E2E] text-[16px] leading-[26px] space-y-6">
                            <p>{post.content.intro}</p>

                            {post.content.sections.map((section, idx) => (
                                <div key={idx}>
                                    <h3 className="font-inter font-semibold text-[#1A3026] text-[18px] mb-1">{section.title}</h3>
                                    <p>{section.text}</p>
                                </div>
                            ))}

                            <p className="pt-2">{post.content.outro}</p>
                        </div>

                        <div className="w-full h-px bg-[#D9D9D9] my-10"></div>

                        <div className="flex flex-wrap items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <span className="font-inter font-medium text-[#1A3026] text-[15px]">Was This Article Helpful?</span>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => {
                                            if (userVote === "yes") return;
                                            setYesCount(prev => prev + 1);
                                            if (userVote === "no") setNoCount(prev => prev - 1);
                                            setUserVote("yes");
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 border border-[#2E2E2E] rounded-md font-inter text-[#2E2E2E] text-[14px] hover:bg-black/5 transition-colors"
                                    >
                                        <Image src="/images/icons/like.png" alt="Like" width={18} height={18} className="object-contain" />
                                        Yes ({yesCount})
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (userVote === "no") return;
                                            setNoCount(prev => prev + 1);
                                            if (userVote === "yes") setYesCount(prev => prev - 1);
                                            setUserVote("no");
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 border border-[#2E2E2E] rounded-md font-inter text-[#2E2E2E] text-[14px] hover:bg-black/5 transition-colors"
                                    >
                                        <Image src="/images/icons/dislike.png" alt="Dislike" width={18} height={18} className="object-contain" />
                                        No ({noCount < 10 ? `0${noCount}` : noCount})
                                    </button>
                                </div>
                            </div>

                            <div className="relative" ref={shareMenuRef}>
                                <button
                                    onClick={() => setShowShareMenu(!showShareMenu)}
                                    className="flex items-center gap-2 px-4 py-2 border border-[#2E2E2E] rounded-md font-inter text-[#2E2E2E] text-[14px] hover:bg-black/5 transition-colors"
                                >
                                    <Image src="/images/icons/share.png" alt="Share" width={18} height={18} className="object-contain" />
                                    Share this article
                                </button>

                                {showShareMenu && (
                                    <div className="absolute right-0 bottom-full mb-3 bg-white border border-[#EBEBEB] rounded-full shadow-[0px_8px_24px_rgba(0,0,0,0.08)] px-6 py-3.5 z-50 flex items-center gap-6 min-w-max animate-in fade-in slide-in-from-bottom-1 duration-200">
                                        <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post?.title + " " + (typeof window !== 'undefined' ? window.location.href : ''))}`} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform flex items-center justify-center">
                                            <Image src="/images/icons/whatsapp.png" alt="WhatsApp" width={22} height={22} className="object-contain" />
                                        </a>
                                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform flex items-center justify-center">
                                            <Image src="/images/icons/fb.png" alt="Facebook" width={22} height={22} className="object-contain" />
                                        </a>
                                        <a href={`mailto:?subject=${encodeURIComponent(post?.title || "")}&body=${encodeURIComponent("Check out this article: " + (typeof window !== 'undefined' ? window.location.href : ''))}`} className="hover:scale-110 transition-transform flex items-center justify-center">
                                            <Image src="/images/icons/mail.png" alt="Gmail" width={22} height={22} className="object-contain opacity-80" />
                                        </a>
                                        <button onClick={() => { if (typeof window !== 'undefined') navigator.clipboard.writeText(window.location.href); toast.success("Link copied for Instagram!"); setShowShareMenu(false); }} className="hover:scale-110 transition-transform flex items-center justify-center">
                                            <Image src="/images/icons/insta.png" alt="Instagram" width={22} height={22} className="object-contain" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">

                        {/* Search Articles */}
                        <div className="bg-[#F6F4F0] rounded-xl p-6">
                            <h3 className="font-inter font-medium text-[#1A3026] text-[18px] mb-4">
                                Search Articles
                            </h3>
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A3026]/50" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-[#FCFAF4] border border-[#1A3026] rounded-full py-2.5 pl-11 pr-5 font-inter text-[14px] text-[#2E2E2E] focus:outline-none focus:ring-[2px] focus:ring-[#E8BF72] focus:ring-offset-1 focus:ring-offset-[#F6F4F0] transition-all"
                                />
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="bg-[#F6F4F0] rounded-xl p-6">
                            <h3 className="font-inter font-medium text-[#1A3026] text-[18px] mb-3">
                                Categories
                            </h3>
                            <div className="flex flex-col gap-1 -mx-4">
                                {categories.map((category) => (
                                    <Link
                                        href={`/blog?category=${category}`}
                                        key={category}
                                        className={`px-4 py-2 font-inter text-[14px] transition-colors ${category === "Hair Care" ? "bg-[#EAE4D9] text-[#1A3026] font-medium" : "text-[#1A3026] hover:bg-[#EAE4D9]/50"}`}
                                    >
                                        {category}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Latest Articles */}
                        <div>
                            <h3 className="font-inter font-medium text-[#1A3026] text-[18px] mb-6">
                                Latest Articles
                            </h3>
                            <div className="flex flex-col gap-6">
                                {latestArticles.map((article, i) => (
                                    <Link href={`/blog/${article.slug}`} key={i} className="flex gap-4 group cursor-pointer">
                                        <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                                            <Image
                                                src={article.image}
                                                alt={article.title}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <h4 className="font-inter font-medium text-[#1A3026] text-[14px] leading-tight mb-2 group-hover:text-[#3A5D20] transition-colors line-clamp-2">
                                                {article.title}
                                            </h4>
                                            <p className="font-inter text-[#1A3026]/70 text-[12px]">
                                                {article.date}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
