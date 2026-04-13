import React, { useState } from 'react';
import { MoreHorizontal, X } from 'lucide-react';
import { DocumentCard } from './DocumentCard';

export function StudentPanel({ student, onClose }) {
    const [activeTab, setActiveTab] = useState('Documentos Académicos');

    if (!student) return null;

    return (
        <aside className="w-[420px] bg-white border-l border-[#EBE3D5] shadow-[-8px_0_30px_rgba(0,0,0,0.02)] flex flex-col shrink-0 overflow-y-auto">
            <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                    <h2 className="text-xl font-medium leading-tight text-stone-800">
                        {student.name}<br /><span className="text-stone-500 font-normal">({student.code})</span>
                    </h2>
                    <div className="flex gap-2">
                        <button className="text-stone-400 hover:text-stone-700">
                            <MoreHorizontal size={20} />
                        </button>
                        <button className="text-stone-400 hover:text-stone-700" onClick={onClose}>
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Pestañas */}
                <div className="flex gap-6 border-b border-[#EBE3D5] mb-2 text-sm overflow-x-auto whitespace-nowrap scrollbar-hide">
                    <button className={activeTab === 'Datos Generales' ? "pb-3 text-stone-800 font-semibold border-b-2 border-[#C9B29B] transition-colors" : "pb-3 text-stone-500 hover:text-stone-800 transition-colors"} onClick={() => setActiveTab('Datos Generales')}>Datos Generales</button>
                    <button className={activeTab === 'Documentos Personales' ? "pb-3 text-stone-800 font-semibold border-b-2 border-[#C9B29B] transition-colors" : "pb-3 text-stone-500 hover:text-stone-800 transition-colors"} onClick={() => setActiveTab('Documentos Personales')}>Documentos Personales</button>
                </div>
                <div className="flex gap-6 border-b border-[#EBE3D5] mb-6 text-sm overflow-x-auto whitespace-nowrap scrollbar-hide">
                    <button className={activeTab === 'Documentos Académicos' ? "pb-3 text-stone-800 font-semibold border-b-2 border-[#C9B29B] transition-colors" : "pb-3 text-stone-500 hover:text-stone-800 transition-colors"} onClick={() => setActiveTab('Documentos Académicos')}>Documentos Académicos</button>
                    <button className={activeTab === 'Constancias' ? "pb-3 text-stone-800 font-semibold border-b-2 border-[#C9B29B] transition-colors" : "pb-3 text-stone-500 hover:text-stone-800 transition-colors"} onClick={() => setActiveTab('Constancias')}>Constancias</button>
                </div>

                {activeTab === 'Documentos Académicos' && (
                    <div className="space-y-4 mb-10">
                        <DocumentCard title="Título de Licenciatura" />
                        <DocumentCard title="Certificado de Calificaciones" />
                        <DocumentCard title="Propuesta de Tesis" />
                    </div>
                )}

                {activeTab === 'Datos Generales' && (
                    <div className="space-y-3 mb-10 text-sm">
                        <div className="flex flex-col"><span className="text-stone-500 text-xs">Correo Electrónico</span><span className="text-stone-800">alumno@posgrado.edu.mx</span></div>
                        <div className="flex flex-col"><span className="text-stone-500 text-xs">Teléfono</span><span className="text-stone-800">+52 33 1234 5678</span></div>
                        <div className="flex flex-col"><span className="text-stone-500 text-xs">Fecha de Nacimiento</span><span className="text-stone-800">15 de Mayo, 1995</span></div>
                        <div className="flex flex-col"><span className="text-stone-500 text-xs">Dirección</span><span className="text-stone-800">Av. Siempre Viva 123, Zapopan</span></div>
                    </div>
                )}

                {activeTab === 'Documentos Personales' && (
                    <div className="space-y-4 mb-10">
                        <DocumentCard title="Identificación Oficial (INE)" />
                        <DocumentCard title="Comprobante de Domicilio" />
                        <DocumentCard title="Acta de Nacimiento" />
                    </div>
                )}

                {activeTab === 'Constancias' && (
                    <div className="space-y-4 mb-10">
                        <DocumentCard title="Constancia de Estudios" />
                        <DocumentCard title="Constancia de No Adeudo" />
                    </div>
                )}

                <div className="mt-auto">
                    <button className="w-full bg-[#D8C4B6] hover:bg-[#C9B29B] text-stone-800 font-medium px-4 py-3 rounded-2xl transition-colors shadow-sm flex justify-center items-center">
                        Subir Nuevo Documento
                    </button>
                </div>
            </div>
        </aside>
    );
}
