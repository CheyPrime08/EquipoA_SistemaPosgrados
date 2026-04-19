import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { LayoutCoordinacion } from "@/modules/coordinador/common/LayoutCoordinacion";
import { PanelHeader } from "@/components/common/PanelHeader";
import TesisContent from "@/pages/coordinador/ciclo/TesisContent";
import RevAlumnos from "@/pages/coordinador/alumnos/RevAlumnos";

const tabs = ["Eventos", "Alumnos", "Tesis", "Tutorías"];

const CicloCoord = () => {
  const { cicloId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [seccion, setSeccion] = useState("Eventos");

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && tabs.includes(tabParam)) {
      setSeccion(tabParam);
    }
  }, [searchParams]);

  const handleTabChange = (nuevaSeccion) => {
    setSeccion(nuevaSeccion);
    navigate(`/ciclo?tab=${nuevaSeccion}`, { replace: true });
  };

  return (
    <LayoutCoordinacion>
      <div className="h-full flex flex-col overflow-hidden">
        <PanelHeader seccion={seccion} onSeccion={handleTabChange} tabs={tabs} />

        {/* Contenido según la tab seleccionada */}
        <div className="flex-1 overflow-auto">
          {seccion === "Eventos" && (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <p className="text-lg">Sección de Eventos — próximamente</p>
            </div>
          )}
          {seccion === "Alumnos" && <RevAlumnos />}
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
