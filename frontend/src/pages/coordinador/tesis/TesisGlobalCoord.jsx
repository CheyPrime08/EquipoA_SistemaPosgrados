import React, { useState } from 'react';
import { LayoutCoordinacion } from "@/modules/coordinador/common/LayoutCoordinacion";
import { TesisGlobalFilters } from '@/modules/coordinador/tesis/TesisGlobalFilters';
import { TesisTable } from '@/modules/coordinador/tesis/TesisTable';

export default function TesisGlobalCoord() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [yearFilter, setYearFilter] = useState('all');

    const [theses, setTheses] = useState([
        { id: 1, student: 'Juan Carlos', code: '219583058', title: 'Inteligencia Artificial en Medicina', status: true, year: '2026' },
        { id: 2, student: 'Gerardo', code: '000000000', title: 'Desarrollo web con React', status: false, year: '2026' },
        { id: 3, student: 'Diego Josuan', code: '111111111', title: 'Ciberseguridad en IoT', status: true, year: '2025' },
        { id: 4, student: 'Viviana', code: '222222222', title: 'Machine Learning para finanzas', status: false, year: '2025' },
        { id: 5, student: 'Sergio', code: '333333333', title: 'Postgrades software', status: false, year: '2026' },
        { id: 6, student: 'Claudia', code: '444444444', title: 'Ux Desing', status: true, year: '2027' },
        { id: 7, student: 'Ana', code: '555555555', title: 'Redes Neuronales', status: true, year: '2024' },
        { id: 8, student: 'Luis', code: '666666666', title: 'Bases de Datos Distribuidas', status: false, year: '2027' },
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

    const filteredTheses = theses.filter(thesis => {
        const matchesSearch = thesis.student.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              thesis.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              thesis.code.includes(searchQuery);
        
        let matchesStatus = true;
        if (statusFilter === 'revised') matchesStatus = thesis.status === true;
        if (statusFilter === 'pending') matchesStatus = thesis.status === false;

        const matchesYear = yearFilter === 'all' ? true : thesis.year === yearFilter;

        return matchesSearch && matchesStatus && matchesYear;
    });

    return (
        <LayoutCoordinacion>
            <div className="h-full flex flex-col overflow-hidden">
                <div className="mb-6 flex flex-col gap-2 shrink-0">
                    <h1 className="text-2xl font-semibold text-stone-800">Todas las tesis</h1>
                    <p className="text-sm text-stone-500">Vista global de las tesis de todos los alumnos.</p>
                </div>
                
                <TesisGlobalFilters 
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    statusFilter={statusFilter}
                    onStatusChange={setStatusFilter}
                    yearFilter={yearFilter}
                    onYearChange={setYearFilter}
                />
                
                <div className="flex-1 overflow-auto">
                    <TesisTable 
                        theses={filteredTheses} 
                        onToggleStatus={handleToggleStatus} 
                        showGeneration={true}
                    />
                </div>
            </div>
        </LayoutCoordinacion>
    );
}
