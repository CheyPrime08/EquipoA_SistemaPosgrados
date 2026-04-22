import React from 'react';
import { MoreHorizontal } from 'lucide-react';

export const TesisRow = ({ thesis, onToggle }) => {
    return (
        <tr className="hover:bg-white transition-colors cursor-pointer group">
            <td className="py-4 px-6 w-16">
                <div className="w-8 h-8 rounded-full bg-[#EFE9E0] flex items-center justify-center border border-[#EBE3D5] text-[#C9B29B]">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                </div>
            </td>
            <td className="py-4 px-6 text-sm">
                <div className="flex flex-col">
                    <span className="text-stone-800 font-medium">{thesis.student}</span>
                    <span className="text-stone-500 text-xs">{thesis.code}</span>
                </div>
            </td>
            <td className="py-4 px-6 text-sm text-stone-600 font-medium">
                <div className="max-w-xs truncate" title={thesis.title}>
                    {thesis.title}
                </div>
            </td>
            <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                        <span className="text-sm text-stone-800">Estado</span>
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
                        <div className="w-10 h-5 bg-[#EBE3D5] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#EBE3D5] after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#C9B29B]" />
                    </label>
                </div>
            </td>
            <td className="py-4 px-6 text-sm text-stone-400 text-right">
                <button className="hover:text-stone-800 transition-colors">
                    <MoreHorizontal size={18} />
                </button>
            </td>
        </tr>
    );
};
