import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export function LayoutDashboard({ 
  Header, 
  Sidebar,
  Panel,
  children, 
  complementosFlotantes 
}) {
  return (
    <TooltipProvider delayDuration={200}>
      <SidebarProvider className="flex-col h-screen overflow-hidden">
        {Header && <Header />}
        <div className="flex flex-1 overflow-hidden relative">
          {Sidebar && <Sidebar />}
          <SidebarInset className="bg-sidebar flex flex-col flex-1 overflow-hidden relative">
            {Panel ? <Panel>{children}</Panel> : children}
            {complementosFlotantes}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}
