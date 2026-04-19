import React from 'react';
import { CalendarDays } from 'lucide-react';
import { CoordSearch } from '../common/CoordSearch';

export const TesisFilters = ({ onSearch }) => {
    return (
        <div className="flex items-end justify-between mb-6 shrink-0 gap-4">
            {/* Barra de búsqueda */}
            <CoordSearch onChange={onSearch} />

            {/* Fecha limite */}
            <div className="flex flex-col items-end">
                <label className="text-[10px] font-bold text-stone-400 ml-1 uppercase tracking-widest mb-1.5">Fecha límite</label>
                <div className="bg-white rounded-xl px-4 py-2.5 flex items-center gap-3 border border-[#EBE3D5] shadow-sm">
                    <span className="text-sm font-medium text-stone-700">17 Mar 2026</span>
                    <CalendarDays size={16} className="text-[#C9B29B]" />
                </div>
            </div>
        </div>
    );
};
