import { Menu } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { HeaderButton } from "@/components/common/header/HeaderButton";
import { TituloRuta } from "@/components/common/header/TituloRuta";
import { UserButton } from "@/components/common/header/UserButton";

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
      <UserButton />
    </header>
  );
}
