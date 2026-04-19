import React from 'react';
import { Download } from 'lucide-react';
import { CoordSearch } from '../common/CoordSearch';

const FilterSelect = ({ label, placeholder }) => {
  return (
    <div className="flex flex-col gap-1.5 min-w-[160px]">
      <span className="text-[10px] font-bold text-stone-400 ml-1 uppercase tracking-widest">{label}</span>
      <select className="border border-[#EBE3D5] rounded-xl px-4 py-2.5 bg-white text-sm outline-none font-medium text-stone-600 cursor-pointer shadow-sm focus:ring-2 focus:ring-[#EFE9E0]">
        <option>{placeholder}</option>
      </select>
    </div>
  );
};

export const PrerregistroFilters = ({ onSearch, onExport }) => {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      {/* Barra de búsqueda */}
      <CoordSearch onChange={onSearch} />
      
      <FilterSelect label="Programa" placeholder="Todos los Programas" />
      <FilterSelect label="Estado" placeholder="En Revisión" />
      
      <button 
        onClick={onExport}
        className="ml-auto bg-[#D8C4B6] hover:bg-[#C9B29B] text-stone-800 font-medium px-6 py-2.5 rounded-xl transition-colors shadow-sm flex items-center gap-2 text-sm"
      >
        <Download size={18} />
        Exportar Lista
      </button>
    </div>
  );
};
