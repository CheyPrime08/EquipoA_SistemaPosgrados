import React from "react";
import { Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export const RevisionFilters = ({
  statusFilter,
  onStatusChange,
  className,
  containerClassName,
}) => {
  return (
    <div className={cn("relative shrink-0", containerClassName)}>
      <select
        className={cn(
          "appearance-none bg-white rounded-xl pl-4 pr-10 py-2.5 text-sm font-medium text-stone-700 border border-[#EBE3D5] shadow-sm outline-none focus:border-[#C9B29B] transition-colors h-[42px] cursor-pointer",
          className,
        )}
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="all">Todos los estados</option>
        <option value="pendiente">Pendientes</option>
        <option value="revisado">Revisadas</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#C9B29B]">
        <Filter size={16} />
      </div>
    </div>
  );
};
