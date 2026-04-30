import { Suspense } from "react";
import { Metadata } from "next";
import ShopContent from "./ShopContent";
import { getProducts } from "@/lib/services/product.service";

export const metadata: Metadata = {
    title: "Shop All Products",
    description:
        "Browse our complete collection of herbal hair care and skincare products. 100% natural, chemical-free formulas.",
};

export default async function ShopPage() {
    const products = await getProducts();

    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
                    <div className="w-12 h-12 rounded-full border-4 border-[var(--primary)] border-t-transparent animate-spin"></div>
                </div>
            }
        >
            <ShopContent initialProducts={products} />
        </Suspense>
    );
}
