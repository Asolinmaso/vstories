import HeroCarouselMobile from "./mobile/HeroCarouselMobile";
import FeaturedBestsellersMobile from "./mobile/FeaturedBestsellersMobile";
import CategoryBannersMobile from "./mobile/CategoryBannersMobile";
import FindWhatYouNeedMobile from "./mobile/FindWhatYouNeedMobile";
import OffersSectionMobile from "./mobile/OffersSectionMobile";
import BrandStoryBannerMobile from "./mobile/BrandStoryBannerMobile";
import RealResultsMobile from "./mobile/RealResultsMobile";
import CustomerLoveMobile from "./mobile/CustomerLoveMobile";
import CleanBeautyMobile from "./mobile/CleanBeautyMobile";
import Marquee from "@/components/ui/Marquee";
import { Product } from "@/lib/services/product.service";

interface HomeMobileProps {
  products: Product[];
  trustItems: string[];
}

export default function HomeMobile({ products, trustItems }: HomeMobileProps) {
  return (
    <div className="block lg:hidden">
      {/* 1. Hero Section */}
      <HeroCarouselMobile />

      {/* 2. Trust Marquee */}
      <Marquee items={trustItems} variant="dark" speed="slow" />

      {/* 4. Find what your skin & hair truly needs */}
      <FindWhatYouNeedMobile products={products} />

      {/* 5. Featured Bestsellers */}
      <FeaturedBestsellersMobile dbProducts={products} />

      {/* 6. Experience Banners */}
      <CategoryBannersMobile />

      {/* 7. Offers Crafted for You */}
      <OffersSectionMobile />

      {/* 8. Brand Story Banner */}
      <BrandStoryBannerMobile />

      {/* 9. Real Results */}
      <RealResultsMobile />

      {/* 10. Customer Love (Reviews) */}
      <CustomerLoveMobile />

      {/* 11. Clean, effective & honest */}
      <CleanBeautyMobile />
    </div>
  );
}
