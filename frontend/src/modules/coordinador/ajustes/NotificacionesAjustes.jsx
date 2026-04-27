import React, { useState } from "react";
import { Check } from "lucide-react";
import { CoordButton } from "@/modules/coordinador/common/CoordButton";

export function NotificacionesAjustes() {
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        }, 800);
    };

    const notificaciones = [
        { title: "Nuevas solicitudes de revisión", desc: "Recibir un correo cuando un alumno suba su protocolo de tesis." },
        { title: "Recordatorios de agenda", desc: "Avisos 24 horas antes de eventos académicos y cierres de ciclo." },
        { title: "Resúmenes semanales", desc: "Un resumen semanal de la actividad de los alumnos." }
    ];

    return (
        <div className="p-8 md:p-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-xl font-medium text-stone-800 mb-6">Preferencias de Notificaciones</h2>
            
            <div className="space-y-6 mb-8">
                {notificaciones.map((item, i) => (
                    <div key={i} className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-[#FAF8F5] border border-[#EBE3D5]/50">
                        <div>
                            <h3 className="text-sm font-medium text-stone-800">{item.title}</h3>
                            <p className="text-xs text-stone-500 mt-1">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer shrink-0">
                            <input type="checkbox" className="sr-only peer" defaultChecked={i !== 2} />
                            <div className="w-11 h-6 bg-[#EBE3D5] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#EBE3D5] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C9B29B]"></div>
                        </label>
                    </div>
                ))}
            </div>

            <div className="border-t border-[#EBE3D5] pt-6 flex justify-end">
                <CoordButton onClick={handleSave} disabled={isSaving}>
                    {isSaving ? "Guardando..." : saved ? <><Check size={16}/> Guardado</> : "Guardar Preferencias"}
                </CoordButton>
            </div>
        </div>
    );
}
