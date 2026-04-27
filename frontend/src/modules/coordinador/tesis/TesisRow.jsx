import React, { useState } from 'react';
import { Eye, FileText } from 'lucide-react';
import { CoordModal } from '../common/CoordModal';
import { CoordButton } from '../common/CoordButton';

export const TesisRow = ({ thesis, onToggle, showGeneration }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <tr className="hover:bg-white transition-colors cursor-pointer group">
                <td className="py-4 px-6 w-16">
                    <div className="w-8 h-8 rounded-full bg-[#EFE9E0] flex items-center justify-center border border-[#EBE3D5] text-[#C9B29B]">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                    </div>
                </td>
                <td className="py-4 px-6 text-sm">
                    <div className="flex flex-col">
                        <span className="text-stone-800 font-medium">{thesis.student}</span>
                        <span className="text-stone-500 text-xs">{thesis.code}</span>
                    </div>
                </td>
                <td className="py-4 px-6 text-sm text-stone-600 font-medium">
                    <div className="max-w-xs truncate" title={thesis.title}>
                        {thesis.title}
                    </div>
                </td>
                {showGeneration && (
                    <td className="py-4 px-6 text-sm">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#EFE9E0] text-[#C9B29B] border border-[#EBE3D5]">
                            {thesis.year || "N/A"}
                        </span>
                    </td>
                )}
                <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                            <span className="text-sm text-stone-800">Estado</span>
                            <span className="text-xs text-[#C9B29B] font-medium">
                                {thesis.status ? "Revisado" : "Pendiente"}
                            </span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer ml-2">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={thesis.status}
                                onChange={(e) => { e.stopPropagation(); onToggle(thesis.id); }}
                            />
                            <div className="w-10 h-5 bg-[#EBE3D5] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#EBE3D5] after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#C9B29B]" />
                        </label>
                    </div>
                </td>
                <td className="py-4 px-6 text-sm text-right">
                    <button
                        title="Ver detalles de tesis"
                        onClick={(e) => { e.stopPropagation(); setShowModal(true); }}
                        className="text-stone-400 hover:text-[#C9B29B] transition-colors"
                    >
                        <Eye size={18} />
                    </button>
                </td>
            </tr>

            {/* Modal popup — detalles + vista previa del documento */}
            <CoordModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Detalles de tesis"
                icon={<FileText size={18} className="text-[#C9B29B]" />}
                maxWidth="560px"
                footer={
                    <CoordButton onClick={() => setShowModal(false)}>Cerrar</CoordButton>
                }
            >
                <div className="flex flex-col gap-5">
                    {/* Info del alumno */}
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#EFE9E0] flex items-center justify-center border border-[#EBE3D5] text-[#C9B29B]">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-stone-800 font-semibold">{thesis.student}</span>
                            <span className="text-stone-500 text-xs">{thesis.code}</span>
                        </div>
                    </div>

                    {/* Título de la tesis */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Título de tesis</label>
                        <p className="text-sm text-stone-800 font-medium bg-[#FAF8F5] rounded-xl px-4 py-3 border border-[#EBE3D5]">
                            {thesis.title}
                        </p>
                    </div>

                    {showGeneration && thesis.year && (
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Generación</label>
                            <p className="text-sm text-stone-800 font-medium">
                                {thesis.year}
                            </p>
                        </div>
                    )}

                    {/* Estado de revisión */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Estado de revisión</label>
                        <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                                thesis.status
                                    ? 'bg-[#DBD3C8] text-stone-800'
                                    : 'bg-[#E6D5C5] text-stone-700'
                            }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${thesis.status ? 'bg-green-500' : 'bg-amber-500'}`} />
                                {thesis.status ? "Revisado" : "Pendiente"}
                            </span>
                        </div>
                    </div>

                    {/* Vista previa del documento de tesis */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Documento de tesis</label>
                        <div className="bg-[#FAF8F5] rounded-xl border border-[#EBE3D5] p-6 flex flex-col items-center gap-3">
                            <div className="w-36 h-48 bg-white border border-[#EBE3D5] rounded-xl shadow-sm flex flex-col items-center justify-center gap-3">
                                <FileText size={40} className="text-[#D8C4B6]" />
                                <span className="text-xs text-stone-400 text-center px-3 leading-tight">{thesis.title}</span>
                            </div>
                            <p className="text-xs text-stone-400">Vista previa del documento</p>
                        </div>
                    </div>
                </div>
            </CoordModal>
        </>
    );
};
