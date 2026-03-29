import React from 'react';
import { SortableTableHeader } from '@/components/molecules/SortableTableHeader';
import { TesisRow } from '@/components/organisms/TesisRow';

export function TesisTable({ theses, onToggle }) {
    return (
        <div className="bg-[#FAF8F5] rounded-2xl border border-[#EBE3D5] overflow-auto flex-1 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
            <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead className="bg-[#EFE9E0] sticky top-0 z-10">
                    <tr>
                        <SortableTableHeader sortable={false}></SortableTableHeader>
                        <SortableTableHeader>Alumno</SortableTableHeader>
                        <SortableTableHeader>Título de Tesis</SortableTableHeader>
                        <SortableTableHeader>Revisión</SortableTableHeader>
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
                            onToggle={onToggle}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
