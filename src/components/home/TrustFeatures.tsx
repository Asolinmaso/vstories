"use client";

import { Truck, Wallet, ShieldCheck, RefreshCw } from "lucide-react";

export default function TrustFeatures() {
  const features = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Free Shipping",
      desc: "On orders above ₹799"
    },
    {
      icon: <Wallet className="w-8 h-8" />,
      title: "Cash On Delivery",
      desc: "Available for all orders"
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Secure Payments",
      desc: "100% Safe & Secure"
    },
    {
      icon: <RefreshCw className="w-8 h-8" />,
      title: "Easy Returns",
      desc: "7 Days Return Policy"
    }
  ];

  return (
    <div className="bg-[#1D3B29] py-20 border-t border-white/10">
      <div className="container-premium">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center text-center gap-6 p-8 lg:p-4 text-white group">
              <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center mb-2 group-hover:bg-white group-hover:text-[#1D3B29] transition-all duration-500 shadow-xl shadow-black/20">
                <div className="group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-xl font-bold font-inter tracking-tight">{feature.title}</h4>
                <p className="text-sm font-medium font-inter text-white/60 leading-relaxed max-w-[200px]">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
