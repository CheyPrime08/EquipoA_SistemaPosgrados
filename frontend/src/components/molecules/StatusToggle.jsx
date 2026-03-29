import React from 'react';
import { Toggle } from '@/components/atoms/Toggle';

export function StatusToggle({ checked, onChange, labelTrue = 'Revisado', labelFalse = 'Pendiente' }) {
    return (
        <div className="flex items-center gap-3">
            <div className="flex flex-col">
                <span className="text-sm text-stone-800">Estado</span>
                <span className="text-xs text-[#C9B29B] font-medium">
                    {checked ? labelTrue : labelFalse}
                </span>
            </div>
            <Toggle checked={checked} onChange={onChange} className="ml-2" />
        </div>
    );
}
