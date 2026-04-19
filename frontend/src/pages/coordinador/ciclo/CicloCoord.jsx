import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { LayoutCoordinacion } from "@/modules/coordinador/common/LayoutCoordinacion";
import { PanelHeader } from "@/components/common/PanelHeader";
import TesisContent from "@/pages/coordinador/ciclo/tabs/TesisContent";
import RevisionAlumnado from "@/modules/coordinador/alumnos/RevisionAlumnado";

const tabs = ["Eventos", "Alumnos", "Tesis", "Tutorías"];

const CicloCoord = () => {
  const { cicloId } = useParams();
  const [searchParams] = useSearchParams();
  const [seccion, setSeccion] = useState("Tesis");

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && tabs.includes(tabParam)) {
      setSeccion(tabParam);
    }
  }, [searchParams]);

  return (
    <LayoutCoordinacion>
      <div className="h-full flex flex-col overflow-hidden">
        {/* Tabs: Eventos | Alumnos | Tesis | Tutorías */}
        <PanelHeader seccion={seccion} onSeccion={setSeccion} tabs={tabs} />

        {/* Contenido según la tab seleccionada */}
        <div className="flex-1 overflow-auto">
          {seccion === "Eventos" && (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <p className="text-lg">Sección de Eventos — próximamente</p>
            </div>
          )}
          {seccion === "Alumnos" && <RevisionAlumnado />}
          {seccion === "Tesis" && <TesisContent cicloId={cicloId} />}
          {seccion === "Tutorías" && (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <p className="text-lg">Sección de Tutorías — próximamente</p>
            </div>
          )}
        </div>
      </div>
    </LayoutCoordinacion>
  );
};

export default CicloCoord;
