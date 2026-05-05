import { Menu } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { HeaderButton } from "@/components/common/header/HeaderButton";
import { TituloRuta } from "@/components/common/header/TituloRuta";
import { UdgHeader } from "@/components/common/header/UdgHeader";
import logoUDG from "@/assets/logos/LogoUDG.svg";

export function AppHeader({ rutas }) {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="h-18 bg-sidebar/95 flex shrink-0 items-center gap-4 px-4">
      <HeaderButton
        onClick={toggleSidebar}
        icon={Menu}
        etiqueta="Menú principal"
        className="ml-3"
        align="start"
      />
      <TituloRuta rutas={rutas} />
      <UdgHeader className="ml-auto" />
      <img 
        src={logoUDG} 
        alt="Logo UDG" 
        className="h-8 w-8 object-contain mr-3" 
      />
    </header>
  );
}
