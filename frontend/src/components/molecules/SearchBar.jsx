import React from 'react';
import { Search } from 'lucide-react';

export function SearchBar({ placeholder = 'Buscar...', value, onChange, className = '' }) {
    return (
        <div className={`flex items-center w-80 px-4 py-2.5 bg-white border border-[#EBE3D5] rounded-xl shadow-sm ${className}`}>
            <Search size={18} className="text-stone-400 mr-2 shrink-0" />
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-stone-400 text-stone-700"
            />
        </div>
    );
}
