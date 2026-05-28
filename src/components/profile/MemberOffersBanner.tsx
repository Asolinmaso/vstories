import Image from "next/image";
import Link from "next/link";

export default function MemberOffersBanner() {
    return (
        <div className="relative mt-6 lg:mt-8 overflow-hidden rounded-[24px] bg-[#EAEAEA] min-h-[180px] lg:min-h-[214px]">
            <Image
                src="/images/hero-main.png"
                alt="Exclusive member offers"
                fill
                className="object-cover object-right"
                sizes="(max-width: 1024px) 100vw, 916px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#EAEAEA] via-[#EAEAEA]/95 to-transparent" />
            <div className="relative z-10 flex flex-col justify-center px-6 py-8 sm:px-8 lg:px-8 lg:py-8 max-w-xl">
                <h3 className="font-inter text-xl lg:text-2xl font-semibold text-black">
                    Exclusive Member Offers
                </h3>
                <p className="mt-3 font-inter text-sm lg:text-base leading-[19px] text-black max-w-[438px]">
                    You have unlocked free shipping on all orders over ₹999. Use code{" "}
                    <span className="font-semibold">VSTORY10</span> for 10% off your next purchase.
                </p>
                <Link
                    href="/shop"
                    className="mt-5 inline-flex w-fit items-center justify-center rounded-[8px] bg-[#1D3B29] px-6 py-3 font-inter text-base font-medium text-[#F7EDE2] transition-colors hover:bg-[#2A4F38]"
                >
                    Browse Premium Collections
                </Link>
            </div>
        </div>
    );
}
