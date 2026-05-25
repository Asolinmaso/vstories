"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus } from "lucide-react";
import { useCartStore, getCartItemKey } from "@/lib/store";
import YouMayAlsoLike from "@/components/home/YouMayAlsoLike";

function TeardropIcon() {
    return (
        <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 0C5 0 0 5.4 0 8.4C0 11.1614 2.23858 13.4 5 13.4C7.76142 13.4 10 11.1614 10 8.4C10 5.4 5 0 5 0Z" fill="#C89753" />
        </svg>
    );
}

export default function CartPage() {
    const { items, removeItem, updateQuantity, getTotal } = useCartStore();
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = getTotal();
    const shipping = subtotal > 0 ? 60 : 0;
    const discount = 0;
    const total = subtotal + shipping - discount;

    const getHighlights = (productName: string) => {
        const name = productName.toLowerCase();
        if (name.includes("oil")) {
            return ["Helps reduce hair fall", "Nourishes scalp", "Strengthens roots"];
        }
        if (name.includes("shampoo")) {
            return ["Cleanses gently", "Adds natural shine", "Maintains scalp health"];
        }
        if (name.includes("facepack") || name.includes("face pack")) {
            return ["Reduces acne", "Brightens skin", "Removes tan"];
        }
        return ["Premium herbal ingredients", "100% Natural", "Chemical free"];
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#F4F0EC]">
            <main className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-[100px] py-10 lg:py-16">

                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-[42px] text-[#2E2E2E] font-normal mb-2 flex items-baseline">
                        <span style={{ fontFamily: "var(--font-peachi)" }}>My Cart</span>
                        <span className="font-serif ml-2">
                            ({cartCount.toString().padStart(2, '0')})
                        </span>
                    </h1>
                    <p className="text-[#4A4A4A] mt-1 text-[16px] font-inter">
                        Review your selected products and proceed to secure checkout.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Left Column: Cart Items */}
                    <div className="w-full lg:w-[65%] space-y-5">
                        {items.length === 0 ? (
                            <div className="bg-transparent rounded-[12px] p-8 text-center border border-[#8C8C8C] shadow-sm">
                                <h2 className="text-xl font-medium text-[#2E2E2E] mb-4 font-inter">Your cart is empty</h2>
                                <Link href="/shop" className="inline-block bg-[#1A3026] text-white px-6 py-3 rounded-md hover:bg-[#2A4F38] transition-colors font-inter">
                                    Continue Shopping
                                </Link>
                            </div>
                        ) : (
                            items.map((item, index) => {
                                const itemKey = getCartItemKey(item);
                                const highlights = getHighlights(item.name);

                                return (
                                    <div key={itemKey || `${item.id}-${index}`} className="bg-transparent rounded-[12px] p-4 flex flex-col sm:flex-row gap-6 relative" style={{ border: '1px solid #7D7D7D' }}>
                                        
                                        {/* Delete Button */}
                                        <button
                                            onClick={() => removeItem(itemKey)}
                                            className="absolute top-5 right-5 text-[#8C8C8C] hover:text-[#2E2E2E] transition-colors"
                                        >
                                            <Trash2 className="w-[18px] h-[18px]" strokeWidth={1.5} />
                                        </button>

                                        {/* Product Image */}
                                        <div className="relative w-full sm:w-[220px] h-[220px] rounded-[8px] overflow-hidden bg-[#F4F0EC] shrink-0">
                                            {item.image ? (
                                                <Image 
                                                    src={item.image} 
                                                    alt={item.name} 
                                                    fill 
                                                    unoptimized 
                                                    className="object-cover" 
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.srcset = '';
                                                        target.src = '/images/products/shampoo.png';
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[#1A3026] font-medium font-inter">{item.name.charAt(0)}</div>
                                            )}
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                <h3 className="text-[20px] font-semibold text-[#2E2E2E] pr-8 font-inter">{item.name}</h3>
                                                {item.size ? (
                                                    <p className="text-[14px] text-[#2E2E2E] mt-1.5 font-inter"><span className="font-semibold">Size :</span> {item.size}</p>
                                                ) : (
                                                    <p className="text-[14px] text-[#2E2E2E] mt-1.5 font-inter"><span className="font-semibold">Size :</span> 200 ml</p>
                                                )}

                                                {/* Highlights */}
                                                <div className="mt-4">
                                                    <p className="text-[13px] font-semibold text-[#2E2E2E] mb-2 font-inter">Highlights</p>
                                                    <ul className="space-y-1.5">
                                                        {highlights.map((highlight, idx) => (
                                                            <li key={idx} className="flex items-center gap-2 text-[13px] text-[#4A4A4A] font-inter">
                                                                <TeardropIcon />
                                                                {highlight}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            {/* Bottom row: Quantity and Price */}
                                            <div className="flex items-end justify-between mt-6">
                                                {/* Quantity Selector */}
                                                <div className="flex items-center gap-4 bg-transparent border border-[#7D7D7D] rounded-[6px] px-3 py-1.5 w-fit">
                                                    <button onClick={() => updateQuantity(itemKey, Math.max(1, item.quantity - 1))} className="text-[#2E2E2E] hover:text-black">
                                                        <Minus className="w-[14px] h-[14px]" strokeWidth={2} />
                                                    </button>
                                                    <span className="w-6 text-center text-[15px] font-medium text-[#2E2E2E] font-inter">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(itemKey, item.quantity + 1)} className="text-[#2E2E2E] hover:text-black">
                                                        <Plus className="w-[14px] h-[14px]" strokeWidth={2} />
                                                    </button>
                                                </div>

                                                {/* Price */}
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[24px] font-semibold text-[#2E2E2E] font-inter">₹{item.price}</span>
                                                    <span className="text-[16px] text-[#4A4A4A] line-through font-inter font-normal">(₹{item.price + 20})</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="w-full lg:w-[35%]">
                        <div className="bg-transparent rounded-[12px] p-6 sticky top-24" style={{ border: '1px solid #7D7D7D' }}>
                            <h2 className="text-[20px] font-semibold text-[#2E2E2E] mb-6 font-inter">Order Summary</h2>

                            <div className="space-y-3.5 mb-6">
                                <div className="flex justify-between text-[14px] font-inter">
                                    <span className="text-[#2E2E2E] font-semibold">Subtotal</span>
                                    <span className="text-[#4A4A4A]">₹{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-[14px] font-inter">
                                    <span className="text-[#2E2E2E] font-semibold">Discount</span>
                                    <span className="text-[#4A4A4A]">-₹{discount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-[14px] font-inter pb-2 border-b border-[#7D7D7D]/30">
                                    <span className="text-[#2E2E2E] font-semibold">Shipping</span>
                                    <span className="text-[#4A4A4A]">₹{shipping.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="pb-6">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-[16px] font-semibold text-[#2E2E2E] font-inter">Total</span>
                                    <span className="text-[16px] text-[#4A4A4A] font-inter">₹{total.toFixed(2)}</span>
                                </div>
                                <p className="text-[13px] text-[#4A4A4A] font-inter">Inclusive of all taxes</p>
                            </div>

                            {/* Coupon Section */}
                            <div className="mb-6 bg-transparent border border-[#7D7D7D] rounded-[8px] p-4">
                                <label className="block text-[13px] text-[#2E2E2E] mb-3 font-inter">Have coupon code?</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Enter Code"
                                        className="flex-1 bg-white border border-[#7D7D7D] rounded-[4px] px-3 py-2 text-[14px] font-inter focus:outline-none"
                                        style={{ color: '#2E2E2E' }}
                                    />
                                    <button 
                                        className="px-6 py-2 rounded-[4px] text-[14px] font-medium transition-colors hover:opacity-90 font-inter"
                                        style={{ backgroundColor: '#1A3026', color: '#FFFFFF' }}
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={() => router.push("/checkout")}
                                disabled={items.length === 0}
                                className="w-full py-3 rounded-[4px] text-[15px] font-medium transition-colors hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed font-inter"
                                style={{ backgroundColor: '#1A3026', color: '#FFFFFF' }}
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* You May Also Like */}
            <div className="pb-16 md:pb-24">
                <YouMayAlsoLike className="mt-8 md:mt-16" />
            </div>

        </div>
    );
}
