import { useState } from "react";
import { LayoutCoordinacion } from "@/modules/coordinador/common/LayoutCoordinacion";
import { PanelHeader } from "@/components/common/PanelHeader";
import { CardConvocatoria } from "@/modules/coordinador/common/card/CardConvocatoria";

const ArchivoCoord = () => {
  const [seccion, setSeccion] = useState("Egresados");

  return (
    <LayoutCoordinacion>
      <PanelHeader seccion={seccion} onSeccion={setSeccion} />
      <div className="flex gap-4">
        {seccion === "Egresados" ? (
          <>
            <CardConvocatoria
              label="Ciclo"
              ciclo="2025-B"
              descripcion="Próxima entrega: Protocolo de investigación"
              onClick={() => {}}
            />
            <CardConvocatoria
              label="Ciclo"
              ciclo="2026-A"
              descripcion="Próxima entrega: Protocolo de investigación"
              onClick={() => {}}
            />
            <CardConvocatoria
              label="Ciclo"
              ciclo="2026-B"
              descripcion="Próxima entrega: Protocolo de investigación"
              onClick={() => {}}
            />
          </>
        ) : (
          <>
            <CardConvocatoria
              label="Convocatoria"
              ciclo="2027-A"
              descripcion="Próxima entrega: Protocolo de investigación"
              onClick={() => {}}
            />
            <CardConvocatoria
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
