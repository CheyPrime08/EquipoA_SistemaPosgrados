import React, { useState, useRef } from 'react';
import { Eye, Pencil, Trash2, FileText, Upload, CheckCircle } from 'lucide-react';
import { CoordModal } from './CoordModal';
import { CoordButton } from './CoordButton';

export function DocumentCard({ title, onDelete }) {
    const [modal, setModal] = useState(null);
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleFile = (file) => { if (file) setSelectedFile(file); };

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => {
            setModal(null);
            setSaved(false);
            setSelectedFile(null);
        }, 900);
    };

    const handleDelete = () => {
        setModal(null);
        onDelete?.();
    };

    return (
        <>
            <div className="flex items-center justify-between py-4 border-b border-[#EBE3D5] group">
                <span className="text-sm text-stone-800 font-medium truncate pr-4">{title}</span>
                <div className="flex items-center gap-4 text-stone-400 shrink-0">
                    <button title="Ver documento" onClick={() => setModal('view')} className="hover:text-stone-800 transition-colors"><Eye size={16} /></button>
                    <button title="Reemplazar documento" onClick={() => setModal('edit')} className="hover:text-stone-800 transition-colors"><Pencil size={16} /></button>
                    <button title="Eliminar documento" onClick={() => setModal('delete')} className="hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                </div>
            </div>

            {/* Modal: Vista Previa */}
            <CoordModal
                isOpen={modal === 'view'}
                onClose={() => setModal(null)}
                title={title}
                icon={<FileText size={18} className="text-[#C9B29B]" />}
                maxWidth="560px"
                contentClassName="bg-[#FAF8F5] p-10"
                footer={
                    <CoordButton onClick={() => setModal(null)}>Cerrar</CoordButton>
                }
            >
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="w-48 h-60 bg-white border border-[#EBE3D5] rounded-xl shadow-sm flex flex-col items-center justify-center gap-3">
                        <FileText size={40} className="text-[#D8C4B6]" />
                        <span className="text-xs text-stone-400 text-center px-4">{title}</span>
                    </div>
                    <p className="text-xs text-stone-400">Vista previa del documento</p>
                </div>
            </CoordModal>

            {/* Modal: Edición */}
            <CoordModal
                isOpen={modal === 'edit'}
                onClose={() => setModal(null)}
                title={`Reemplazar: ${title}`}
                footer={
                    <>
                        <CoordButton variant="secondary" onClick={() => setModal(null)}>Cancelar</CoordButton>
                        <CoordButton 
                            onClick={handleSave} 
                            disabled={!selectedFile || saved}
                        >
                            {saved ? <><CheckCircle size={14} className="text-green-600" /> Guardado</> : 'Guardar'}
                        </CoordButton>
                    </>
                }
            >
                <div
                    className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center gap-3 cursor-pointer transition-colors
                        ${isDragging ? 'border-[#C9B29B] bg-[#FAF8F5]' : 'border-[#EBE3D5] hover:border-[#C9B29B] hover:bg-[#FAF8F5]'}`}
                    onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFile(e.dataTransfer.files[0]); }}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <Upload size={28} className="text-[#C9B29B]" />
                    {selectedFile ? (
                        <p className="text-sm text-stone-700 font-medium text-center">{selectedFile.name}</p>
                    ) : (
                        <>
                            <p className="text-sm text-stone-600 font-medium">Arrastra un archivo aquí</p>
                            <p className="text-xs text-stone-400">o haz clic para seleccionar</p>
                        </>
                    )}
                    <input ref={fileInputRef} type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={e => handleFile(e.target.files[0])} />
                </div>
            </CoordModal>

            {/* Modal: Eliminación */}
            <CoordModal
                isOpen={modal === 'delete'}
                onClose={() => setModal(null)}
                title="Eliminar documento"
                footer={
                    <>
                        <CoordButton variant="secondary" onClick={() => setModal(null)}>Cancelar</CoordButton>
                        <CoordButton variant="danger" onClick={handleDelete}>Eliminar</CoordButton>
                    </>
                }
            >
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                        <Trash2 size={16} className="text-red-400" />
                    </div>
                    <div>
                        <p className="text-xs text-stone-500">¿Seguro que deseas eliminar <span className="font-medium text-stone-700">"{title}"</span>? Esta acción no se puede deshacer.</p>
                    </div>
                </div>
            </CoordModal>
        </>
    );
}
