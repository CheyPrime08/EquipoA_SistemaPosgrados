import React, { useState } from 'react';
import { TutoriasFilters } from '@/modules/coordinador/tutorias/TutoriasFilters';
import { TutoriasTable } from '@/modules/coordinador/tutorias/TutoriasTable';

export default function TutoriasPage() {
    const [tutorias, setTutorias] = useState([
        { id: 1, student: 'Juan Carlos', code: '219583058', tutor: 'Dr. Hernández', posgrado: 'Maestría en Ciencia de Datos', reportes: ['Reporte Avance 1', 'Reporte Avance 2'] },
        { id: 2, student: 'Gerardo', code: '000000000', tutor: 'Dra. López', posgrado: 'Doctorado en Inteligencia Artificial', reportes: ['Reporte Avance 1'] },
        { id: 3, student: 'Diego Josuan', code: '111111111', tutor: 'Dr. García', posgrado: 'Maestría en Tecnologías de Información', reportes: [] },
        { id: 4, student: 'Viviana', code: '222222222', tutor: '-', posgrado: 'Maestría en Ciencia de Datos', reportes: ['Reporte Avance 1', 'Reporte Avance 2', 'Reporte Final'] },
        { id: 5, student: 'Sergio', code: '333333333', tutor: '-', posgrado: 'Doctorado en Ciencias Computacionales', reportes: [] },
        { id: 6, student: 'Claudia', code: '444444444', tutor: 'Dra. Martínez', posgrado: 'Maestría en Tecnologías de Información', reportes: ['Reporte Avance 1'] },
    ]);

    const handleSave = (updatedTutoria) => {
        setTutorias(prev =>
            prev.map(t => t.id === updatedTutoria.id ? { ...updatedTutoria } : t)
        );
    };

    const handleDelete = (tutoria) => {
        setTutorias(prev => prev.filter(t => t.id !== tutoria.id));
    };

    return (
        <div className="h-full flex flex-col overflow-hidden">
            <TutoriasFilters />
            
            <div className="flex-1 overflow-auto p-4">
                <TutoriasTable 
                    tutorias={tutorias} 
                    onSave={handleSave}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    );
}