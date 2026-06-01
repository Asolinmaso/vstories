"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import Image from "next/image";
import Link from "next/link";
import { Loader2, ShoppingBag, ChevronRight } from "lucide-react";

interface OrderItem {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  image?: string | string[];
}

interface Order {
  id: string;
  created_at: string;
  total: number;
  amount: number;
  status: string;
  items?: OrderItem[];
}

function StatusBadge({ status }: { status: string }) {
  const s = status?.toLowerCase();
  if (s === "delivered") {
    return (
      <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full font-inter text-[11px] md:text-[12px] font-medium min-w-[90px]" style={{ backgroundColor: "#1D3B29", color: "#F7EDE2" }}>
        Delivered
      </span>
    );
  }
  if (s === "shipped") {
    return (
      <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full font-inter text-[11px] md:text-[12px] font-medium min-w-[90px]" style={{ backgroundColor: "#778E6B", color: "#F7EDE2" }}>
        Shipped
      </span>
    );
  }
  if (s === "processing" || s === "pending" || s === "confirmed" || s === "paid") {
    return (
      <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full font-inter text-[11px] md:text-[12px] font-medium min-w-[90px]" style={{ backgroundColor: "#F2E4D5", color: "#2E2E2E" }}>
        Processing
      </span>
    );
  }
  return (
    <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full font-inter text-[11px] md:text-[12px] font-medium min-w-[90px] bg-gray-100 text-gray-600 capitalize">
      {status}
    </span>
  );
}

export default function ClientOrders() {
  const { user, loading, signOut, isAdmin } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"recent" | "past">("recent");
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
  const joinYear = user?.created_at ? new Date(user.created_at).getFullYear() : "2026";

  useEffect(() => {
    if (!user) return;
    setOrdersLoading(true);
    fetch("/api/user/orders")
      .then((res) => res.json())
      .then((data) => {
        if (data.orders) setOrders(data.orders);
      })
      .catch((err) => console.error("Error fetching orders:", err))
      .finally(() => setOrdersLoading(false));
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FCFAF4]">
        <Loader2 className="w-8 h-8 animate-spin text-[#1D3B29]" />
      </div>
    );
  }

  const recentOrders = orders.filter((o) => o.status !== "delivered" && o.status !== "cancelled");
  const pastOrders = orders.filter((o) => o.status === "delivered" || o.status === "cancelled");
  const displayedOrders = activeTab === "recent" ? recentOrders : pastOrders;
  const visibleOrders = showAll ? displayedOrders : displayedOrders.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FCFAF4] py-12 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[100px]">
        {/* Header */}
        <div className="mb-10 lg:mb-12">
          <h1 className="font-playfair font-semibold text-[#2E2E2E] text-3xl md:text-4xl lg:text-[40px] leading-tight mb-2">
            Welcome {displayName}!
          </h1>
          <p className="font-inter text-[#2E2E2E] opacity-70 text-[14px]">
            Member Since {joinYear}
          </p>
        </div>

        {/* Layout Grid */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Sidebar */}
          <ProfileSidebar onSignOut={handleSignOut} isAdmin={isAdmin} />

          {/* Right Content */}
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            {/* Orders Card */}
            <div className="bg-[#F4EEE2] rounded-[16px] p-6 lg:p-8 border border-black/5 flex-1 h-full min-h-[500px]">
              {/* Tabs */}
              <div className="flex justify-start gap-4 md:gap-6 mb-6">
                <button
                  onClick={() => { setActiveTab("recent"); setShowAll(false); }}
                  className={`font-inter text-[18px] md:text-[18px] transition-all ${
                    activeTab === "recent"
                      ? "font-semibold text-[#000000]"
                      : "font-normal text-[#2E2E2E] hover:text-[#000000]"
                  }`}
                >
                  Recent Orders
                </button>
                <button
                  onClick={() => { setActiveTab("past"); setShowAll(false); }}
                  className={`font-inter text-[18px] md:text-[18px] transition-all ${
                    activeTab === "past"
                      ? "font-semibold text-[#000000]"
                      : "font-normal text-[#2E2E2E] hover:text-[#000000]"
                  }`}
                >
                  Past Orders
                </button>
              </div>

              {/* Orders Content */}
              {ordersLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-[#1D3B29]" />
                </div>
              ) : displayedOrders.length === 0 ? (
                /* Empty State in White Card */
                <div className="bg-white rounded-[16px] flex flex-col items-center justify-center py-16 gap-3">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: "#1D3B29" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="#F4F0EC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="#F4F0EC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 11H12.01" stroke="#F4F0EC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="font-inter font-bold text-[18px] text-[#000000]">
                    No Active Orders
                  </h3>
                  <p className="font-inter text-[14px] text-[#2E2E2E] text-center max-w-[280px]">
                    Your herbal journey begins here.<br/>Discover our premium collection.
                  </p>
                  <Link
                    href="/shop"
                    className="mt-4 px-6 py-2.5 rounded-[6px] font-inter font-medium text-[13px] transition-colors hover:opacity-90"
                    style={{ backgroundColor: "#1D3B29", color: "#F7EDE2" }}
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                /* Orders Table */
                <div className="flex flex-col gap-6">
                  {/* Mobile View */}
                  <div className="block md:hidden bg-white rounded-[16px] p-4 mx-auto max-w-[400px]">
                    <div className="flex flex-col divide-y divide-[#1D3B29]/20">
                      {visibleOrders.map((order) => {
                        const firstItem = order.items?.[0];
                        const qty = firstItem?.quantity ?? 1;
                        const productName = firstItem?.name ?? "Product";
                        const productSize = firstItem?.size ?? "";
                        const rawImage = firstItem?.image;
                        const productImage = Array.isArray(rawImage) ? rawImage[0] : (rawImage || null);
                        const orderedDate = new Date(order.created_at).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        });

                        return (
                          <Link href={`/profile/orders/${order.id}`} key={order.id} className="flex items-center gap-3 py-4">
                            <div className="w-[64px] h-[64px] shrink-0 rounded-[8px] overflow-hidden bg-[#1D3B29]/10 flex items-center justify-center">
                               {productImage ? (
                                 // eslint-disable-next-line @next/next/no-img-element
                                 <img src={productImage} alt={productName} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                               ) : (
                                 <ShoppingBag className="w-5 h-5 text-[#1D3B29]/40" />
                               )}
                            </div>
                            <div className="flex flex-col flex-1 min-w-0 justify-center">
                               <h4 className="font-inter font-medium text-[14px] text-[#2E2E2E] truncate leading-tight">{productName}</h4>
                               {productSize && <span className="font-inter text-[12px] text-[#2E2E2E] truncate mt-0.5">{productSize}</span>}
                               <span className="font-inter text-[12px] text-[#2E2E2E] truncate mt-0.5">₹{order.amount ?? order.total ?? "—"} | Qty - {qty}</span>
                               <span className="font-inter text-[12px] text-[#2E2E2E] truncate mt-0.5">{orderedDate}</span>
                               {order.status?.toLowerCase() === "delivered" && (
                                 <span className="font-inter text-[12px] text-[#2E2E2E] truncate mt-0.5 capitalize">{order.status}</span>
                               )}
                            </div>
                            <div className="flex items-center justify-end gap-1.5 shrink-0">
                               {order.status?.toLowerCase() === "delivered" ? (
                                 <button 
                                   className="bg-[#1D3B29] text-[#F7EDE2] font-inter text-[11px] font-medium px-4 py-1.5 rounded-full hover:bg-[#2A4F38] transition-colors"
                                   onClick={(e) => {
                                     e.preventDefault();
                                     // TODO: Handle Reorder
                                   }}
                                 >
                                   Reorder
                                 </button>
                               ) : (
                                 <>
                                   <StatusBadge status={order.status} />
                                   <ChevronRight className="w-[18px] h-[18px] text-[#2E2E2E] shrink-0" strokeWidth={2} />
                                 </>
                               )}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Desktop View */}
                  <div className="hidden md:block bg-white rounded-[16px] px-8 py-6">
                    {/* Table Header */}
                    <div className="grid grid-cols-[2fr_1fr_1.2fr_0.8fr_1.2fr_0.8fr] gap-3 pb-3 border-b border-black/20 mb-1">
                      {["Product", "Price", "Ordered Date", "Quantity", "Status", "Action"].map((h) => (
                        <span key={h} className="font-inter font-semibold text-[13px] text-[#2E2E2E]">
                          {h}
                        </span>
                      ))}
                    </div>

                    {/* Table Rows */}
                    <div className="flex flex-col">
                      {visibleOrders.map((order) => {
                        const firstItem = order.items?.[0];
                        const qty = firstItem?.quantity ?? 1;
                        const productName = firstItem?.name ?? "Product";
                        const productSize = firstItem?.size ?? "";
                        // image can be a string URL or an array of URLs
                        const rawImage = firstItem?.image;
                        const productImage = Array.isArray(rawImage) ? rawImage[0] : (rawImage || null);
                        const orderedDate = new Date(order.created_at).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        });

                        return (
                          <div
                            key={order.id}
                            className="grid grid-cols-[2fr_1fr_1.2fr_0.8fr_1.2fr_0.8fr] gap-3 items-center py-5 border-b border-black/10 last:border-0"
                          >
                            {/* Product */}
                            <div className="flex items-center gap-4 min-w-0">
                              <div className="w-[48px] h-[48px] shrink-0 rounded-[8px] bg-[#1D3B29]/10 overflow-hidden flex items-center justify-center">
                                {productImage ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img
                                    src={productImage}
                                    alt={productName}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).style.display = "none";
                                    }}
                                  />
                                ) : (
                                  <ShoppingBag className="w-5 h-5 text-[#1D3B29]/40" />
                                )}
                              </div>
                              <div className="flex flex-col min-w-0 justify-center">
                                <span className="font-inter font-medium text-[13px] text-[#2E2E2E] truncate leading-tight">{productName}</span>
                                {productSize && (
                                  <span className="font-inter text-[11px] text-[#2E2E2E] mt-0.5">{productSize}</span>
                                )}
                              </div>
                            </div>

                            {/* Price */}
                            <span className="font-inter text-[13px] text-[#2E2E2E]">₹{order.amount ?? order.total ?? "—"}</span>

                            {/* Date */}
                            <span className="font-inter text-[13px] text-[#2E2E2E]">{orderedDate}</span>

                            {/* Quantity */}
                            <span className="font-inter text-[13px] text-[#2E2E2E]">
                              {String(qty).padStart(2, "0")}
                            </span>

                            {/* Status */}
                            <div>
                              <StatusBadge status={order.status} />
                            </div>

                            {/* Action */}
                            <div>
                              <Link
                                href={`/profile/orders/${order.id}`}
                                className="inline-flex items-center justify-center px-6 py-2 rounded-[6px] font-inter text-[12px] font-medium transition-colors hover:opacity-90"
                                style={{ backgroundColor: "#1D3B29", color: "#F7EDE2" }}
                              >
                                View
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>


                  {/* View All Button */}
                  {displayedOrders.length > 3 && (
                    <div className="flex justify-center mt-6">
                      <button
                        onClick={() => setShowAll(!showAll)}
                        className="px-8 py-2.5 rounded-[8px] font-inter font-medium text-[13px] transition-colors hover:bg-[#2A4F38]"
                        style={{ backgroundColor: "#1D3B29", color: "#F7EDE2" }}
                      >
                        {showAll ? "View Less" : "View All"}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Member Offers Banner */}
            <div className="relative rounded-[16px] overflow-hidden bg-[#D3C5B1] min-h-[160px] flex items-center p-6 lg:p-8">
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/profile.png"
                  alt="Exclusive offers"
                  fill
                  priority
                  className="object-cover object-[65%_75%] lg:object-[100%_75%]"
                />
              </div>
              <div className="relative z-10 max-w-[400px] flex flex-col items-start gap-3">
                <h3 className="font-inter font-bold text-[18px] text-[#2E2E2E]">
                  Exclusive Member Offers
                </h3>
                <p className="font-inter text-[14px] leading-relaxed text-[#2E2E2E]">
                  You have unlocked free shipping on all orders over ₹999. Use code{" "}
                  <span className="font-semibold">VSTORY10</span> for 10% off your next purchase.
                </p>
                <Link
                  href="/shop"
                  className="mt-2 font-inter font-medium text-[13px] px-5 py-2.5 rounded-[8px] transition-all hover:bg-[#2A4F38]"
                  style={{ backgroundColor: "#1D3B29", color: "#F7EDE2" }}
                >
                  Browse Premium Collections
                </Link>
              </div>
            </div>

            {/* Need Help Card (Mobile Only) */}
            <div className="flex lg:hidden bg-[#F7EDE2] rounded-[16px] p-6 flex-col items-center text-center mt-4">
              <Image src="/images/icons/help.png" alt="Help" width={32} height={32} className="mb-3 object-contain" style={{ width: "auto", height: "auto" }} />
              <h3 className="font-inter font-semibold text-[#1D3B29] text-[24px] mb-1 leading-none">Need Help?</h3>
              <p className="font-inter text-[#1D3B29] text-[13px] opacity-80 mb-5">
                We're here to help you.
              </p>
              <Link
                href="/contact"
                className="bg-[#1D3B29] text-white font-inter font-medium text-[14px] px-6 py-2.5 rounded-[8px] hover:bg-[#2A4F38] transition-all"
                style={{ color: "#F7EDE2" }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
