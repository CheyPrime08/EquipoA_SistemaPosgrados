import React from "react";
import { Filter } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Componente de filtro de estado estandarizado para aspirantes.
 */
export const FiltroEstado = ({
  value,
  onChange,
  className,
  containerClassName,
  options = [
    { value: "all", label: "Todos los estados" },
    { value: "carga ligera", label: "Carga ligera" },
    { value: "carga de documentacion", label: "Carga de documentación" },
  ],
}) => {
  return (
    <div className={cn("relative shrink-0", containerClassName)}>
      <select
        className={cn(
          "appearance-none bg-white rounded-xl pl-4 pr-10 py-2.5 text-sm font-medium text-stone-700 border border-[#EBE3D5] shadow-sm outline-none focus:border-[#C9B29B] transition-colors h-[42px] cursor-pointer",
          className,
        )}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#C9B29B]">
        <Filter size={16} />
      </div>
    </div>
  );
};
