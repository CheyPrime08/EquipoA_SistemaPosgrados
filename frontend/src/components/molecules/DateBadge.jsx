import React from 'react';
import { CalendarDays } from 'lucide-react';

export function DateBadge({ date, label = 'Fecha límite' }) {
    return (
        <div className="flex flex-col items-end">
            <label className="text-xs text-stone-500 mb-1">{label}</label>
            <div className="bg-white rounded-xl px-4 py-2 flex items-center gap-3 border border-[#EBE3D5] shadow-sm">
                <span className="text-sm font-medium text-stone-700">{date}</span>
                <CalendarDays size={16} className="text-[#C9B29B]" />
            </div>
        </div>
    );
}
