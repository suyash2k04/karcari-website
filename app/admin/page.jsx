import AdminDashboard from "@/components/AdminDashboard";
import { isAdmin } from "@/lib/admin-auth";
export const dynamic = "force-dynamic";
export default async function AdminPage() { return <AdminDashboard initiallyLoggedIn={await isAdmin()} />; }
