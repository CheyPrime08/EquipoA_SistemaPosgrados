import React, { useState, useRef } from "react";
import { PlusCircle, UserPlus, Filter, AlertCircle, Sparkles, Upload, FileText, Calendar } from "lucide-react";
import { CoordModal } from "@/modules/coordinador/common/CoordModal";
import { CoordButton } from "@/modules/coordinador/common/CoordButton";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const MOCK_TEMPLATES = [
    { id: 1, titulo: "Primer Avance de Tesis" },
    { id: 2, titulo: "Entrega de Protocolo" },
    { id: 3, titulo: "Segundo Avance de Tesis" },
    { id: 4, titulo: "Examen de Grado" }
];

export function ModalCrearGen({ isOpen, onClose, convocatoriaName = "2027-A" }) {
  const [selection, setSelection] = useState("all"); // 'all' or 'filter'
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [addTemplates, setAddTemplates] = useState(false);
  
  // Estado para plantillas seleccionadas con sus fechas
  const [templateSettings, setTemplateSettings] = useState(
    MOCK_TEMPLATES.reduce((acc, curr) => ({
        ...acc,
        [curr.id]: { selected: true, date: "" }
    }), {})
  );

  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (file) {
      setSelectedFile(file);
      console.log("Archivo cargado para filtrado inteligente:", file.name);
    }
  };

  const handleCreate = () => {
    console.log(`Creando generación desde ${convocatoriaName} con selección: ${selection}`);
    if (addTemplates) {
        console.log("Transfiriendo plantillas con configuraciones:", templateSettings);
    }
    onClose();
  };

  const toggleTemplate = (id) => {
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
    <CoordModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Crear Generación desde Convocatoria ${convocatoriaName}`}
      icon={<PlusCircle size={18} className="text-[#C9B29B]" />}
      maxWidth="600px"
      footer={
        <>
          <CoordButton variant="secondary" onClick={onClose}>
            Cancelar
          </CoordButton>
          <CoordButton onClick={handleCreate}>
            Crear y Archivar
          </CoordButton>
        </>
      }
    >
      <div className="space-y-6">
        <div className="flex items-start gap-3 bg-[#FAF8F5] p-5 rounded-xl border border-[#EBE3D5] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-10">
            <Sparkles size={40} className="text-[#C9B29B]" />
          </div>
          <AlertCircle size={20} className="text-[#C9B29B] shrink-0 mt-0.5" />
          <div className="space-y-1 z-10">
            <p className="text-xs font-bold text-stone-800 uppercase tracking-tight">Aviso importante</p>
            <p className="text-xs text-stone-500 leading-relaxed">
              Al crear esta nueva generación, la convocatoria <span className="font-bold text-stone-700">{convocatoriaName}</span> se cerrará y se enviará automáticamente al archivo. Los aspirantes seleccionados se convertirán en alumnos activos.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1">
            Selección de aspirantes
          </h4>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setSelection("all")}
              className={cn(
                "flex items-center gap-4 p-4 rounded-2xl border transition-all text-left cursor-pointer",
                selection === "all" 
                  ? "bg-white border-[#C9B29B] shadow-sm ring-1 ring-[#C9B29B]/20" 
                  : "bg-[#FAF8F5]/50 border-[#EBE3D5] hover:border-[#C9B29B]/50"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                selection === "all" ? "bg-[#C9B29B] text-white" : "bg-white text-stone-400 border border-[#EBE3D5]"
              )}>
                <UserPlus size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-stone-800 leading-tight">Todos los aspirantes</p>
              </div>
              <div className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                selection === "all" ? "border-[#C9B29B] bg-[#C9B29B]" : "border-[#EBE3D5]"
              )}>
                {selection === "all" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
            </button>

            <button
              onClick={() => setSelection("filter")}
              className={cn(
                "flex items-center gap-4 p-4 rounded-2xl border transition-all text-left cursor-pointer",
                selection === "filter" 
                  ? "bg-white border-[#C9B29B] shadow-sm ring-1 ring-[#C9B29B]/20" 
                  : "bg-[#FAF8F5]/50 border-[#EBE3D5] hover:border-[#C9B29B]/50"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                selection === "filter" ? "bg-[#C9B29B] text-white" : "bg-white text-stone-400 border border-[#EBE3D5]"
              )}>
                <Filter size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-stone-800 leading-tight">Filtrado inteligente</p>
              </div>
              <div className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                selection === "filter" ? "border-[#C9B29B] bg-[#C9B29B]" : "border-[#EBE3D5]"
              )}>
                {selection === "filter" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
            </button>
          </div>
        </div>

        {selection === "filter" && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
             <div
                className={cn(
                    "border-2 border-dashed rounded-2xl p-8 flex flex-col items-center gap-3 cursor-pointer transition-colors",
                    isDragging ? "border-[#C9B29B] bg-[#FAF8F5]" : "border-[#EBE3D5] hover:border-[#C9B29B] hover:bg-[#FAF8F5]"
                )}
                onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFile(e.dataTransfer.files[0]); }}
                onClick={() => fileInputRef.current?.click()}
            >
                <Upload size={28} className="text-[#C9B29B]" />
                {selectedFile ? (
                    <p className="text-xs text-stone-700 font-medium text-center">{selectedFile.name}</p>
                ) : (
                    <>
                        <p className="text-sm text-stone-600 font-medium">Arrastra el acta de resultados aquí</p>
                        <p className="text-[10px] text-stone-400 text-center px-8">El sistema identificará automáticamente a los alumnos aprobados.</p>
                    </>
                )}
                <input ref={fileInputRef} type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={e => handleFile(e.target.files[0])} />
            </div>
          </div>
        )}

        <div className="space-y-4 pt-2 border-t border-[#EBE3D5]/50">
            <div className="flex items-center gap-3 px-1">
                <Checkbox 
                    id="add-templates" 
                    type="button"
                    checked={addTemplates}
                    onCheckedChange={(checked) => setAddTemplates(!!checked)}
                    className="border-[#C9B29B] data-[state=checked]:bg-[#C9B29B]"
                />
                <label 
                    htmlFor="add-templates"
                    className="text-sm font-medium text-stone-700 cursor-pointer"
                >
                    Agregar plantillas de eventos automáticamente
                </label>
            </div>

            {addTemplates && (
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
                                    onClick={() => toggleTemplate(template.id)}
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
                                        onCheckedChange={() => toggleTemplate(template.id)}
                                        className="border-[#C9B29B] data-[state=checked]:bg-[#C9B29B]"
                                        onClick={(e) => e.stopPropagation()}
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
      </div>
    </CoordModal>
  );
}
