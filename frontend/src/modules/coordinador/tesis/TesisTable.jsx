import React from 'react';
import { CoordTable } from '../common/CoordTable';
import { TesisRow } from './TesisRow';

export const TesisTable = ({ theses, onToggleStatus }) => {
    const headers = [
        { label: "", sortable: false },
        { label: "Alumno" },
        { label: "Título de Tesis" },
        { label: "Revisión" },
        { label: "Acciones", sortable: false, className: "text-right" }
    ];

    return (
        <CoordTable headers={headers}>
            {theses.map((thesis) => (
                <TesisRow 
                    key={thesis.id} 
                    thesis={thesis} 
                    onToggle={onToggleStatus} 
                />
            ))}
        </CoordTable>
    );
};
