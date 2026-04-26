import { AppSidebar } from "@/components/common/AppSidebar";
import { sidebarRoutes } from "@/routes/admin/adminRoutes";

export function AdminSidebar() {
  return <AppSidebar rutas={sidebarRoutes} />;
}
