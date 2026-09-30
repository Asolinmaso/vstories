import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/admin-auth";
import AdminShell from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, isAdmin } = await getAdminUser();

    if (!user) {
        redirect("/?login=1&redirect=/admin");
    }
    if (!isAdmin) {
        redirect("/");
    }

    return <AdminShell>{children}</AdminShell>;
}
