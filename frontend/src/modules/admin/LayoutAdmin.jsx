import { LayoutDashboard } from "@/components/layout/LayoutDashboard";
import AdminHeader from "@/modules/admin/components/AdminHeader";
import { AdminSidebar } from "@/modules/admin/components/AdminSidebar";
import { AdminPanel } from "@/modules/admin/components/AdminPanel";


export function LayoutAdmin({ children, complementosFlotantes }) {
  return (
    <LayoutDashboard
      Header={AdminHeader}
      Sidebar={AdminSidebar}
      Panel={AdminPanel}
      complementosFlotantes={complementosFlotantes}
    >
      {children}
    </LayoutDashboard>
  );
}
