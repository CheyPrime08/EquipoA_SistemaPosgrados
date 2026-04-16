import React from "react";
import { LogOut, User, Sparkles } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppTooltip } from "@/components/common/AppTooltip";

export const BotonUsuario = () => {
  return (
    <div className="ml-auto mr-3">
      <DropdownMenu>
        <AppTooltip etiqueta="Cerrar sesión" side="bottom" align="end">
          <DropdownMenuTrigger asChild>
            <div className="h-8 w-8 rounded-full border border-border bg-linear-to-tr from-primary to-primary/60 cursor-pointer hover:ring-2 hover:ring-primary/30 transition-all duration-300 flex items-center justify-center overflow-hidden group"></div>
          </DropdownMenuTrigger>
        </AppTooltip>

        <DropdownMenuContent className="w-45 mt-1 mr-5 p-0 rounded-full shadow-md bg-transparent backdrop-blur-xs animate-in fade-in zoom-in-95 duration-200">
          <div className="">
            <DropdownMenuItem className="flex items-center justify-center gap-2 py-3.5 rounded-full cursor-pointer border border-border text-sidebar-foreground focus:bg-primary/30 focus:border focus:border-border">
              <LogOut className="!h-4 !w-4" />
              <span className="text-sm">Cerrar sesión</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

BotonUsuario.displayName = "BotonUsuario";
