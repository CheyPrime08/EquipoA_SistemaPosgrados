import React from 'react';

export function TableRow({ code, name, prog, status, statusColor, onClick }) {
    return (
        <tr className="hover:bg-white transition-colors cursor-pointer group" onClick={onClick}>
            <td className="py-4 px-6 w-16">
                <div className="w-8 h-8 rounded-full bg-[#EFE9E0] flex items-center justify-center border border-[#EBE3D5] text-[#C9B29B]">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                </div>
            </td>
            <td className="py-4 px-6 text-sm">
                <div className="flex flex-col">
                    <span className="text-stone-800 font-medium">{name}</span>
                    <span className="text-stone-500 text-xs">{code}</span>
                </div>
            </td>
            <td className="py-4 px-6 text-sm text-stone-600 font-medium">{prog}</td>
            <td className="py-4 px-6 text-sm">
                <span className={`px-3 py-1 rounded-full text-xs font-medium text-stone-800 ${statusColor}`}>
                    {status}
                </span>
            </td>
        </tr>
    );
}
