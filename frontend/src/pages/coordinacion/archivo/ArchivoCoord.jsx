import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { CoordSidebar } from "@/components/coordinacion/shared/CoordSidebar";
import { CoordHeader } from "@/components/coordinacion/shared/CoordHeader";
import { CoordPanel } from "@/components/coordinacion/shared/CoordPanel";
import { PanelHeader } from "@/components/shared/PanelHeader";
import { CardConvocatoria } from "@/components/coordinacion/shared/CardConvocatoria";

const ArchivoCoord = () => {
  const [seccion, setSeccion] = useState("Egresados");

  return (
    <SidebarProvider className="flex-col h-screen overflow-hidden">
      <CoordHeader />
      <div className="flex flex-1 overflow-hidden relative">
        <CoordSidebar />
        <SidebarInset className="bg-sidebar flex flex-col flex-1 overflow-hidden relative">
          <CoordPanel>
            <PanelHeader seccion={seccion} onSeccion={setSeccion} />
            <div className="flex gap-4">
              {seccion === "Egresados" ? (
                <>
                  <CardConvocatoria
                    label="Ciclo"
                    ciclo="2025-B"
                    descripcion="Próxima entrega: Protocolo de investigación"
                    onClick={() => navigate("/clases/1")}
                  />
                  <CardConvocatoria
                    label="Ciclo"
                    ciclo="2026-A"
                    descripcion="Próxima entrega: Protocolo de investigación"
                    onClick={() => navigate("/clases/1")}
                  />
                  <CardConvocatoria
                    label="Ciclo"
                    ciclo="2026-B"
                    descripcion="Próxima entrega: Protocolo de investigación"
                    onClick={() => navigate("/clases/1")}
                  />
                </>
              ) : (
                <>
                  <CardConvocatoria
                    label="Convocatoria"
                    ciclo="2027-A"
                    descripcion="Próxima entrega: Protocolo de investigación"
                    onClick={() => navigate("/clases/1")}
                  />
                  <CardConvocatoria
                    label="Convocatoria"
                    ciclo="2027-B"
                    descripcion="Próxima entrega: Protocolo de investigación"
                    onClick={() => navigate("/clases/1")}
                  />
                </>
              )}
            </div>
          </CoordPanel>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default ArchivoCoord;
