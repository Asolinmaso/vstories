import type { Metadata } from "next";
import ClientCart from "./ClientCart";

export const metadata: Metadata = {
    title: "My Cart | V Stories",
    description: "Review your selected products and proceed to secure checkout.",
};

export default function Page() {
    return <ClientCart />;
}
