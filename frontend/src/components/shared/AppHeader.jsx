import { useLocation } from "react-router-dom";
import { Menu, ChevronRight } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { usePressAnimation } from "@/hooks/usePressAnimation";

export function AppHeader({ rutas }) {
  const location = useLocation();
  const { toggleSidebar } = useSidebar();
  const subRutaActiva = rutas
    .flatMap((r) => r.subItems ?? [])
    .find((sub) => sub.url === location.pathname);
  const { handlePress, isPressed } = usePressAnimation();
  const rutaActiva = rutas.find(
    (r) => r.url === location.pathname && r.url !== "/",
  );
  const tituloActivo = (rutaActiva ?? subRutaActiva)?.title ?? "";
  return (
    <header className="h-18 bg-sidebar/95 flex shrink-0 items-center gap-4 px-4">
      <button
        onClick={toggleSidebar}
        onMouseDown={() => handlePress()}
        className="ml-3 relative overflow-hidden flex items-center justify-center p-3 rounded-full hover:bg-black/5 transition-colors focus:outline-none cursor-pointer"
        aria-label="Alternar menú"
      >
        <span
          className={`borde-base ${isPressed() ? "animacion-click" : ""}`}
        />
        <Menu className="h-5! w-5! shrink-0 transition-transform active:scale-95 z-10" />
      </button>
      <div className="flex items-center gap-2">
        <span className="text-xl font-semibold tracking-tight">
          SISTEMA GESTIÓN POSGRADOS
        </span>
        {tituloActivo && (
          <>
            <ChevronRight />
            <span className="text-xl tracking-tight">{tituloActivo}</span>
          </>
        )}
      </div>
      <div className="ml-auto mr-3 h-8 w-8 rounded-full bg-primary cursor-pointer" />
    </header>
  );
}
