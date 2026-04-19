import { AppSidebar } from "@/components/common/AppSidebar";
import { sidebarRoutes } from "@/routes/coordRoutes";

export function CoordSidebar() {
  return <AppSidebar rutas={sidebarRoutes} />;
}
