import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { CoordSidebar } from "@/modules/coordinador/common/CoordSidebar";
import { CoordHeader } from "@/modules/coordinador/common/CoordHeader";
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
