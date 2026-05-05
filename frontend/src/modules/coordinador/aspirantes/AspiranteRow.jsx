import React from "react";
import { Eye } from "lucide-react";

export const AspiranteRow = ({
  aspirante,
  onClick,
  isSelected
}) => {
  return (
    <tr 
      onClick={onClick}
      className={`hover:bg-white transition-colors cursor-pointer group ${
        isSelected ? "bg-white" : ""
      }`}
    >
      <td className="py-4 px-6 w-16">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-colors ${
          isSelected 
          ? "bg-[#C9B29B] text-white border-[#C9B29B]" 
          : "bg-[#EFE9E0] border-[#EBE3D5] text-[#C9B29B]"
        }`}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </td>
      <td className="py-4 px-6 text-sm group-hover:bg-[#FAF8F4] transition-colors relative">
        <div className="flex items-center justify-between gap-4">
          <span className={`font-medium transition-colors ${
            isSelected ? "text-[#8a7a63]" : "text-stone-800"
          }`}>
            {aspirante.nombre} {aspirante.apellidoPaterno} {aspirante.apellidoMaterno}
          </span>
          <div className="flex items-center gap-3">
            <Eye
              size={16}
              className={`text-[#C9B29B] transition-opacity ${
                isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            />
            <div 
              className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
              style={{ 
                backgroundColor: aspirante.status === "carga ligera" ? "#FADE70" : "#ACFA91" 
              }}
              title={aspirante.status === "carga ligera" ? "Carga Ligera" : "Carga de Documentación"}
            />
          </div>
        </div>
      </td>
    </tr>
  );
};
