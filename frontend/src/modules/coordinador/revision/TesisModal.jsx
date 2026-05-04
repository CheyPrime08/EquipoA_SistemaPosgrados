import React, { useState } from "react";
import { FileText, Eye, ChevronDown, CheckCircle } from "lucide-react";
import { CoordModal } from "../common/CoordModal";
import { CoordButton } from "../common/CoordButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const STATUS_OPTIONS = [
  { label: "Pendiente", color: "#FADE70", key: "pendiente" },
  { label: "Revisado", color: "#ACFA91", key: "revisado" },
];

function TesisStatusCombobox({ currentStatus, onStatusChange }) {
  const selected =
    STATUS_OPTIONS.find((s) => s.label === currentStatus) || STATUS_OPTIONS[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center justify-between gap-2 rounded-full font-bold uppercase tracking-widest cursor-pointer hover:opacity-90 transition-opacity border border-[#EBE3D5] bg-white shadow-sm px-3 py-2 text-[10px] min-w-[130px]">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: selected.color }}
            />
            <span className="text-stone-700">{selected.label}</span>
          </div>
          <ChevronDown size={14} className="text-stone-400" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white border-[#EBE3D5]">
        {STATUS_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.key}
            onClick={() => onStatusChange(option.label)}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-stone-700 cursor-pointer focus:bg-[#FAF8F5]"
          >
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: option.color }}
            />
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function TesisModal({ isOpen, onClose, thesis }) {
  const [currentStatus, setCurrentStatus] = useState(
    thesis?.status ? "Revisado" : "Pendiente",
  );
  const [showReporte, setShowReporte] = useState(null);

  // Estado para manejar los estados individuales del historial
  const [history, setHistory] = useState([
    { name: "Avance_Tesis_v2.pdf", status: "Revisado" },
    { name: "Primer_Borrador_Completo.pdf", status: "Pendiente" },
    { name: "Protocolo_Investigacion.pdf", status: "Pendiente" },
  ]);

  const updateHistoryStatus = (index, newStatus) => {
    const newHistory = [...history];
    newHistory[index].status = newStatus;
    setHistory(newHistory);
  };

  if (!thesis) return null;

  return (
    <>
      <CoordModal
        isOpen={isOpen}
        onClose={onClose}
        title="Detalles de tesis"
        icon={<FileText size={18} className="text-[#C9B29B]" />}
        maxWidth="720px"
        footer={<CoordButton onClick={onClose}>Cerrar</CoordButton>}
      >
        <div className="flex flex-col gap-5">
          {/* Título de la tesis */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
              Título de tesis
            </label>
            <p className="text-sm text-stone-800 font-medium bg-[#FAF8F5] rounded-xl px-4 py-3 border border-[#EBE3D5]">
              {thesis.title}
            </p>
          </div>

          {/* Estado de revisión principal */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
              Estado de revisión
            </label>
            <TesisStatusCombobox
              currentStatus={currentStatus}
              onStatusChange={setCurrentStatus}
            />
          </div>

          {/* Vista previa del documento de tesis */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
              Documento de tesis
            </label>
            <div className="bg-[#FAF8F5] rounded-xl border border-[#EBE3D5] p-6 flex flex-col items-center gap-3">
              <div className="w-36 h-48 bg-white border border-[#EBE3D5] rounded-xl shadow-sm flex flex-col items-center justify-center gap-3">
                <FileText size={40} className="text-[#D8C4B6]" />
                <span className="text-xs text-stone-400 text-center px-3 leading-tight">
                  {thesis.title}
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Vista previa del documento
              </p>
            </div>
          </div>

          {/* Historial de tesis con combobox de mismo tamaño */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
              Historial de Tesis
            </label>
            {history.length > 0 ? (
              <div className="space-y-2">
                {history.map((archivo, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-[#FAF8F5] rounded-xl px-4 py-2.5 border border-[#EBE3D5] group/doc"
                  >
                    <div className="flex items-center gap-3">
                      <FileText size={18} className="text-[#D8C4B6] shrink-0" />
                      <span className="text-sm text-stone-800 font-medium">
                        {archivo.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <TesisStatusCombobox
                        currentStatus={archivo.status}
                        onStatusChange={(status) =>
                          updateHistoryStatus(idx, status)
                        }
                      />
                      <button
                        title="Ver archivo"
                        onClick={() => setShowReporte(archivo.name)}
                        className="text-stone-400 hover:text-[#C9B29B] transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-stone-400 bg-[#FAF8F5] rounded-xl px-4 py-3 border border-[#EBE3D5]">
                No hay versiones anteriores registradas.
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
