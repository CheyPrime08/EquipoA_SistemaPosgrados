import { useNavigate } from "react-router-dom";
import { LayoutCoordinacion } from "@/modules/coordinador/common/LayoutCoordinacion";
import { CoordCard } from "@/modules/coordinador/common/card/CoordCard";
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
        <CoordCard
          label="generacion"
          generacion="2025-B"
          descripcion="Próxima entrega: Protocolo de investigación"
          onClick={() => navigate("/ciclo")}
          onContact={() => navigate("/ciclo?tab=Alumnos")}
        />
        <CoordCard
          label="generacion"
          generacion="2026-A"
          descripcion="Próxima entrega: Protocolo de investigación"
          onClick={() => navigate("/ciclo")}
          onContact={() => navigate("/ciclo?tab=Alumnos")}
        />
        <CoordCard
          label="generacion"
          generacion="2026-B"
          descripcion="Próxima entrega: Protocolo de investigación"
          onClick={() => navigate("/ciclo")}
          onContact={() => navigate("/ciclo?tab=Alumnos")}
        />
        <CoordCard
          variant="convocatoria"
          label="Convocatoria"
          generacion="2027-A"
          descripcion="Próxima entrega: Protocolo de investigación"
          onClick={() => navigate("/convocatoria")}
        />
      </div>
    </LayoutCoordinacion>
  );
};

export default InicioCoord;
