import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Upload,
  Plus,
  CheckCircle,
  Pencil,
  Mail,
  ChevronDown,
  Save,
} from "lucide-react";
import { DocumentCard } from "../common/DocumentCard";
import { CoordModal } from "../common/CoordModal";
import { CoordButton } from "../common/CoordButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// ── Datos iniciales de documentos ───────────────────────────────────────────
const INITIAL_DOCS = {
  Académicos: [
    "Título de Licenciatura",
    "Certificado de Calificaciones",
    "Propuesta de Tesis",
  ],
  Personales: [
    "Identificación Oficial (INE)",
    "Comprobante de Domicilio",
    "Acta de Nacimiento",
  ],
  Constancias: ["Constancia de Estudios", "Constancia de No Adeudo"],
};

// ── Panel principal ──────────────────────────────────────────────────────────
export function ExpedientesAside({ student, onClose }) {
  const [activeTab, setActiveTab] = useState("Contacto");
  const [selectedDocType, setSelectedDocType] = useState("Académicos");
  const [docs, setDocs] = useState(INITIAL_DOCS);
  const [showUpload, setShowUpload] = useState(false);

  // Estado para datos editables de contacto
  const [formData, setFormData] = useState({
    email: "alumno@posgrado.edu.mx",
    phone: "+52 33 1234 5678",
    birthDate: "15 de Mayo, 1995",
    address: "Av. Siempre Viva 123, Zapopan",
  });
  const [hasChanges, setHasChanges] = useState(false);

  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [docName, setDocName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!student) return null;

  // Detectar cambios en el formulario
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSaveContact = () => {
    // Aquí iría la lógica de API
    console.log("Guardando datos:", formData);
    setHasChanges(false);
  };

  // Lógica para obtener documentos actuales
  let currentDocs = [];
  if (activeTab === "Documentos") {
    currentDocs = docs[selectedDocType] ?? [];
  } else if (activeTab === "Constancias") {
    currentDocs = docs["Constancias"] ?? [];
  }

  const handleDelete = (type, title) => {
    setDocs((prev) => ({
      ...prev,
      [type]: prev[type].filter((d) => d !== title),
    }));
  };

  const handleUpload = () => {
    if (!docName.trim() || !selectedFile) return;
    setSaved(true);
    setTimeout(() => {
      const targetType =
        activeTab === "Documentos" ? selectedDocType : "Constancias";
      setDocs((prev) => ({
        ...prev,
        [targetType]: [...prev[targetType], docName.trim()],
      }));
      setShowUpload(false);
      setSaved(false);
      setDocName("");
      setSelectedFile(null);
    }, 900);
  };

  const renderTabButton = (label) => (
    <button
      key={label}
      className={
        activeTab === label
          ? "pb-2 font-medium border-b-2 border-stone-800 transition-colors"
          : "pb-2 text-muted-foreground font-medium hover:text-stone-800 border-b-2 border-transparent transition-colors"
      }
      onClick={() => setActiveTab(label)}
    >
      {label}
    </button>
  );

  return (
    <>
      <aside className="w-[480px] ml-4 bg-white border border-[#EBE3D5] shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col shrink-0 relative rounded-3xl h-full overflow-hidden">
        {/* Contenido Scrollable */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {/* Header */}
          <div className="mb-8 relative">
            <div className="flex justify-between items-start mb-0.5">
              <div className="flex items-center gap-4">
                {/* Icono de usuario de la tabla */}
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
                    {student.name}
                  </h2>
                  <span className="text-stone-500 font-normal">
                    {student.code}
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

          {/* Pestañas y Acciones */}
          <div className="flex items-end justify-between mb-6 gap-4 min-h-[44px]">
            <div className="flex gap-6 text-sm overflow-x-auto whitespace-nowrap scrollbar-hide">
              {renderTabButton("Contacto")}
              {renderTabButton("Documentos")}
              {renderTabButton("Constancias")}
            </div>

            <div className="pb-2">
              {activeTab === "Contacto" && (
                <button
                  onClick={() => window.open(`mailto:${formData.email}`)}
                  className="text-[10px] font-bold text-stone-400 uppercase tracking-widest hover:text-stone-800 transition-colors bg-[#FAF8F5] px-2.5 py-1.5 rounded-lg border border-[#EBE3D5]"
                >
                  Enviar correo
                </button>
              )}

              {activeTab === "Documentos" && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 text-[10px] font-bold text-stone-400 uppercase tracking-widest hover:text-stone-800 transition-colors bg-[#FAF8F5] px-2.5 py-1.5 rounded-lg border border-[#EBE3D5]">
                      {selectedDocType} <ChevronDown size={12} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => setSelectedDocType("Académicos")}
                    >
                      Académicos
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setSelectedDocType("Personales")}
                    >
                      Personales
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>

          <div className="space-y-4 mb-6">
            {activeTab === "Contacto" ? (
              <div className="space-y-4 text-sm">
                <div className="flex flex-col gap-1">
                  <span className="text-stone-500 text-xs">
                    Correo electrónico
                  </span>
                  <input
                    type="text"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full bg-transparent border-none p-0 text-stone-800 focus:outline-none focus:ring-0 placeholder:text-stone-300"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-stone-500 text-xs">Teléfono</span>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full bg-transparent border-none p-0 text-stone-800 focus:outline-none focus:ring-0 placeholder:text-stone-300"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-stone-500 text-xs">
                    Fecha de nacimiento
                  </span>
                  <input
                    type="text"
                    value={formData.birthDate}
                    onChange={(e) =>
                      handleInputChange("birthDate", e.target.value)
                    }
                    className="w-full bg-transparent border-none p-0 text-stone-800 focus:outline-none focus:ring-0 placeholder:text-stone-300"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-stone-500 text-xs">Dirección</span>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    className="w-full bg-transparent border-none p-0 text-stone-800 focus:outline-none focus:ring-0 placeholder:text-stone-300"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {currentDocs.length > 0 ? (
                  currentDocs.map((title) => (
                    <DocumentCard
                      key={title}
                      title={title}
                      onDelete={() =>
                        handleDelete(
                          activeTab === "Documentos"
                            ? selectedDocType
                            : "Constancias",
                          title,
                        )
                      }
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

        {/* Footer Fijo para botones */}
        {(activeTab !== "Contacto" || hasChanges) && (
          <div className="p-8 pt-2 bg-white rounded-b-3xl">
            {activeTab !== "Contacto" ? (
              <CoordButton
                onClick={() => setShowUpload(true)}
                className="w-full py-3 rounded-2xl shadow-sm"
              >
                <Plus size={16} /> Subir nuevo documento
              </CoordButton>
            ) : (
              hasChanges && (
                <CoordButton
                  onClick={handleSaveContact}
                  className="w-full py-3 rounded-2xl shadow-sm"
                >
                  <Save size={16} /> Guardar cambios
                </CoordButton>
              )
            )}
          </div>
        )}
      </aside>

      {/* Modal "Subir Nuevo Documento" */}
      <CoordModal
        isOpen={showUpload}
        onClose={() => setShowUpload(false)}
        title="Subir nuevo documento"
        footer={
          <>
            <CoordButton
              variant="secondary"
              onClick={() => setShowUpload(false)}
            >
              Cancelar
            </CoordButton>
            <CoordButton
              onClick={handleUpload}
              disabled={!selectedFile || !docName.trim() || saved}
            >
              {saved ? (
                <>
                  <CheckCircle size={14} className="text-green-600" /> Subido
                </>
              ) : (
                "Subir Documento"
              )}
            </CoordButton>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          {/* Nombre del documento */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-stone-500 font-medium">
              Nombre del documento
            </label>
            <input
              type="text"
              value={docName}
              onChange={(e) => setDocName(e.target.value)}
              placeholder="Ej. Carta de Recomendación"
              className="w-full border border-[#EBE3D5] rounded-xl px-4 py-2.5 text-sm text-stone-800 outline-none focus:border-[#C9B29B] transition-colors bg-[#FAF8F5]"
            />
          </div>

          {/* Drop zone */}
          <div
            className={`border-2 border-dashed rounded-2xl p-7 flex flex-col items-center gap-3 cursor-pointer transition-colors
                            ${isDragging ? "border-[#C9B29B] bg-[#FAF8F5]" : "border-[#EBE3D5] hover:border-[#C9B29B] hover:bg-[#FAF8F5]"}`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              setSelectedFile(e.dataTransfer.files[0]);
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={26} className="text-[#C9B29B]" />
            {selectedFile ? (
              <p className="text-sm text-stone-700 font-medium text-center">
                {selectedFile.name}
              </p>
            ) : (
              <>
                <p className="text-sm text-stone-600 font-medium">
                  Arrastra un archivo aquí
                </p>
                <p className="text-xs text-stone-400">
                  o haz clic para seleccionar
                </p>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          </div>
        </div>
      </CoordModal>
    </>
  );
}
