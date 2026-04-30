import { getProductBySlug, getProductsByIds } from "@/lib/services/product.service";
import ProductDetailClient from "@/components/product/ProductDetailClient";
import Link from "next/link";

import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        return {
            title: "Product Not Found | V STORIES",
            description: "The product you are looking for does not exist."
        };
    }

    return {
        title: `${product.name} | V STORIES`,
        description: product.short_description || product.description?.substring(0, 160),
        openGraph: {
            title: product.name,
            description: product.short_description,
            images: product.images?.length > 0 ? [{ url: product.images[0], width: 1200, height: 630 }] : [],
            url: `https://vstories.in/product/${product.slug}`,
            type: "website",
        },
        alternates: {
            canonical: `https://vstories.in/product/${product.slug}`,
        },
    };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-[var(--primary)] mb-4">
                        Product Not Found
                    </h1>
                    <Link href="/shop" className="btn-primary">
                        Return to Shop
                    </Link>
                </div>
            </div>
        );
    }

    // Fetch included products if it's a combo
    let includedProducts: any[] = [];
    if (product.combo_product_ids && product.combo_product_ids.length > 0) {
        includedProducts = await getProductsByIds(product.combo_product_ids);
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "image": product.images || [],
        "description": product.short_description || product.description,
        "sku": product.id,
        "brand": {
            "@type": "Brand",
            "name": "V STORIES"
        },
        "offers": {
            "@type": "Offer",
            "url": `https://vstories.in/product/${product.slug}`,
            "priceCurrency": "INR",
            "price": product.price,
            "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "itemCondition": "https://schema.org/NewCondition"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ProductDetailClient product={product} includedProducts={includedProducts} />
        </>
    );
}
