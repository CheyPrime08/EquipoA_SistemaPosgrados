import { AppHeader } from "@/components/shared/AppHeader";
import { coordRoutes } from "@/routes/coordRoutes";

export function CoordHeader() {
  return <AppHeader rutas={coordRoutes} />;
}
