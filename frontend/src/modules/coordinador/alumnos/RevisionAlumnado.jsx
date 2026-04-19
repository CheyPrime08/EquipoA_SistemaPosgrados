import React from 'react';
import { Search } from 'lucide-react';
import { StudentPanel } from "./StudentPanel";
import { Th, TableRow } from "./StudentTableElements";

{/* Datos de prueba */}
export const initialStudents = [
    { code: "ALU1234", name: "Ana García", prog: "Maestría en IA", status: "En Revisión", statusColor: "bg-[#D8C4B6]" },
    { code: "ALU5678", name: "Pedro López", prog: "Doctorado en Ciencias", status: "Aceptado", statusColor: "bg-[#DBD3C8]" },
    { code: "ALU9012", name: "Carlos Ruiz", prog: "Maestría en Sistemas", status: "Sin Tesis", statusColor: "bg-[#E6D5C5]" },
    { code: "ALU3456", name: "María Fernanda", prog: "Especialidad en Redes", status: "En Revisión", statusColor: "bg-[#D8C4B6]" },
    { code: "ALU7890", name: "José Miguel", prog: "Doctorado en Ciencias", status: "Aceptado", statusColor: "bg-[#DBD3C8]" },
];

export default function RevisionAlumnado() {
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

    return (
        <main className="flex-1 flex flex-col h-full overflow-hidden relative">



            {/* Listado */}
            <div className="flex-1 flex overflow-hidden">

                {/* Tabla */}
                <section className="flex-1 px-8 py-6 flex flex-col overflow-hidden">
                    {/* Barra de búsqueda */}
                    <div className="flex items-center w-80 px-4 py-2.5 mb-6 bg-white border border-[#EBE3D5] rounded-xl shadow-sm shrink-0">
                        <Search size={18} className="text-stone-400 mr-2 shrink-0" />
                        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Buscar alumno, código o programa..." className="bg-transparent border-none outline-none text-sm w-full placeholder:text-stone-400 text-stone-700" />
                    </div>

                    <div className="bg-[#FAF8F5] rounded-2xl border border-[#EBE3D5] overflow-auto flex-1">
                        <table className="w-full text-left border-collapse whitespace-nowrap">
                            <thead className="bg-[#EFE9E0] sticky top-0 z-10">
                                <tr>
                                    <Th onClick={() => handleSort('code')}>Código Alumno</Th>
                                    <Th onClick={() => handleSort('name')}>Nombre Completo</Th>
                                    <Th onClick={() => handleSort('prog')}>Programa</Th>
                                    <Th onClick={() => handleSort('status')}>Estado Tesis</Th>
                                    <Th sortable={false}>Acciones</Th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#EBE3D5]">
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
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Panel de Expedientes */}
                <StudentPanel student={selectedStudent} onClose={() => setSelectedStudent(null)} />

            </div>
        </main>
    );
}
