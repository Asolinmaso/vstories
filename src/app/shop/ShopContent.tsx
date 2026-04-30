"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ChevronDown, Check, X } from "lucide-react";
import { categories } from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/lib/services/product.service";

type SortOption = "featured" | "price-asc" | "price-desc" | "name";

import { useSearchParams } from "next/navigation";

// ... imports

export default function ShopContent({ initialProducts }: { initialProducts: Product[] }) {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("search")?.toLowerCase() || "";

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<SortOption>("featured");
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const filteredProducts = initialProducts
        .filter((product) => {
            // 1. Search Filter (Priority)
            if (searchQuery) {
                return (
                    product.name.toLowerCase().includes(searchQuery) ||
                    product.short_description?.toLowerCase().includes(searchQuery) ||
                    product.slug.includes(searchQuery)
                );
            }

            // 2. Category Filter
            if (!selectedCategory) return true;
            if (selectedCategory === "bestseller") return product.is_bestseller;
            return product.category_id === selectedCategory || product.category_id === categories.find(c => c.slug === selectedCategory)?.id;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "price-asc":
                    return a.price - b.price;
                case "price-desc":
                    return b.price - a.price;
                case "name":
                    return a.name.localeCompare(b.name);
                default:
                    return 0;
            }
        });

    const sortOptions = [
        { value: "featured", label: "Featured" },
        { value: "price-asc", label: "Price: Low to High" },
        { value: "price-desc", label: "Price: High to Low" },
        { value: "name", label: "Name: A to Z" },
    ];

    return (
        <div className="bg-[var(--background)] min-h-screen">
            <section className="py-12 md:py-16">
                <div className="container-premium">
                    <div className="">
                        {/* Main Content */}
                        <div>
                            {/* Toolbar */}
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
                                {/* Filter Button */}
                                <button
                                    onClick={() => setIsMobileFilterOpen(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-[var(--primary)] hover:border-[var(--primary)] transition-colors"
                                >
                                    <Filter className="w-4 h-4" />
                                    Filter
                                </button>

                                {/* Results Count */}
                                <p className="text-sm text-[var(--text-secondary)] font-medium hidden sm:block">
                                    Showing {filteredProducts.length} products
                                </p>

                                {/* Sort Dropdown */}
                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                                        className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-[var(--primary)] cursor-pointer focus:outline-none focus:border-[var(--primary)] transition-colors min-w-[180px]"
                                    >
                                        {sortOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
                                </div>
                            </div>

                            {/* Products Grid */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10">
                                {filteredProducts.map((product, index) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-20px" }}
                                        transition={{ duration: 0.4 }}
                                        className="h-full"
                                    >
                                        <ProductCard product={product} />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Empty State */}
                            {filteredProducts.length === 0 && (
                                <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-gray-200">
                                    <p className="text-lg text-[var(--text-secondary)] mb-2">
                                        No products found in this category.
                                    </p>
                                    <button
                                        onClick={() => setSelectedCategory(null)}
                                        className="text-[var(--primary)] underline font-medium hover:text-[var(--highlight)]"
                                    >
                                        Clear all filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter Drawer */}
            {isMobileFilterOpen && (
                <div className="fixed inset-0 z-50">
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsMobileFilterOpen(false)}
                    />
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 25 }}
                        className="absolute left-0 top-0 bottom-0 w-[320px] bg-[var(--background)] p-6 shadow-2xl overflow-y-auto"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h3
                                className="text-xl font-semibold text-[var(--primary)]"
                                style={{ fontFamily: "var(--font-peachi)" }}
                            >
                                Filter Products
                            </h3>
                            <button
                                onClick={() => setIsMobileFilterOpen(false)}
                                className="p-2 text-[var(--primary)] hover:bg-[var(--primary)]/5 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--primary)] mb-4">
                                    Categories
                                </h4>
                                <ul className="space-y-2">
                                    <li>
                                        <button
                                            onClick={() => {
                                                setSelectedCategory(null);
                                                setIsMobileFilterOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2.5 rounded-lg transition-all ${selectedCategory === null
                                                ? "bg-[var(--primary)] text-white font-medium shadow-md"
                                                : "text-[var(--text-secondary)] hover:bg-[var(--primary)]/5"
                                                }`}
                                        >
                                            All Products
                                        </button>
                                    </li>
                                    {categories.map((category) => (
                                        <li key={category.id}>
                                            <button
                                                onClick={() => {
                                                    setSelectedCategory(category.slug);
                                                    setIsMobileFilterOpen(false);
                                                }}
                                                className={`w-full text-left px-4 py-2.5 rounded-lg transition-all ${selectedCategory === category.slug
                                                    ? "bg-[var(--primary)] text-white font-medium shadow-md"
                                                    : "text-[var(--text-secondary)] hover:bg-[var(--primary)]/5"
                                                    }`}
                                            >
                                                {category.name}
                                            </button>
                                        </li>
                                    ))}
                                    <li>
                                        <button
                                            onClick={() => {
                                                setSelectedCategory("bestseller");
                                                setIsMobileFilterOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2.5 rounded-lg transition-all ${selectedCategory === "bestseller"
                                                ? "bg-[var(--primary)] text-white font-medium shadow-md"
                                                : "text-[var(--text-secondary)] hover:bg-[var(--primary)]/5"
                                                }`}
                                        >
                                            Bestsellers
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
