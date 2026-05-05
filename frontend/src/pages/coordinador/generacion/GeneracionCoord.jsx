/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { LayoutCoordinacion } from "@/modules/coordinador/common/LayoutCoordinacion";
import { PanelHeader } from "@/components/common/PanelHeader";
import RevisionPage from "./RevisionPage";
import Eventos from "@/modules/coordinador/common/Eventos";
import { CoordSearch } from "@/modules/coordinador/common/CoordSearch";

import { RevisionFilters } from "@/modules/coordinador/revision/RevisionFilters";

const tabs = ["Eventos", "Revisión"];

export default function GeneracionCoord() {
  const { generacionId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [seccion, setSeccion] = useState("Eventos");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && tabs.includes(tabParam)) {
      setSeccion(tabParam);
    }
  }, [searchParams]);

  const handleTabChange = (nuevaSeccion) => {
    setSeccion(nuevaSeccion);
    navigate(`/generacion?tab=${nuevaSeccion}`, { replace: true });
  };

  return (
    <LayoutCoordinacion>
      <div className="h-full flex flex-col overflow-hidden">
        <PanelHeader seccion={seccion} onSeccion={handleTabChange} tabs={tabs}>
          {seccion === "Revisión" && (
            <div className="flex gap-4 items-center">
              <RevisionFilters
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
              />
              <CoordSearch
                value={search}
                onChange={setSearch}
                placeholder="Buscar..."
              />
            </div>
          )}
        </PanelHeader>

        <div className="flex-1 overflow-auto">
          {seccion === "Eventos" && <Eventos search={search} />}
          {seccion === "Revisión" && (
            <RevisionPage search={search} statusFilter={statusFilter} />
          )}
        </div>
      </div>
    </LayoutCoordinacion>
  );
}
