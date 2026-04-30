"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase-browser";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

// Data provided by the user
const productsToSeed = [
    {
        name: "Rosemary Hairmask",
        slug: "rosemary-hairmask",
        category_slug: "hair",
        price: 199,
        size: "150g",
        description: `A luxurious all-in-one herbal treatment for stronger, healthier, and naturally radiant hair. Enriched with rosemary, moringa, fenugreek, flaxseed, indigo, henna, rose petals, Sidr leaves, aloe vera, neem, curry leaves & bhringraj, this mask strengthens roots, promotes hair growth, reduces dandruff, adds volume, and enhances natural color.\n\nWith regular use, hair feels softer, thicker, and full of life, while the scalp is nourished and refreshed.`,
        benefits: [
            "Strengthens roots & reduces hair fall",
            "Promotes healthy hair growth",
            "Repairs dry, damaged, or brittle hair",
            "Reduces dandruff & soothes the scalp",
            "Adds volume, thickness & natural shine",
            "Enhances natural hair color",
            "Improves hair texture & manageability",
            "Leaves hair soft, smooth & healthy"
        ],
        ingredients: ["Rosemary", "Moringa", "Fenugreek", "Indigo", "Henna", "Sidr Leaves", "Neem", "Bhringraj", "5+ other herbs"],
        short_description: "A luxurious all-in-one herbal treatment for stronger, healthier, and naturally radiant hair.",
        image_placeholder: "/images/products/rosemary-hairmask.png"
    },
    {
        name: "Herbal Facepack",
        slug: "herbal-facepack",
        category_slug: "face",
        price: 160,
        size: "100g",
        description: `Our Face Pack is a gentle yet powerful herbal blend suitable for all skin types. It deeply cleanses and detoxifies pores while helping reduce tan, dullness, pigmentation, acne, pimples, and dark spots—restoring the skin’s natural radiance.\n\nWith regular use, skin appears cleaner, smoother, and visibly brighter.`,
        benefits: [
            "Visibly brightens dull, tired skin",
            "Helps reduce hyperpigmentation, acne & pimples",
            "Minimizes dark spots and uneven tone",
            "Gently removes tan & impurities",
            "Improves skin clarity & texture",
            "Helps reduce the appearance of wrinkles",
            "Minimizes pores for smoother-looking skin"
        ],
        ingredients: ["Licorice", "Multani Mitti", "Sandalwood", "Manjistha", "Kadukai", "Maysoor Daal", "Avarampoo", "15+ other herbs"],
        short_description: "A gentle yet powerful herbal blend that deeply cleanses and restores skin's natural radiance.",
        image_placeholder: "/images/products/herbal-facepack.png"
    },
    {
        name: "Hibiscus Shampoo",
        slug: "hibiscus-shampoo",
        category_slug: "hair",
        price: 250,
        size: "210ml",
        description: `Gentle on the scalp. Powerful against dandruff & hair fall.\n\nOur Hibiscus Shampoo is a chemical-free, botanical cleanser that gently purifies the scalp, helps remove dandruff and flakes, and strengthens weakened roots. It repairs dry scalp, reduces hair fall, and leaves hair silkier, softer, and naturally shiny after every wash.`,
        benefits: [
            "Helps Remove Dandruff & Visible Flakes",
            "Reduces Hair Fall by Strengthening Roots",
            "Repairs Dry, Irritated Scalp",
            "Leaves Hair Soft, Silky & Naturally Shiny"
        ],
        ingredients: ["Hibiscus", "Rosemary", "Aloe Vera", "Fenugreek", "Shikakai", "Reetha", "Moringa", "Amla", "Neem", "Sidr", "Tea Tree Oil", "Vitamin E"],
        short_description: "Gentle on the scalp. Powerful against dandruff & hair fall.",
        image_placeholder: "/images/products/hibiscus-shampoo.png"
    },
    {
        name: "V Herbal Hair Oil",
        slug: "v-herbal-hair-oil",
        category_slug: "hair",
        price: 230,
        size: "120ml",
        description: `Our Herbal Hair Oil is a nourishing blend of 40+ organic herbs and pure pressed oils, crafted to strengthen roots, reduce hair fall, and control premature greying. Gentle yet effective, it restores scalp balance, improves hair texture, and leaves strands soft, shiny, and healthy.\n\nWith regular use, you can notice reduced hair fall in just 1 month.`,
        benefits: [
            "Strengthens roots & reduces hair fall",
            "Controls premature grey hair",
            "Promotes healthy hair growth",
            "Nourishes and repairs dry, damaged hair",
            "Improves hair texture & softness",
            "Adds natural shine & vitality"
        ],
        ingredients: ["Bhringraj", "Amla", "Hibiscus", "Neem", "Fenugreek", "Curry Leaves", "Manjistha", "Jadamansi", "Avarampoo", "Henna", "Indigo", "Rosemary", "Sidr Leaves", "Black Seed", "Aloe Vera", "Notchi Leaves", "Thavanam", "Karusilangani", "Vembala Pattai", "Ashwagandha", "Licorice", "Gua Leaves", "Kesavarthani", "20+ Other Herbs"],
        short_description: "A nourishing blend of 40+ organic herbs and pure pressed oils to strengthen roots and reduce hair fall.",
        image_placeholder: "/images/products/herbal-hair-oil.png"
    },
    {
        name: "Prophetic Face Serum",
        slug: "prophetic-face-serum",
        category_slug: "face",
        price: 250,
        size: "20ml",
        description: `Our Prophetic Face Serum is a lightweight, day-use formula suitable for all skin types, including beginners, teenagers, pregnant women & new moms. Infused with Prophetic and herbal ingredients, it gently reduces dark spots, evens skin tone, improves texture, and restores natural glow—without irritation. ✨ Visible skin clarity in just 3 weeks.`,
        benefits: [
            "Brightens Dull Skin",
            "Reduces Dark Spots & Pigmentation",
            "Improves Skin Texture",
            "Deeply Hydrates & Nourishes",
            "Promotes Natural Glow"
        ],
        ingredients: ["Frankincense Extract", "Black Cumin Seed", "Niacinamide", "Hyaluronic Acid", "Manjistha Extract"],
        short_description: "A lightweight, day-use formula infused with Prophetic and herbal ingredients to reduce dark spots and even skin tone.",
        image_placeholder: "/images/products/prophetic-face-serum.png"
    }
];

export default function SeedProductsPage() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [log, setLog] = useState<string[]>([]);

    const addLog = (msg: string) => setLog(prev => [...prev, msg]);

    const seedProducts = async () => {
        setStatus("loading");
        setLog([]);
        addLog("Starting seeding process...");

        try {
            // 1. Fetch Categories to get IDs
            addLog("Fetching categories...");
            const { data: categories, error: catError } = await supabase
                .from("categories")
                .select("id, slug");

            if (catError) throw catError;
            if (!categories) throw new Error("No categories found");
            addLog(`Found ${categories.length} categories.`);

            const categoryMap = categories.reduce((acc: any, cat: any) => {
                acc[cat.slug] = cat.id;
                return acc;
            }, {});

            for (const product of productsToSeed) {
                addLog(`Processing ${product.name}...`);

                const categoryId = categoryMap[product.category_slug];
                if (!categoryId) {
                    addLog(`Error: Category '${product.category_slug}' not found for ${product.name}. Skipping.`);
                    continue;
                }

                // Format description to include benefits if not already included
                const formattedDescription = `
${product.description}

Benefits:
${product.benefits.map(b => `• ${b}`).join('\n')}
                `.trim();

                // 2. Insert Product
                const { data: productData, error: insertError } = await supabase
                    .from("products")
                    .upsert({
                        name: product.name,
                        slug: product.slug,
                        description: formattedDescription,
                        short_description: product.short_description,
                        price: product.price,
                        stock: 100, // Default stock
                        category_id: categoryId,
                        images: [product.image_placeholder], // Placeholder
                        ingredients: product.ingredients,
                        is_new: true,
                        how_to_use: "Apply as directed on packaging."
                    }, { onConflict: 'slug' })
                    .select()
                    .single();

                if (insertError) {
                    addLog(`Error inserting ${product.name}: ${insertError.message}`);
                    continue;
                }

                addLog(`Product '${product.name}' upserted successfully.`);

                // 3. Insert Size
                // First cleanup old sizes for this product if re-seeding to avoid duplicates if specific logic doesn't prevent it
                // Ideally we check if size exists.
                const { error: deleteSizeError } = await supabase
                    .from("product_sizes")
                    .delete()
                    .eq("product_id", productData.id);

                if (deleteSizeError) console.warn("Error clearing old sizes", deleteSizeError);

                const { error: sizeError } = await supabase
                    .from("product_sizes")
                    .insert({
                        product_id: productData.id,
                        label: product.size,
                        price: product.price
                    });

                if (sizeError) {
                    addLog(`Error adding size for ${product.name}: ${sizeError.message}`);
                } else {
                    addLog(`Size '${product.size}' added for ${product.name}.`);
                }
            }

            addLog("Seeding completed!");
            setStatus("success");

        } catch (error: any) {
            console.error("Seeding error:", error);
            addLog(`Critical Error: ${error.message}`);
            setStatus("error");
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-12 px-6">
            <h1 className="text-3xl font-bold mb-6 text-[var(--primary)]">Seed New Products</h1>
            <p className="mb-8 text-gray-600">
                Click the button below to add the 5 requested products (Rosemary Hairmask, Herbal Facepack, etc.) to the database.
                Existing products with the same slug will be updated.
            </p>

            {status === "idle" && (
                <button
                    onClick={seedProducts}
                    className="btn-primary flex items-center gap-2"
                >
                    Start Seeding
                </button>
            )}

            {status === "loading" && (
                <div className="flex items-center gap-2 text-blue-600 font-medium">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                </div>
            )}

            {status === "success" && (
                <div className="flex items-center gap-2 text-green-600 font-medium mb-6">
                    <CheckCircle className="w-5 h-5" />
                    Products added successfully!
                </div>
            )}

            {status === "error" && (
                <div className="flex items-center gap-2 text-red-600 font-medium mb-6">
                    <AlertCircle className="w-5 h-5" />
                    Something went wrong. Check logs below.
                </div>
            )}

            <div className="mt-8 bg-gray-50 p-4 rounded-xl border border-gray-200 font-mono text-sm h-64 overflow-y-auto">
                {log.length === 0 ? (
                    <span className="text-gray-400 italic">Logs will appear here...</span>
                ) : (
                    log.map((line, i) => (
                        <div key={i} className="mb-1">{line}</div>
                    ))
                )}
            </div>
        </div>
    );
}
