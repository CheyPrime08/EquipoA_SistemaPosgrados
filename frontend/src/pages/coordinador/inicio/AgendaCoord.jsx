import React, { useState } from "react";
import { LayoutCoordinacion } from "@/modules/coordinador/common/LayoutCoordinacion";
import { FiltroGeneracion } from "@/modules/coordinador/common/FiltroGeneracion";
import { AgendaGantt } from "@/modules/coordinador/agenda/AgendaGantt";

export default function AgendaCoord() {
  const [yearFilter, setYearFilter] = useState("all");

  return (
    <LayoutCoordinacion>
      <div className="flex flex-col h-full overflow-hidden">
        <div className="flex justify-end mb-6">
          <FiltroGeneracion value={yearFilter} onChange={setYearFilter} />
        </div>

        <div className="flex-1 min-h-0">
          <AgendaGantt />
        </div>
      </div>
    </LayoutCoordinacion>
  );
}
