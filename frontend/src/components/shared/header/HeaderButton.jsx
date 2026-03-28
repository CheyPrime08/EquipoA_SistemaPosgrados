import React from "react";
import { usePressAnimation } from "@/hooks/usePressAnimation";
import { AppTooltip } from "@/components/shared/AppTooltip";

export const HeaderButton = React.forwardRef(({ onClick, icon: Icon, etiqueta = "Botón", className = "", align = "center" }, ref) => {
  const { handlePress, isPressed } = usePressAnimation();

  return (
    <AppTooltip etiqueta={etiqueta} side="bottom" align={align}>
      <button
        ref={ref}
        onClick={onClick}
        onMouseDown={() => handlePress()}
        className={`relative overflow-hidden flex items-center justify-center p-3 rounded-full hover:bg-black/5 transition-colors focus:outline-none cursor-pointer ${className}`}
        aria-label={etiqueta}
      >
        <span className={`borde-base ${isPressed() ? "animacion-click" : ""}`} />
        <Icon className="h-5! w-5! shrink-0 transition-transform active:scale-95 z-10" />
      </button>
    </AppTooltip>
  );
});

HeaderButton.displayName = "HeaderButton";
