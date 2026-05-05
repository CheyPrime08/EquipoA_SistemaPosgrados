import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { LayoutCoordinacion } from "@/modules/coordinador/common/LayoutCoordinacion";
import { PanelHeader } from "@/components/common/PanelHeader";
import { CoordSearch } from "@/modules/coordinador/common/CoordSearch";
import { CoordButton } from "@/modules/coordinador/common/CoordButton";
import { FiltroEstado } from "@/modules/coordinador/common/FiltroEstado";
import { Download } from "lucide-react";
import AspirantesPage from "./AspirantesPage";

const tabs = ["Aspirantes"];

export default function ConvocatoriaCoord() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [seccion, setSeccion] = useState("Aspirantes");
  const [search, setSearch] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("all");

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
        <PanelHeader seccion={seccion} onSeccion={handleTabChange} tabs={tabs}>
          <div className="flex gap-4 items-center">
            <FiltroEstado
              value={estadoFilter}
              onChange={setEstadoFilter}
            />
            <CoordButton
              className="h-[42px] whitespace-nowrap rounded-xl"
              onClick={() => console.log("Exportando...")}
            >
              <Download size={18} />
              Exportar todos
            </CoordButton>
            <CoordSearch
              value={search}
              onChange={setSearch}
              placeholder="Buscar..."
            />
          </div>
        </PanelHeader>

        <div className="flex-1 overflow-auto">
          {seccion === "Aspirantes" && (
            <AspirantesPage search={search} estado={estadoFilter} />
          )}
        </div>
      </div>
    </LayoutCoordinacion>
  );
}
