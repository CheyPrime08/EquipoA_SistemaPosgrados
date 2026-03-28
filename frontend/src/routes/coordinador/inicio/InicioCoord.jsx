import { LayoutCoordinacion } from "@/modules/coordinador/common/LayoutCoordinacion";
import { CardCiclo } from "@/modules/coordinador/common/card/CardCiclo";
import { CardConvocatoria } from "@/modules/coordinador/common/card/CardConvocatoria";
import { AddConvoc } from "@/modules/coordinador/inicio/AddConvoc";

const InicioCoord = () => {
  return (
    <LayoutCoordinacion
      complementosFlotantes={
        <div className="absolute bottom-15 right-15 z-30">
          <AddConvoc onClick={() => {}} />
        </div>
      }
    >
      <div className="flex gap-4">
        <CardCiclo
          label="Ciclo"
          ciclo="2025-B"
          descripcion="Próxima entrega: Protocolo de investigación"
          color="#534AB7"
          onClick={() => {}}
        />
        <CardCiclo
          label="Ciclo"
          ciclo="2026-A"
          descripcion="Próxima entrega: Protocolo de investigación"
          color="#534AB7"
          onClick={() => {}}
        />
        <CardCiclo
          label="Ciclo"
          ciclo="2026-B"
          descripcion="Próxima entrega: Protocolo de investigación"
          color="#534AB7"
          onClick={() => {}}
        />
        <CardConvocatoria
          label="Convocatoria"
          ciclo="2027-A"
          descripcion="Próxima entrega: Protocolo de investigación"
          color="#534AB7"
          onClick={() => {}}
        />
      </div>
    </LayoutCoordinacion>
  );
};

export default InicioCoord;
