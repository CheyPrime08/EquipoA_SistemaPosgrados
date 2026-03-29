import React from 'react';
import { ChevronsUpDown } from 'lucide-react';

export function SortableTableHeader({ children, sortable = true }) {
    return (
        <th className="py-4 px-6 font-medium text-sm text-stone-600">
            <div className="flex items-center gap-2">
                {children}
                {sortable && <ChevronsUpDown size={14} className="text-stone-400" />}
            </div>
        </th>
    );
}
