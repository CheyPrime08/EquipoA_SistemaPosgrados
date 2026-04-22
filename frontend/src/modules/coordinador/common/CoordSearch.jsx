import React from 'react';
import { Search } from 'lucide-react';
import { cn } from "@/lib/utils";

/**
 * Componente de búsqueda estandarizado para el panel de coordinación.
 */
export const CoordSearch = ({ 
    placeholder = "Buscar", 
    onChange, 
    value, 
    className,
    containerClassName 
}) => {
    return (
        <div className={cn(
            "flex items-center w-80 px-4 py-2.5 bg-white border border-[#EBE3D5] rounded-xl shadow-sm shrink-0",
            containerClassName
        )}>
            <Search size={18} className="text-stone-400 mr-2 shrink-0" />
            <input 
                type="text" 
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
                className={cn(
                    "bg-transparent border-none outline-none text-sm w-full placeholder:text-stone-400 text-stone-700",
                    className
                )}
            />
        </div>
    );
};
