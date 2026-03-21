import { AppSidebar } from "@/components/shared/AppSidebar";
import { coordRoutes } from "@/routes/coordRoutes";

export function CoordSidebar() {
  return <AppSidebar rutas={coordRoutes} />;
}
