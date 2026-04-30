import { Metadata } from "next";
import FeedbackSection from "@/components/home/FeedbackSection";
import { getProducts } from "@/lib/services/product.service";

export const metadata: Metadata = {
    title: "Share Your Feedback – V STORIES",
    description: "We'd love to hear from you! Share your feedback about our herbal and natural products.",
};

export default async function FeedbackPage() {
    const products = await getProducts();
    return <FeedbackSection products={products} />;
}
