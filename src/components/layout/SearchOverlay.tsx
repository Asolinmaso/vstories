"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (isOpen && inputRef.current) {
            // Focus input when opened
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/shop?search=${encodeURIComponent(query.trim())}`);
            onClose();
            setQuery("");
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Search Bar Container */}
                    <motion.div
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed top-0 left-0 right-0 z-[70] bg-white shadow-xl py-6 md:py-8"
                    >
                        <div className="container-premium max-w-3xl mx-auto px-4 relative">
                            <form onSubmit={handleSearch} className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search for products..."
                                    className="w-full pl-14 pr-12 py-4 text-lg md:text-xl bg-gray-50 border-2 border-transparent focus:border-[var(--primary)] focus:bg-white rounded-full transition-all outline-none text-[var(--primary)] placeholder:text-gray-400"
                                />
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </form>

                            <div className="mt-4 flex flex-wrap gap-2 justify-center text-sm text-[var(--text-muted)]">
                                <span>Popular:</span>
                                <button 
                                    onClick={() => { setQuery("hair"); handleSearch({ preventDefault: () => { } } as any); }} 
                                    className="hover:text-[var(--primary)] underline"
                                    aria-label="Search for hair oil products"
                                >
                                    Hair Oil
                                </button>
                                <button 
                                    onClick={() => { setQuery("face"); handleSearch({ preventDefault: () => { } } as any); }} 
                                    className="hover:text-[var(--primary)] underline"
                                    aria-label="Search for face serum products"
                                >
                                    Face Serum
                                </button>
                                <button 
                                    onClick={() => { setQuery("combo"); handleSearch({ preventDefault: () => { } } as any); }} 
                                    className="hover:text-[var(--primary)] underline"
                                    aria-label="Search for gift pack products"
                                >
                                    Gift Packs
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
