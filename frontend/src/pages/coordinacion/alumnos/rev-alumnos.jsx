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
} from 'lucide-react';

export default function RevAlumnos() {
    return (
        <SidebarProvider className="flex-col h-screen overflow-hidden bg-[#FAF8F5] text-stone-800 font-sans antialiased">
            <CoordHeader />
            <div className="flex flex-1 overflow-hidden relative">
                <CoordSidebar />
                <SidebarInset className="bg-transparent flex flex-1 overflow-hidden">
                    {/* Enfoque principal */}
                    <main className="flex-1 flex flex-col h-full overflow-hidden relative">

                        {/* Barra superior Header */}
                        <header className="h-16 px-8 flex items-center justify-between border-b border-[#EBE3D5]">
                            <div className="text-sm font-medium text-stone-500">Revisión</div>

                    {/* Selector de Ciclo Escolar */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bg-[#FAF8F5] border border-[#EBE3D5] border-t-0 shadow-sm rounded-b-2xl px-6 py-3 flex items-center gap-3 cursor-pointer z-10">
                        <span className="text-sm font-medium text-stone-700">Ciclo Escolar 2026-A</span>
                        <ChevronDown size={16} className="text-stone-500" />
                    </div>

                    {/* Iconos y barra de búsqueda global */}
                    <div className="flex items-center gap-5">
                        <div className="flex items-center w-64 px-4 py-2 bg-transparent border border-[#EBE3D5] rounded-xl">
                            <Search size={16} className="text-stone-400 mr-2 shrink-0" />
                            <input type="text" placeholder="Buscar" className="bg-transparent border-none outline-none text-sm w-full placeholder:text-stone-400 text-stone-700" />
                        </div>
                        <LayoutGrid size={20} className="text-stone-400 hover:text-stone-700 cursor-pointer" />
                        <Settings size={20} className="text-stone-400 hover:text-stone-700 cursor-pointer" />
                        <Bell size={20} className="text-stone-400 hover:text-stone-700 cursor-pointer" />
                        <div className="w-8 h-8 rounded-full bg-[#C9B29B] cursor-pointer"></div>
                    </div>
                </header>

                {/* Área de trabajo (Listado) */}
                <div className="flex-1 flex overflow-hidden">

                    {/* Tabla */}
                    <section className="flex-1 px-8 py-6 flex flex-col overflow-hidden">
                        <h1 className="text-[28px] font-medium mb-6 text-stone-800">Revisión del Alumnado</h1>

                        {/* Barra de búsqueda */}
                        <div className="flex items-center w-80 px-4 py-2.5 mb-6 bg-white border border-[#EBE3D5] rounded-xl shadow-sm shrink-0">
                            <Search size={18} className="text-stone-400 mr-2 shrink-0" />
                            <input type="text" placeholder="Buscar" className="bg-transparent border-none outline-none text-sm w-full placeholder:text-stone-400" />
                        </div>

                        <div className="bg-[#FAF8F5] rounded-2xl border border-[#EBE3D5] overflow-auto flex-1">
                            <table className="w-full text-left border-collapse whitespace-nowrap">
                                <thead className="bg-[#EFE9E0] sticky top-0 z-10">
                                    <tr>
                                        <Th>Código Alumno</Th>
                                        <Th>Nombre Completo</Th>
                                        <Th>Programa</Th>
                                        <Th>Estado Tesis</Th>
                                        <Th sortable={false}>Acciones</Th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#EBE3D5]">
                                    <TableRow code="ALU1234" name="Ana García" prog="Maestría en IA" status="En Revisión" statusColor="bg-[#D8C4B6]" />
                                    <TableRow code="ALU5678" name="Pedro López" prog="Doctorado en Ciencias" status="Aceptado" statusColor="bg-[#DBD3C8]" />
                                    <TableRow code="ALU9012" name="Carlos Ruiz" prog="Maestría en IA" status="Sin Tesis" statusColor="bg-[#E6D5C5]" />
                                    <TableRow code="ALU1234" name="Ana García" prog="Maestría en IA" status="Aceptado" statusColor="bg-[#DBD3C8]" />
                                    <TableRow code="ALU5678" name="Pedro López" prog="Doctorado en Ciencias" status="Aceptado" statusColor="bg-[#DBD3C8]" />
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Panel de Expedientes */}
                    <aside className="w-[420px] bg-white border-l border-[#EBE3D5] shadow-[-8px_0_30px_rgba(0,0,0,0.02)] flex flex-col shrink-0 overflow-y-auto">
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <h2 className="text-xl font-medium leading-tight text-stone-800">
                                    Expediente<br /><span className="text-stone-500 font-normal">(1234)</span>
                                </h2>
                                <button className="text-stone-400 hover:text-stone-700">
                                    <MoreHorizontal size={20} />
                                </button>
                            </div>

                            {/* Pestañas */}
                            <div className="flex gap-6 border-b border-[#EBE3D5] mb-2 text-sm overflow-x-auto whitespace-nowrap scrollbar-hide">
                                <button className="pb-3 text-stone-500 hover:text-stone-800 transition-colors">Datos Generales</button>
                                <button className="pb-3 text-stone-500 hover:text-stone-800 transition-colors">Documentos Personales</button>
                            </div>
                            <div className="flex gap-6 border-b border-[#EBE3D5] mb-6 text-sm overflow-x-auto whitespace-nowrap scrollbar-hide">
                                <button className="pb-3 text-stone-800 font-semibold border-b-2 border-[#C9B29B] transition-colors">Documentos Académicos</button>
                                <button className="pb-3 text-stone-500 hover:text-stone-800 transition-colors">Constancias</button>
                            </div>

                            <div className="space-y-4 mb-10">
                                <DocumentCard title="Título de Licenciatura" />
                                <DocumentCard title="Certificado de Calificaciones" />
                                <DocumentCard title="Propuesta de Tesis" />
                            </div>

                            <div className="mt-auto">
                                <button className="w-full bg-[#D8C4B6] hover:bg-[#C9B29B] text-stone-800 font-medium px-4 py-3 rounded-2xl transition-colors shadow-sm flex justify-center items-center">
                                    Subir Nuevo Documento
                                </button>
                            </div>
                        </div>
                    </aside>

                </div>
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}

// Subcomponentes //

// Tabla donde se mostrarán los expendientes
function Th({ children, sortable = true }) {
    return (
        <th className="py-4 px-6 font-medium text-sm text-stone-600">
            <div className="flex items-center gap-2">
                {children}
                {sortable && <ChevronsUpDown size={14} className="text-stone-400" />}
            </div>
        </th>
    );
}

// Filas de la tabla
function TableRow({ code, name, prog, status, statusColor }) {
    return (
        <tr className="hover:bg-white transition-colors cursor-pointer">
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
