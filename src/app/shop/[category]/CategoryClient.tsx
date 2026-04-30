"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/lib/services/product.service";

interface CategoryClientProps {
    categorySlug: string;
    initialProducts: Product[];
}

type SortOption = "featured" | "price-asc" | "price-desc" | "name";

const categoryInfo: Record<string, { title: string; description: string }> = {
    hair: { title: "Hair Care", description: "Nourish your hair with our herbal formulas." },
    skin: { title: "Skin Care", description: "Reveal your natural radiance." },
    combos: { title: "Value Combos", description: "Complete care bundles at special prices." },
    combo: { title: "Value Combos", description: "Complete care bundles at special prices." },
    default: { title: "Collection", description: "Browse our premium products." },
};

const faqs: Record<string, Array<{ question: string; answer: string }>> = {
    hair: [
        {
            question: "Can I use the hair oil on chemically treated hair?",
            answer: "Yes, our herbal hair oil is 100% natural and safe for colored or chemically treated hair. It helps nourish and repair damage."
        },
        {
            question: "How often should I use the hair oil?",
            answer: "For best results, we recommend using it 2-3 times a week. Massage gently into the scalp and leave it on for at least an hour before washing."
        },
        {
            question: "Does it help with dandruff?",
            answer: "Yes, our formula contains Neem and Tea Tree which are known for their anti-fungal properties that effectively combat dandruff."
        }
    ],
    skin: [
        {
            question: "Is the face serum suitable for oily skin?",
            answer: "Yes, our serums are lightweight and fast-absorbing, making them suitable for all skin types, including oily and acne-prone skin."
        },
        {
            question: "Can I use this under makeup?",
            answer: "Absolutely! It absorbs quickly and leaves a hydrated, non-greasy finish that acts as a perfect base for makeup."
        },
        {
            question: "Are there any preservatives?",
            answer: "We use only natural preservatives and essential oils to maintain shelf life without harsh chemicals like parabens."
        }
    ]
};

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-[var(--primary)]/10 rounded-xl overflow-hidden bg-white/50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-white"
            >
                <span className="font-medium text-[var(--primary)] text-lg">{question}</span>
                <span className={`transition-transform duration-300 text-[var(--primary)] ${isOpen ? "rotate-45" : ""}`}>
                    <Plus className="w-5 h-5" />
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="p-5 pt-0 text-[var(--text-secondary)] leading-relaxed text-sm md:text-base">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function CategoryClient({ categorySlug, initialProducts }: CategoryClientProps) {
    const [sortBy, setSortBy] = useState<SortOption>("featured");

    // Select FAQs based on category, formatted for loose matching
    const categoryKey = categorySlug.toLowerCase().includes("hair") ? "hair" :
        (categorySlug.toLowerCase().includes("face") || categorySlug.toLowerCase().includes("skin")) ? "skin" : null;

    const currentFaqs = categoryKey ? faqs[categoryKey] : null;

    // Filter products based on URL slug
    // Map URL slugs to DB category logic
    // We assume DB products have a 'tags' or 'category_id' or 'category' property we can loosely match against
    // User requested: /shop/hair, /shop/skin, /shop/combo
    const filteredProducts = initialProducts.filter(product => {
        // Loose matching
        const slug = categorySlug.toLowerCase();

        // Match against category_id if it ends with the slug (since IDs are UUIDs, this won't work perfectly unless we know IDs)
        // Better: Check the "slug" or "name" of the product if it contains the category keyword? No.
        // Let's assume we can match against the 'category' if filtering was done previously?
        // Wait, the static file had 'category' string property.
        // The DB has 'category_id' (UUID).
        // BUT, `products` table might NOT have the category SLUG joined unless we updated getProducts.
        // However, I can try to do a best-effort text match on product name OR assuming we fetch all products and filtered in page.tsx 
        // ACTUALLY: Let's do the filtering in page.tsx if possible, or here if we have enough info.
        // Re-reading `CategoryShowcase`, I used a hacky match.
        // Let's refine the matching here.
        // MAPPING:
        // hair -> matches "hair" in slug/name OR "shampoo", "oil" etc? 
        // skin -> matches "face", "skin", "cream", "gel"
        // combo -> matches "combo", "kit"

        // This is fragile. Ideally we fetch categories table.
        // BUT for this task, let's try to be smart or loose.

        const pSlug = product.slug.toLowerCase();
        const pName = product.name.toLowerCase();
        const isCombo = product.combo_product_ids && product.combo_product_ids.length > 0;

        // Specific Logic for Combos
        if (slug === 'combo' || slug === 'combos') {
            // Strictly check if it has combo products, OR strictly match 'combo'/'kit' if migration hasn't run yet for some
            // But prefer the field check.
            return isCombo || pSlug.includes('combo') || pName.includes('combo') || pSlug.includes('kit');
        }

        // For other categories, EXCLUDE combos
        if (isCombo) return false;

        if (slug === 'hair') {
            return pSlug.includes('hair') || pName.includes('hair') || pSlug.includes('shampoo') || pSlug.includes('oil');
        }
        if (slug === 'skin' || slug === 'face') {
            return pSlug.includes('face') || pName.includes('face') || pSlug.includes('skin') || pName.includes('skin') || pSlug.includes('cream') || pSlug.includes('serum');
        }

        return true;
    });

    const info = categoryInfo[categorySlug] || categoryInfo.default;

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case "price-asc": return a.price - b.price;
            case "price-desc": return b.price - a.price;
            case "name": return a.name.localeCompare(b.name);
            default: return 0;
        }
    });

    return (
        <div className="bg-[var(--background)] min-h-screen">


            {/* Products Section */}
            <section className="section-padding">
                <div className="container-premium">
                    {/* Toolbar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                        <p className="text-sm text-[var(--text-muted)]">
                            Showing {sortedProducts.length} products
                        </p>

                        {/* Sort Dropdown */}
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as SortOption)}
                                className="appearance-none px-4 py-2 pr-10 bg-white rounded-lg shadow-sm text-sm text-[var(--primary)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--highlight)]"
                            >
                                <option value="featured">Featured</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="name">Name: A to Z</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
                        </div>
                    </div>

                    {/* Products Grid */}
                    {sortedProducts.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                            {sortedProducts.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-20px" }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="h-full"
                                >
                                    <ProductCard product={product} />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-[var(--text-muted)] mb-4">
                                No products found in this category.
                            </p>
                            <Link href="/shop" className="btn-primary">
                                Browse All Products
                            </Link>
                        </div>
                    )}

                    {/* FAQ Section */}
                    {currentFaqs && (
                        <div className="max-w-2xl mx-auto border-t border-[var(--primary)]/10 pt-16 mt-16">
                            <div className="text-center mb-10">
                                <h3
                                    className="text-2xl md:text-3xl font-semibold text-[var(--primary)] mb-4"
                                    style={{ fontFamily: "var(--font-peachi)" }}
                                >
                                    Common Questions
                                </h3>
                            </div>

                            <div className="space-y-4">
                                {currentFaqs.map((faq, index) => (
                                    <FAQItem key={index} question={faq.question} answer={faq.answer} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
