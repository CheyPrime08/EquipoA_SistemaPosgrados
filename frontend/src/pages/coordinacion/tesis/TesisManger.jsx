import React, { useState } from 'react';
import { CoordLayout } from '@/components/templates/CoordLayout';
import { SearchBar } from '@/components/molecules/SearchBar';
import { DateBadge } from '@/components/molecules/DateBadge';
import { TesisTable } from '@/components/organisms/TesisTable';

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
        <CoordLayout>
            <section className="flex-1 px-8 py-6 flex flex-col overflow-hidden">
                <div className="flex justify-between items-end mb-6 shrink-0">
                    <h1 className="text-[28px] font-medium text-stone-800">Tesis</h1>
                    <DateBadge date="17 Mar 2026" label="Fecha límite" />
                </div>

                <SearchBar placeholder="Buscar alumno..." className="mb-6 shrink-0" />

                <TesisTable theses={theses} onToggle={handleToggleStatus} />
            </section>
        </CoordLayout>
    );
};

export default TesisManager;