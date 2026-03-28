import { Menu } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { HeaderButton } from "./header/HeaderButton";
import { TituloRuta } from "./header/TituloRuta";
import { BotonUsuario } from "./header/BotonUsuario";

export function AppHeader({ rutas }) {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="h-18 bg-sidebar/95 flex shrink-0 items-center gap-4 px-4">
      <HeaderButton
        onClick={toggleSidebar}
        icon={Menu}
        etiqueta="Desplegar menú"
        className="ml-3"
      />
      <TituloRuta rutas={rutas} />
      <BotonUsuario />
    </header>
  );
}
