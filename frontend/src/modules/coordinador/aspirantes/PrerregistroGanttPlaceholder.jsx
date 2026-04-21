import React from 'react';
import { Calendar, BookOpen } from 'lucide-react';

export const PrerregistroGanttPlaceholder = () => {
  return (
    <div className="mt-8 pt-6 border-t border-[#EBE3D5] shrink-0">
      <h3 className="font-semibold text-stone-800 mb-4 flex items-center gap-2 text-sm">
        <Calendar size={18} className="text-[#C9B29B]" />
        Fechas límite y periodos del semestre
      </h3>
      <div className="bg-[#FAF8F5] rounded-2xl p-6 flex flex-col items-center justify-center text-stone-400 border-dashed border border-[#EBE3D5] min-h-[140px]">
        <div className="bg-white p-3 rounded-full shadow-sm mb-3 border border-[#EBE3D5]">
          <BookOpen size={20} className="text-stone-400" />
        </div>
        <p className="text-sm font-medium">El diagrama de Gantt de este periodo se encuentra en construcción</p>
      </div>
    </div>
  );
};
