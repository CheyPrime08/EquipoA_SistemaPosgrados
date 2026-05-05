import React from "react";
import { Plus } from "lucide-react";
import { AppTooltip } from "@/components/common/AppTooltip";

export const AddEventos = React.forwardRef(({ onClick, label = "Añadir evento" }, ref) => {
  return (
    <AppTooltip etiqueta={label} side="top">
      <button
        ref={ref}
        onClick={onClick}
        className="cursor-pointer"
        aria-label={label}
      >
        <span className="w-18 h-18 rounded-full bg-sidebar flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-sidebar-foreground">
          <Plus className="h-10 w-10 text-sidebar-foreground" strokeWidth={2} />
        </span>
      </button>
    </AppTooltip>
  );
});

AddEventos.displayName = "AddEventos";
