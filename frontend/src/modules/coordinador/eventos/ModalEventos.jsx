import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileText, AlignLeft, Calendar, Send } from "lucide-react";
import { CoordButton } from "@/modules/coordinador/common/CoordButton";

export function ModalEventos({ isOpen, onClose, onSave, tareaEnEdicion }) {
  const [formData, setFormData] = useState({
    titulo: "",
    instrucciones: "",
    para: "Todos los alumnos",
    entrega: "",
  });

  useEffect(() => {
    if (tareaEnEdicion) {
      setFormData({
        titulo: tareaEnEdicion.titulo || "",
        instrucciones: tareaEnEdicion.instrucciones || "",
        para: tareaEnEdicion.para || "Todos los alumnos",
        entrega: tareaEnEdicion.fecha || "",
      });
    } else {
      setFormData({
        titulo: "",
        instrucciones: "",
        para: "Todos los alumnos",
        entrega: "",
      });
    }
  }, [tareaEnEdicion, isOpen]);

  const handleGuardar = () => {
    if (!formData.titulo) return;
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[420px] bg-white border border-gray-100 shadow-2xl rounded-2xl p-6 z-50 overflow-hidden">
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-gray-50 pb-2">
            <h4 className="text-sm font-bold text-[#8a7a63]">
              {tareaEnEdicion ? "Editar evento" : "Nuevo evento"}
            </h4>
            <FileText size={16} className="text-[#c5b49a]" />
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-400">
                Título
              </label>
              <input
                type="text"
                value={formData.titulo}
                onChange={(e) =>
                  setFormData({ ...formData, titulo: e.target.value })
                }
                placeholder="Título del evento..."
                className="w-full bg-[#f8f9fa] p-3 rounded-lg border border-gray-100 outline-none focus:border-[#c5b49a]/50 transition-all text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-400">
                Instrucciones
              </label>
              <div className="flex items-start gap-2 bg-[#f8f9fa] p-3 rounded-lg border border-gray-100 focus-within:border-[#c5b49a]/50 transition-all">
                <AlignLeft size={16} className="text-gray-400 mt-1" />
                <textarea
                  value={formData.instrucciones}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      instrucciones: e.target.value,
                    })
                  }
                  placeholder="Instrucciones (opcional)..."
                  rows="3"
                  className="w-full bg-transparent outline-none text-sm text-gray-700 resize-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-400 flex items-center gap-2">
                <Calendar size={12} className="text-[#c5b49a]" /> Entrega
              </label>
              <input
                type="date"
                value={formData.entrega}
                onChange={(e) =>
                  setFormData({ ...formData, entrega: e.target.value })
                }
                className="w-full bg-[#f8f9fa] p-2 rounded-lg border border-gray-100 outline-none text-xs cursor-pointer"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-50">
            <CoordButton onClick={handleGuardar} className="px-8 py-2.5">
              <Send size={16} />
              <span className="text-sm font-semibold text-stone-800">
                {tareaEnEdicion ? "Actualizar" : "Agendar"}
              </span>
            </CoordButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
