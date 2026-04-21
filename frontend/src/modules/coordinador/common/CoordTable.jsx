import React from 'react';
import { ChevronsUpDown } from 'lucide-react';
import { cn } from "@/lib/utils";

/**
 * Componente para las celdas de la cabecera de la tabla.
 */
export const CoordTh = ({ children, sortable = true, onClick, className }) => {
    return (
        <th className={cn("py-4 px-6 font-medium text-sm text-stone-600 text-left", className)}>
            <div 
                className={cn(
                    "flex items-center gap-2",
                    sortable ? "cursor-pointer select-none hover:text-stone-800 transition-colors" : ""
                )} 
                onClick={sortable ? onClick : undefined}
            >
                {children}
                {sortable && <ChevronsUpDown size={14} className="text-stone-400" />}
            </div>
        </th>
    );
};

/**
 * Componente genérico para las tablas del coordinador.
 * Encapsula el contenedor con bordes redondeados y el estilo de la cabecera.
 */
export const CoordTable = ({ headers = [], children, className }) => {
    return (
        <div className={cn(
            "bg-[#FAF8F5] rounded-2xl border border-[#EBE3D5] overflow-auto flex-1 shadow-[0_4px_24px_rgba(0,0,0,0.02)]",
            className
        )}>
            <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead className="bg-[#EFE9E0] sticky top-0 z-10">
                    <tr>
                        {headers.map((header, index) => (
                            <CoordTh 
                                key={index} 
                                sortable={header.sortable} 
                                onClick={header.onClick}
                                className={header.className}
                            >
                                {header.label}
                            </CoordTh>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#EBE3D5]">
                    {children}
                </tbody>
            </table>
        </div>
    );
};
