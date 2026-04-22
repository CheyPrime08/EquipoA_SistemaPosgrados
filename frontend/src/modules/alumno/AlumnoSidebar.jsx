import { AppSidebar } from "@/components/common/AppSidebar";
import { alumnoRoutes } from "@/routes/alumno/alumnoRoutes";

export function AlumnoSidebar() {
  return <AppSidebar rutas={alumnoRoutes} />;
}
