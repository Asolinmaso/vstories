export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  content: {
    intro: string;
    sections: { title: string; text: string }[];
    outro: string;
  };
}

export const categories = ["All Articles", "Hair Care", "Skin Care", "Sustainability", "Wellness"];

export const posts: BlogPost[] = [
  {
    id: 1,
    slug: "7-natural-ways-to-strengthen-hair-roots",
    title: "7 Natural Ways to Strengthen Your Hair Roots",
    excerpt: "Discover time-tested, natural tips to nourish your scalp and strengthen hair from the roots.",
    date: "20 Feb, 2026",
    readTime: "5 Min Read",
    image: "/images/blog/hair care.png",
    category: "Hair Care",
    content: {
      intro: "Healthy hair starts at the roots. When your scalp is nourished and your roots are strong, your hair naturally grows better, feels thicker, and looks more vibrant. Here are 7 natural ways to strengthen your hair roots and improve overall hair health.",
      sections: [
        { title: "1. Massage with Warm Oil", text: "Regular scalp massage with warm coconut, almond, or bhringraj oil improves blood circulation to the hair follicles, providing essential nutrients." },
        { title: "2. Keep Your Scalp Clean", text: "A clean scalp prevents clogged pores. Use a gentle, sulfate-free shampoo to remove dirt, excess oil, and product buildup without stripping natural moisture." },
        { title: "3. Eat a Balanced Diet", text: "Your hair reflects your internal health. Include protein-rich foods, iron, zinc, and vitamins A, C, and E in your diet for stronger roots." },
        { title: "4. Avoid Heat Styling", text: "Excessive use of blow dryers, straighteners, and curling irons can weaken hair shafts and roots. Air dry your hair whenever possible." },
        { title: "5. Stay Hydrated", text: "Drinking enough water is essential for healthy hair growth. Hydration keeps your scalp healthy and prevents dryness and flakiness." },
        { title: "6. Be Gentle with Wet Hair", text: "Wet hair is fragile and more prone to breakage. Avoid vigorous towel drying and use a wide-toothed comb to detangle gently." },
        { title: "7. Use Natural Masks", text: "Treat your hair to nourishing natural masks like aloe vera, fenugreek (methi), or yogurt to deeply condition and strengthen from the roots." }
      ],
      outro: "Consistency is key. By incorporating these natural habits into your routine, you can build a strong foundation for beautiful, resilient hair."
    }
  },
  {
    id: 2,
    slug: "the-power-of-bhringraj-for-healthy-hair",
    title: "The Power of Bhringraj for Healthy Hair",
    excerpt: "A closer look at the ancient herb Bhringraj and its amazing benefits for hair growth.",
    date: "20 Feb, 2026",
    readTime: "5 Min Read",
    image: "/images/blog/Incridients.png",
    category: "Ingredients",
    content: {
      intro: "Healthy and strong hair starts with proper nourishment and care. Among traditional Ayurvedic ingredients, Bhringraj has earned a special place because of its natural properties that support scalp and hair health. Used for generations, this powerful herb helps strengthen hair roots and maintain healthier-looking hair naturally.",
      sections: [
        { title: "1. Supports Healthy Hair Growth", text: "Bhringraj is known for nourishing the scalp and strengthening hair follicles. Regular use may help create an environment that supports natural hair growth." },
        { title: "2. Helps Reduce Hair Fall", text: "Weak roots and lack of nourishment often lead to hair fall. Bhringraj helps strengthen the roots and reduce breakage over time." },
        { title: "3. Improves Scalp Health", text: "A healthy scalp plays an important role in maintaining healthy hair. Bhringraj helps soothe dryness and keeps the scalp balanced." },
        { title: "4. Adds Shine and Strength", text: "Hair that receives proper nourishment often appears smoother, healthier, and naturally shinier." },
        { title: "5. Suitable for Everyday Hair Care", text: "Bhringraj can easily become a part of your regular hair care routine through oils, shampoos, and herbal products." }
      ],
      outro: "Give your hair the care it deserves by including natural ingredients that have been trusted for years. Small consistent steps can make a big difference in maintaining healthier hair."
    }
  },
  {
    id: 3,
    slug: "ayurvedic-skincare-ancient-wisdom-for-glowing-skin",
    title: "Ayurvedic Skincare: Ancient Wisdom for Glowing Skin",
    excerpt: "How Ayurveda helps balance your skin naturally for a healthy, radiant glow.",
    date: "20 Feb, 2026",
    readTime: "7 Min Read",
    image: "/images/blog/Skin care.png",
    category: "Skin Care",
    content: {
      intro: "Healthy skin is not only about appearance; it reflects how well your skin is nourished and cared for. Ayurveda follows a balanced approach that focuses on natural ingredients and consistent routines to support healthy, glowing skin.",
      sections: [
        { title: "1. Gentle Cleansing Matters", text: "Using mild cleansers helps remove dirt and impurities while maintaining the skin's natural moisture." },
        { title: "2. Natural Ingredients Support Skin Health", text: "Traditional ingredients like turmeric, aloe vera, and sandalwood are widely used for their soothing and nourishing properties." },
        { title: "3. Hydration Is Essential", text: "Keeping your skin hydrated helps improve texture and maintain a healthy appearance." },
        { title: "4. Healthy Nutrition Supports Skin", text: "Foods rich in vitamins and antioxidants can contribute to healthier skin from within." },
        { title: "5. Follow a Consistent Routine", text: "Regular care often provides better long-term results than occasional treatments." }
      ],
      outro: "Natural skincare is about understanding your skin and supporting it with simple habits. Consistency and care often create visible results over time."
    }
  },
  {
    id: 4,
    slug: "5-herbs-that-improve-scalp-health-naturally",
    title: "5 Herbs That Improve Scalp Health Naturally",
    excerpt: "These powerful herbs can help reduce dandruff, irritation & promote scalp wellness.",
    date: "20 Feb, 2026",
    readTime: "5 Min Read",
    image: "/images/blog/wellness.png",
    category: "Wellness",
    content: {
      intro: "A healthy scalp creates the foundation for stronger and healthier hair. Natural herbs have been used traditionally to nourish the scalp and maintain balance while supporting overall hair wellness.",
      sections: [
        { title: "1. Bhringraj", text: "Known for strengthening roots and supporting healthier hair growth." },
        { title: "2. Hibiscus", text: "Hibiscus helps condition hair and may improve scalp moisture naturally." },
        { title: "3. Fenugreek", text: "Rich in nutrients that help support stronger hair and healthier roots." },
        { title: "4. Neem", text: "Neem helps maintain scalp cleanliness and freshness." },
        { title: "5. Aloe Vera", text: "Aloe vera provides hydration and helps soothe dryness and irritation." }
      ],
      outro: "Including natural herbs in your hair care routine can support scalp health and improve overall hair quality when used consistently."
    }
  },
  {
    id: 5,
    slug: "our-commitment-to-sustainable-beauty",
    title: "Our Commitment to Sustainable Beauty",
    excerpt: "From clean ingredients to eco-friendly packaging, here's how we care for you & planet.",
    date: "20 Feb, 2026",
    readTime: "5 Min Read",
    image: "/images/blog/Sustainability.png",
    category: "Sustainability",
    content: {
      intro: "Beauty and sustainability can work together to create a positive impact. Choosing responsible practices helps reduce waste and supports a healthier future for both people and the environment.",
      sections: [
        { title: "1. Thoughtfully Selected Ingredients", text: "We prioritize ingredients sourced with quality and care in mind." },
        { title: "2. Responsible Packaging Choices", text: "Reducing unnecessary packaging helps minimize environmental impact." },
        { title: "3. Supporting Better Practices", text: "Sustainable methods help create long-term benefits for communities and the planet." },
        { title: "4. Reducing Waste", text: "Small improvements in processes can contribute to meaningful environmental changes." },
        { title: "5. Creating Positive Impact", text: "Responsible decisions today help build a better future tomorrow." }
      ],
      outro: "Sustainability is not about one big change. It is about making better choices consistently and moving toward a more responsible future."
    }
  },
  {
    id: 6,
    slug: "how-to-build-a-natural-hair-care-routine",
    title: "How to Build a Natural Hair Care Routine",
    excerpt: "Simple steps to create a natural hair care routine that works for your hair type.",
    date: "20 Feb, 2026",
    readTime: "5 Min Read",
    image: "/images/blog/Hair.png",
    category: "Hair Care",
    content: {
      intro: "Creating a natural hair care routine does not need to be complicated. Small daily habits and consistent care can help improve overall hair health and maintain stronger roots.",
      sections: [
        { title: "1. Choose Gentle Products", text: "Mild products help cleanse the scalp without removing natural oils." },
        { title: "2. Oil Your Hair Regularly", text: "Hair oils can help nourish the scalp and improve moisture." },
        { title: "3. Massage Your Scalp", text: "Gentle scalp massage may improve circulation and support healthier roots." },
        { title: "4. Drink Enough Water", text: "Hydration plays an important role in maintaining healthy hair." },
        { title: "5. Stay Consistent", text: "Following a routine regularly often provides better results over time." }
      ],
      outro: "Healthy hair care starts with simple habits. Consistency and proper nourishment can help you maintain stronger and healthier-looking hair naturally."
    }
  }
];
