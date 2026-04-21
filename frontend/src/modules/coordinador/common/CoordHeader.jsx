import { AppHeader } from "@/components/common/AppHeader";
import { allRoutes } from "@/routes/coordRoutes";

export function CoordHeader() {
  return <AppHeader rutas={allRoutes} />;
}
