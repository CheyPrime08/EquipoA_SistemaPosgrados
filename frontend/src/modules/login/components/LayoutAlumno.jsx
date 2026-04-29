import { LayoutDashboard } from "@/components/layout/LayoutDashboard";
import { AlumnoHeader } from "@/modules/alumno/AlumnoHeader";
import { AlumnoSidebar } from "@/modules/alumno/AlumnoSidebar";
import { AlumnoPanel } from "@/modules/alumno/AlumnoPanel";

export function LayoutAlumno({ children, complementosFlotantes }) {
  return (
    <LayoutDashboard
      Header={AlumnoHeader}
      Sidebar={AlumnoSidebar}
      Panel={AlumnoPanel}
      complementosFlotantes={complementosFlotantes}
    >
      {children}
    </LayoutDashboard>
  );
}
