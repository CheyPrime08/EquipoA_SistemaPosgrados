import React from "react";
import { AppTooltip } from "@/components/common/AppTooltip";

export const CardButton = React.forwardRef(
  (
    {
      icon: Icon,
      onClick,
      onMouseDown,
      isPressed,
      iconClassName,
      etiqueta,
      noTooltip,
      ...props
    },
    ref,
  ) => {
    const button = (
      <button
        ref={ref}
        {...props}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.(e);
          props.onClick?.(e);
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          onMouseDown?.(e);
          props.onMouseDown?.(e);
        }}
        onPointerDown={(e) => {
          e.stopPropagation();
          props.onPointerDown?.(e);
        }}
        className="relative overflow-hidden rounded-full p-2 hover:bg-sidebar transition-colors cursor-pointer"
      >
        <span className={`borde-base ${isPressed ? "animacion-click" : ""}`} />
        <Icon className={`h-5 w-5 z-10 relative ${iconClassName}`} />
      </button>
    );

    if (noTooltip) return button;

    return (
      <AppTooltip etiqueta={etiqueta} {...props}>
        {button}
      </AppTooltip>
    );
  },
);

CardButton.displayName = "CardButton";
