import React from "react";
import { Filter } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Componente de filtro de generación estandarizado.
 * Sin label externo para mantener la alineación con el search bar.
 */
export const FiltroGeneracion = ({
  value,
  onChange,
  className,
  containerClassName,
  options = [
    { value: "all", label: "Todas" },
    { value: "2027", label: "2027" },
    { value: "2026", label: "2026" },
    { value: "2025", label: "2025" },
    { value: "2024", label: "2024" },
  ],
}) => {
  return (
    <div className={cn("relative shrink-0", containerClassName)}>
      <select
        className={cn(
          "appearance-none bg-white rounded-xl pl-4 pr-10 py-2.5 text-sm font-medium text-stone-700 border border-[#EBE3D5] shadow-sm outline-none focus:border-[#C9B29B] transition-colors h-[42px]",
          className,
        )}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label === "Todas" ? "Todas las generaciones" : opt.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#C9B29B]">
        <Filter size={16} />
      </div>
    </div>
  );
};
