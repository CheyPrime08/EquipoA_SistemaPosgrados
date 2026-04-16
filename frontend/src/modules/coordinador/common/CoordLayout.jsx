import { LayoutDashboard } from "@/components/shared/LayoutDashboard";
import { CoordHeader } from "./CoordHeader";
import { CoordSidebar } from "./CoordSidebar";
import { CoordPanel } from "./CoordPanel";

export function CoordLayout({ children, complementosFlotantes }) {
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
