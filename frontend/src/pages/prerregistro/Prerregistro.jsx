import React from 'react';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { CoordSidebar } from "@/components/coordinacion/shared/CoordSidebar";
import { CoordHeader } from "@/components/coordinacion/shared/CoordHeader";

// Atomic Components
import { PrerregistroHeader } from "@/components/coordinacion/prerregistro/PrerregistroHeader";
import { PrerregistroFilters } from "@/components/coordinacion/prerregistro/PrerregistroFilters";
import { PrerregistroTable } from "@/components/coordinacion/prerregistro/PrerregistroTable";
import { PrerregistroGanttPlaceholder } from "@/components/coordinacion/prerregistro/PrerregistroGanttPlaceholder";

export default function Prerregistro() {
    return (
        <SidebarProvider className="flex-col h-screen overflow-hidden bg-[#FAF8F5] text-stone-800 font-sans antialiased">
            <CoordHeader />
            <div className="flex flex-1 overflow-hidden relative">
                <CoordSidebar />
                <SidebarInset className="bg-transparent flex flex-1 overflow-hidden">
                    {/* Enfoque principal */}
                    <main className="flex-1 flex flex-col h-full overflow-hidden relative">

                        {/* Área de trabajo (Listado) */}
                        <div className="flex-1 flex overflow-hidden">

                            {/* Tabla y Contenido Principal */}
                            <section className="flex-1 px-8 py-6 flex flex-col overflow-hidden">
                                <PrerregistroHeader />
                                <PrerregistroFilters />
                                <PrerregistroTable />
                                <PrerregistroGanttPlaceholder />
                            </section>

                        </div>
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}
