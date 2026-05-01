/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { LayoutCoordinacion } from "@/modules/coordinador/common/LayoutCoordinacion";
import { PanelHeader } from "@/components/common/PanelHeader";
import AlumnosPage from "./AlumnosPage";
import TesisPage from "./TesisPage";
import TutoriasPage from "./TutoriasPage";
import Eventos from "@/modules/coordinador/common/Eventos";

const tabs = ["Eventos", "Alumnos", "Tesis", "Tutorías"];

export default function CicloCoord() {
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
        <PanelHeader
          seccion={seccion}
          onSeccion={handleTabChange}
          tabs={tabs}
        />

        <div className="flex-1 overflow-auto">
          {seccion === "Eventos" && <Eventos />}
          {seccion === "Alumnos" && <AlumnosPage />}
          {seccion === "Tesis" && <TesisPage cicloId={cicloId} />}
          {seccion === "Tutorías" && <TutoriasPage />}
        </div>
      </div>
    </LayoutCoordinacion>
  );
}
