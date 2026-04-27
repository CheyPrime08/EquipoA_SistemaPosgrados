import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CoordButton } from '@/modules/coordinador/common/CoordButton';
import { MONTHS, daysInMonth } from './utils/gantt-utils';

export const GanttHeader = ({ currentYear, semesterMonths, totalDays }) => {
  return (
    <>
      <div className="flex items-center justify-center gap-8 py-4 border-b border-[#EBE3D5]">
        <CoordButton variant="ghost" className="h-8 w-8 p-0 min-w-0">
          <ChevronLeft size={20} className="text-stone-400" />
        </CoordButton>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-stone-700 tracking-tight">{currentYear}</span>
        </div>
        <CoordButton variant="ghost" className="h-8 w-8 p-0 min-w-0">
          <ChevronRight size={20} className="text-stone-400" />
        </CoordButton>
      </div>

      <div className="flex border-b border-[#EBE3D5] bg-white/50">
        {semesterMonths.map((monthIdx) => (
          <div 
            key={monthIdx} 
            className="flex-1 text-center py-3 text-[10px] font-bold text-stone-400 border-r border-[#EBE3D5] last:border-r-0 uppercase tracking-widest"
            style={{ width: `${(daysInMonth(monthIdx, currentYear) / totalDays) * 100}%` }}
          >
            {MONTHS[monthIdx]}
          </div>
        ))}
      </div>
    </>
  );
};
