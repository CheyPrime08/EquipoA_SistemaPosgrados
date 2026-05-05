import React from "react";
import { X, FileText, Calendar, Tag, AlignLeft } from "lucide-react";

export function EventosAside({ event, onClose }) {
  if (!event) return null;

  return (
    <aside className="w-[480px] ml-4 bg-white border border-[#EBE3D5] shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col shrink-0 relative rounded-3xl h-[calc(100vh-340px)] overflow-hidden">
      {/* Contenido Scrollable */}
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        {/* Header */}
        <div className="mb-8 relative">
          <div className="flex justify-between items-start mb-0.5">
            <div className="flex items-center gap-4">
              {/* Icono de evento */}
              <div className="w-10 h-10 rounded-full bg-[#f5f1ed] flex items-center justify-center border border-[#EBE3D5] text-[#8a7a63] shrink-0">
                <FileText size={20} />
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl font-medium leading-tight text-stone-800">
                  {event.titulo}
                </h2>
                <span className="text-stone-500 font-normal text-sm">
                  Detalles del evento
                </span>
              </div>
            </div>
            <button
              className="text-stone-400 hover:text-stone-700 transition-colors pt-1"
              onClick={onClose}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Detalles del Evento */}
        <div className="space-y-8">
          {/* Instrucciones / Descripción */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest flex items-center gap-2">
              <AlignLeft size={14} className="text-[#c5b49a]" /> Instrucciones
            </h4>
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#EBE3D5] text-sm text-stone-600 leading-relaxed">
              {event.instrucciones ||
                "No hay instrucciones adicionales para este evento."}
            </div>
          </div>

          {/* Información en Grid */}
          <div className="grid grid-cols-1 gap-6">
            {/* Fecha de Entrega */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest flex items-center gap-2">
                <Calendar size={14} className="text-[#c5b49a]" /> Fecha de
                entrega
              </h4>
              <div className="bg-white px-5 py-4 rounded-2xl border border-[#EBE3D5] flex items-center justify-between group hover:border-[#C9B29B] transition-colors">
                <span className="text-sm font-medium text-stone-700">
                  {event.fecha || "Sin fecha asignada"}
                </span>
                <span className="text-[10px] font-bold text-stone-300 uppercase">
                  Límite
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
