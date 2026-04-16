import React from "react";
import { LayoutCoordinacion } from "@/modules/coordinador/common/LayoutCoordinacion";

// Atomic Components
import { PrerregistroHeader } from "@/components/coordinacion/prerregistro/PrerregistroHeader";
import { PrerregistroFilters } from "@/components/coordinacion/prerregistro/PrerregistroFilters";
import { PrerregistroTable } from "@/components/coordinacion/prerregistro/PrerregistroTable";
import { PrerregistroGanttPlaceholder } from "@/components/coordinacion/prerregistro/PrerregistroGanttPlaceholder";

export default function Prerregistro() {
  return (
    <LayoutCoordinacion>
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <div className="flex-1 flex overflow-hidden">
          <section className="flex-1 px-8 py-6 flex flex-col overflow-hidden">
            <PrerregistroHeader />
            <PrerregistroFilters />
            <PrerregistroTable />
            <PrerregistroGanttPlaceholder />
          </section>
        </div>
      </main>
    </LayoutCoordinacion>
  );
}
