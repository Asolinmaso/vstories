import { Metadata } from "next";
import { motion } from "framer-motion";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
    title: "About Us",
    description:
        "Learn about V STORIES - our mission to revive ancient herbal practices with modern standards. Founded by Fathima Nowra M.",
};

export default function AboutPage() {
    return <AboutContent />;
}
