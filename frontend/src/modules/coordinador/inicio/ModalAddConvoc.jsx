import React, { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CoordInput } from "@/modules/coordinador/common/CoordInput";
import { CheckboxPlantilla } from "./CheckboxPlantilla";
import { createConvocatoria } from "@/api/convocatorias.api";

export function ModalAddConvoc({ children }) {
  const [useTemplate, setUseTemplate] = useState(false);

  const cicloSugerido = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    return month < 6 ? `${year}-B` : `${year + 1}-A`;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const payload = { ...data, useTemplate };
    console.log("Enviando al backend:", payload);
    
    try {
      await createConvocatoria(payload);
      alert("¡Convocatoria creada con éxito!");
      window.location.reload(); // Recargar para actualizar la vista principal
    } catch (error) {
      console.error("Error al crear convocatoria:", error);
      alert("Hubo un error al crear la convocatoria");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="rounded-xl overflow-visible h-[60vh] sm:max-w-[600px] py-10 px-14 flex flex-col shadow-none">
        <div className="absolute -top-12 right-0 flex gap-3">
          <DialogClose asChild>
            <button
              type="button"
              className="rounded-full border border-border bg-background/10 px-4 py-2 text-sm tracking-tight text-white transition hover:bg-primary/30 hover:border-border cursor-pointer min-w-[120px] backdrop-blur-xs"
            >
              Cancelar
            </button>
          </DialogClose>
          <button
            form="add-convoc-form"
            type="submit"
            className="rounded-full border border-border bg-background/10 px-6 py-2 text-sm tracking-tight text-white transition hover:bg-primary/20 hover:border-border cursor-pointer min-w-[120px] backdrop-blur-xs"
          >
            Añadir
          </button>
        </div>

        <DialogHeader className="flex-none pb-8">
          <DialogTitle className="text-2xl tracking-tight">
            Añadir convocatoria
          </DialogTitle>
        </DialogHeader>

        <form
          id="add-convoc-form"
          onSubmit={handleSubmit}
          className="flex flex-col gap-16 flex-1"
        >
          <CoordInput
            id="ciclo"
            name="ciclo"
            label="Ciclo escolar"
            className="h-11 text-base"
            defaultValue={cicloSugerido}
            placeholder="Ej. 2026-B"
            required
          />
          <div className="grid grid-cols-2 gap-6">
            <CoordInput
              id="fecha_inicio"
              name="fecha_inicio"
              label="Fecha de inicio"
              className="h-11 text-sm"
              type="date"
              required
            />
            <CoordInput
              id="fecha_fin"
              name="fecha_fin"
              label="Fecha de fin"
              className="h-11 text-sm"
              type="date"
              required
            />
          </div>

          <CheckboxPlantilla checked={useTemplate} onChange={setUseTemplate} />

          <div className="text-sm text-muted-foreground bg-muted/20 px-4 py-3 mb-3 rounded-xl border border-border/50 mb-auto">
            Confirma el ciclo escolar y el periodo de vigencia para la nueva
            convocatoria de posgrado.
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
