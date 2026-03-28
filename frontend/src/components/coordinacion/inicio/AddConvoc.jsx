import React from "react";
import { Plus } from "lucide-react";
import { AppTooltip } from "@/components/shared/AppTooltip";

export const AddConvoc = React.forwardRef(({ onClick, label }, ref) => {
  return (
    <AppTooltip etiqueta="Añadir convocatoria" side="top">
      <button
        ref={ref}
        onClick={onClick}
        className="group flex flex-col items-center gap-2 cursor-pointer"
        aria-label={label}
      >
        <span className="w-18 h-18 rounded-full bg-sidebar flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-sidebar-foreground">
          <Plus className="h-10 w-10 text-sidebar-foreground" strokeWidth={2} />
        </span>
        <span className="text-xs text-muted-foreground group-hover:text-sidebar-foreground transition-colors duration-200">
          {label}
        </span>
      </button>
    </AppTooltip>
  );
});

AddConvoc.displayName = "AddConvoc";
