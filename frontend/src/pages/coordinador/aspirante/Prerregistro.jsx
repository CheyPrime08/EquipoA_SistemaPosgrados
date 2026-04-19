import React from "react";
import { PrerregistroFilters } from "@/modules/coordinador/aspirantes/PrerregistroFilters";
import { PrerregistroTable } from "@/modules/coordinador/aspirantes/PrerregistroTable";
import { PrerregistroGanttPlaceholder } from "@/modules/coordinador/aspirantes/PrerregistroGanttPlaceholder";

export default function Prerregistro() {
  return (
    <main className="flex-1 flex flex-col h-full overflow-hidden relative">
      <div className="flex-1 flex overflow-hidden">
        <section className="flex-1 flex flex-col overflow-hidden">
          <PrerregistroFilters />
          <PrerregistroTable />
          <PrerregistroGanttPlaceholder />
        </section>
      </div>
    </main>
  );
}
