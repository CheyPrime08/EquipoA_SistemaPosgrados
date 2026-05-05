import React, { useState } from "react";
import { LayoutCoordinacion } from "@/modules/coordinador/common/LayoutCoordinacion";
import { PanelHeader } from "@/components/common/PanelHeader";
import { CoordSearch } from "@/modules/coordinador/common/CoordSearch";
import { FiltroGeneracion } from "@/modules/coordinador/common/FiltroGeneracion";
import { RevisionTable } from "@/modules/coordinador/revision/RevisionTable";

export default function RevisionGlobalPage() {
  const [seccion, setSeccion] = useState("Todas");
  const [searchQuery, setSearchQuery] = useState("");
  const [yearFilter, setYearFilter] = useState("all");

  return (
    <LayoutCoordinacion>
      <div className="flex flex-col h-full overflow-hidden">
        <PanelHeader
          seccion={seccion}
          onSeccion={setSeccion}
          tabs={["Todas", "Pendientes", "Revisadas"]}
        >
          <div className="flex gap-4 items-center">
            <FiltroGeneracion value={yearFilter} onChange={setYearFilter} />
            <div className="w-80">
              <CoordSearch
                value={searchQuery}
                onChange={(val) => setSearchQuery(val)}
                placeholder="Buscar..."
              />
            </div>
          </div>
        </PanelHeader>

        <div className="flex-1 overflow-hidden mt-2">
          <RevisionTable
            statusFilter={
              seccion === "Todas"
                ? "all"
                : seccion === "Pendientes"
                  ? "pendiente"
                  : "revisado"
            }
            searchQuery={searchQuery}
            yearFilter={yearFilter}
          />
        </div>
      </div>
    </LayoutCoordinacion>
  );
}
