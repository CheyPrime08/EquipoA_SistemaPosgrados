import React from 'react';
import { CalendarDays, Filter } from 'lucide-react';
import { CoordSearch } from '../common/CoordSearch';

export const TesisGlobalFilters = ({ searchQuery, onSearchChange, statusFilter, onStatusChange, yearFilter, onYearChange }) => {
    return (
        <div className="flex flex-wrap items-end justify-between mb-6 shrink-0 gap-4">
            <div className="flex flex-1 items-end gap-4 min-w-[300px]">
                {/* Barra de búsqueda */}
                <div className="flex-1">
                    <CoordSearch value={searchQuery} onChange={onSearchChange} placeholder="Buscar por alumno o título..." />
                </div>
                
                {/* Filtro por estado */}
                <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-stone-400 ml-1 uppercase tracking-widest mb-1.5">Estado</label>
                    <div className="relative">
                        <select 
                            className="appearance-none bg-white rounded-xl pl-4 pr-10 py-2.5 text-sm font-medium text-stone-700 border border-[#EBE3D5] shadow-sm outline-none focus:border-[#C9B29B] transition-colors"
                            value={statusFilter}
                            onChange={(e) => onStatusChange(e.target.value)}
                        >
                            <option value="all">Todos</option>
                            <option value="revised">Revisado</option>
                            <option value="pending">Pendiente</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#C9B29B]">
                            <Filter size={16} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filtrado por generación (año) */}
            <div className="flex flex-col items-end">
                <label className="text-[10px] font-bold text-stone-400 ml-1 uppercase tracking-widest mb-1.5">Generación</label>
                <div className="relative">
                    <select 
                        className="appearance-none bg-white rounded-xl pl-4 pr-10 py-2.5 text-sm font-medium text-stone-700 border border-[#EBE3D5] shadow-sm outline-none focus:border-[#C9B29B] transition-colors"
                        value={yearFilter}
                        onChange={(e) => onYearChange(e.target.value)}
                    >
                        <option value="all">Todas</option>
                        <option value="2027">2027</option>
                        <option value="2026">2026</option>
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#C9B29B]">
                        <Filter size={16} />
                    </div>
                </div>
            </div>
        </div>
    );
};
