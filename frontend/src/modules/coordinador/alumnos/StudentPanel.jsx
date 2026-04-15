import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, X, Upload, Plus, CheckCircle, FileText, Pencil, Mail } from 'lucide-react';
import { DocumentCard } from './DocumentCard';

// ── Modal "Subir Nuevo Documento" ────────────────────────────────────────────
function UploadModal({ onClose, onUpload }) {
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [docName, setDocName] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleFile = (file) => { if (file) setSelectedFile(file); };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFile(e.dataTransfer.files[0]);
    };

    const canSave = selectedFile && docName.trim().length > 0;

    const handleSave = () => {
        if (!canSave) return;
        setSaved(true);
        setTimeout(() => {
            onUpload({ name: docName.trim(), file: selectedFile });
            onClose();
        }, 900);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-[480px] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#EBE3D5]">
                    <span className="font-medium text-stone-800 text-sm">Subir Nuevo Documento</span>
                    <button onClick={onClose} className="text-stone-400 hover:text-stone-700 transition-colors"><X size={18} /></button>
                </div>

                <div className="p-6 flex flex-col gap-4">
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
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Upload size={26} className="text-[#C9B29B]" />
                        {selectedFile ? (
                            <p className="text-sm text-stone-700 font-medium text-center">{selectedFile.name}</p>
                        ) : (
                            <>
                                <p className="text-sm text-stone-600 font-medium">Arrastra un archivo aquí</p>
                                <p className="text-xs text-stone-400">o haz clic para seleccionar (PDF, JPG, PNG)</p>
                            </>
                        )}
                        <input ref={fileInputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={e => handleFile(e.target.files[0])} />
                    </div>
                </div>

                <div className="px-6 pb-6 flex gap-3 justify-end">
                    <button onClick={onClose} className="px-5 py-2 rounded-xl border border-[#EBE3D5] text-stone-600 text-sm hover:bg-[#FAF8F5] transition-colors">Cancelar</button>
                    <button
                        onClick={handleSave}
                        disabled={!canSave || saved}
                        className={`px-5 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2
                            ${canSave && !saved ? 'bg-[#D8C4B6] hover:bg-[#C9B29B] text-stone-800' : 'bg-[#EBE3D5] text-stone-400 cursor-not-allowed'}`}
                    >
                        {saved ? (<><CheckCircle size={14} className="text-green-600" /> Subido</>) : 'Subir Documento'}
                    </button>
                </div>
            </div>
        </div>
    );
}

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
                <Pencil size={14} className="text-stone-400" /> Editar Datos Generales
            </button>
            <button onClick={onEmail} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#FAF8F5] text-stone-700 transition-colors">
                <Mail size={14} className="text-stone-400" /> Enviar Correo
            </button>
        </div>
    );
}

// ── Datos iniciales de documentos por pestaña ────────────────────────────────
const INITIAL_DOCS = {
    'Documentos Académicos': ['Título de Licenciatura', 'Certificado de Calificaciones', 'Propuesta de Tesis'],
    'Documentos Personales': ['Identificación Oficial (INE)', 'Comprobante de Domicilio', 'Acta de Nacimiento'],
    'Constancias': ['Constancia de Estudios', 'Constancia de No Adeudo'],
};

// ── Panel principal ──────────────────────────────────────────────────────────
export function StudentPanel({ student, onClose }) {
    const [activeTab, setActiveTab] = useState('Documentos Académicos');
    const [docs, setDocs] = useState(INITIAL_DOCS);
    const [showUpload, setShowUpload] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    if (!student) return null;

    const currentDocs = docs[activeTab] ?? [];

    const handleDelete = (tab, title) => {
        setDocs(prev => ({ ...prev, [tab]: prev[tab].filter(d => d !== title) }));
    };

    const handleUpload = ({ name }) => {
        setDocs(prev => ({ ...prev, [activeTab]: [...prev[activeTab], name] }));
    };

    const TabButton = ({ label }) => (
        <button
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
            <aside className="w-[420px] bg-white border-l border-[#EBE3D5] shadow-[-8px_0_30px_rgba(0,0,0,0.02)] flex flex-col shrink-0 overflow-y-auto relative">
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
                                onEdit={() => { setActiveTab('Datos Generales'); setShowMenu(false); }}
                                onEmail={() => { window.open(`mailto:alumno@posgrado.edu.mx`); setShowMenu(false); }}
                                onClose={() => setShowMenu(false)}
                            />
                        )}
                    </div>

                    {/* Pestañas */}
                    <div className="flex gap-6 border-b border-[#EBE3D5] mb-2 text-sm overflow-x-auto whitespace-nowrap scrollbar-hide">
                        <TabButton label="Datos Generales" />
                        <TabButton label="Documentos Personales" />
                    </div>
                    <div className="flex gap-6 border-b border-[#EBE3D5] mb-6 text-sm overflow-x-auto whitespace-nowrap scrollbar-hide">
                        <TabButton label="Documentos Académicos" />
                        <TabButton label="Constancias" />
                    </div>

                    {/* Pestaña: Documentos Académicos */}
                    {activeTab === 'Documentos Académicos' && (
                        <div className="space-y-4 mb-10">
                            {currentDocs.length > 0
                                ? currentDocs.map(title => (
                                    <DocumentCard key={title} title={title} onDelete={() => handleDelete('Documentos Académicos', title)} />
                                ))
                                : <p className="text-sm text-stone-400 py-4">No hay documentos en esta sección.</p>
                            }
                        </div>
                    )}

                    {/* Pestaña: Datos Generales */}
                    {activeTab === 'Datos Generales' && (
                        <div className="space-y-3 mb-10 text-sm">
                            <div className="flex flex-col"><span className="text-stone-500 text-xs">Correo Electrónico</span><span className="text-stone-800">alumno@posgrado.edu.mx</span></div>
                            <div className="flex flex-col"><span className="text-stone-500 text-xs">Teléfono</span><span className="text-stone-800">+52 33 1234 5678</span></div>
                            <div className="flex flex-col"><span className="text-stone-500 text-xs">Fecha de Nacimiento</span><span className="text-stone-800">15 de Mayo, 1995</span></div>
                            <div className="flex flex-col"><span className="text-stone-500 text-xs">Dirección</span><span className="text-stone-800">Av. Siempre Viva 123, Zapopan</span></div>
                        </div>
                    )}

                    {/* Pestaña: Documentos Personales */}
                    {activeTab === 'Documentos Personales' && (
                        <div className="space-y-4 mb-10">
                            {currentDocs.length > 0
                                ? currentDocs.map(title => (
                                    <DocumentCard key={title} title={title} onDelete={() => handleDelete('Documentos Personales', title)} />
                                ))
                                : <p className="text-sm text-stone-400 py-4">No hay documentos en esta sección.</p>
                            }
                        </div>
                    )}

                    {/* Pestaña: Constancias */}
                    {activeTab === 'Constancias' && (
                        <div className="space-y-4 mb-10">
                            {currentDocs.length > 0
                                ? currentDocs.map(title => (
                                    <DocumentCard key={title} title={title} onDelete={() => handleDelete('Constancias', title)} />
                                ))
                                : <p className="text-sm text-stone-400 py-4">No hay documentos en esta sección.</p>
                            }
                        </div>
                    )}

                    {/* Botón de subida — solo en pestañas de documentos */}
                    {activeTab !== 'Datos Generales' && (
                        <div className="mt-auto">
                            <button
                                onClick={() => setShowUpload(true)}
                                className="w-full bg-[#D8C4B6] hover:bg-[#C9B29B] text-stone-800 font-medium px-4 py-3 rounded-2xl transition-colors shadow-sm flex justify-center items-center gap-2"
                            >
                                <Plus size={16} /> Subir Nuevo Documento
                            </button>
                        </div>
                    )}
                </div>
            </aside>

            {showUpload && (
                <UploadModal
                    onClose={() => setShowUpload(false)}
                    onUpload={handleUpload}
                />
            )}
        </>
    );
}
