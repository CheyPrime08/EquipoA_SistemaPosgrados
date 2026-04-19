import React from 'react';
import { Search, CalendarDays } from 'lucide-react';

export const TesisFilters = () => {
    return (
        <>
            <div className="flex justify-end items-end mb-6 shrink-0">
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
                <input 
                    type="text" 
                    placeholder="Buscar alumno..." 
                    className="bg-transparent border-none outline-none text-sm w-full placeholder:text-stone-400 text-stone-700" 
                />
            </div>
        </>
    );
};
