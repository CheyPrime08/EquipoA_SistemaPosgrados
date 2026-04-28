import { AppHeader } from "@/components/common/AppHeader";
import { alumnoRoutes } from "@/routes/alumno/alumnoRoutes";

export function AlumnoHeader() {
  return (
    <>
      <style>{`
        .w-45 .flex-col.gap-1 > div:first-child {
          display: none !important;
        }
      `}</style>
      <AppHeader rutas={alumnoRoutes} />
    </>
  );
}
