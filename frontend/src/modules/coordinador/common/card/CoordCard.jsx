import { EllipsisVertical, Contact } from "lucide-react";
import { usePressAnimation } from "@/hooks/usePressAnimation";
import { CardTitle } from "@/modules/coordinador/common/card/CardTitle";
import { CardDescription } from "@/modules/coordinador/common/card/CardDescription";
import { CardButton } from "@/modules/coordinador/common/card/CardButton";

export function CoordCard({
  variant = "generacion",
  isArchived = false,
  label,
  generacion,
  descripcion,
  onClick,
  onContact,
  onOptions,
}) {
  const { handlePress, isPressed } = usePressAnimation();

  const isConvocatoria = variant === "convocatoria";

  // Estilos condicionales basados en variante y estado
  const containerClasses = `
    text-left w-74 rounded-xl border border-border bg-background overflow-hidden 
    hover:shadow-md transition-all focus-visible:outline-2 focus-visible:outline-sidebar-foreground cursor-pointer
    ${isConvocatoria || isArchived ? "opacity-75 hover:opacity-90" : ""}
  `;

  const titleClassName =
    isConvocatoria || isArchived
      ? "text-sidebar-foreground/70"
      : "text-sidebar-foreground";
  const descClassName =
    isConvocatoria || isArchived
      ? "text-muted-foreground/60"
      : "text-muted-foreground";
  const iconClassName =
    isConvocatoria || isArchived
      ? "text-sidebar-foreground/50"
      : "text-sidebar-foreground";

  const contactLabel = isConvocatoria ? "Aspirantes" : "Alumnos";

  return (
    <div onClick={onClick} className={containerClasses.trim()}>
      <CardTitle
        label={label}
        generacion={generacion}
        generacionClassName={titleClassName}
      >
        {(isConvocatoria || isArchived) && (
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `repeating-linear-gradient(-45deg, currentColor, currentColor 1px, transparent 1px, transparent 8px)`,
            }}
          />
        )}
      </CardTitle>

      <CardDescription descripcion={descripcion} className={descClassName} />

      <div className="border-t border-border px-4 py-2 flex justify-between">
        <CardButton
          icon={Contact}
          onClick={onContact}
          onMouseDown={() => handlePress("contact")}
          isPressed={isPressed("contact")}
          iconClassName={iconClassName}
          etiqueta={contactLabel}
        />
        <CardButton
          icon={EllipsisVertical}
          onClick={onOptions}
          onMouseDown={() => handlePress("options")}
          isPressed={isPressed("options")}
          iconClassName={iconClassName}
          etiqueta="Más opciones"
        />
      </div>
    </div>
  );
}
