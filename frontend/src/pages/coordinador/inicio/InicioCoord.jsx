import { useNavigate } from "react-router-dom";
import { LayoutCoordinacion } from "@/modules/coordinador/common/LayoutCoordinacion";
import { CardCiclo } from "@/modules/coordinador/common/card/CardCiclo";
import { CardConvocatoria } from "@/modules/coordinador/common/card/CardConvocatoria";
import { AddConvoc } from "@/modules/coordinador/inicio/AddConvoc";

const InicioCoord = () => {
  const navigate = useNavigate();

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
          onClick={() => navigate("/ciclo/2025-B")}
        />
        <CardCiclo
          label="Ciclo"
          ciclo="2026-A"
          descripcion="Próxima entrega: Protocolo de investigación"
          color="#534AB7"
          onClick={() => navigate("/ciclo/2026-A")}
        />
        <CardCiclo
          label="Ciclo"
          ciclo="2026-B"
          descripcion="Próxima entrega: Protocolo de investigación"
          color="#534AB7"
          onClick={() => navigate("/ciclo/2026-B")}
        />
        <CardConvocatoria
          label="Convocatoria"
          ciclo="2027-A"
          descripcion="Próxima entrega: Protocolo de investigación"
          color="#534AB7"
          onClick={() => navigate("/ciclo/2027-A")}
        />
      </div>
    </LayoutCoordinacion>
  );
};

export default InicioCoord;

