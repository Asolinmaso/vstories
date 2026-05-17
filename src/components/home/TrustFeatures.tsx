import Image from "next/image";

export default function TrustFeatures() {
  const features = [
    {
      title: "Free Shipping",
      desc: "On orders above ₹799",
      icon: (
        <div className="relative w-10 h-10">
          <Image
            src="/images/icons/shippings.png"
            alt="Free Shipping"
            fill
            className="object-contain"
          />
        </div>
      ),
    },
    {
      title: "Cash On Delivery",
      desc: "₹25 Per Order",
      icon: (
        <div className="relative w-10 h-10">
          <Image
            src="/images/icons/savings.png"
            alt="Cash On Delivery"
            fill
            className="object-contain"
          />
        </div>
      ),
    },
    {
      title: "Secure Payments",
      desc: "Razor Pay Payment",
      icon: (
        <div className="relative w-10 h-10">
          <Image
            src="/images/icons/payments.png"
            alt="Secure Payments"
            fill
            className="object-contain"
          />
        </div>
      ),
    },
  ];

  return (
    <div
      className="w-full"
      style={{ background: "#F7F3EF", height: "185px", display: "flex", alignItems: "center" }}
    >
      <div className="w-full max-w-[1440px] mx-auto px-[100px]">
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
