import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, X, Upload, Plus, CheckCircle, Pencil, Mail } from 'lucide-react';
import { DocumentCard } from './DocumentCard';
import { CoordModal } from '../common/CoordModal';
import { CoordButton } from '../common/CoordButton';

// ── Menú contextual (⋯) ─────────────────────────────────────────────────────
function ContextMenu({ onEdit, onEmail, onClose }) {
    const menuRef = useRef(null);

    useEffect(() => {
        const handle = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) onClose(); };
        document.addEventListener('mousedown', handle);
        return () => document.removeEventListener('mousedown', handle);
    }, [onClose]);

    return (
        <div ref={menuRef} className="absolute right-8 top-12 z-40 bg-white border border-[#EBE3D5] rounded-xl shadow-lg py-1 w-52 text-sm">
            <button onClick={onEdit} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#FAF8F5] text-stone-700 transition-colors">
                <Pencil size={14} className="text-stone-400" /> Editar datos generales
            </button>
            <button onClick={onEmail} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#FAF8F5] text-stone-700 transition-colors">
                <Mail size={14} className="text-stone-400" /> Enviar correo
            </button>
        </div>
    );
}

// ── Datos iniciales de documentos por pestaña ────────────────────────────────
const INITIAL_DOCS = {
    'Documentos académicos': ['Título de Licenciatura', 'Certificado de Calificaciones', 'Propuesta de Tesis'],
    'Documentos personales': ['Identificación Oficial (INE)', 'Comprobante de Domicilio', 'Acta de Nacimiento'],
    'Constancias': ['Constancia de Estudios', 'Constancia de No Adeudo'],
};

// ── Panel principal ──────────────────────────────────────────────────────────
export function StudentPanel({ student, onClose }) {
    const [activeTab, setActiveTab] = useState('Documentos académicos');
    const [docs, setDocs] = useState(INITIAL_DOCS);
    const [showUpload, setShowUpload] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [docName, setDocName] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [saved, setSaved] = useState(false);

    if (!student) return null;

    const currentDocs = docs[activeTab] ?? [];

    const handleDelete = (tab, title) => {
        setDocs(prev => ({ ...prev, [tab]: prev[tab].filter(d => d !== title) }));
    };

    const handleUpload = () => {
        if (!docName.trim() || !selectedFile) return;
        setSaved(true);
        setTimeout(() => {
            setDocs(prev => ({ ...prev, [activeTab]: [...prev[activeTab], docName.trim()] }));
            setShowUpload(false);
            setSaved(false);
            setDocName('');
            setSelectedFile(null);
        }, 900);
    };

    const renderTabButton = (label) => (
        <button
            key={label}
            className={activeTab === label
                ? "pb-3 text-stone-800 font-semibold border-b-2 border-[#C9B29B] transition-colors"
                : "pb-3 text-stone-500 hover:text-stone-800 transition-colors"}
            onClick={() => setActiveTab(label)}
        >
            {label}
        </button>
    );

    return (
        <>
            <aside className="w-[420px] bg-white border border-[#EBE3D5] shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col shrink-0 overflow-y-auto relative rounded-3xl m-4">
                <div className="p-8">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6 relative">
                        <h2 className="text-xl font-medium leading-tight text-stone-800">
                            {student.name}<br />
                            <span className="text-stone-500 font-normal">({student.code})</span>
                        </h2>
                        <div className="flex gap-2">
                            <button
                                className={`text-stone-400 hover:text-stone-700 transition-colors ${showMenu ? 'text-stone-700' : ''}`}
                                onClick={() => setShowMenu(v => !v)}
                            >
                                <MoreHorizontal size={20} />
                            </button>
                            <button className="text-stone-400 hover:text-stone-700 transition-colors" onClick={onClose}>
                                <X size={20} />
                            </button>
                        </div>

                        {showMenu && (
                            <ContextMenu
                                onEdit={() => { setActiveTab('Datos generales'); setShowMenu(false); }}
                                onEmail={() => { window.open(`mailto:alumno@posgrado.edu.mx`); setShowMenu(false); }}
                                onClose={() => setShowMenu(false)}
                            />
                        )}
                    </div>

                    {/* Pestañas */}
                    <div className="flex gap-6 border-b border-[#EBE3D5] mb-2 text-sm overflow-x-auto whitespace-nowrap scrollbar-hide">
                        {renderTabButton("Datos generales")}
                        {renderTabButton("Documentos personales")}
                    </div>
                    <div className="flex gap-6 border-b border-[#EBE3D5] mb-6 text-sm overflow-x-auto whitespace-nowrap scrollbar-hide">
                        {renderTabButton("Documentos académicos")}
                        {renderTabButton("Constancias")}
                    </div>

                    <div className="space-y-4 mb-10">
                        {activeTab === 'Datos generales' ? (
                            <div className="space-y-3 text-sm">
                                <div className="flex flex-col"><span className="text-stone-500 text-xs">Correo electrónico</span><span className="text-stone-800">alumno@posgrado.edu.mx</span></div>
                                <div className="flex flex-col"><span className="text-stone-500 text-xs">Teléfono</span><span className="text-stone-800">+52 33 1234 5678</span></div>
                                <div className="flex flex-col"><span className="text-stone-500 text-xs">Fecha de nacimiento</span><span className="text-stone-800">15 de Mayo, 1995</span></div>
                                <div className="flex flex-col"><span className="text-stone-500 text-xs">Dirección</span><span className="text-stone-800">Av. Siempre Viva 123, Zapopan</span></div>
                            </div>
                        ) : currentDocs.length > 0 ? (
                            currentDocs.map(title => (
                                <DocumentCard key={title} title={title} onDelete={() => handleDelete(activeTab, title)} />
                            ))
                        ) : (
                            <p className="text-sm text-stone-400 py-4">No hay documentos en esta sección.</p>
                        )}
                    </div>

                    {/* Botón de subida — solo en pestañas de documentos */}
                    {activeTab !== 'Datos generales' && (
                        <div className="mt-auto">
                            <CoordButton
                                onClick={() => setShowUpload(true)}
                                className="w-full py-3 rounded-2xl"
                            >
                                <Plus size={16} /> Subir nuevo documento
                            </CoordButton>
                        </div>
                    )}
                </div>
            </aside>

            {/* Modal "Subir Nuevo Documento" */}
            <CoordModal
                isOpen={showUpload}
                onClose={() => setShowUpload(false)}
                title="Subir nuevo documento"
                footer={
                    <>
                        <CoordButton variant="secondary" onClick={() => setShowUpload(false)}>Cancelar</CoordButton>
                        <CoordButton
                            onClick={handleUpload}
                            disabled={!selectedFile || !docName.trim() || saved}
                        >
                            {saved ? (<><CheckCircle size={14} className="text-green-600" /> Subido</>) : 'Subir Documento'}
                        </CoordButton>
                    </>
                }
            >
                <div className="flex flex-col gap-4">
                    {/* Nombre del documento */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-stone-500 font-medium">Nombre del documento</label>
                        <input
                            type="text"
                            value={docName}
                            onChange={e => setDocName(e.target.value)}
                            placeholder="Ej. Carta de Recomendación"
                            className="w-full border border-[#EBE3D5] rounded-xl px-4 py-2.5 text-sm text-stone-800 outline-none focus:border-[#C9B29B] transition-colors bg-[#FAF8F5]"
                        />
                    </div>

                    {/* Drop zone */}
                    <div
                        className={`border-2 border-dashed rounded-2xl p-7 flex flex-col items-center gap-3 cursor-pointer transition-colors
                            ${isDragging ? 'border-[#C9B29B] bg-[#FAF8F5]' : 'border-[#EBE3D5] hover:border-[#C9B29B] hover:bg-[#FAF8F5]'}`}
                        onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={e => { e.preventDefault(); setIsDragging(false); setSelectedFile(e.dataTransfer.files[0]); }}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Upload size={26} className="text-[#C9B29B]" />
                        {selectedFile ? (
                            <p className="text-sm text-stone-700 font-medium text-center">{selectedFile.name}</p>
                        ) : (
                            <>
                                <p className="text-sm text-stone-600 font-medium">Arrastra un archivo aquí</p>
                                <p className="text-xs text-stone-400">o haz clic para seleccionar</p>
                            </>
                        )}
                        <input ref={fileInputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={e => setSelectedFile(e.target.files[0])} />
                    </div>
                </div>
            </CoordModal>
        </>
    );
}
