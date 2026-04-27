import { AppHeader } from "@/components/common/AppHeader";
import { sidebarRoutes } from "@/routes/admin/adminRoutes";

export default function AdminHeader() {
  return (
    <>
      <style>{`
        .w-45 .flex-col.gap-1 > div:first-child {
          display: none !important;
        }
      `}</style>
      <AppHeader rutas={sidebarRoutes} />
    </>
  );
}
