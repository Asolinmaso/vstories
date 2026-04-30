
import { NextResponse } from "next/server";
import { supabase, supabaseAdmin } from "@/lib/supabase";
import { products, categories } from "@/lib/products";

export async function GET() {
    try {
        const db = supabaseAdmin || supabase;

        // 1. Insert Categories
        const categoryMap = new Map<string, string>(); // slug -> uuid 

        for (const cat of categories) {

            // Check if exists first to avoid duplicates if run multiple times
            const { data: existing } = await db
                .from("categories")
                .select("id")
                .eq("slug", cat.slug)
                .single();

            if (existing) {
                categoryMap.set(cat.slug, existing.id);
            } else {
                const { data, error } = await db
                    .from("categories")
                    .insert({
                        name: cat.name,
                        slug: cat.slug,
                        description: cat.description,
                        image: cat.image,
                    })
                    .select("id")
                    .single();

                if (error) throw new Error(`Error inserting category ${cat.slug}: ${error.message}`);
                if (data) categoryMap.set(cat.slug, data.id);
            }
        }

        // 2. Insert Products
        let productsInserted = 0;
        let sizesInserted = 0;

        for (const prod of products) {
            const categoryId = categoryMap.get(prod.category);
            if (!categoryId) {
                console.warn(`Category not found for product ${prod.slug}: ${prod.category}`);
                continue;
            }

            // Check if product exists
            const { data: existingProd } = await db
                .from("products")
                .select("id")
                .eq("slug", prod.slug)
                .single();

            let productId = existingProd?.id;

            if (!existingProd) {
                const { data, error } = await db
                    .from("products")
                    .insert({
                        name: prod.name,
                        slug: prod.slug,
                        description: prod.description,
                        short_description: prod.shortDescription,
                        price: prod.price,
                        original_price: prod.originalPrice || null,
                        category_id: categoryId,
                        images: prod.images,
                        ingredients: prod.ingredients,
                        how_to_use: prod.howToUse,
                        is_bestseller: prod.isBestseller || false,
                        is_new: prod.isNew || false,
                        rating: prod.rating || 5.0,
                        reviews_count: prod.reviews || 0,
                        tags: prod.tags,
                        stock: 100, // Default stock
                    })
                    .select("id")
                    .single();

                if (error) throw new Error(`Error inserting product ${prod.slug}: ${error.message}`);
                productId = data.id;
                productsInserted++;
            }

            // 3. Insert Sizes
            if (prod.sizes && prod.sizes.length > 0 && productId) {
                for (const size of prod.sizes) {
                    // Check if size exists (simple check by label and product_id)
                    const { data: existingSize } = await db
                        .from("product_sizes")
                        .select("id")
                        .eq("product_id", productId)
                        .eq("label", size.label)
                        .single();

                    if (!existingSize) {
                        const { error: sizeError } = await db
                            .from("product_sizes")
                            .insert({
                                product_id: productId,
                                label: size.label,
                                price: size.price,
                            });

                        if (sizeError) throw new Error(`Error inserting size ${size.label} for product ${prod.slug}: ${sizeError.message}`);
                        sizesInserted++;
                    }
                }
            }
        }

        return NextResponse.json({
            success: true,
            message: "Database seeded successfully",
            stats: {
                categories: categoryMap.size,
                products: productsInserted,
                sizes: sizesInserted,
            },
        });
    } catch (error: any) {
        console.error("Seeding error:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}




