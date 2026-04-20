import React from 'react';
import { StudentPanel } from "@/modules/coordinador/alumnos/StudentPanel";
import { TableRow } from "@/modules/coordinador/alumnos/StudentTableElements";
import { CoordTable } from "@/modules/coordinador/common/CoordTable";
import { CoordSearch } from "@/modules/coordinador/common/CoordSearch";

export const initialStudents = [
    { code: "ALU1234", name: "Ana García", prog: "Maestría en IA", status: "En Revisión", statusColor: "bg-[#D8C4B6]" },
    { code: "ALU5678", name: "Pedro López", prog: "Doctorado en Ciencias", status: "Aceptado", statusColor: "bg-[#DBD3C8]" },
    { code: "ALU9012", name: "Carlos Ruiz", prog: "Maestría en Sistemas", status: "Sin Tesis", statusColor: "bg-[#E6D5C5]" },
    { code: "ALU3456", name: "María Fernanda", prog: "Especialidad en Redes", status: "En Revisión", statusColor: "bg-[#D8C4B6]" },
    { code: "ALU7890", name: "José Miguel", prog: "Doctorado en Ciencias", status: "Aceptado", statusColor: "bg-[#DBD3C8]" },
];

export default function AlumnosPage() {
    const [selectedStudent, setSelectedStudent] = React.useState(null);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [sortConfig, setSortConfig] = React.useState({ key: null, direction: 'asc' });

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const filteredStudents = React.useMemo(() => {
        let result = initialStudents.filter(student =>
            student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.prog.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (sortConfig.key) {
            result.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
                if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return result;
    }, [searchQuery, sortConfig]);

    const headers = [
        { label: "Código Alumno", onClick: () => handleSort('code') },
        { label: "Nombre Completo", onClick: () => handleSort('name') },
        { label: "Programa", onClick: () => handleSort('prog') },
        { label: "Estado Tesis", onClick: () => handleSort('status') },
        { label: "Acciones", sortable: false }
    ];

    return (
        <div className="flex h-full overflow-hidden">
            <section className="flex-1 flex flex-col overflow-hidden">
                <CoordSearch 
                    value={searchQuery} 
                    onChange={setSearchQuery} 
                    containerClassName="mb-6"
                />

                <CoordTable headers={headers}>
                    {filteredStudents.length > 0 ? (
                        filteredStudents.map((student) => (
                            <TableRow
                                key={student.code}
                                code={student.code}
                                name={student.name}
                                prog={student.prog}
                                status={student.status}
                                statusColor={student.statusColor}
                                onClick={() => setSelectedStudent(student)}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="py-8 text-center text-sm text-stone-500">
                                No se encontraron alumnos con esos criterios.
                            </td>
                        </tr>
                    )}
                </CoordTable>
            </section>

            <StudentPanel student={selectedStudent} onClose={() => setSelectedStudent(null)} />
        </div>
    );
}
