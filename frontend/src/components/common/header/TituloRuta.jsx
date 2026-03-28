import { useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export function TituloRuta({ rutas }) {
  const location = useLocation();

  const availableRoutes = rutas.flatMap((grupo) => grupo.items);

  const subRutaActiva = availableRoutes
    .flatMap((r) => r.subItems ?? [])
    .find((sub) => sub.url === location.pathname);

  const rutaActiva = availableRoutes.find(
    (r) => r.url === location.pathname && r.url !== "/",
  );

  const tituloActivo = (rutaActiva ?? subRutaActiva)?.title ?? "";

  return (
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
  );
}
