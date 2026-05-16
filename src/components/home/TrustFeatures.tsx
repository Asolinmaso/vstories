"use client";

export default function TrustFeatures() {
  const features = [
    {
      title: "Free Shipping",
      desc: "On orders above ₹799",
      icon: (
        <svg width="50" height="40" viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1.25" y="1.25" width="30" height="22.5" rx="1" stroke="#1D3B29" strokeWidth="2.5"/>
          <path d="M31.25 11.25H42.5L48.75 20V31.25H31.25V11.25Z" stroke="#1D3B29" strokeWidth="2.5" strokeLinejoin="round"/>
          <circle cx="11.25" cy="33.75" r="5" stroke="#1D3B29" strokeWidth="2.5"/>
          <circle cx="40" cy="33.75" r="5" stroke="#1D3B29" strokeWidth="2.5"/>
          <path d="M16.25 33.75H31.25" stroke="#1D3B29" strokeWidth="2.5"/>
        </svg>
      ),
    },
    {
      title: "Cash On Delivery",
      desc: "₹25 Per Order",
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="10" width="36" height="26" rx="3" stroke="#1D3B29" strokeWidth="2.5"/>
          <path d="M2 18H38" stroke="#1D3B29" strokeWidth="2.5"/>
          <path d="M10 26H16" stroke="#1D3B29" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M22 26H30" stroke="#1D3B29" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M14 10V6" stroke="#1D3B29" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M26 10V6" stroke="#1D3B29" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      title: "Secure Payments",
      desc: "Razor Pay Payment",
      icon: (
        <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.5 2L3 8V20C3 28.284 9.64 35.944 17.5 38C25.36 35.944 32 28.284 32 20V8L17.5 2Z" stroke="#1D3B29" strokeWidth="2.5" strokeLinejoin="round"/>
          <path d="M12 20L16 24L24 16" stroke="#1D3B29" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ];

  return (
    <div
      className="w-full"
      style={{ background: "#F7F3EF", height: "185px", display: "flex", alignItems: "center" }}
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-[100px]">
        <div className="flex items-center justify-around">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-3"
              style={{ width: "216px" }}
            >
              {/* Icon */}
              <div className="flex items-center justify-center" style={{ height: "40px" }}>
                {feature.icon}
              </div>

              {/* Text */}
              <div className="flex flex-col items-center gap-2">
                <h4
                  className="font-playfair font-semibold text-[#2E2E2E] text-center"
                  style={{ fontSize: "24px", lineHeight: "32px" }}
                >
                  {feature.title}
                </h4>
                <p
                  className="font-inter font-normal text-[#2E2E2E] text-center"
                  style={{ fontSize: "16px", lineHeight: "19px" }}
                >
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
