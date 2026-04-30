import { cache } from "react";
import { supabase } from "@/lib/supabase";

export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    short_description: string;
    price: number;
    original_price: number | null;
    images: string[];
    category_id: string;
    stock: number;
    is_new: boolean;
    is_bestseller: boolean;
    rating: number;
    reviews_count: number;
    tags: string[];
    ingredients: string[];
    how_to_use: string;
    sizes?: ProductSize[];
    combo_product_ids?: string[];
}

export interface ProductSize {
    id: string;
    label: string;
    price: number;
}

export const getProducts = async (): Promise<Product[]> => {
    const { data } = await supabase
        .from("products")
        .select(`
            *,
            sizes:product_sizes(id, label, price)
        `);
    const filteredData = (data as any[])?.filter(p => p.images && p.images.length > 0) || [];
    return filteredData;
};

export const getProductBySlug = cache(async (slug: string): Promise<Product | null> => {
    const { data } = await supabase
        .from("products")
        .select(`
            *,
            sizes:product_sizes(id, label, price)
        `)
        .eq("slug", slug)
        .single();
    if (!data || !data.images || data.images.length === 0) return null;
    return (data as any);
});

export const getFeaturedProducts = async (): Promise<Product[]> => {
    const { data } = await supabase
        .from("products")
        .select(`
            *,
            sizes:product_sizes(id, label, price)
        `)
        .or('is_bestseller.eq.true,is_new.eq.true')
        .limit(10); // Increased limit since we might filter some out


    return (data as any[])?.filter(p => p.images && p.images.length > 0).slice(0, 4) || [];
};

export const getProductsByIds = async (ids: string[]): Promise<Product[]> => {
    if (!ids || ids.length === 0) return [];
    const { data } = await supabase
        .from("products")
        .select(`
            *,
            sizes:product_sizes(id, label, price)
        `)
        .in('id', ids);

    return (data as any[]) || [];
};
