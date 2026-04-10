import React from 'react';
import { Eye, Pencil, Trash2 } from 'lucide-react';

export function DocumentCard({ title }) {
    return (
        <div className="flex flex-col gap-2 py-4 border-b border-dashed border-[#EBE3D5] group">
            <span className="text-sm text-stone-800 font-medium">{title}</span>
            <div className="flex items-center gap-4 text-stone-400 mt-1">
                <button className="hover:text-stone-800 transition-colors"><Eye size={16} /></button>
                <button className="hover:text-stone-800 transition-colors"><Pencil size={16} /></button>
                <button className="hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
            </div>
        </div>
    );
}
