import { Suspense } from "react";
import { Metadata } from "next";
import ShopContent from "./ShopContent";
import { getProducts } from "@/lib/services/product.service";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export const revalidate = 60;

export const metadata: Metadata = {
    title: "Shop All Products",
    description:
        "Browse our complete collection of herbal hair care and skincare products. 100% natural, chemical-free formulas.",
};

export interface ShopCategory {
    id: string;
    name: string;
    slug: string;
    description?: string;
    image?: string;
}

export default async function ShopPage() {
    const supabase = await createSupabaseServerClient();
    const [products, { data: categoriesData }] = await Promise.all([
        getProducts(),
        supabase.from("categories").select("id, name, slug, description, image").order("name"),
    ]);

    const categories: ShopCategory[] = categoriesData || [];

    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
                    <div className="w-12 h-12 rounded-full border-4 border-[var(--primary)] border-t-transparent animate-spin"></div>
                </div>
            }
        >
            <ShopContent initialProducts={products} initialCategories={categories} />
        </Suspense>
    );
}
