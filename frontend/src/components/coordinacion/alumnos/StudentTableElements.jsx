import React from 'react';
import { ChevronsUpDown, MoreHorizontal } from 'lucide-react';

export function Th({ children, sortable = true, onClick }) {
    return (
        <th className="py-4 px-6 font-medium text-sm text-stone-600">
            <div className={`flex items-center gap-2 ${sortable ? 'cursor-pointer select-none hover:text-stone-800' : ''}`} onClick={sortable ? onClick : undefined}>
                {children}
                {sortable && <ChevronsUpDown size={14} className="text-stone-400" />}
            </div>
        </th>
    );
}

export function TableRow({ code, name, prog, status, statusColor, onClick }) {
    return (
        <tr className="hover:bg-white transition-colors cursor-pointer" onClick={onClick}>
            <td className="py-4 px-6 text-sm text-stone-600">{code}</td>
            <td className="py-4 px-6 text-sm text-stone-800 font-medium">{name}</td>
            <td className="py-4 px-6 text-sm text-stone-600">{prog}</td>
            <td className="py-4 px-6 text-sm">
                <span className={`px-3 py-1 rounded-full text-xs font-medium text-stone-800 ${statusColor}`}>
                    {status}
                </span>
            </td>
            <td className="py-4 px-6 text-sm text-stone-400">
                <button className="hover:text-stone-800 transition-colors"><MoreHorizontal size={18} /></button>
            </td>
        </tr>
    );
}
