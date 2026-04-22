import React from 'react';
import { MoreHorizontal } from 'lucide-react';

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
