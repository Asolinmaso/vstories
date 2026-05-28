import { Metadata } from "next";
import WishlistClient from "./WishlistClient";

export const metadata: Metadata = {
    title: "My Wishlist | V STORIES",
    description: "Your favorite herbal essentials, saved in one place.",
};

export default function WishlistPage() {
    return (
        <main>
            <WishlistClient />
        </main>
    );
}
