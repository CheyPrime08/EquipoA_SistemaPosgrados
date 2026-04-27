import React from 'react';
import { cn } from "@/lib/utils";

export const GanttBar = ({ title, color, left, width, onClick }) => {
  if (left < 0) return null;

  return (
    <div className="relative h-10">
      <button
        onClick={onClick}
        className={cn(
          "absolute h-10 rounded-xl border px-4 flex items-center shadow-sm transition-all hover:scale-[1.005] active:scale-[0.995] cursor-pointer overflow-hidden text-left",
          color
        )}
        style={{ left: `${left}%`, width: `${width}%` }}
      >
        <span className="text-[11px] font-bold truncate">{title}</span>
      </button>
    </div>
  );
};
