import React from 'react';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { CoordSidebar } from "@/components/coordinacion/shared/CoordSidebar";
import { CoordHeader } from "@/components/coordinacion/shared/CoordHeader";
import RevisionAlumnado from "@/modules/coordinador/alumnos/RevisionAlumnado";

export default function RevAlumnos() {
    return (
        <SidebarProvider className="flex-col h-screen overflow-hidden bg-[#FAF8F5] text-stone-800 font-sans antialiased">
            <CoordHeader />
            <div className="flex flex-1 overflow-hidden relative">
                <CoordSidebar />
                <SidebarInset className="bg-transparent flex flex-1 overflow-hidden">
                    <RevisionAlumnado />
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}
