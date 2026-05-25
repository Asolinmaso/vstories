import Image from "next/image";
import FeaturedBestsellers from "@/components/home/FeaturedBestsellers";

interface YouMayAlsoLikeProps {
    className?: string;
    backgroundOpacity?: number;
}

export default function YouMayAlsoLike({ className = "", backgroundOpacity = 1 }: YouMayAlsoLikeProps) {
    return (
        <div className={`relative z-10 py-16 bg-transparent overflow-hidden ${className}`}>
            {/* Background Image */}
            <div className="absolute inset-0 z-0 pointer-events-none" style={{ opacity: backgroundOpacity }}>
                <Image
                    src="/images/products/background.png"
                    alt="Background Pattern"
                    fill
                    className="object-cover"
                    priority={false}
                />
            </div>

            <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-[100px] relative z-10">
                <div className="flex items-center justify-center gap-3 mb-10">
                    <div className="relative w-6 h-6">
                        <Image src="/images/icons/leafleft.png" alt="Leaf Decoration Left" fill className="object-contain" />
                    </div>
                    <h2 className="text-3xl md:text-[40px] text-center text-[#1A3026]" style={{ fontFamily: "var(--font-peachi)" }}>
                        You May Also Like
                    </h2>
                    <div className="relative w-6 h-6">
                        <Image src="/images/icons/leafright.png" alt="Leaf Decoration Right" fill className="object-contain" />
                    </div>
                </div>

                <FeaturedBestsellers dbProducts={[]} hideHeader={true} />
            </div>
        </div>
    );
}
