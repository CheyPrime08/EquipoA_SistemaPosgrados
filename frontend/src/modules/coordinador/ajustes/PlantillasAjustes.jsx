import React, { useState } from "react";
import { 
  Plus, 
  Trash2, 
  Edit2, 
  FileText, 
  AlignLeft, 
  Save,
  Check
} from "lucide-react";
import { CoordInput } from "@/modules/coordinador/common/CoordInput";
import { CoordButton } from "@/modules/coordinador/common/CoordButton";
import { cn } from "@/lib/utils";

export function PlantillasAjustes() {
    // Estados para Plantillas de Eventos
    const [plantillas, setPlantillas] = useState([
        {
            id: 1,
            titulo: "Primer Avance de Tesis",
            instrucciones: "Subir el primer avance de su trabajo de investigación en formato PDF."
        },
        {
            id: 2,
            titulo: "Entrega de Protocolo",
            instrucciones: "Asegúrese de que el protocolo esté firmado por su tutor."
        }
    ]);
    const [plantillaSeleccionada, setPlantillaSeleccionada] = useState(plantillas[0]);
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    // Handlers para Plantillas
    const guardarPlantilla = () => {
        setIsSaving(true);
        setTimeout(() => {
            const nuevasPlantillas = plantillas.map(p => 
                p.id === plantillaSeleccionada.id ? plantillaSeleccionada : p
            );
            setPlantillas(nuevasPlantillas);
            setIsSaving(false);
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        }, 800);
    };

    const agregarNuevaPlantilla = () => {
        const nueva = {
            id: Date.now(),
            titulo: "Nueva Plantilla",
            instrucciones: ""
        };
        setPlantillas([...plantillas, nueva]);
        setPlantillaSeleccionada(nueva);
    };

    const eliminarPlantilla = (id) => {
        const nuevas = plantillas.filter(p => p.id !== id);
        setPlantillas(nuevas);
        if (plantillaSeleccionada.id === id && nuevas.length > 0) {
            setPlantillaSeleccionada(nuevas[0]);
        }
    };

    return (
        <div className="flex flex-col h-[600px] animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex-1 overflow-y-auto p-8 md:p-10">
                <div className="flex gap-8 h-full">
                    {/* Lista de plantillas a la izquierda */}
                    <div className="w-64 shrink-0 flex flex-col gap-2">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest">Plantillas Guardadas</h3>
                            <button 
                                onClick={agregarNuevaPlantilla}
                                className="p-1 hover:bg-stone-100 rounded-lg text-[#C9B29B] transition-colors"
                                title="Añadir nueva plantilla"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                        <div className="flex flex-col gap-2 overflow-y-auto pr-1">
                            {plantillas.map(p => (
                                <div key={p.id} className="group relative">
                                    <button
                                        onClick={() => setPlantillaSeleccionada(p)}
                                        className={cn(
                                            "w-full text-left p-4 rounded-2xl border transition-all",
                                            plantillaSeleccionada.id === p.id
                                            ? "bg-white border-[#C9B29B] shadow-sm ring-1 ring-[#C9B29B]/20"
                                            : "bg-[#FAF8F5] border-[#EBE3D5] text-stone-500 hover:border-stone-300"
                                        )}
                                    >
                                        <p className={cn(
                                            "text-sm font-medium pr-6",
                                            plantillaSeleccionada.id === p.id ? "text-stone-800" : "text-stone-600"
                                        )}>{p.titulo}</p>
                                    </button>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); eliminarPlantilla(p.id); }}
                                        className="absolute top-4 right-3 text-stone-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Editor de plantilla a la derecha */}
                    <div className="flex-1 bg-[#FAF8F5] border border-[#EBE3D5] rounded-3xl p-8 overflow-y-auto">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-lg font-medium text-stone-800">Configuración de Plantilla</h3>
                            <CoordButton onClick={guardarPlantilla} disabled={isSaving}>
                                {isSaving ? "Guardando..." : saved ? <><Check size={16}/> Guardado</> : <><Save size={18}/> Guardar</>}
                            </CoordButton>
                        </div>

                        <div className="space-y-6">
                            <CoordInput 
                                label="Título del Evento" 
                                value={plantillaSeleccionada.titulo}
                                onChange={(e) => setPlantillaSeleccionada({...plantillaSeleccionada, titulo: e.target.value})}
                            />

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium">Instrucciones</label>
                                <textarea 
                                    rows={6}
                                    className="w-full bg-white border border-[#EBE3D5] rounded-xl p-4 text-sm outline-none focus:border-[#C9B29B] transition-colors resize-none shadow-sm"
                                    value={plantillaSeleccionada.instrucciones}
                                    onChange={(e) => setPlantillaSeleccionada({...plantillaSeleccionada, instrucciones: e.target.value})}
                                    placeholder="Escribe las instrucciones para este evento..."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
