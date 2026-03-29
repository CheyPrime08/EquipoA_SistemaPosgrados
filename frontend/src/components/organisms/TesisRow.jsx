import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Avatar } from '@/components/atoms/Avatar';
import { StatusToggle } from '@/components/molecules/StatusToggle';

export function TesisRow({ thesis, onToggle }) {
    return (
        <tr className="hover:bg-white transition-colors cursor-pointer group">
            <td className="py-4 px-6 w-16">
                <Avatar size={32} />
            </td>
            <td className="py-4 px-6 text-sm">
                <div className="flex flex-col">
                    <span className="text-stone-800 font-medium">{thesis.student}</span>
                    <span className="text-stone-500">{thesis.code}</span>
                </div>
            </td>
            <td className="py-4 px-6 text-sm text-stone-700 font-medium">
                <div className="max-w-xs truncate" title={thesis.title}>
                    {thesis.title}
                </div>
            </td>
            <td className="py-4 px-6">
                <StatusToggle
                    checked={thesis.status}
                    onChange={(e) => { e.stopPropagation(); onToggle(thesis.id); }}
                />
            </td>
            <td className="py-4 px-6 text-sm text-stone-400 text-right">
                <button className="hover:text-stone-800 transition-colors">
                    <MoreHorizontal size={18} />
                </button>
            </td>
        </tr>
    );
}
