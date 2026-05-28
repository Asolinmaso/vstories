import { getProducts } from "@/lib/services/product.service";
import CategoryClient from "./CategoryClient";

// Revalidate every 60 seconds
export const revalidate = 60;

// Need to allow dynamic params for unknown categories
export const dynamicParams = true;

interface PageProps {
    params: Promise<{
        category: string;
    }>;
}

export default async function CategoryPage({ params }: PageProps) {
    const { category } = await params;
    const products = await getProducts();

    // We pass all products and let the Client Component filter based on the slug.
    // This reduces the number of DB calls if we had specific endpoints, but for now this is efficient enough.

    return <CategoryClient categorySlug={category} initialProducts={products} />;
}
