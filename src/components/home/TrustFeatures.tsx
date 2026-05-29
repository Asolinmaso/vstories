import Image from "next/image";

export default function TrustFeatures() {
  const features = [
    {
      title: "Free Shipping",
      desc: "On orders above ₹749",
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
      desc: "Pay on delivery",
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
    <div className="w-full bg-[#F7F3EF] py-8 lg:h-[185px] lg:py-0 flex items-center">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[100px]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-around gap-8 sm:gap-4 lg:gap-0">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-3 w-full max-w-[216px] mx-auto sm:mx-0"
            >
              <div className="flex items-center justify-center h-10">
                {feature.icon}
              </div>

              <div className="flex flex-col items-center gap-2">
                <h4 className="font-playfair font-semibold text-[#2E2E2E] text-center text-lg lg:text-2xl lg:leading-8">
                  {feature.title}
                </h4>
                <p className="font-inter font-normal text-[#2E2E2E] text-center text-sm lg:text-base lg:leading-[19px]">
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
