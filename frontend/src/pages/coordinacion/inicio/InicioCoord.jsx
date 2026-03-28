import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { CoordSidebar } from "@/components/coordinacion/shared/CoordSidebar";
import { CoordHeader } from "@/components/coordinacion/shared/CoordHeader";
import { CoordPanel } from "@/components/coordinacion/shared/CoordPanel";
import { CardCiclo } from "@/components/coordinacion/shared/card/CardCiclo";
import { CardConvocatoria } from "@/components/coordinacion/shared/card/CardConvocatoria";
import { AddConvoc } from "@/components/coordinacion/inicio/AddConvoc";

const InicioCoord = () => {
  return (
    <SidebarProvider className="flex-col h-screen overflow-hidden">
      <CoordHeader />
      <div className="flex flex-1 overflow-hidden relative">
        <CoordSidebar />
        <SidebarInset className="bg-sidebar flex flex-col flex-1 overflow-hidden relative">
          <CoordPanel>
            <div className="flex gap-4">
              <CardCiclo
                label="Ciclo"
                ciclo="2025-B"
                descripcion="Próxima entrega: Protocolo de investigación"
                color="#534AB7"
                onClick={() => navigate("/clases/1")}
              />
              <CardCiclo
                label="Ciclo"
                ciclo="2026-A"
                descripcion="Próxima entrega: Protocolo de investigación"
                color="#534AB7"
                onClick={() => navigate("/clases/1")}
              />
              <CardCiclo
                label="Ciclo"
                ciclo="2026-B"
                descripcion="Próxima entrega: Protocolo de investigación"
                color="#534AB7"
                onClick={() => navigate("/clases/1")}
              />
              <CardConvocatoria
                label="Convocatoria"
                ciclo="2027-A"
                descripcion="Próxima entrega: Protocolo de investigación"
                color="#534AB7"
                onClick={() => navigate("/clases/1")}
              />
            </div>
          </CoordPanel>
          <div className="absolute bottom-15 right-15 z-30">
            <AddConvoc onClick={() => console.log("agregar ciclo")} />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default InicioCoord;
