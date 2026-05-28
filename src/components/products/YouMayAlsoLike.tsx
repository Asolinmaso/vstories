"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

export default function YouMayAlsoLike() {
    return (
        <div className="relative z-10 py-16 mt-8 md:mt-16 bg-[#FCFAF4] w-full">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Image
                    src="/images/products/background.png"
                    alt="Background Pattern"
                    fill
                    className="object-cover"
                    priority={false}
                />
            </div>

            <div className="container-premium max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
                <div className="text-center mb-10 flex items-center justify-center gap-4">
                    <div className="relative w-6 h-6">
                        <Image src="/images/icons/leafleft.png" alt="Leaf Decoration Left" fill className="object-contain" />
                    </div>
                    <h2 className="text-4xl text-[var(--primary)]" style={{ fontFamily: "var(--font-peachi)" }}>You May Also Like</h2>
                    <div className="relative w-6 h-6">
                        <Image src="/images/icons/leafright.png" alt="Leaf Decoration Right" fill className="object-contain" />
                    </div>
                </div>

                <div
                    className="flex overflow-x-auto gap-4 sm:gap-6 pb-8 snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 hide-scroll"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <style dangerouslySetInnerHTML={{
                        __html: `
                        .hide-scroll::-webkit-scrollbar {
                            display: none;
                        }
                    `}} />
                    {[
                        { name: "Prophetic-Face Serum", original: 280, price: 250, img: "/images/products/serum.png", slug: "prophetic-face-serum" },
                        { name: "Herbal Facepack", original: 200, price: 180, img: "/images/products/facepack.png", slug: "herbal-facepack" },
                        { name: "Hibiscus Shampoo", original: 280, price: 250, img: "/images/products/shampoo.png", slug: "hibiscus-shampoo" },
                        { name: "V Herbal Hair Oil", original: 250, price: 230, img: "/images/products/hair oil.png", slug: "herbal-hair-oil" },
                    ].map((prod, i) => (
                        <Link href={`/product/${prod.slug}`} key={i} className="flex-none w-[260px] sm:w-[280px] lg:w-[calc(25%-1.125rem)] snap-start flex flex-col group cursor-pointer block">
                            <div className="bg-[#EBE7DF] rounded-xl overflow-hidden relative aspect-square mb-4 transition-transform duration-300 group-hover:scale-[1.02]">
                                <Image
                                    src={prod.img}
                                    alt={prod.name}
                                    fill
                                    className="object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=600&auto=format&fit=crop';
                                    }}
                                />
                            </div>
                            <h3 className="font-inter font-semibold text-[var(--primary)] mb-1" style={{ fontSize: "26px", lineHeight: "1.2" }}>
                                {prod.name}
                            </h3>
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-[14px] font-bold text-[var(--primary)] tracking-tight">₹{prod.price}</span>
                                    <span className="text-[13px] text-[var(--primary)] opacity-60 line-through font-medium">₹{prod.original}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-[var(--highlight)] text-[var(--highlight)]" />
                                    <span className="text-[13px] font-bold text-[var(--primary)]">4.8</span>
                                    <span className="text-[11px] text-[var(--primary)] opacity-60 font-medium">(120)</span>
                                </div>
                            </div>
                            <div className="mt-auto">
                                <button className="bg-[var(--primary)] text-white text-[14px] font-medium px-6 py-2 rounded transition-opacity hover:opacity-90 shadow-sm w-max" style={{ backgroundColor: 'var(--primary)' }}>
                                    Shop Now
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
