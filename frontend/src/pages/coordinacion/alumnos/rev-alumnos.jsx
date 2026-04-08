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
    MoreHorizontal,
    Eye,
    Pencil,
    Trash2,
    ChevronsUpDown,
    X,
} from 'lucide-react';

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
    const [activeTab, setActiveTab] = React.useState('Documentos Académicos');
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
                            {selectedStudent && (
                                <aside className="w-[420px] bg-white border-l border-[#EBE3D5] shadow-[-8px_0_30px_rgba(0,0,0,0.02)] flex flex-col shrink-0 overflow-y-auto">
                                    <div className="p-8">
                                        <div className="flex justify-between items-start mb-6">
                                            <h2 className="text-xl font-medium leading-tight text-stone-800">
                                                {selectedStudent.name}<br /><span className="text-stone-500 font-normal">({selectedStudent.code})</span>
                                            </h2>
                                            <div className="flex gap-2">
                                                <button className="text-stone-400 hover:text-stone-700">
                                                    <MoreHorizontal size={20} />
                                                </button>
                                                <button className="text-stone-400 hover:text-stone-700" onClick={() => setSelectedStudent(null)}>
                                                    <X size={20} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Pestañas */}
                                        <div className="flex gap-6 border-b border-[#EBE3D5] mb-2 text-sm overflow-x-auto whitespace-nowrap scrollbar-hide">
                                            <button className={activeTab === 'Datos Generales' ? "pb-3 text-stone-800 font-semibold border-b-2 border-[#C9B29B] transition-colors" : "pb-3 text-stone-500 hover:text-stone-800 transition-colors"} onClick={() => setActiveTab('Datos Generales')}>Datos Generales</button>
                                            <button className={activeTab === 'Documentos Personales' ? "pb-3 text-stone-800 font-semibold border-b-2 border-[#C9B29B] transition-colors" : "pb-3 text-stone-500 hover:text-stone-800 transition-colors"} onClick={() => setActiveTab('Documentos Personales')}>Documentos Personales</button>
                                        </div>
                                        <div className="flex gap-6 border-b border-[#EBE3D5] mb-6 text-sm overflow-x-auto whitespace-nowrap scrollbar-hide">
                                            <button className={activeTab === 'Documentos Académicos' ? "pb-3 text-stone-800 font-semibold border-b-2 border-[#C9B29B] transition-colors" : "pb-3 text-stone-500 hover:text-stone-800 transition-colors"} onClick={() => setActiveTab('Documentos Académicos')}>Documentos Académicos</button>
                                            <button className={activeTab === 'Constancias' ? "pb-3 text-stone-800 font-semibold border-b-2 border-[#C9B29B] transition-colors" : "pb-3 text-stone-500 hover:text-stone-800 transition-colors"} onClick={() => setActiveTab('Constancias')}>Constancias</button>
                                        </div>

                                        {activeTab === 'Documentos Académicos' && (
                                            <div className="space-y-4 mb-10">
                                                <DocumentCard title="Título de Licenciatura" />
                                                <DocumentCard title="Certificado de Calificaciones" />
                                                <DocumentCard title="Propuesta de Tesis" />
                                            </div>
                                        )}

                                        {activeTab === 'Datos Generales' && (
                                            <div className="space-y-3 mb-10 text-sm">
                                                <div className="flex flex-col"><span className="text-stone-500 text-xs">Correo Electrónico</span><span className="text-stone-800">alumno@posgrado.edu.mx</span></div>
                                                <div className="flex flex-col"><span className="text-stone-500 text-xs">Teléfono</span><span className="text-stone-800">+52 33 1234 5678</span></div>
                                                <div className="flex flex-col"><span className="text-stone-500 text-xs">Fecha de Nacimiento</span><span className="text-stone-800">15 de Mayo, 1995</span></div>
                                                <div className="flex flex-col"><span className="text-stone-500 text-xs">Dirección</span><span className="text-stone-800">Av. Siempre Viva 123, Zapopan</span></div>
                                            </div>
                                        )}

                                        {activeTab === 'Documentos Personales' && (
                                            <div className="space-y-4 mb-10">
                                                <DocumentCard title="Identificación Oficial (INE)" />
                                                <DocumentCard title="Comprobante de Domicilio" />
                                                <DocumentCard title="Acta de Nacimiento" />
                                            </div>
                                        )}

                                        {activeTab === 'Constancias' && (
                                            <div className="space-y-4 mb-10">
                                                <DocumentCard title="Constancia de Estudios" />
                                                <DocumentCard title="Constancia de No Adeudo" />
                                            </div>
                                        )}

                                        <div className="mt-auto">
                                            <button className="w-full bg-[#D8C4B6] hover:bg-[#C9B29B] text-stone-800 font-medium px-4 py-3 rounded-2xl transition-colors shadow-sm flex justify-center items-center">
                                                Subir Nuevo Documento
                                            </button>
                                        </div>
                                    </div>
                                </aside>
                            )}

                        </div>
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}

// Subcomponentes //

// Tabla donde se mostrarán los expendientes
function Th({ children, sortable = true, onClick }) {
    return (
        <th className="py-4 px-6 font-medium text-sm text-stone-600">
            <div className={`flex items-center gap-2 ${sortable ? 'cursor-pointer select-none hover:text-stone-800' : ''}`} onClick={sortable ? onClick : undefined}>
                {children}
                {sortable && <ChevronsUpDown size={14} className="text-stone-400" />}
            </div>
        </th>
    );
}

// Filas de la tabla
function TableRow({ code, name, prog, status, statusColor, onClick }) {
    return (
        <tr className="hover:bg-white transition-colors cursor-pointer" onClick={onClick}>
            <td className="py-4 px-6 text-sm text-stone-600">{code}</td>
            <td className="py-4 px-6 text-sm text-stone-800 font-medium">{name}</td>
            <td className="py-4 px-6 text-sm text-stone-600">{prog}</td>
            <td className="py-4 px-6 text-sm">
                <span className={`px-3 py-1 rounded-full text-xs font-medium text-stone-800 ${statusColor}`}>
                    {status}
                </span>
            </td>
            <td className="py-4 px-6 text-sm text-stone-400">
                <button className="hover:text-stone-800 transition-colors"><MoreHorizontal size={18} /></button>
            </td>
        </tr>
    );
}

// Tarjetas de los documentos
function DocumentCard({ title }) {
    return (
        <div className="flex flex-col gap-2 py-4 border-b border-dashed border-[#EBE3D5] group">
            <span className="text-sm text-stone-800 font-medium">{title}</span>
            <div className="flex items-center gap-4 text-stone-400 mt-1">
                <button className="hover:text-stone-800 transition-colors"><Eye size={16} /></button>
                <button className="hover:text-stone-800 transition-colors"><Pencil size={16} /></button>
                <button className="hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
            </div>
        </div>
    );
}
