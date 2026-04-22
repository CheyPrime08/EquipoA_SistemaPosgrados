import { AppHeader } from "@/components/common/AppHeader";
import { alumnoRoutes } from "@/routes/alumno/alumnoRoutes";

export function AlumnoHeader() {
  return <AppHeader rutas={alumnoRoutes} />;
}
