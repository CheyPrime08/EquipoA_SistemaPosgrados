import { EllipsisVertical, Contact } from "lucide-react";
import { usePressAnimation } from "@/hooks/usePressAnimation";

export function CardConvocatoria({
  label,
  ciclo,
  descripcion,
  onClick,
  onContact,
  onOptions,
}) {
  const { handlePress, isPressed } = usePressAnimation();
  return (
    <div
      onClick={onClick}
      className="text-left w-74 rounded-xl border border-border bg-background overflow-hidden hover:shadow-md transition-shadow focus-visible:outline-2 focus-visible:outline-sidebar-foreground cursor-pointer opacity-75 hover:opacity-90"
    >
      <div className="h-26 p-4 flex flex-col justify-end bg-sidebar relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(-45deg, currentColor, currentColor 1px, transparent 1px, transparent 8px)`,
          }}
        />
        <span className="text-xs font-medium tracking-widest text-sidebar-foreground/50 uppercase z-10 relative mb-1">
          {label}
        </span>
        <span className="text-2xl tracking-tight text-sidebar-foreground/70 z-10 relative">
          {ciclo}
        </span>
      </div>
      <div className="h-35 px-4 pt-3 pb-0">
        <p className="text-sm text-muted-foreground/60">{descripcion}</p>
      </div>
      <div className="border-t border-border px-4 py-2 flex justify-between">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onContact?.();
          }}
          onMouseDown={() => handlePress("contact")}
          className="relative overflow-hidden rounded-full p-2 hover:bg-sidebar transition-colors cursor-pointer"
        >
          <span
            className={`borde-base ${isPressed("contact") ? "animacion-click" : ""}`}
          />
          <Contact className="h-5 w-5 text-sidebar-foreground/50 z-10 relative" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOptions?.();
          }}
          onMouseDown={() => handlePress("options")}
          className="relative overflow-hidden rounded-full p-2 hover:bg-sidebar transition-colors cursor-pointer"
        >
          <span
            className={`borde-base ${isPressed("options") ? "animacion-click" : ""}`}
          />
          <EllipsisVertical className="h-5 w-5 text-sidebar-foreground/50 z-10 relative" />
        </button>
      </div>
    </div>
  );
}
