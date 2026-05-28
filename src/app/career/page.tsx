import { Metadata } from "next";
import CareerContent from "./Content";

export const metadata: Metadata = {
  title: "Careers | V STORIES – Grow With Nature",
  description:
    "Join our passionate team at V STORIES. Help us bring the power of nature to the world. Explore current openings in Digital Marketing, Product Development, and more.",
};

export default function CareerPage() {
  return <CareerContent />;
}
