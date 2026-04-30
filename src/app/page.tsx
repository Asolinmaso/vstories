import HeroCarousel from "@/components/home/HeroCarousel";
import FeaturedBestsellers from "@/components/home/FeaturedBestsellers";
import CategoryBanners from "@/components/home/CategoryBanners";
import VStoriesDifference from "@/components/home/VStoriesDifference";
import RealResults from "@/components/home/RealResults";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import GroundedInNature from "@/components/home/GroundedInNature";
import CustomerLove from "@/components/home/CustomerLove";
import IngredientSpotlight from "@/components/home/IngredientSpotlight";
import Marquee from "@/components/ui/Marquee";
import FounderStory from "@/components/home/FounderStory";
import ComboOffer from "@/components/home/ComboOffer";
import FeedbackSection from "@/components/home/FeedbackSection";
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
      {/* Hero Section */}
      <HeroCarousel images={config.carouselImages} />

      {/* Trust Marquee */}
      <Marquee items={trustItems} variant="light" speed="slow" />

      {/* Category Banners (Restored: 4 image cards) */}
      <CategoryBanners />

      {/* Featured Bestsellers */}
      <FeaturedBestsellers dbProducts={products} />

      {/* Real Results / Testimonials */}
      <RealResults />

      {/* Save Big On Combos */}
      <ComboOffer />

      {/* Founder Story */}
      <FounderStory />

      {/* Shop By Category (Tabs & Scroll) */}
      <CategoryShowcase dbProducts={products} />

      {/* Grounded In Nature (Brand Features) */}
      <GroundedInNature />

      {/* Customer Love (Reviews) */}
      <CustomerLove
        testimonials={config.testimonialsList}
        title={config.testimonialsHeader.title}
        subtitle={config.testimonialsHeader.subtitle}
      />

      {/* Feedback Section */}
      <FeedbackSection products={products} />

      {/* Ingredient Spotlight */}
      {/* <IngredientSpotlight /> */}

      {/* V Stories Difference */}
      <VStoriesDifference />
    </>
  );
}
