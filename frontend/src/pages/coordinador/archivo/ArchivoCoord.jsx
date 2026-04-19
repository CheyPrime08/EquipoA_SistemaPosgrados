import { useState } from "react";
import { LayoutCoordinacion } from "@/modules/coordinador/common/LayoutCoordinacion";
import { PanelHeader } from "@/components/common/PanelHeader";
import { CoordCard } from "@/modules/coordinador/common/card/CoordCard";

const ArchivoCoord = () => {
  const [seccion, setSeccion] = useState("Egresados");

  return (
    <LayoutCoordinacion>
      <PanelHeader seccion={seccion} onSeccion={setSeccion} />
      <div className="flex gap-4">
        {seccion === "Egresados" ? (
          <>
            <CoordCard
              isArchived
              variant="convocatoria"
              label="Ciclo"
              ciclo="2025-B"
              descripcion="Próxima entrega: Protocolo de investigación"
              onClick={() => {}}
            />
            <CoordCard
              isArchived
              variant="convocatoria"
              label="Ciclo"
              ciclo="2026-A"
              descripcion="Próxima entrega: Protocolo de investigación"
              onClick={() => {}}
            />
            <CoordCard
              isArchived
              variant="convocatoria"
              label="Ciclo"
              ciclo="2026-B"
              descripcion="Próxima entrega: Protocolo de investigación"
              onClick={() => {}}
            />
          </>
        ) : (
          <>
            <CoordCard
              isArchived
              variant="convocatoria"
              label="Convocatoria"
              ciclo="2027-A"
              descripcion="Próxima entrega: Protocolo de investigación"
              onClick={() => {}}
            />
            <CoordCard
              isArchived
              variant="convocatoria"
              label="Convocatoria"
              ciclo="2027-B"
              descripcion="Próxima entrega: Protocolo de investigación"
              onClick={() => {}}
            />
          </>
        )}
      </div>
    </LayoutCoordinacion>
  );
};

export default ArchivoCoord;
