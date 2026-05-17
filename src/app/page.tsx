import HeroCarousel from "@/components/home/HeroCarousel";
import FeaturedBestsellers from "@/components/home/FeaturedBestsellers";
import CategoryBanners from "@/components/home/CategoryBanners";
import FindWhatYouNeed from "@/components/home/FindWhatYouNeed";
import CategoryGrid from "@/components/home/CategoryGrid";
import OffersSection from "@/components/home/OffersSection";
import BrandStoryBanner from "@/components/home/BrandStoryBanner";
import CleanBeauty from "@/components/home/CleanBeauty";
import TrustFeatures from "@/components/home/TrustFeatures";
import RealResults from "@/components/home/RealResults";
import CustomerLove from "@/components/home/CustomerLove";
import Marquee from "@/components/ui/Marquee";
import { getProducts } from "@/lib/services/product.service";
import { getWebsiteConfig } from "@/lib/services/website.service";

// Use revalidation to keep content fresh but cached
// Revalidate every 60 seconds
export const revalidate = 60;


const trustItems = [
  "Pregnancy-Safe",
  "South Indian Skin Friendly",
  "Plant-Derived Actives",
  "Milk-Based Formulations",
  "Beginner-Friendly Routines",
];

export default async function Home() {
  const [config, products] = await Promise.all([
    getWebsiteConfig(),
    getProducts(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "V STORIES",
    "url": "https://vstories.in",
    "logo": "https://vstories.in/images/logo.png",
    "description": "Premium herbal hair and skincare products crafted with 40+ organic herbs & cold-pressed oils.",
    "sameAs": [
      "https://instagram.com/vstories.in",
      "https://facebook.com/vstories"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 1. Hero Section */}
      <HeroCarousel />

      {/* 2. Trust Marquee */}
      <Marquee items={trustItems} variant="dark" speed="slow" />

      {/* 3. Browse by category */}
      <CategoryGrid />

      {/* 4. Find what your skin & hair truly needs */}
      <FindWhatYouNeed products={products} />

      {/* 5. Featured Bestsellers */}
      <FeaturedBestsellers dbProducts={products} />

      {/* 6. Experience Banners */}
      <CategoryBanners />

      {/* 7. Offers Crafted for You */}
      <OffersSection />

      {/* 8. Brand Story Banner */}
      <BrandStoryBanner />

      {/* 9. Real Results */}
      <RealResults />

      {/* 10. Customer Love (Reviews) */}
      <CustomerLove
        testimonials={config.testimonialsList}
        title={config.testimonialsHeader.title}
        subtitle={config.testimonialsHeader.subtitle}
      />

      {/* 11. Clean, effective & honest */}
      <CleanBeauty />

      {/* 12. Bottom Trust Features */}
      <TrustFeatures />
    </>
  );
}
