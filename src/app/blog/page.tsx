import { Metadata } from "next";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
    title: "Blog | V Stories",
    description:
        "Natural care tips, ingredient stories, and wellness wisdom for a better you.",
};

export default function BlogPage() {
    return <BlogContent />;
}
