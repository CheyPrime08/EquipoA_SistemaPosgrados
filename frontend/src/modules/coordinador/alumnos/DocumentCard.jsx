import React, { useState, useRef } from 'react';
import { Eye, Pencil, Trash2, X, Upload, FileText, CheckCircle } from 'lucide-react';

// ── Modal de Vista Previa ──────────────────────────────────────────────────────
function ViewModal({ title, fileUrl, onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
            <div
                className="bg-white rounded-2xl shadow-2xl w-[560px] max-h-[80vh] flex flex-col overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#EBE3D5]">
                    <div className="flex items-center gap-3">
                        <FileText size={18} className="text-[#C9B29B]" />
                        <span className="font-medium text-stone-800 text-sm">{title}</span>
                    </div>
                    <button onClick={onClose} className="text-stone-400 hover:text-stone-700 transition-colors">
                        <X size={18} />
                    </button>
                </div>
                {/* Contenido (placeholder de documento) */}
                <div className="flex-1 flex flex-col items-center justify-center gap-4 p-10 bg-[#FAF8F5]">
                    <div className="w-48 h-60 bg-white border border-[#EBE3D5] rounded-xl shadow-sm flex flex-col items-center justify-center gap-3">
                        <FileText size={40} className="text-[#D8C4B6]" />
                        <span className="text-xs text-stone-400 text-center px-4">{title}</span>
                    </div>
                    <p className="text-xs text-stone-400">Vista previa del documento</p>
                </div>
                <div className="px-6 py-4 border-t border-[#EBE3D5] flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 rounded-xl bg-[#EBE3D5] hover:bg-[#D8C4B6] text-stone-700 text-sm font-medium transition-colors"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── Modal de Edición / Subida ──────────────────────────────────────────────────
function EditModal({ title, onClose, onSave }) {
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleFile = (file) => {
        if (file) setSelectedFile(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        handleFile(file);
    };

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => {
            onSave(selectedFile);
            onClose();
        }, 900);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
            <div
                className="bg-white rounded-2xl shadow-2xl w-[480px] flex flex-col overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#EBE3D5]">
                    <span className="font-medium text-stone-800 text-sm">Reemplazar: {title}</span>
                    <button onClick={onClose} className="text-stone-400 hover:text-stone-700 transition-colors">
                        <X size={18} />
                    </button>
                </div>

                {/* Drop zone */}
                <div className="p-6">
                    <div
                        className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center gap-3 cursor-pointer transition-colors
                            ${isDragging ? 'border-[#C9B29B] bg-[#FAF8F5]' : 'border-[#EBE3D5] hover:border-[#C9B29B] hover:bg-[#FAF8F5]'}`}
                        onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Upload size={28} className="text-[#C9B29B]" />
                        {selectedFile ? (
                            <p className="text-sm text-stone-700 font-medium text-center">{selectedFile.name}</p>
                        ) : (
                            <>
                                <p className="text-sm text-stone-600 font-medium">Arrastra un archivo aquí</p>
                                <p className="text-xs text-stone-400">o haz clic para seleccionar (PDF, JPG, PNG)</p>
                            </>
                        )}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            onChange={e => handleFile(e.target.files[0])}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 pb-6 flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 rounded-xl border border-[#EBE3D5] text-stone-600 text-sm hover:bg-[#FAF8F5] transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!selectedFile || saved}
                        className={`px-5 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2
                            ${selectedFile && !saved
                                ? 'bg-[#D8C4B6] hover:bg-[#C9B29B] text-stone-800'
                                : 'bg-[#EBE3D5] text-stone-400 cursor-not-allowed'}`}
                    >
                        {saved ? (
                            <><CheckCircle size={14} className="text-green-600" /> Guardado</>
                        ) : 'Guardar'}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── Modal de Confirmación de Eliminación ──────────────────────────────────────
function DeleteModal({ title, onClose, onConfirm }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
            <div
                className="bg-white rounded-2xl shadow-2xl w-[400px] p-6 flex flex-col gap-5"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                        <Trash2 size={16} className="text-red-400" />
                    </div>
                    <div>
                        <p className="font-semibold text-stone-800 text-sm">Eliminar documento</p>
                        <p className="text-xs text-stone-500 mt-0.5">¿Seguro que deseas eliminar <span className="font-medium text-stone-700">"{title}"</span>? Esta acción no se puede deshacer.</p>
                    </div>
                </div>
                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 rounded-xl border border-[#EBE3D5] text-stone-600 text-sm hover:bg-[#FAF8F5] transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── DocumentCard principal ────────────────────────────────────────────────────
export function DocumentCard({ title, onDelete }) {
    const [modal, setModal] = useState(null); // 'view' | 'edit' | 'delete'

    const handleDelete = () => {
        setModal(null);
        onDelete?.();
    };

    return (
        <>
            <div className="flex flex-col gap-2 py-4 border-b border-dashed border-[#EBE3D5] group">
                <span className="text-sm text-stone-800 font-medium">{title}</span>
                <div className="flex items-center gap-4 text-stone-400 mt-1">
                    <button
                        title="Ver documento"
                        onClick={() => setModal('view')}
                        className="hover:text-stone-800 transition-colors"
                    >
                        <Eye size={16} />
                    </button>
                    <button
                        title="Reemplazar documento"
                        onClick={() => setModal('edit')}
                        className="hover:text-stone-800 transition-colors"
                    >
                        <Pencil size={16} />
                    </button>
                    <button
                        title="Eliminar documento"
                        onClick={() => setModal('delete')}
                        className="hover:text-red-500 transition-colors"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            {modal === 'view' && (
                <ViewModal title={title} onClose={() => setModal(null)} />
            )}
            {modal === 'edit' && (
                <EditModal
                    title={title}
                    onClose={() => setModal(null)}
                    onSave={(file) => { console.log('Archivo guardado:', file?.name); }}
                />
            )}
            {modal === 'delete' && (
                <DeleteModal
                    title={title}
                    onClose={() => setModal(null)}
                    onConfirm={handleDelete}
                />
            )}
        </>
    );
}
