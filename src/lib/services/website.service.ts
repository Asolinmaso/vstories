import { cache } from "react";
import { supabase } from "@/lib/supabase";

export const getWebsiteConfig = cache(async () => {
    const { data } = await supabase.from("website_customizations").select("*");
    const config = {
        carouselImages: [] as string[],
        testimonialsHeader: { title: "", subtitle: "" },
        testimonialsList: [] as any[],
        announcement: {
            text: "Product Of The Month : Milk Drops Brightening Serum | Use code HURRY20 & Get FLAT 20% OFF",
            enabled: true,
        } as { text: string; enabled: boolean },
    };

    if (data) {
        data.forEach((item) => {
            if (item.key === "home_carousel") config.carouselImages = item.content?.images || [];
            if (item.key === "testimonials_header") config.testimonialsHeader = item.content;
            if (item.key === "testimonials_list") config.testimonialsList = item.content?.items || [];
            if (item.key === "announcement_bar") config.announcement = item.content;
        });
    }
    return config;
});
