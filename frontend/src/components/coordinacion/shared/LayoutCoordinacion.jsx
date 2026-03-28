import { LayoutDashboard } from "@/components/shared/layouts/LayoutDashboard";
import { CoordHeader } from "@/components/coordinacion/shared/CoordHeader";
import { CoordSidebar } from "@/components/coordinacion/shared/CoordSidebar";
import { CoordPanel } from "@/components/coordinacion/shared/CoordPanel";

export function LayoutCoordinacion({ children, complementosFlotantes }) {
  return (
    <LayoutDashboard
      Header={CoordHeader}
      Sidebar={CoordSidebar}
      Panel={CoordPanel}
      complementosFlotantes={complementosFlotantes}
    >
      {children}
    </LayoutDashboard>
  );
}
