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
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_TEMPLATES = [
    { id: 1, titulo: "Primer Avance de Tesis" },
    { id: 2, titulo: "Entrega de Protocolo" },
    { id: 3, titulo: "Segundo Avance de Tesis" },
    { id: 4, titulo: "Examen de Grado" }
];

export function ModalAddConvoc({ children }) {
  const [useTemplate, setUseTemplate] = useState(false);
  
  // Estado para plantillas seleccionadas con sus fechas
  const [templateSettings, setTemplateSettings] = useState(
    MOCK_TEMPLATES.reduce((acc, curr) => ({
        ...acc,
        [curr.id]: { selected: true, date: "" }
    }), {})
  );

  // States for the inputs to avoid using <form>
  const [ciclo, setCiclo] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const cycleSuggested = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const suggested = month < 6 ? `${year}-B` : `${year + 1}-A`;
    return suggested;
  }, []);

  // Initialize ciclo with suggestion if empty
  React.useEffect(() => {
    if (!ciclo) setCiclo(cycleSuggested);
  }, [cycleSuggested, ciclo]);

  const handleManualSubmit = () => {
    const data = { 
        ciclo, 
        fecha_inicio: fechaInicio, 
        fecha_fin: fechaFin, 
        useTemplate, 
        templateSettings 
    };
    console.log("Manual Submission Data:", data);
  };

  const toggleTemplate = (id, e) => {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    setTemplateSettings(prev => ({
        ...prev,
        [id]: { ...prev[id], selected: !prev[id].selected }
    }));
  };

  const handleDateChange = (id, date) => {
    setTemplateSettings(prev => ({
        ...prev,
        [id]: { ...prev[id], date }
    }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="rounded-xl overflow-visible sm:max-w-[600px] py-10 px-14 flex flex-col shadow-none bg-white">
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
            type="button"
            onClick={handleManualSubmit}
            className="rounded-full border border-border bg-background/10 px-6 py-2 text-sm tracking-tight text-white transition hover:bg-primary/20 hover:border-border cursor-pointer min-w-[120px] backdrop-blur-xs"
          >
            Añadir
          </button>
        </div>

        <DialogHeader className="flex-none pb-8">
          <DialogTitle className="text-2xl tracking-tight text-stone-800">
            Añadir convocatoria
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6 flex-none">
          <CoordInput
            id="ciclo"
            label="Ciclo escolar"
            className="h-11 text-base"
            value={ciclo}
            onChange={(e) => setCiclo(e.target.value)}
            placeholder="Ej. 2026-B"
          />
          <div className="grid grid-cols-2 gap-6">
            <CoordInput
              id="fecha_inicio"
              label="Fecha de inicio"
              className="h-11 text-sm"
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
            <CoordInput
              id="fecha_fin"
              label="Fecha de fin"
              className="h-11 text-sm"
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <CheckboxPlantilla 
              checked={useTemplate} 
              onChange={setUseTemplate} 
            />

            {useTemplate && (
                <div className="bg-[#FAF8F5]/80 border border-[#EBE3D5] rounded-2xl p-4 space-y-3 animate-in fade-in zoom-in-95 duration-200 max-h-[280px] overflow-y-auto">
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-1">
                        Selecciona los eventos y sus fechas
                    </p>
                    <div className="space-y-3">
                        {MOCK_TEMPLATES.map(template => (
                            <div 
                                key={template.id}
                                className={cn(
                                    "flex flex-col gap-3 p-3 rounded-xl border transition-all bg-white",
                                    templateSettings[template.id].selected
                                    ? "border-[#C9B29B] shadow-sm"
                                    : "border-transparent opacity-60"
                                )}
                            >
                                <div 
                                    className="flex items-center justify-between cursor-pointer"
                                    onClick={(e) => toggleTemplate(template.id, e)}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#EBE3D5] flex items-center justify-center text-[#C9B29B]">
                                            <FileText size={14} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-stone-800">{template.titulo}</p>
                                        </div>
                                    </div>
                                    <Checkbox 
                                        type="button"
                                        checked={templateSettings[template.id].selected}
                                        onCheckedChange={() => {}} 
                                        className="border-[#C9B29B] data-[state=checked]:bg-[#C9B29B]"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            toggleTemplate(template.id);
                                        }}
                                    />
                                </div>
                                
                                {templateSettings[template.id].selected && (
                                    <div className="flex items-center gap-3 pt-2 border-t border-[#FAF8F5] animate-in slide-in-from-top-1 duration-200">
                                        <div className="flex items-center gap-2 bg-[#FAF8F5] border border-[#EBE3D5] rounded-lg px-3 py-1.5 flex-1">
                                            <Calendar size={12} className="text-[#C9B29B]" />
                                            <input 
                                                type="date"
                                                className="bg-transparent text-[11px] text-stone-600 outline-none w-full"
                                                value={templateSettings[template.id].date}
                                                onChange={(e) => handleDateChange(template.id, e.target.value)}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
          </div>

          <div className="text-sm text-muted-foreground bg-muted/20 px-4 py-3 rounded-xl border border-border/50">
            Confirma el ciclo escolar y el periodo de vigencia para la nueva
            convocatoria de posgrado.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
