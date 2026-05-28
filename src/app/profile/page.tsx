import type { Metadata } from "next";
import ClientProfile from "./ClientProfile";

export const metadata: Metadata = {
  title: "My Profile | V STORIES",
  description: "View and manage your V Stories account, orders, and addresses.",
};

export default function ProfilePage() {
  return <ClientProfile />;
}
