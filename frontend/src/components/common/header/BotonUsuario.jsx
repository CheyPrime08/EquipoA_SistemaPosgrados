import React from "react";
import { AppTooltip } from "@/components/common/AppTooltip";

export const BotonUsuario = React.forwardRef(({ onClick, className = "" }, ref) => {
  return (
    <AppTooltip etiqueta="Cuenta" side="bottom" align="end">
      <div
        ref={ref}
        onClick={onClick}
        className={`ml-auto mr-3 h-8 w-8 rounded-full bg-primary cursor-pointer hover:opacity-90 transition-opacity ${className}`}
      />
    </AppTooltip>
  );
});

BotonUsuario.displayName = "BotonUsuario";
