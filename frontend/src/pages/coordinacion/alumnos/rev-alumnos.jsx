import React from 'react';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { CoordSidebar } from "@/components/coordinacion/shared/CoordSidebar";
import { CoordHeader } from "@/components/coordinacion/shared/CoordHeader";
import {
    Settings,
    Search,
    ChevronDown,
    LayoutGrid,
    Bell,
} from 'lucide-react';
import { StudentPanel } from "@/components/coordinacion/alumnos/StudentPanel";
import { Th, TableRow } from "@/components/coordinacion/alumnos/StudentTableElements";

{/* Datos de prueba */ }
export const initialStudents = [
    { code: "ALU1234", name: "Ana García", prog: "Maestría en IA", status: "En Revisión", statusColor: "bg-[#D8C4B6]" },
    { code: "ALU5678", name: "Pedro López", prog: "Doctorado en Ciencias", status: "Aceptado", statusColor: "bg-[#DBD3C8]" },
    { code: "ALU9012", name: "Carlos Ruiz", prog: "Maestría en Sistemas", status: "Sin Tesis", statusColor: "bg-[#E6D5C5]" },
    { code: "ALU3456", name: "María Fernanda", prog: "Especialidad en Redes", status: "En Revisión", statusColor: "bg-[#D8C4B6]" },
    { code: "ALU7890", name: "José Miguel", prog: "Doctorado en Ciencias", status: "Aceptado", statusColor: "bg-[#DBD3C8]" },
];

export default function RevAlumnos() {
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
        <SidebarProvider className="flex-col h-screen overflow-hidden bg-[#FAF8F5] text-stone-800 font-sans antialiased">
            <CoordHeader />
            <div className="flex flex-1 overflow-hidden relative">
                <CoordSidebar />
                <SidebarInset className="bg-transparent flex flex-1 overflow-hidden">
                    <main className="flex-1 flex flex-col h-full overflow-hidden relative">

                        {/* Header */}
                        <header className="h-16 px-8 flex items-center justify-between border-b border-[#EBE3D5] relative">
                            <div className="text-sm font-medium text-stone-500">Revisión</div>

                            {/* Selector de Ciclo Escolar */}
                            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-white border border-[#EBE3D5] shadow-sm rounded-xl px-5 py-2 flex items-center gap-3 cursor-pointer z-10 hover:bg-[#FAF8F5] transition-colors">
                                <span className="text-sm font-medium text-stone-700">Ciclo Escolar 2026-A</span>
                                <ChevronDown size={16} className="text-stone-500" />
                            </div>

                            {/* Iconos */}
                            <div className="flex items-center gap-5">
                                <LayoutGrid size={20} className="text-stone-400 hover:text-stone-700 cursor-pointer" />
                                <Settings size={20} className="text-stone-400 hover:text-stone-700 cursor-pointer" />
                                <Bell size={20} className="text-stone-400 hover:text-stone-700 cursor-pointer" />
                                <div className="w-8 h-8 rounded-full bg-[#C9B29B] cursor-pointer"></div>
                            </div>
                        </header>

                        {/* Listado */}
                        <div className="flex-1 flex overflow-hidden">

                            {/* Tabla */}
                            <section className="flex-1 px-8 py-6 flex flex-col overflow-hidden">
                                <h1 className="text-[28px] font-medium mb-6 text-stone-800">Revisión del Alumnado</h1>

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
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}


