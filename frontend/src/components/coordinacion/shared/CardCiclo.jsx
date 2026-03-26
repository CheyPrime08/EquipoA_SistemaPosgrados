import { EllipsisVertical, Contact } from "lucide-react";
import { usePressAnimation } from "@/hooks/usePressAnimation";

export function CardCiclo({
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
      className="text-left w-74 rounded-xl border border-border bg-background overflow-hidden hover:shadow-md transition-shadow focus-visible:outline-2 focus-visible:outline-sidebar-foreground cursor-pointer"
    >
      <div className="h-26 p-4 flex flex-col justify-end bg-sidebar">
        <span className="text-xs font-medium tracking-widest text-sidebar-foreground/50 uppercase mb-1">
          {label}
        </span>
        <span className="text-2xl tracking-tight text-sidebar-foreground">
          {ciclo}
        </span>
      </div>
      <div className="h-35 px-4 pt-3 pb-0">
        <p className="text-sm text-muted-foreground">{descripcion}</p>
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
          <Contact className="h-5 w-5 text-sidebar-foreground z-10 relative" />
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
          <EllipsisVertical className="h-5 w-5 text-sidebar-foreground z-10 relative" />
        </button>
      </div>
    </div>
  );
}
