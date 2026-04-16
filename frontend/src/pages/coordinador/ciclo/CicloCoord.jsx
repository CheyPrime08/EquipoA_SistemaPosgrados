import { useState } from "react";
import { useParams } from "react-router-dom";
import { LayoutCoordinacion } from "@/modules/coordinador/common/LayoutCoordinacion";
import { PanelHeader } from "@/components/common/PanelHeader";
import TesisContent from "@/pages/coordinador/ciclo/tabs/TesisContent";

const tabs = ["Expedientes", "Tesis", "Tutorías"];

const CicloCoord = () => {
  const { cicloId } = useParams();
  const [seccion, setSeccion] = useState("Tesis");

  return (
    <LayoutCoordinacion>
      <div className="h-full flex flex-col overflow-hidden">
        {/* Título del ciclo */}
        <h1 className="text-[28px] font-medium text-stone-800 mb-4">
          Ciclo {cicloId}
        </h1>

        {/* Tabs: Expedientes | Tesis | Tutorías */}
        <PanelHeader seccion={seccion} onSeccion={setSeccion} tabs={tabs} />

        {/* Contenido según la tab seleccionada */}
        <div className="flex-1 overflow-auto">
          {seccion === "Expedientes" && (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <p className="text-lg">Sección de Expedientes — próximamente</p>
            </div>
          )}
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
