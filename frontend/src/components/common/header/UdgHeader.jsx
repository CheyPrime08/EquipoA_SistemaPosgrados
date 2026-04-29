import React from 'react';
import { cn } from "@/lib/utils";

export const UdgHeader = ({ className }) => {
  return (
    <div className={cn("flex flex-col justify-center text-right", className)}>
      <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider leading-tight">
        Universidad de Guadalajara
      </span>
      <span className="text-[11px] font-bold text-stone-700 uppercase tracking-tight leading-tight">
        Centro Universitario de los Altos
      </span>
    </div>
  );
};
