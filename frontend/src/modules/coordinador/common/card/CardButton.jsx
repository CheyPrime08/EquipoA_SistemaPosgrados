import React from "react";
import { AppTooltip } from "@/components/common/AppTooltip";

export const CardButton = React.forwardRef(({ icon: Icon, onClick, onMouseDown, isPressed, iconClassName, etiqueta }, ref) => {
  return (
    <AppTooltip etiqueta={etiqueta}>
      <button
        ref={ref}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
        onMouseDown={onMouseDown}
        className="relative overflow-hidden rounded-full p-2 hover:bg-sidebar transition-colors cursor-pointer"
      >
        <span
          className={`borde-base ${isPressed ? "animacion-click" : ""}`}
        />
        <Icon className={`h-5 w-5 z-10 relative ${iconClassName}`} />
      </button>
    </AppTooltip>
  );
});

CardButton.displayName = "CardButton";
