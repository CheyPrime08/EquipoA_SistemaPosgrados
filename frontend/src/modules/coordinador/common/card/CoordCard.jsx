import { EllipsisVertical, Contact, Archive, PlusCircle } from "lucide-react";
import { usePressAnimation } from "@/hooks/usePressAnimation";
import { CardTitle } from "@/modules/coordinador/common/card/CardTitle";
import { CardDescription } from "@/modules/coordinador/common/card/CardDescription";
import { CardButton } from "@/modules/coordinador/common/card/CardButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function CoordCard({
  variant = "generacion",
  isArchived = false,
  label,
  generacion,
  descripcion,
  onClick,
  onContact,
  onArchive,
  onCreateGeneration,
}) {
  const { handlePress, isPressed } = usePressAnimation();

  const isConvocatoria = variant === "convocatoria";

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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <CardButton
              noTooltip
              icon={EllipsisVertical}
              onMouseDown={() => handlePress("options")}
              isPressed={isPressed("options")}
              iconClassName={iconClassName}
              etiqueta="Más opciones"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className={`${variant === "generacion" ? "w-36" : "w-52"} mt-1 p-1 rounded-2xl shadow-md bg-white backdrop-blur-xs animate-in fade-in zoom-in-95 duration-200 border border-border`}
          >
            {" "}
            <div className="flex flex-col gap-1">
              {variant === "generacion" ? (
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onArchive?.();
                  }}
                  className="flex items-center justify-center gap-2 py-3 rounded-full cursor-pointer border border-transparent text-stone-700 focus:bg-[#FAF8F5] focus:border-[#EBE3D5]"
                >
                  <Archive className="!h-4 !w-4" />
                  <span className="text-sm">Archivar</span>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onCreateGeneration?.();
                  }}
                  className="flex items-center justify-center gap-2 py-3 rounded-full cursor-pointer border border-transparent text-stone-700 focus:bg-[#FAF8F5] focus:border-[#EBE3D5]"
                >
                  <PlusCircle className="!h-4 !w-4" />
                  <span className="text-sm">Crear generación</span>
                </DropdownMenuItem>
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
