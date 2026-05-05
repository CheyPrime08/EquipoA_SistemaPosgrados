import React, { useState } from "react";
import { X, Mail, Download, ChevronDown } from "lucide-react";
import { CoordButton } from "../common/CoordButton";
import { DocumentCard } from "../common/DocumentCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const INITIAL_DOCS = {
  Académicos: [
    "Título de Licenciatura",
    "Certificado de Calificaciones",
    "Propuesta de Tesis",
  ],
  Personales: ["Identificación Oficial (INE)", "Acta de Nacimiento", "CURP"],
};

export function AspiranteAside({ aspirante, onClose }) {
  const [activeTab, setActiveTab] = useState("Contacto");
  const [selectedDocType, setSelectedDocType] = useState("Académicos");
  const [docs, setDocs] = useState(INITIAL_DOCS);

  if (!aspirante) return null;

  const handleDelete = (type, title) => {
    setDocs((prev) => ({
      ...prev,
      [type]: prev[type].filter((d) => d !== title),
    }));
  };

  const currentDocs = docs[selectedDocType] || [];

  const renderTabButton = (label) => (
    <button
      key={label}
      className={
        activeTab === label
          ? "pb-2 font-medium border-b-2 border-stone-800 transition-colors cursor-pointer"
          : "pb-2 text-muted-foreground font-medium hover:text-stone-800 border-b-2 border-transparent transition-colors cursor-pointer"
      }
      onClick={() => setActiveTab(label)}
    >
      {label}
    </button>
  );

  return (
    <aside className="w-[480px] ml-4 bg-white border border-[#EBE3D5] shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col shrink-0 relative rounded-3xl h-full overflow-hidden">
      {/* Contenido Scrollable */}
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        {/* Header */}
        <div className="mb-8 relative">
          <div className="flex justify-between items-start mb-0.5">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-[#EFE9E0] flex items-center justify-center border border-[#EBE3D5] text-[#C9B29B] shrink-0">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl font-medium leading-tight text-stone-800">
                  {aspirante.nombre} {aspirante.apellidoPaterno}{" "}
                  {aspirante.apellidoMaterno}
                </h2>
                <span className="text-stone-500 font-normal text-sm">
                  Prerregistro
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

        {/* Pestañas y Acciones (Igual a ExpedientesAside) */}
        <div className="flex items-end justify-between mb-6 gap-4 min-h-[44px]">
          <div className="flex gap-6 text-sm overflow-x-auto whitespace-nowrap scrollbar-hide">
            {renderTabButton("Contacto")}
            {renderTabButton("Perfil")}
            {renderTabButton("Documentos")}
          </div>

          <div className="pb-2">
            {activeTab === "Contacto" && (
              <button
                onClick={() => window.open(`mailto:${aspirante.correo}`)}
                className="text-[10px] font-bold text-stone-400 uppercase tracking-widest hover:text-stone-800 transition-colors bg-[#FAF8F5] px-2.5 py-1.5 rounded-lg border border-[#EBE3D5] cursor-pointer"
              >
                Enviar correo
              </button>
            )}

            {activeTab === "Documentos" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 text-[10px] font-bold text-stone-400 uppercase tracking-widest hover:text-stone-800 transition-colors bg-[#FAF8F5] px-2.5 py-1.5 rounded-lg border border-[#EBE3D5] cursor-pointer">
                    {selectedDocType} <ChevronDown size={12} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-white border-[#EBE3D5]"
                >
                  <DropdownMenuItem
                    onClick={() => setSelectedDocType("Académicos")}
                    className="text-[10px] font-bold uppercase tracking-widest text-stone-700 cursor-pointer focus:bg-[#FAF8F5]"
                  >
                    Académicos
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSelectedDocType("Personales")}
                    className="text-[10px] font-bold uppercase tracking-widest text-stone-700 cursor-pointer focus:bg-[#FAF8F5]"
                  >
                    Personales
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {/* Contenido Dinámico según Pestaña */}
        <div className="space-y-4 mb-6">
          {activeTab === "Contacto" && (
            <div className="space-y-4 text-sm">
              <div className="flex flex-col gap-1">
                <span className="text-stone-500 text-xs">
                  Correo electrónico
                </span>
                <input
                  type="text"
                  readOnly
                  value={aspirante.correo}
                  className="w-full bg-transparent border-none p-0 text-stone-800 focus:outline-none focus:ring-0"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-stone-500 text-xs">Teléfono</span>
                <input
                  type="text"
                  readOnly
                  value={aspirante.telefono}
                  className="w-full bg-transparent border-none p-0 text-stone-800 focus:outline-none focus:ring-0"
                />
              </div>
            </div>
          )}

          {activeTab === "Perfil" && (
            <div className="space-y-4 text-sm">
              <div className="flex flex-col">
                <span className="text-stone-500 text-xs">Licenciatura</span>
                <input
                  type="text"
                  readOnly
                  value={aspirante.licenciatura}
                  className="w-full bg-transparent border-none p-0 text-stone-800 focus:outline-none focus:ring-0 font-medium"
                />
              </div>

              <div className="flex flex-col border-stone-100">
                <span className="text-stone-500 text-xs">
                  Exposición de motivos
                </span>
                <textarea
                  readOnly
                  value={aspirante.motivos}
                  rows={10}
                  className="w-full bg-transparent border-none p-0 text-stone-800 focus:outline-none focus:ring-0 resize-none leading-relaxed"
                />
              </div>
            </div>
          )}

          {activeTab === "Documentos" && (
            <div className="space-y-4">
              {currentDocs.length > 0 ? (
                currentDocs.map((title) => (
                  <DocumentCard
                    key={title}
                    title={title}
                    onDelete={() => handleDelete(selectedDocType, title)}
                  />
                ))
              ) : (
                <p className="text-sm text-stone-400 py-4">
                  No hay documentos en esta sección.
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer Fijo */}
      <div className="p-8 pt-2 bg-white rounded-b-3xl">
        <CoordButton
          onClick={() => console.log("Exportando aspirante...")}
          className="w-full py-3 rounded-2xl shadow-sm"
        >
          <Download size={16} /> Exportar aspirante
        </CoordButton>
      </div>
    </aside>
  );
}
