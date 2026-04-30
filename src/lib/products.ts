export interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    originalPrice?: number;
    description: string;
    shortDescription: string;
    category: "hair" | "skin" | "combo" | "face";
    tags: string[];
    images: string[];
    sizes?: { label: string; price: number }[];
    ingredients: string[];
    howToUse: string;
    isBestseller?: boolean;
    isNew?: boolean;
    rating?: number;
    reviews?: number;
}

export const products: Product[] = [
    {
        id: "9",
        name: "Hibiscus Shampoo",
        slug: "hibiscus-shampoo",
        price: 250,
        description:
            "A gentle, herbal shampoo enriched with hibiscus extract and plant-based actives. This chemical-free formula gently cleanses the scalp, adds natural shine, reduces dandruff, and keeps hair soft & manageable. Free from harsh chemicals and parabens.",
        shortDescription:
            "Gentle herbal shampoo with hibiscus extract for soft, shiny hair.",
        category: "hair",
        tags: ["shampoo", "hibiscus", "chemical-free", "dandruff care"],
        images: ["/images/products/hibiscus-shampoo.png"],
        sizes: [
            { label: "200ml", price: 250 },
        ],
        ingredients: [
            "Hibiscus Extract",
            "Herbal Actives",
            "Plant-based Preservatives",
            "Aloe Vera",
            "Coconut Oil",
        ],
        howToUse:
            "Wet hair thoroughly. Apply a generous amount of shampoo and massage gently into scalp. Leave for 2-3 minutes. Rinse thoroughly with water. For best results, use with V Herbal Hair Oil.",
        isNew: true,
        rating: 4.8,
        reviews: 124,
    },
    {
        id: "1",
        name: "V Herbal Hair Oil",
        slug: "v-herbal-hair-oil",
        price: 200,
        originalPrice: 250,
        description:
            "Our signature herbal hair oil is a powerful blend of 40+ organic herbs and pure cold-pressed oils. This non-greasy formula reduces hair fall, promotes new hair growth, prevents premature greying, and strengthens roots. Suitable for all hair types.",
        shortDescription:
            "40 organic herbs & cold-pressed oils for stronger, healthier hair.",
        category: "hair",
        tags: ["hair growth", "anti-hairfall", "organic", "non-greasy"],
        images: ["/images/products/herbal-hair-oil.jpg"],
        sizes: [
            { label: "100ml", price: 200 },
            { label: "200ml", price: 380 },
        ],
        ingredients: [
            "40+ Organic Herbs",
            "Cold-Pressed Oils",
            "Brahmi",
            "Bhringraj",
            "Amla",
            "Neem",
            "Hibiscus",
            "Rosemary",
        ],
        howToUse:
            "Apply generously to scalp and hair. Massage gently for 5-10 minutes. Leave for at least 1 hour or overnight for best results. Wash with Hibiscus Shampoo for optimal results.",
        isBestseller: true,
        rating: 4.9,
        reviews: 2840,
    },
    {
        id: "2",
        name: "Rosemary Hair Mask",
        slug: "rosemary-hair-mask",
        price: 230,
        description:
            "An all-in-one herbal hair mask enriched with Rosemary, Neem, Aloe Vera, Fenugreek, Moringa, Indigo, and Henna. This deeply conditioning formula strengthens roots, reduces dandruff, prevents breakage, and naturally enhances hair color. Smooth texture, non-greasy.",
        shortDescription:
            "All-in-one conditioning mask with rosemary & 6 powerful herbs.",
        category: "hair",
        tags: ["deep conditioning", "rosemary", "damage repair", "non-greasy", "all-in-one"],
        images: ["/images/products/rosemary-hair-mask.png"],
        sizes: [
            { label: "200g", price: 230 },
        ],
        ingredients: [
            "Rosemary",
            "Neem",
            "Aloe Vera",
            "Fenugreek",
            "Moringa",
            "Indigo",
            "Henna",
        ],
        howToUse:
            "After shampooing, apply mask generously to damp hair from roots to tips. Leave for 15-20 minutes. Rinse thoroughly with lukewarm water. Use weekly for best results.",
        isBestseller: true,
        rating: 4.7,
        reviews: 850,
    },
    {
        id: "10",
        name: "V Herbal Face Pack",
        slug: "v-herbal-face-pack",
        price: 150,
        description:
            "A powerful herbal face pack formulated with 20 natural herbs including Multani Mitti, Sandalwood, and Licorice. This multi-skin type formula removes tan, pimples, acne, dark spots & pigmentation while brightening your skin tone naturally.",
        shortDescription:
            "20-herb formula for tan removal, acne care & skin brightening.",
        category: "skin",
        tags: ["face pack", "tan removal", "acne care", "brightening", "multi-skin"],
        images: ["/images/products/herbal-face-pack.png"],
        sizes: [
            { label: "100g", price: 150 },
        ],
        ingredients: [
            "Multani Mitti",
            "Sandalwood",
            "Licorice",
            "Turmeric",
            "Rose Powder",
            "Neem",
            "And 14 more herbs",
        ],
        howToUse:
            "Mix 2 tablespoons of face pack with rose water or milk to form a smooth paste. Apply evenly on face and neck. Leave for 15-20 minutes until dry. Rinse with lukewarm water. Use 2-3 times a week for best results.",
        isNew: true,
        rating: 4.8,
        reviews: 320,
    },
    {
        id: "11",
        name: "Prophetic Face Serum",
        slug: "prophetic-face-serum",
        price: 150,
        description:
            "A powerful herbal face serum infused with Frankincense, Niacinamide, Hyaluronic Acid, and other Prophetic herbs. This multi-skin type formula removes tan, pimples, acne, dark spots & pigmentation while brightening your skin tone naturally. Lightweight and fast-absorbing.",
        shortDescription:
            "Frankincense & Niacinamide serum for tan removal, acne care & brightening.",
        category: "skin",
        tags: ["serum", "tan removal", "acne care", "brightening", "multi-skin", "prophetic herbs"],
        images: ["/images/products/prophetic-face-serum.png"],
        sizes: [
            { label: "20ml", price: 150 },
        ],
        ingredients: [
            "Frankincense",
            "Niacinamide",
            "Hyaluronic Acid",
            "Prophetic Herbs",
        ],
        howToUse:
            "Apply 3-4 drops to clean, damp skin. Gently massage until fully absorbed. Use morning and night for best results. Follow with moisturizer if needed.",
        isNew: true,
        isBestseller: true,
    },
    {
        id: "3",
        name: "V Glow Face Serum",
        slug: "v-glow-face-serum",
        price: 350,
        originalPrice: 399,
        description:
            "A lightweight, fast-absorbing face serum formulated with frankincense and niacinamide. This powerful combination brightens skin tone, reduces dark spots, and gives you that coveted natural glow.",
        shortDescription:
            "Frankincense & niacinamide serum for radiant, glowing skin.",
        category: "skin",
        tags: ["brightening", "anti-aging", "glow"],
        images: ["/images/product-face-serum-1.jpg"],
        ingredients: [
            "Frankincense Oil",
            "Niacinamide",
            "Hyaluronic Acid",
            "Vitamin C",
            "Aloe Vera",
        ],
        howToUse:
            "Apply 3-4 drops to clean, damp skin. Gently massage until absorbed. Use morning and night for best results.",
        isNew: true,
    },
    {
        id: "4",
        name: "V Natural Face Wash",
        slug: "v-natural-face-wash",
        price: 180,
        description:
            "A gentle, sulfate-free face wash that cleanses without stripping your skin's natural moisture. Enriched with turmeric and honey for a fresh, radiant complexion.",
        shortDescription:
            "Gentle sulfate-free cleanser with turmeric & honey.",
        category: "skin",
        tags: ["cleanser", "gentle", "turmeric"],
        images: ["/images/product-face-wash-1.jpg"],
        ingredients: [
            "Turmeric",
            "Raw Honey",
            "Aloe Vera",
            "Rose Water",
            "Glycerin",
        ],
        howToUse:
            "Wet face with lukewarm water. Apply a small amount and massage gently in circular motions. Rinse thoroughly.",
    },

    {
        id: "6",
        name: "Herbal Scalp Treatment Oil",
        slug: "herbal-scalp-treatment",
        price: 320,
        description:
            "A specialized scalp treatment oil designed to address dandruff, itchiness, and scalp inflammation. Formulated with tea tree, neem, and other antibacterial herbs.",
        shortDescription:
            "Anti-dandruff scalp oil with tea tree & neem extracts.",
        category: "hair",
        tags: ["scalp care", "anti-dandruff", "tea tree"],
        images: ["/images/product-scalp-oil-1.jpg"],
        ingredients: [
            "Tea Tree Oil",
            "Neem Oil",
            "Peppermint",
            "Eucalyptus",
            "Jojoba Oil",
        ],
        howToUse:
            "Apply directly to scalp using the applicator. Massage for 5 minutes. Leave for 2-3 hours or overnight. Wash with mild shampoo.",
    },
    {
        id: "7",
        name: "Radiance Day Cream",
        slug: "radiance-day-cream",
        price: 280,
        description:
            "A lightweight moisturizing day cream with SPF protection. Keeps skin hydrated, protected from sun damage, and gives a subtle natural glow throughout the day.",
        shortDescription:
            "Moisturizing day cream with natural SPF protection.",
        category: "skin",
        tags: ["moisturizer", "SPF", "daily care"],
        images: ["/images/product-day-cream-1.jpg"],
        ingredients: [
            "Carrot Seed Oil",
            "Shea Butter",
            "Zinc Oxide",
            "Vitamin E",
            "Saffron",
        ],
        howToUse:
            "Apply evenly to face and neck after cleansing and serums. Use every morning as the last step of skincare before makeup.",
        isNew: true,
    },

    {
        id: "12",
        name: "Hair Oil + Shampoo Duo",
        slug: "hair-oil-shampoo-duo",
        price: 450,
        originalPrice: 500,
        description:
            "The perfect hair care duo featuring our bestselling V Herbal Hair Oil and gentle Hibiscus Shampoo. Use the herbal oil for deep nourishment and follow with the sulfate-free shampoo for soft, shiny, and healthy hair.",
        shortDescription:
            "V Herbal Hair Oil + Hibiscus Shampoo - The perfect duo for healthy hair.",
        category: "combo",
        tags: ["value pack", "hair duo", "bestseller combo", "complete care"],
        images: ["/images/products/combo-hair-oil-shampoo.png"],
        ingredients: [],
        howToUse:
            "Apply V Herbal Hair Oil to scalp and hair, massage gently. Leave for 1-2 hours or overnight. Wash with Hibiscus Shampoo for best results. Use 2-3 times a week.",
        isBestseller: true,
        isNew: true,
    },
    {
        id: "13",
        name: "Complete Hair Care Trio",
        slug: "complete-hair-care-trio",
        price: 600,
        originalPrice: 680,
        description:
            "The ultimate hair transformation set! Get all three of our bestselling hair care products: V Herbal Hair Oil, Hibiscus Shampoo, and Rosemary Hair Mask. This complete regimen addresses hair fall, dandruff, dryness, and damage for visibly healthier, stronger hair.",
        shortDescription:
            "Hair Oil + Shampoo + Hair Mask - Complete hair transformation set.",
        category: "combo",
        tags: ["value pack", "complete set", "bestseller combo", "hair transformation"],
        images: ["/images/products/combo-hair-trio.png"],
        ingredients: [],
        howToUse:
            "Step 1: Apply V Herbal Hair Oil and leave for 1-2 hours. Step 2: Wash with Hibiscus Shampoo. Step 3: Apply Rosemary Hair Mask for 15-20 minutes, then rinse. Use weekly for best results.",
        isBestseller: true,
        isNew: true,
    },
    {
        id: "14",
        name: "V Glow Face Care Duo",
        slug: "face-glow-duo",
        price: 369,
        originalPrice: 500,
        description:
            "Achieve that natural radiance with our Face Care Duo. Featuring our V Herbal Face Pack for deep cleansing and detanning, and the V Glow Face Serum for brightening and hydration. A perfect pair for glowing, healthy skin.",
        shortDescription:
            "Herbal Face Pack + Glow Serum - For instant radiance & glow.",
        category: "combo",
        tags: ["value pack", "face glow", "bestseller combo", "skin radiance"],
        images: ["/images/products/combo-face-duo.png"],
        ingredients: [],
        howToUse:
            "Step 1: Use Face Pack (mix with rose water), leave for 15 mins, rinse. Step 2: Apply V Glow Face Serum to damp skin for hydration and glow.",
        isBestseller: true,
        isNew: true,
    },
];

export const categories = [
    {
        id: "hair",
        name: "Hair Care",
        slug: "hair",
        description: "Nourish your hair with our herbal formulas",
        image: "/images/category-hair.png",
    },
    {
        id: "face",
        name: "Skin Care",
        slug: "skin",
        description: "Reveal your natural radiance",
        image: "/images/category-face.png",
    },
    {
        id: "combo",
        name: "Combos",
        slug: "combos",
        description: "Value bundles for complete care",
        image: "/images/category-combo.png",
    },
    {
        id: "bestseller",
        name: "Bestsellers",
        slug: "bestsellers",
        description: "Our most loved products",
        image: "/images/category-best.png",
    },
];

export const getProductBySlug = (slug: string): Product | undefined => {
    return products.find((p) => p.slug === slug);
};

export const getProductsByCategory = (category: string): Product[] => {
    if (category === "bestsellers") {
        return products.filter((p) => p.isBestseller);
    }
    return products.filter((p) => p.category === category);
};

export const getFeaturedProducts = (): Product[] => {
    return products.filter((p) => p.isBestseller || p.isNew).slice(0, 4);
};
