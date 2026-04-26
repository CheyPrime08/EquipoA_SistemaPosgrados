import { AppHeader } from "@/components/common/AppHeader";
import { sidebarRoutes } from "@/routes/admin/adminRoutes";

export default function AdminHeader() {
  return <AppHeader rutas={sidebarRoutes} />;
}
