import { AppHeader } from "@/components/common/AppHeader";
import { coordRoutes } from "@/routes/coordRoutes";

export function CoordHeader() {
  return <AppHeader rutas={coordRoutes} />;
}
