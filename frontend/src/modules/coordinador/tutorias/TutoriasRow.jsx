import React, { useState } from 'react';
import { CoordRowActions } from '../common/CoordRowActions';
import { CoordModal } from '../common/CoordModal';
import { CoordButton } from '../common/CoordButton';
import { Pencil, FileText, Eye } from 'lucide-react';

export const TutoriasRow = ({ tutoria, onSave, onDelete }) => {
    const [showEdit, setShowEdit] = useState(false);
    const [showView, setShowView] = useState(false);
    const [showReporte, setShowReporte] = useState(null);
    const [editData, setEditData] = useState({ ...tutoria });

    const handleOpenEdit = () => {
        setEditData({ ...tutoria });
        setShowEdit(true);
    };

    const handleSave = () => {
        onSave?.(editData);
        setShowEdit(false);
    };

    const reportes = tutoria.reportes || [];

    const inputClass = "w-full border border-[#EBE3D5] rounded-xl px-4 py-2.5 text-sm text-stone-800 outline-none focus:border-[#C9B29B] transition-colors bg-[#FAF8F5]";

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
                    <span className="text-stone-800 font-medium">{tutoria.student}</span>
                </td>
                <td className="py-4 px-6 text-sm text-stone-500">
                    {tutoria.code}
                </td>
                <td className="py-4 px-6 text-sm text-stone-600 font-medium">
                    <div className="max-w-xs truncate" title={tutoria.posgrado}>
                        {tutoria.posgrado}
                    </div>
                </td>
                <td className="py-4 px-6 text-sm text-stone-600 font-medium">
                    {tutoria.tutor}
                </td>
                <td className="py-4 px-6 text-sm text-right">
                    <CoordRowActions
                        onView={() => setShowView(true)}
                        onEdit={handleOpenEdit}
                        onDelete={() => onDelete?.(tutoria)}
                    />
                </td>
            </tr>

            {/* Modal: Ver detalles + Reportes */}
            <CoordModal
                isOpen={showView}
                onClose={() => setShowView(false)}
                title="Detalles de Tutoría"
                icon={<FileText size={18} className="text-[#C9B29B]" />}
                maxWidth="560px"
                footer={
                    <CoordButton onClick={() => setShowView(false)}>Cerrar</CoordButton>
                }
            >
                <div className="flex flex-col gap-5">
                    {/* Info del alumno */}
                    <div className="flex items-center gap-4 mb-1">
                        <div className="w-12 h-12 rounded-full bg-[#EFE9E0] flex items-center justify-center border border-[#EBE3D5] text-[#C9B29B]">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-stone-800 font-semibold">{tutoria.student}</span>
                            <span className="text-stone-500 text-xs">{tutoria.code}</span>
                        </div>
                    </div>

                    {/* Posgrado */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Posgrado</label>
                        <p className="text-sm text-stone-800 bg-[#FAF8F5] rounded-xl px-4 py-3 border border-[#EBE3D5]">{tutoria.posgrado}</p>
                    </div>

                    {/* Tutor */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Tutor Asignado</label>
                        <p className="text-sm text-stone-800 bg-[#FAF8F5] rounded-xl px-4 py-3 border border-[#EBE3D5]">{tutoria.tutor}</p>
                    </div>

                    {/* Reportes / Archivos de Tutoría */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Reportes de Tutoría</label>
                        {reportes.length > 0 ? (
                            <div className="space-y-2">
                                {reportes.map((reporte, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between bg-[#FAF8F5] rounded-xl px-4 py-3 border border-[#EBE3D5] group/doc"
                                    >
                                        <div className="flex items-center gap-3">
                                            <FileText size={18} className="text-[#D8C4B6] shrink-0" />
                                            <span className="text-sm text-stone-800 font-medium">{reporte}</span>
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
                title={showReporte || ''}
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
                        <span className="text-xs text-stone-400 text-center px-4 leading-tight">{showReporte}</span>
                    </div>
                    <p className="text-xs text-stone-400">Vista previa del reporte</p>
                </div>
            </CoordModal>

            {/* Modal: Editar tutoría */}
            <CoordModal
                isOpen={showEdit}
                onClose={() => setShowEdit(false)}
                title="Editar Tutoría"
                icon={<Pencil size={16} className="text-[#C9B29B]" />}
                maxWidth="480px"
                footer={
                    <>
                        <CoordButton variant="secondary" onClick={() => setShowEdit(false)}>Cancelar</CoordButton>
                        <CoordButton onClick={handleSave}>Guardar</CoordButton>
                    </>
                }
            >
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-stone-500 font-medium">Nombre del Alumno</label>
                        <input
                            type="text"
                            value={editData.student}
                            onChange={(e) => setEditData({ ...editData, student: e.target.value })}
                            className={inputClass}
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-stone-500 font-medium">Código</label>
                        <input
                            type="text"
                            value={editData.code}
                            onChange={(e) => setEditData({ ...editData, code: e.target.value })}
                            className={inputClass}
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-stone-500 font-medium">Posgrado</label>
                        <input
                            type="text"
                            value={editData.posgrado}
                            onChange={(e) => setEditData({ ...editData, posgrado: e.target.value })}
                            className={inputClass}
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-stone-500 font-medium">Tutor Asignado</label>
                        <input
                            type="text"
                            value={editData.tutor}
                            onChange={(e) => setEditData({ ...editData, tutor: e.target.value })}
                            className={inputClass}
                        />
                    </div>
                </div>
            </CoordModal>
        </>
    );
};
