import React from "react";
import { PrerregistroFilters } from "@/modules/coordinador/aspirantes/PrerregistroFilters";
import { PrerregistroTable } from "@/modules/coordinador/aspirantes/PrerregistroTable";
import { PrerregistroGanttPlaceholder } from "@/modules/coordinador/aspirantes/PrerregistroGanttPlaceholder";

export default function AspirantesPage() {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <PrerregistroFilters />
      <PrerregistroTable />
      <PrerregistroGanttPlaceholder />
    </div>
  );
}
