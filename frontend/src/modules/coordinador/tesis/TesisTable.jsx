import React from 'react';
import { CoordTable } from '../common/CoordTable';
import { TesisRow } from './TesisRow';

export const TesisTable = ({ theses, onToggleStatus, showGeneration }) => {
    const headers = [
        { label: "", sortable: false },
        { label: "Alumno" },
        { label: "Título de Tesis" },
        ...(showGeneration ? [{ label: "Generación" }] : []),
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
                    showGeneration={showGeneration}
                />
            ))}
        </CoordTable>
    );
};
