import React, { useState, useEffect } from "react";
import { FileText, Eye, Save } from "lucide-react";
import { CoordModal } from "../common/CoordModal";
import { CoordButton } from "../common/CoordButton";

export function TutoriaModal({ isOpen, onClose, tutoria, reportes = [] }) {
  const [showReporte, setShowReporte] = useState(null);
  const [tutorName, setTutorName] = useState("");
  const [tutorChanged, setTutorChanged] = useState(false);

  useEffect(() => {
    if (tutoria?.tutor) {
      setTutorName(tutoria.tutor);
      setTutorChanged(false);
    }
  }, [tutoria]);

  const handleTutorChange = (e) => {
    setTutorName(e.target.value);
    setTutorChanged(e.target.value !== tutoria.tutor);
  };

  const handleSaveTutor = () => {
    // Aquí iría la lógica de guardado
    console.log("Guardando tutor:", tutorName);
    setTutorChanged(false);
  };

  if (!tutoria) return null;

  return (
    <>
      <CoordModal
        isOpen={isOpen}
        onClose={onClose}
        title="Detalles de Tutoría"
        icon={<FileText size={18} className="text-[#C9B29B]" />}
        maxWidth="560px"
        footer={<CoordButton onClick={onClose}>Cerrar</CoordButton>}
      >
        <div className="flex flex-col gap-5">
          {/* Tutor Editable */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
              Tutor Asignado
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                value={tutorName}
                onChange={handleTutorChange}
                className="w-full text-sm text-stone-800 bg-[#FAF8F5] rounded-xl px-4 py-3 border border-[#EBE3D5] outline-none focus:border-[#C9B29B] transition-colors"
              />
              {tutorChanged && (
                <button
                  onClick={handleSaveTutor}
                  className="absolute right-3 text-[#C9B29B] hover:text-stone-700 transition-colors p-1"
                  title="Guardar cambio"
                >
                  <Save size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Reportes / Archivos de Tutoría */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
              Reportes de Tutoría
            </label>
            {reportes && reportes.length > 0 ? (
              <div className="space-y-2">
                {reportes.map((reporte, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-[#FAF8F5] rounded-xl px-4 py-3 border border-[#EBE3D5] group/doc"
                  >
                    <div className="flex items-center gap-3">
                      <FileText size={18} className="text-[#D8C4B6] shrink-0" />
                      <span className="text-sm text-stone-800 font-medium">
                        {reporte}
                      </span>
                    </div>
                    <button
                      title="Ver reporte"
                      onClick={() => setShowReporte(reporte)}
                      className="text-stone-400 hover:text-[#C9B29B] transition-colors"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-stone-400 bg-[#FAF8F5] rounded-xl px-4 py-3 border border-[#EBE3D5]">
                No hay reportes subidos aún.
              </p>
            )}
          </div>
        </div>
      </CoordModal>

      {/* Modal: Vista previa de un reporte individual */}
      <CoordModal
        isOpen={showReporte !== null}
        onClose={() => setShowReporte(null)}
        title={showReporte || ""}
        icon={<FileText size={18} className="text-[#C9B29B]" />}
        maxWidth="560px"
        contentClassName="bg-[#FAF8F5] p-10"
        footer={
          <CoordButton onClick={() => setShowReporte(null)}>Cerrar</CoordButton>
        }
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-48 h-60 bg-white border border-[#EBE3D5] rounded-xl shadow-sm flex flex-col items-center justify-center gap-3">
            <FileText size={40} className="text-[#D8C4B6]" />
            <span className="text-xs text-stone-400 text-center px-4 leading-tight">
              {showReporte}
            </span>
          </div>
          <p className="text-xs text-stone-400">Vista previa del reporte</p>
        </div>
      </CoordModal>
    </>
  );
}
