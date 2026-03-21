import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { CoordSidebar } from "@/components/coordinacion/shared/CoordSidebar";
import { CoordHeader } from "@/components/coordinacion/shared/CoordHeader";
import { CoordPanel } from "@/components/coordinacion/shared/CoordPanel";

const HomeCoord = () => {
  return (
    <SidebarProvider className="flex-col h-screen overflow-hidden">
      <CoordHeader />

      <div className="flex flex-1 overflow-hidden relative">
        <CoordSidebar />
        <SidebarInset className="bg-sidebar flex flex-1 overflow-hidden">
          <CoordPanel>
            <p>hola mundo</p>
          </CoordPanel>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default HomeCoord;
