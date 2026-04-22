import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export function LayoutDashboard({
  Header: HeaderComponent,
  Sidebar: SidebarComponent,
  Panel: PanelComponent,
  children,
  complementosFlotantes,
}) {
  return (
    <TooltipProvider delayDuration={200}>
      <SidebarProvider className="flex-col h-screen overflow-hidden">
        <HeaderComponent />
        <div className="flex flex-1 overflow-hidden relative">
          <SidebarComponent />
          <SidebarInset className="bg-sidebar flex flex-col flex-1 overflow-hidden relative">
            <PanelComponent>{children}</PanelComponent>
            {complementosFlotantes}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}
