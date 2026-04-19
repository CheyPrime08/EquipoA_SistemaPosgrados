import React from 'react';
import { Download } from 'lucide-react';
import { CoordSearch } from '../common/CoordSearch';
import { CoordButton } from '../common/CoordButton';

const FilterSelect = ({ label, placeholder }) => {
  return (
    <div className="flex flex-col gap-1.5 min-w-[160px]">
      <span className="text-[10px] font-bold text-stone-400 ml-1 uppercase tracking-widest">{label}</span>
      <select className="border border-[#EBE3D5] rounded-xl px-4 py-2.5 bg-white text-sm outline-none font-medium text-stone-600 cursor-pointer shadow-sm focus:ring-2 focus:ring-[#EFE9E0] transition-all">
        <option>{placeholder}</option>
      </select>
    </div>
  );
};

export const PrerregistroFilters = ({ onSearch, onExport }) => {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <CoordSearch onChange={onSearch} />
      
      <FilterSelect label="Programa" placeholder="Todos los Programas" />
      <FilterSelect label="Estado" placeholder="En Revisión" />
      
      <CoordButton 
        onClick={onExport}
        className="ml-auto px-6 py-2.5"
      >
        <Download size={18} />
        Exportar Lista
      </CoordButton>
    </div>
  );
};
