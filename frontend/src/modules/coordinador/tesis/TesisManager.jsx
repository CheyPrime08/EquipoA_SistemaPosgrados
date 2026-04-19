import React, { useState } from 'react';
import { LayoutCoordinacion } from "@/modules/coordinador/common/LayoutCoordinacion";
import { TesisFilters } from './TesisFilters';
import { TesisTable } from './TesisTable';

const TesisManager = () => {
    const [theses, setTheses] = useState([
        { id: 1, student: 'Juan Carlos', code: '219583058', title: 'Inteligencia Artificial en Medicina', status: true },
        { id: 2, student: 'Gerardo', code: '000000000', title: 'Desarrollo web con React', status: false },
        { id: 3, student: 'Diego Josuan', code: '111111111', title: 'Ciberseguridad en IoT', status: true },
        { id: 4, student: 'Viviana', code: '222222222', title: 'Machine Learning para finanzas', status: false },
        { id: 5, student: 'Sergio', code: '333333333', title: 'Postgrades software', status: false },
        { id: 6, student: 'Claudia', code: '444444444', title: 'Ux Desing', status: true },
    ]);

    const handleToggleStatus = (id) => {
        const updatedTheses = theses.map((thesis) => {
            if (thesis.id === id) {
                return { ...thesis, status: !thesis.status };
            }
            return thesis;
        });
        setTheses(updatedTheses);
    };

    return (
        <div className="h-full flex flex-col overflow-hidden">
            <TesisFilters />
            <TesisTable 
                theses={theses} 
                onToggleStatus={handleToggleStatus} 
            />
        </div>
    );
};

export default TesisManager;
