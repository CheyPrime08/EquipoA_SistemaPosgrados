import React from 'react';
import { CoordTable } from '../common/CoordTable';
import { TutoriasRow } from './TutoriasRow';

export const TutoriasTable = ({ tutorias, onSave, onDelete }) => {
    const headers = [
        { label: "", sortable: false },
        { label: "Alumno" },
        { label: "Código" },
        { label: "Posgrado" },
        { label: "Tutor Asignado" },
        { label: "Acciones", sortable: false, className: "text-right" }
    ];

    return (
        <CoordTable headers={headers}>
            {tutorias.map((tutoria) => (
                <TutoriasRow 
                    key={tutoria.id} 
                    tutoria={tutoria}
                    onSave={onSave}
                    onDelete={onDelete}
                />
            ))}
        </CoordTable>
    );
};
