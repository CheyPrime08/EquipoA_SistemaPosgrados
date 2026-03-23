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
  Download,
  Calendar,
  BookOpen,
  Edit2,
  MoreHorizontal,
  ChevronsUpDown
} from 'lucide-react';

export default function Prerregistro() {
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
                            <div className="text-sm font-medium text-stone-500">Pre-Registro</div>

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

                            {/* Tabla y Contenido Principal */}
                            <section className="flex-1 px-8 py-6 flex flex-col overflow-hidden">
                                <h1 className="text-[28px] font-medium mb-6 text-stone-800">Pre-Registro</h1>

                                {/* Filters & Acciones */}
                                <div className="flex flex-wrap items-center gap-4 mb-6">
                                    {/* Barra de búsqueda */}
                                    <div className="flex items-center w-80 px-4 py-2.5 bg-white border border-[#EBE3D5] rounded-xl shadow-sm shrink-0">
                                        <Search size={18} className="text-stone-400 mr-2 shrink-0" />
                                        <input type="text" placeholder="Buscar por nombre o código..." className="bg-transparent border-none outline-none text-sm w-full placeholder:text-stone-400" />
                                    </div>
                                    
                                    <FilterSelect label="Programa" placeholder="Todos los Programas" />
                                    <FilterSelect label="Estado" placeholder="En Revisión" />
                                    
                                    <button className="ml-auto bg-[#D8C4B6] hover:bg-[#C9B29B] text-stone-800 font-medium px-6 py-2.5 rounded-xl transition-colors shadow-sm flex items-center gap-2 text-sm">
                                        <Download size={18} />
                                        Exportar Lista
                                    </button>
                                </div>

                                <div className="bg-[#FAF8F5] rounded-2xl border border-[#EBE3D5] overflow-auto flex-1">
                                    <table className="w-full text-left border-collapse whitespace-nowrap">
                                        <thead className="bg-[#EFE9E0] sticky top-0 z-10">
                                            <tr>
                                                <Th>Código Aspirante</Th>
                                                <Th>Nombre Completo</Th>
                                                <Th>Programa</Th>
                                                <Th>Fecha Solicitud</Th>
                                                <Th>Estado</Th>
                                                <Th sortable={false}>Acciones</Th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#EBE3D5]">
                                            <TableRow code="ASP1234" name="Ana García" program="Maestría en IA" date="15 Mar 2026" status="En Revisión" statusColor="bg-[#D8C4B6]" />
                                            <TableRow code="ASP5678" name="Pedro López" program="Doctorado en Ciencias" date="10 Mar 2026" status="Aceptado" statusColor="bg-[#DBD3C8]" />
                                            <TableRow code="ASP9012" name="Laura Ramírez" program="Maestría en IA" date="18 Mar 2026" status="Pendiente" statusColor="bg-[#E6D5C5]" />
                                        </tbody>
                                    </table>
                                </div>

                                {/* Fechas y Periodos */}
                                <div className="mt-8 pt-6 border-t border-[#EBE3D5] shrink-0">
                                    <h3 className="font-semibold text-stone-800 mb-4 flex items-center gap-2 text-sm">
                                        <Calendar size={18} className="text-[#C9B29B]" />
                                        Fechas límite y periodos del semestre
                                    </h3>
                                    <div className="bg-[#FAF8F5] rounded-2xl p-6 flex flex-col items-center justify-center text-stone-400 border-dashed border border-[#EBE3D5] min-h-[140px]">
                                        <div className="bg-white p-3 rounded-full shadow-sm mb-3 border border-[#EBE3D5]">
                                            <BookOpen size={20} className="text-stone-400" />
                                        </div>
                                        <p className="text-sm font-medium">El diagrama de Gantt de este periodo se encuentra en construcción</p>
                                    </div>
                                </div>
                            </section>

                        </div>
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}

// Subcomponentes //

function FilterSelect({ label, placeholder }) {
  return (
    <div className="flex flex-col gap-1.5 min-w-[160px]">
      <span className="text-[10px] font-bold text-stone-400 ml-1 uppercase tracking-widest">{label}</span>
      <select className="border border-[#EBE3D5] rounded-xl px-4 py-2.5 bg-white text-sm outline-none font-medium text-stone-600 cursor-pointer shadow-sm focus:ring-2 focus:ring-[#EFE9E0]">
        <option>{placeholder}</option>
      </select>
    </div>
  );
}

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

function TableRow({ code, name, program, date, status, statusColor }) {
    return (
        <tr className="hover:bg-white transition-colors group cursor-pointer">
            <td className="py-4 px-6 text-sm text-stone-600 font-mono">{code}</td>
            <td className="py-4 px-6 text-sm text-stone-800 font-medium">{name}</td>
            <td className="py-4 px-6 text-sm text-stone-600">{program}</td>
            <td className="py-4 px-6 text-sm text-stone-500">{date}</td>
            <td className="py-4 px-6 text-sm">
                <span className={`px-3 py-1 rounded-full text-xs font-medium text-stone-800 ${statusColor}`}>
                    {status}
                </span>
            </td>
            <td className="py-4 px-6 text-sm text-stone-400">
                <div className="flex gap-4 items-center text-stone-300 opacity-50 group-hover:opacity-100 transition-opacity">
                    <button className="hover:text-stone-800 transition-colors" title="Editar"><Edit2 size={16} /></button>
                    <button className="hover:text-stone-800 transition-colors" title="Más opciones"><MoreHorizontal size={18} /></button>
                </div>
            </td>
        </tr>
    );
}
