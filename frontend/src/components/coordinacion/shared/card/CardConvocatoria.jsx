import { EllipsisVertical, Contact } from "lucide-react";
import { usePressAnimation } from "@/hooks/usePressAnimation";
import { CardTitle } from "./CardTitle";
import { CardDescription } from "./CardDescription";
import { CardButton } from "./CardButton";

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
      <CardTitle
        label={label}
        ciclo={ciclo}
        cicloClassName="text-sidebar-foreground/70"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(-45deg, currentColor, currentColor 1px, transparent 1px, transparent 8px)`,
          }}
        />
      </CardTitle>
      <CardDescription
        descripcion={descripcion}
        className="text-muted-foreground/60"
      />
      <div className="border-t border-border px-4 py-2 flex justify-between">
        <CardButton
          icon={Contact}
          onClick={onContact}
          onMouseDown={() => handlePress("contact")}
          isPressed={isPressed("contact")}
          iconClassName="text-sidebar-foreground/50"
          etiqueta="Aspirantes"
        />
        <CardButton
          icon={EllipsisVertical}
          onClick={onOptions}
          onMouseDown={() => handlePress("options")}
          isPressed={isPressed("options")}
          iconClassName="text-sidebar-foreground/50"
          etiqueta="Más opciones"
        />
      </div>
    </div>
  );
}
