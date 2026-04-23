import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { LayoutCoordinacion } from "@/modules/coordinador/common/LayoutCoordinacion";
import { PanelHeader } from "@/components/common/PanelHeader";
import AspirantesPage from "./AspirantesPage";
import EventosConvocatoria from "@/modules/coordinador/tesis/EventosConvocatoria";

const tabs = ["Eventos", "Aspirantes"];

export default function ConvocatoriaCoord() {
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
    navigate(`/convocatoria?tab=${nuevaSeccion}`, { replace: true });
  };

  return (
    <LayoutCoordinacion>
      <div className="h-full flex flex-col overflow-hidden">
        <PanelHeader seccion={seccion} onSeccion={handleTabChange} tabs={tabs} />

        <div className="flex-1 overflow-auto">
          {seccion === "Eventos" && <EventosConvocatoria />}
          {seccion === "Aspirantes" && <AspirantesPage />}
        </div>
      </div>
    </LayoutCoordinacion>
  );
}
