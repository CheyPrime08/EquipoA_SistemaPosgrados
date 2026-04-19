import React from 'react';
import { MoreHorizontal } from 'lucide-react';

export const TesisRow = ({ thesis, onToggle }) => {
    return (
        <tr className="border-b border-[#EBE3D5] hover:bg-[#FDFCFB] transition-colors group">
            <td className="py-4 px-6">
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-stone-800">{thesis.student}</span>
                    <span className="text-xs text-stone-400">{thesis.code}</span>
                </div>
            </td>
            <td className="py-4 px-6">
                <span className="text-sm text-stone-600 line-clamp-1">{thesis.title}</span>
            </td>
            <td className="py-4 px-6">
                <div className="flex items-center">
                    <div className="flex flex-col items-end min-w-[70px]">
                        <span className={`text-[10px] uppercase tracking-wider font-bold ${thesis.status ? "text-[#C9B29B]" : "text-stone-300"}`}>
                            Estado
                        </span>
                        <span className="text-xs text-[#C9B29B] font-medium">
                            {thesis.status ? "Revisado" : "Pendiente"}
                        </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-2">
                        <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={thesis.status} 
                            onChange={(e) => { e.stopPropagation(); onToggle(thesis.id); }} 
                        />
                        <div className="w-10 h-5 bg-[#EBE3D5] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#EBE3D5] after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#C9B29B]"></div>
                    </label>
                </div>
            </td>
            <td className="py-4 px-6 text-sm text-stone-400 text-right">
                <button className="hover:text-stone-800 transition-colors"><MoreHorizontal size={18} /></button>
            </td>
        </tr>
    );
};
