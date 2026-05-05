import React, { useState } from "react";
import { Archive, Users, CheckSquare, AlertCircle, Search } from "lucide-react";
import { CoordModal } from "@/modules/coordinador/common/CoordModal";
import { CoordButton } from "@/modules/coordinador/common/CoordButton";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const MOCK_ALUMNOS = [
  { id: 1, name: "Juan Pérez García" },
  { id: 2, name: "María Rodríguez López" },
  { id: 3, name: "Carlos Sánchez Ruiz" },
  { id: 4, name: "Ana Belén Martínez" },
  { id: 5, name: "Roberto Gómez" },
  { id: 6, name: "Lucía Fernández" },
];

export function ModalArchivar({ isOpen, onClose, generationName = "2025-B" }) {
  const [method, setMethod] = useState("all"); // 'all' or 'manual'
  const [selectedAlumnos, setSelectedAlumnos] = useState([]);
  const [search, setSearch] = useState("");

  const toggleAlumno = (id) => {
    setSelectedAlumnos((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id],
    );
  };

  const filteredAlumnos = MOCK_ALUMNOS.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleArchive = () => {
    console.log(
      `Archivando generación ${generationName} por método: ${method}`,
      selectedAlumnos,
    );
    onClose();
  };

  return (
    <CoordModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Archivar Generación ${generationName}`}
      icon={<Archive size={18} className="text-[#C9B29B]" />}
      maxWidth="600px"
      footer={
        <>
          <CoordButton variant="secondary" onClick={onClose}>
            Cancelar
          </CoordButton>
          <CoordButton onClick={handleArchive}>Confirmar archivado</CoordButton>
        </>
      }
    >
      <div className="space-y-6">
        <div className="flex items-start gap-3 bg-[#FAF8F5] p-4 rounded-xl border border-[#EBE3D5]">
          <AlertCircle size={18} className="text-[#C9B29B] shrink-0 mt-0.5" />
          <p className="text-xs text-stone-500 leading-relaxed">
            Al archivar esta generación, los alumnos dejarán de aparecer en el
            panel activo, pero su historial y documentos permanecerán
            disponibles en el Archivo.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1">
            Método de archivado
          </h4>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setMethod("all")}
              className={cn(
                "flex items-center gap-4 p-4 rounded-2xl border transition-all text-left cursor-pointer",
                method === "all"
                  ? "bg-white border-[#C9B29B] shadow-sm ring-1 ring-[#C9B29B]/20"
                  : "bg-[#FAF8F5]/50 border-[#EBE3D5] hover:border-[#C9B29B]/50",
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                  method === "all"
                    ? "bg-[#C9B29B] text-white"
                    : "bg-white text-stone-400 border border-[#EBE3D5]",
                )}
              >
                <Users size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-stone-800 leading-tight">
                  Toda la generación
                </p>
              </div>
              <div
                className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                  method === "all"
                    ? "border-[#C9B29B] bg-[#C9B29B]"
                    : "border-[#EBE3D5]",
                )}
              >
                {method === "all" && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>
            </button>

            <button
              onClick={() => setMethod("manual")}
              className={cn(
                "flex items-center gap-4 p-4 rounded-2xl border transition-all text-left cursor-pointer",
                method === "manual"
                  ? "bg-white border-[#C9B29B] shadow-sm ring-1 ring-[#C9B29B]/20"
                  : "bg-[#FAF8F5]/50 border-[#EBE3D5] hover:border-[#C9B29B]/50",
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                  method === "manual"
                    ? "bg-[#C9B29B] text-white"
                    : "bg-white text-stone-400 border border-[#EBE3D5]",
                )}
              >
                <CheckSquare size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-stone-800 leading-tight">
                  Selección manual
                </p>
              </div>
              <div
                className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                  method === "manual"
                    ? "border-[#C9B29B] bg-[#C9B29B]"
                    : "border-[#EBE3D5]",
                )}
              >
                {method === "manual" && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>
            </button>
          </div>
        </div>

        {method === "manual" && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                size={14}
              />
              <input
                type="text"
                placeholder="Buscar alumno..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#EBE3D5] rounded-xl pl-9 pr-4 py-2 text-xs outline-none focus:border-[#C9B29B] transition-colors"
              />
            </div>

            <div className="max-h-[240px] overflow-y-auto pr-2 custom-scrollbar space-y-2">
              {filteredAlumnos.map((alumno) => (
                <div
                  key={alumno.id}
                  onClick={() => toggleAlumno(alumno.id)}
                  className="flex items-center justify-between p-3 rounded-xl border border-[#EBE3D5] hover:border-[#C9B29B]/50 transition-colors cursor-pointer bg-white"
                >
                  <span className="text-xs font-medium text-stone-700">
                    {alumno.name}
                  </span>
                  <Checkbox
                    className="data-[state=checked]:bg-[#C9B29B] data-[state=checked]:border-[#C9B29B]"
                    checked={selectedAlumnos.includes(alumno.id)}
                    onCheckedChange={() => toggleAlumno(alumno.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              ))}
              {filteredAlumnos.length === 0 && (
                <p className="text-center text-[10px] text-stone-400 py-4">
                  No se encontraron alumnos.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </CoordModal>
  );
}
