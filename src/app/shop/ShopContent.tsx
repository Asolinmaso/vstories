"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ChevronDown, Check, X } from "lucide-react";
import { categories } from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/lib/services/product.service";

type SortOption = "featured" | "price-asc" | "price-desc" | "name";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

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
            {/* Page Header */}
            <header className="py-12 md:py-20 bg-white border-b border-gray-100">
                <div className="container-premium text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-[var(--primary)] mb-4" style={{ fontFamily: "var(--font-peachi)" }}>
                        {selectedCategory ? (selectedCategory === "bestseller" ? "Bestsellers" : categories.find(c => c.slug === selectedCategory)?.name) : "Our Collection"}
                    </h1>
                    <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
                        Discover our premium range of 100% natural, chemical-free herbal solutions for your daily care.
                    </p>
                </div>
            </header>

            <section className="py-12 md:py-16">
                <div className="container-premium">
                    <div className="flex flex-col lg:flex-row gap-12">
                        
                        {/* Desktop Sidebar Filters */}
                        <aside className="hidden lg:block w-64 flex-shrink-0 space-y-10">
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--primary)] mb-6">Categories</h3>
                                <ul className="space-y-4">
                                    <li>
                                        <button
                                            onClick={() => setSelectedCategory(null)}
                                            className={`text-sm transition-all hover:translate-x-1 flex items-center gap-2 ${!selectedCategory ? "text-[var(--highlight)] font-bold" : "text-gray-500"}`}
                                        >
                                            {!selectedCategory && <div className="w-1.5 h-1.5 rounded-full bg-[var(--highlight)]" />}
                                            All Products
                                        </button>
                                    </li>
                                    {categories.map((category) => (
                                        <li key={category.id}>
                                            <button
                                                onClick={() => setSelectedCategory(category.slug)}
                                                className={`text-sm transition-all hover:translate-x-1 flex items-center gap-2 ${selectedCategory === category.slug ? "text-[var(--highlight)] font-bold" : "text-gray-500"}`}
                                            >
                                                {selectedCategory === category.slug && <div className="w-1.5 h-1.5 rounded-full bg-[var(--highlight)]" />}
                                                {category.name}
                                            </button>
                                        </li>
                                    ))}
                                    <li>
                                        <button
                                            onClick={() => setSelectedCategory("bestseller")}
                                            className={`text-sm transition-all hover:translate-x-1 flex items-center gap-2 ${selectedCategory === "bestseller" ? "text-[var(--highlight)] font-bold" : "text-gray-500"}`}
                                        >
                                            {selectedCategory === "bestseller" && <div className="w-1.5 h-1.5 rounded-full bg-[var(--highlight)]" />}
                                            Bestsellers
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            <div className="pt-8 border-t border-gray-100">
                                <div className="bg-[var(--primary)] p-6 rounded-3xl text-white">
                                    <h4 className="font-heading text-xl mb-2">Need Help?</h4>
                                    <p className="text-xs text-white/70 mb-4">Our herbal experts are here to guide you.</p>
                                    <Link href="/contact" className="text-xs font-bold text-[var(--highlight)] hover:underline">Chat with us →</Link>
                                </div>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <div className="flex-1">
                            {/* Toolbar */}
                            <div className="flex items-center justify-between gap-4 mb-10 pb-6 border-b border-gray-100">
                                {/* Mobile Filter Toggle */}
                                <button
                                    onClick={() => setIsMobileFilterOpen(true)}
                                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm font-bold text-[var(--primary)]"
                                >
                                    <Filter className="w-4 h-4" />
                                    Filter
                                </button>

                                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                    {filteredProducts.length} Results found
                                </p>

                                <div className="flex items-center gap-4">
                                    <span className="hidden sm:inline text-xs font-bold uppercase tracking-widest text-gray-400">Sort by</span>
                                    <div className="relative">
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value as SortOption)}
                                            className="appearance-none pl-4 pr-10 py-2 bg-white border-0 rounded-xl text-sm font-bold text-[var(--primary)] cursor-pointer focus:ring-2 focus:ring-[var(--primary)]/10 outline-none min-w-[160px]"
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
                            </div>

                            {/* Products Grid */}
                            <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-12">
                                {filteredProducts.map((product, index) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: (index % 3) * 0.1 }}
                                        className="h-full"
                                    >
                                        <ProductCard product={product} />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Empty State */}
                            {filteredProducts.length === 0 && (
                                <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
                                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Filter className="w-10 h-10 text-gray-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                                    <p className="text-gray-500 mb-8">Try adjusting your filters to find what you're looking for.</p>
                                    <button
                                        onClick={() => setSelectedCategory(null)}
                                        className="btn-primary px-8 py-3"
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
