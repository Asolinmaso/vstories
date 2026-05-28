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
    intro?: string;
    sections: { title: string; body: string }[];
    outro?: string;
  };
}

export const blogPosts: BlogPost[] = [
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
        { title: "1. Nourish with Natural Oils", body: "Oils like coconut, bhringraj, and castor oil penetrate deep into the scalp, providing essential nutrients and strengthening hair follicles." },
        { title: "2. Scalp Massage", body: "Regular scalp massage improves blood circulation, reduces stress, and helps deliver nutrients to the hair roots." },
        { title: "3. Use Herbal Hair Care", body: "Herbs like bhringraj, amla, and fenugreek are known to strengthen roots, reduce hair fall, and promote healthy growth." },
        { title: "4. Eat a Balanced Diet", body: "Protein, iron, vitamins, and healthy fats are essential for strong hair. Include leafy greens, nuts, seeds, and fruits in your diet." },
        { title: "5. Stay Hydrated", body: "Drinking enough water helps maintain scalp moisture and keeps your hair roots healthy and strong." },
        { title: "6. Avoid Harsh Chemicals", body: "Limit the use of harsh chemical products that can weaken your roots and cause breakage." },
        { title: "7. Be Consistent & Patient", body: "Natural care takes time. Be consistent with your routine and give your hair the love it deserves." }
      ],
      outro: "Follow these natural tips and pair them with Vstories' herbal hair care range for best results. Strong roots, healthy you!"
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
        { title: "1. Supports Healthy Hair Growth", body: "Bhringraj is known for nourishing the scalp and strengthening hair follicles. Regular use may help create an environment that supports natural hair growth." },
        { title: "2. Helps Reduce Hair Fall", body: "Weak roots and lack of nourishment often lead to hair fall. Bhringraj helps strengthen the roots and reduce breakage over time." },
        { title: "3. Improves Scalp Health", body: "A healthy scalp plays an important role in maintaining healthy hair. Bhringraj helps soothe dryness and keeps the scalp balanced." },
        { title: "4. Adds Shine and Strength", body: "Hair that receives proper nourishment often appears smoother, healthier, and naturally shinier." },
        { title: "5. Suitable for Everyday Hair Care", body: "Bhringraj can easily become a part of your regular hair care routine through oils, shampoos, and herbal products." }
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
        { title: "1. Gentle Cleansing Matters", body: "Using mild cleansers helps remove dirt and impurities while maintaining the skin's natural moisture." },
        { title: "2. Natural Ingredients Support Skin Health", body: "Traditional ingredients like turmeric, aloe vera, and sandalwood are widely used for their soothing and nourishing properties." },
        { title: "3. Hydration Is Essential", body: "Keeping your skin hydrated helps improve texture and maintain a healthy appearance." },
        { title: "4. Healthy Nutrition Supports Skin", body: "Foods rich in vitamins and antioxidants can contribute to healthier skin from within." },
        { title: "5. Follow a Consistent Routine", body: "Regular care often provides better long-term results than occasional treatments." }
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
        { title: "1. Bhringraj", body: "Known for strengthening roots and supporting healthier hair growth." },
        { title: "2. Hibiscus", body: "Hibiscus helps condition hair and may improve scalp moisture naturally." },
        { title: "3. Fenugreek", body: "Rich in nutrients that help support stronger hair and healthier roots." },
        { title: "4. Neem", body: "Neem helps maintain scalp cleanliness and freshness." },
        { title: "5. Aloe Vera", body: "Aloe vera provides hydration and helps soothe dryness and irritation." }
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
        { title: "1. Thoughtfully Selected Ingredients", body: "We prioritize ingredients sourced with quality and care in mind." },
        { title: "2. Responsible Packaging Choices", body: "Reducing unnecessary packaging helps minimize environmental impact." },
        { title: "3. Supporting Better Practices", body: "Sustainable methods help create long-term benefits for communities and the planet." },
        { title: "4. Reducing Waste", body: "Small improvements in processes can contribute to meaningful environmental changes." },
        { title: "5. Creating Positive Impact", body: "Responsible decisions today help build a better future tomorrow." }
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
        { title: "1. Choose Gentle Products", body: "Mild products help cleanse the scalp without removing natural oils." },
        { title: "2. Oil Your Hair Regularly", body: "Hair oils can help nourish the scalp and improve moisture." },
        { title: "3. Massage Your Scalp", body: "Gentle scalp massage may improve circulation and support healthier roots." },
        { title: "4. Drink Enough Water", body: "Hydration plays an important role in maintaining healthy hair." },
        { title: "5. Stay Consistent", body: "Following a routine regularly often provides better results over time." }
      ],
      outro: "Healthy hair care starts with simple habits. Consistency and proper nourishment can help you maintain stronger and healthier-looking hair naturally."
    }
  }
];
