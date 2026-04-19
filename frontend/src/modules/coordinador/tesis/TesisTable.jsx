import React from 'react';
import { ChevronsUpDown, MoreHorizontal } from 'lucide-react';
import { TesisRow } from './TesisRow';

const Th = ({ children, sortable = true }) => {
    return (
        <th className="py-4 px-6 font-medium text-sm text-stone-600">
            <div className="flex items-center gap-2">
                {children}
                {sortable && <ChevronsUpDown size={14} className="text-stone-400" />}
            </div>
        </th>
    );
};

export const TesisTable = ({ theses, onToggleStatus }) => {
    return (
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
                            onToggle={onToggleStatus} 
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};
