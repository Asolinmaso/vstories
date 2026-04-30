import { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
    title: "Contact Us",
    description:
        "Get in touch with V STORIES. Contact us for product inquiries, wholesale partnerships, or reseller opportunities.",
};

export default function ContactPage() {
    return <ContactContent />;
}
