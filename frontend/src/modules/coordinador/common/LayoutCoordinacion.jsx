import { LayoutDashboard } from "@/components/layout/LayoutDashboard";
import { CoordHeader } from "@/modules/coordinador/common/CoordHeader";
import { CoordSidebar } from "@/modules/coordinador/common/CoordSidebar";
import { CoordPanel } from "@/modules/coordinador/common/CoordPanel";

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
