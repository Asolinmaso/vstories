"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore, getCartItemKey } from "@/lib/store";
import { useAuth } from "@/context/AuthContext";
import { useLoginModal } from "@/context/LoginModalContext";
import { Trash2, Plus, Minus } from "lucide-react";
import YouMayAlsoLike from "@/components/products/YouMayAlsoLike";

function DropletIcon() {
  return (
    <svg width="10" height="13" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.61864 0.655866C4.78318 0.439396 5.11181 0.439395 5.27635 0.655865L9.12469 5.7208C9.55938 6.29286 9.77443 6.99433 9.73602 7.70889C9.69762 8.42345 9.40822 9.10825 8.9137 9.65089C8.41918 10.1935 7.74836 10.5619 7.00845 10.6976C6.26853 10.8333 5.50198 10.7291 4.83063 10.4022C4.15928 10.0754 3.62145 9.54471 3.30327 8.8953C2.98509 8.24589 2.90515 7.51613 3.07849 6.82236L4.61864 0.655866Z" fill="#E8BF72"/>
    </svg>
  );
}

export default function ClientCart() {
  const [mounted, setMounted] = useState(false);
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  const { user } = useAuth();
  const { open: openLoginModal } = useLoginModal();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCheckout = () => {
    if (!user) {
      openLoginModal();
      return;
    }
    router.push("/checkout");
  };

  const discount = items.length > 0 ? 110.00 : 0;
  const shipping = items.length > 0 ? 100.00 : 0;
  const subtotal = getTotal();
  const total = subtotal - discount + shipping;

  if (!mounted) return null;

  return (
    <div className="w-full" style={{ background: "#FDFCF8", minHeight: "100vh", paddingBottom: 60 }}>
      {/* ── Cart Section ── */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[100px] pt-12 pb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
          <div>
            <h1
              className="font-playfair font-semibold text-[#2E2E2E] mb-2"
              style={{ fontSize: 42, lineHeight: "56px" }}
            >
              My Cart ({items.length.toString().padStart(2, "0")})
            </h1>
            <p className="font-inter font-normal text-[#2E2E2E]" style={{ fontSize: 16 }}>
              Review your selected products and proceed to secure checkout.
            </p>
          </div>
          {items.length > 0 && (
            <button
              onClick={() => useCartStore.getState().clearCart()}
              className="text-[#2E2E2E]/60 hover:text-red-500 font-inter font-medium text-[14px] transition-colors border border-[#2E2E2E]/20 rounded-md px-4 py-2 shrink-0 bg-white"
            >
              Clear Cart
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-white rounded-xl border border-[#D9D9D9] py-20 text-center">
            <h3 className="font-playfair font-semibold text-[#2E2E2E] text-2xl mb-2">
              Your cart is empty
            </h3>
            <p className="font-inter text-[#666666] mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link
              href="/shop"
              className="font-inter font-medium text-white rounded hover:opacity-90 transition-all flex items-center justify-center"
              style={{ width: 180, height: 44, background: "#1D3B29", color: "#FFFFFF", fontSize: 16 }}
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left: Items List */}
            <div className="flex flex-col gap-4 flex-1 w-full">
              {items.map((item, index) => {
                const itemKey = getCartItemKey(item);
                return (
                  <div
                    key={`${itemKey}-${index}`}
                    className="flex flex-row items-start bg-[#FDFCF8] rounded-[16px] p-3 md:p-4 gap-3 md:gap-5 relative"
                    style={{ border: "1px solid rgba(46, 46, 46, 0.2)" }}
                  >
                    {/* Delete Icon */}
                    <button
                      onClick={() => removeItem(itemKey)}
                      className="absolute top-3 right-3 md:top-4 md:right-4 text-[#2E2E2E]/40 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-[18px] h-[18px] md:w-5 md:h-5" />
                    </button>

                    {/* Image */}
                    <div className="w-[88px] h-[88px] md:w-[140px] md:h-[140px] flex-shrink-0 bg-[#EAEAEA] rounded-[8px] md:rounded-[12px] overflow-hidden relative">
                      <Image
                        src={item.image || "/images/products/hair oil.png"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex flex-col flex-1 justify-between h-full py-0.5 md:py-1 pr-6 md:pr-8">
                      <div>
                        <h3 className="font-inter font-bold text-[#2E2E2E] text-[15px] md:text-[18px] leading-tight mb-1">
                          {item.name}
                        </h3>
                        <p className="font-inter font-medium text-[#2E2E2E]/80 text-[11px] md:text-[13px] mb-2 md:mb-3">
                          Size : {item.size || "200 ml"}
                        </p>

                        {/* Highlights */}
                        <div className="mb-3 md:mb-4">
                          <p className="font-inter font-bold text-[#2E2E2E] text-[11px] md:text-[13px] mb-1.5 md:mb-2">
                            Highlights
                          </p>
                          <ul className="flex flex-col gap-1 md:gap-1.5">
                            {["Helps reduce hair fall", "Nourishes scalp", "Strengthens roots"].map((hl, i) => (
                              <li key={i} className="flex items-center gap-1.5 md:gap-2">
                                <DropletIcon />
                                <span className="font-inter font-medium text-[#2E2E2E]/70 text-[10px] md:text-[12px]">
                                  {hl}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Bottom Row: Price & Quantity */}
                      <div className="flex items-center justify-between mt-auto">
                        {/* Price (Left) */}
                        <div className="flex items-center gap-1.5 md:gap-2">
                          <span className="font-inter font-bold text-[#2E2E2E] text-[16px] md:text-[20px]">
                            ₹{item.price * item.quantity}
                          </span>
                          <span className="font-inter font-medium text-[#2E2E2E]/50 line-through text-[11px] md:text-[13px]">
                            (₹{(item.price + 20) * item.quantity})
                          </span>
                        </div>

                        {/* Quantity (Right) */}
                        <div
                          className="flex items-center justify-between rounded-[6px] md:rounded-[8px] px-1.5 md:px-2"
                          style={{ border: "1px solid rgba(46, 46, 46, 0.2)", width: "72px", height: "28px" }}
                        >
                          <button
                            onClick={() => updateQuantity(itemKey, Math.max(1, item.quantity - 1))}
                            className="text-[#2E2E2E]/80 hover:text-[#1D3B29] p-1"
                          >
                            <Minus className="w-3 h-3 md:w-3.5 md:h-3.5" />
                          </button>
                          <span className="font-inter font-bold text-[#2E2E2E] text-[12px] md:text-[14px]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(itemKey, item.quantity + 1)}
                            className="text-[#2E2E2E]/80 hover:text-[#1D3B29] p-1"
                          >
                            <Plus className="w-3 h-3 md:w-3.5 md:h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Order Summary */}
            {/* Right: Order Summary */}
            <div className="w-full lg:w-[380px] bg-transparent flex-shrink-0">
              <div className="rounded-[16px] border border-[#2E2E2E]/20 p-5 md:p-6 bg-[#FDFCF8]">
                <div 
                  role="heading" 
                  aria-level={2} 
                  className="font-inter font-bold text-[18px] md:text-[20px] text-[#2E2E2E] mb-6"
                >
                  Order Summary
                </div>

                <div className="flex flex-col gap-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-inter font-bold text-[13px] md:text-[14px] text-[#2E2E2E]">Subtotal</span>
                    <span className="font-inter font-medium text-[13px] md:text-[14px] text-[#2E2E2E]/80">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-inter font-bold text-[13px] md:text-[14px] text-[#2E2E2E]">Discount</span>
                    <span className="font-inter font-medium text-[13px] md:text-[14px] text-[#2E2E2E]/80">-₹{discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-inter font-bold text-[13px] md:text-[14px] text-[#2E2E2E]">Shipping</span>
                    <span className="font-inter font-medium text-[13px] md:text-[14px] text-[#2E2E2E]/80">₹{shipping.toFixed(2)}</span>
                  </div>
                </div>

                <hr className="border-t border-[#2E2E2E]/20 mb-4" />

                <div className="flex justify-between items-center mb-1">
                  <span className="font-inter font-bold text-[15px] md:text-[16px] text-[#2E2E2E]">Total</span>
                  <span className="font-inter font-bold text-[15px] md:text-[16px] text-[#2E2E2E]">
                    ₹{total.toFixed(2)}
                  </span>
                </div>
                <p className="font-inter text-[#2E2E2E]/60 text-[11px] md:text-[12px] mb-6">Inclusive of all taxes</p>

                {/* Coupon Code */}
                <div className="rounded-[12px] border border-[#2E2E2E]/20 p-4 mb-6 bg-[#FDFCF8]">
                  <p className="font-inter text-[12px] md:text-[13px] text-[#2E2E2E]/80 mb-3">
                    Have coupon code?
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Enter Code"
                      className="flex-1 min-w-0 rounded-[8px] border border-[#2E2E2E]/20 px-3 outline-none font-inter text-[13px] bg-white focus:border-[#1D3B29]/50 transition-colors"
                      style={{ height: "40px" }}
                    />
                    <button
                      className="font-inter font-medium text-white rounded-[8px] hover:opacity-90 transition-all px-5 shrink-0"
                      style={{ height: "40px", background: "#1D3B29", fontSize: "13px" }}
                    >
                      Apply
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full font-inter font-semibold text-white rounded-[8px] hover:opacity-90 transition-all flex items-center justify-center"
                  style={{ height: "48px", background: "#1D3B29", fontSize: "15px" }}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── You May Also Like ── */}
      <YouMayAlsoLike />
    </div>
  );
}
