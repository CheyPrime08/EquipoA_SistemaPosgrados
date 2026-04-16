import React, { useState } from 'react';
import { LayoutCoordinacion } from "@/modules/coordinador/common/LayoutCoordinacion";
import {
    Search,
    MoreHorizontal,
    ChevronsUpDown,
    CalendarDays
} from 'lucide-react';

const TesisManager = () => {
    const [theses, setTheses] = useState([
        { id: 1, student: 'Juan Carlos', code: '219583058', title: 'Inteligencia Artificial en Medicina', status: true },
        { id: 2, student: 'Gerardo', code: '000000000', title: 'Desarrollo web con React', status: false },
        { id: 3, student: 'Diego Josuan', code: '111111111', title: 'Ciberseguridad en IoT', status: true },
        { id: 4, student: 'Viviana', code: '222222222', title: 'Machine Learning para finanzas', status: false },
        { id: 5, student: 'Sergio', code: '333333333', title: 'Postgrades software', status: false },
        { id: 6, student: 'Claudia', code: '444444444', title: 'Ux Desing', status: true },
    ]);

    const handleToggleStatus = (id) => {
        const updatedTheses = theses.map((thesis) => {
            if (thesis.id === id) {
                return { ...thesis, status: !thesis.status };
            }
            return thesis;
        });
        setTheses(updatedTheses);
    };

    return (
        <LayoutCoordinacion>
            <div className="h-full flex flex-col overflow-hidden">
                
                <div className="flex justify-between items-end mb-6 shrink-0">
                    <h1 className="text-[28px] font-medium text-stone-800">Tesis</h1>
                    
                    {/* Fecha limite */}
                    <div className="flex flex-col items-end">
                        <label className="text-xs text-stone-500 mb-1">Fecha límite</label>
                        <div className="bg-white rounded-xl px-4 py-2 flex items-center gap-3 border border-[#EBE3D5] shadow-sm">
                            <span className="text-sm font-medium text-stone-700">17 Mar 2026</span>
                            <CalendarDays size={16} className="text-[#C9B29B]" />
                        </div>
                    </div>
                </div>

                {/* Barra de búsqueda */}
                <div className="flex items-center w-80 px-4 py-2.5 mb-6 bg-white border border-[#EBE3D5] rounded-xl shadow-sm shrink-0">
                    <Search size={18} className="text-stone-400 mr-2 shrink-0" />
                    <input type="text" placeholder="Buscar alumno..." className="bg-transparent border-none outline-none text-sm w-full placeholder:text-stone-400 text-stone-700" />
                </div>

                {/* Tabla */}
                <div className="bg-[#FAF8F5] rounded-2xl border border-[#EBE3D5] overflow-auto flex-1 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead className="bg-[#EFE9E0] sticky top-0 z-10">
                            <tr>
                                <Th sortable={false}></Th>
                                <Th>Alumno</Th>
                                <Th>Título de Tesis</Th>
                                <Th>Revisión</Th>
                                <th className="py-4 px-6 font-medium text-sm text-stone-600 text-right">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EBE3D5]">
                            {theses.map((thesis) => (
                                <TesisRow 
                                    key={thesis.id} 
                                    thesis={thesis} 
                                    onToggle={handleToggleStatus} 
                                />
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </LayoutCoordinacion>
    );
};

export default TesisManager;

// Subcomponentes //

// Th para cabeceras
function Th({ children, sortable = true }) {
    return (
        <th className="py-4 px-6 font-medium text-sm text-stone-600">
            <div className="flex items-center gap-2">
                {children}
                {sortable && <ChevronsUpDown size={14} className="text-stone-400" />}
            </div>
        </th>
    );
}

// Fila de la tabla adaptada para tesis
function TesisRow({ thesis, onToggle }) {
    return (
        <tr className="hover:bg-white transition-colors cursor-pointer group">
            <td className="py-4 px-6 w-16">
                <div className="w-8 h-8 rounded-full bg-[#EFE9E0] flex items-center justify-center border border-[#EBE3D5] text-[#C9B29B]">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                    </svg>
                </div>
            </td>
            <td className="py-4 px-6 text-sm">
                <div className="flex flex-col">
                    <span className="text-stone-800 font-medium">{thesis.student}</span>
                    <span className="text-stone-500">{thesis.code}</span>
                </div>
            </td>
            <td className="py-4 px-6 text-sm text-stone-700 font-medium">
                <div className="max-w-xs truncate" title={thesis.title}>
                    {thesis.title}
                </div>
            </td>
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
                        <div className="w-10 h-5 bg-[#EBE3D5] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#EBE3D5] after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#C9B29B]"></div>
                    </label>
                </div>
            </td>
            <td className="py-4 px-6 text-sm text-stone-400 text-right">
                <button className="hover:text-stone-800 transition-colors"><MoreHorizontal size={18} /></button>
            </td>
        </tr>
    );
}