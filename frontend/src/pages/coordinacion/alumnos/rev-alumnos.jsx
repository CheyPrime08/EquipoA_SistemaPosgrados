import React from 'react';
import { 
  Search, 
  MoreHorizontal, 
  Eye, 
  Pencil, 
  Trash2, 
  ChevronsUpDown 
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

export default function RevAlumnos() {
    return (
        <div className="flex h-screen bg-[#F8F6F2] text-stone-800 font-sans antialiased">
            <Sidebar />

            <main className="flex-1 p-8 overflow-y-auto">
                <Header 
                  title="Revisión del Alumnado" 
                  subtitle="Consulta y gestión de expedientes académicos" 
                />

                <div className="flex-1 flex gap-8 overflow-hidden">
                    {/* Tabla */}
                    <section className="flex-1 bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100/50 flex flex-col overflow-hidden">
                        <div className="flex items-center w-80 px-4 py-2.5 mb-6 bg-gray-50 border-none rounded-xl shadow-sm shrink-0">
                            <Search size={18} className="text-stone-400 mr-2 shrink-0" />
                            <input type="text" placeholder="Buscar alumno..." className="bg-transparent border-none outline-none text-sm w-full placeholder:text-stone-400" />
                        </div>

                        <div className="overflow-auto flex-1">
                            <table className="w-full text-left border-collapse whitespace-nowrap">
                                <thead className="bg-[#EFE9E0] sticky top-0 z-10 rounded-t-xl">
                                    <tr>
                                        <Th>Código Alumno</Th>
                                        <Th>Nombre Completo</Th>
                                        <Th>Programa</Th>
                                        <Th>Estado Tesis</Th>
                                        <Th sortable={false}>Acciones</Th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    <TableRow code="ALU1234" name="Ana García" prog="Maestría en IA" status="En Revisión" statusColor="bg-[#D8C4B6]" />
                                    <TableRow code="ALU5678" name="Pedro López" prog="Doctorado en Ciencias" status="Aceptado" statusColor="bg-[#DBD3C8]" />
                                    <TableRow code="ALU9012" name="Carlos Ruiz" prog="Maestría en IA" status="Sin Tesis" statusColor="bg-[#E6D5C5]" />
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Panel de Expedientes */}
                    <aside className="w-[380px] bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100/50 flex flex-col shrink-0 overflow-y-auto">
                        <div className="flex justify-between items-start mb-6">
                            <h2 className="text-xl font-medium leading-tight text-stone-800">
                                Expediente<br /><span className="text-stone-500 font-normal text-sm">(ID: 1234)</span>
                            </h2>
                            <button className="text-stone-400 hover:text-stone-700">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>

                        <div className="flex gap-4 border-b border-gray-100 mb-6 text-xs font-bold uppercase tracking-wider overflow-x-auto scrollbar-hide">
                            <button className="pb-3 text-stone-800 border-b-2 border-[#C9B29B]">Académicos</button>
                            <button className="pb-3 text-stone-400 hover:text-stone-600 transition-colors">Personales</button>
                        </div>

                        <div className="space-y-2 mb-10 flex-1">
                            <DocumentCard title="Título de Licenciatura" />
                            <DocumentCard title="Certificado de Calificaciones" />
                            <DocumentCard title="Propuesta de Tesis" />
                        </div>

                        <button className="w-full bg-[#D6C7B3] hover:bg-[#C9B29B] text-stone-900 font-semibold px-4 py-3.5 rounded-2xl transition-all shadow-sm flex justify-center items-center text-sm">
                            Subir Nuevo Documento
                        </button>
                    </aside>
                </div>
            </main>
        </div>
    );
}

function Th({ children, sortable = true }) {
    return (
        <th className="py-4 px-6 font-semibold text-xs text-stone-500 uppercase tracking-wider">
            <div className="flex items-center gap-2">
                {children}
                {sortable && <ChevronsUpDown size={14} className="text-stone-400" />}
            </div>
        </th>
    );
}

function TableRow({ code, name, prog, status, statusColor }) {
    return (
        <tr className="hover:bg-gray-50 transition-colors cursor-pointer group">
            <td className="py-4 px-6 text-sm text-stone-500 font-mono">{code}</td>
            <td className="py-4 px-6 text-sm text-stone-800 font-medium">{name}</td>
            <td className="py-4 px-6 text-sm text-stone-600">{prog}</td>
            <td className="py-4 px-6 text-sm">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight text-stone-800 ${statusColor}`}>
                    {status}
                </span>
            </td>
            <td className="py-4 px-6 text-sm text-stone-400">
                <button className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-stone-800"><MoreHorizontal size={18} /></button>
            </td>
        </tr>
    );
}

function DocumentCard({ title }) {
    return (
        <div className="flex flex-col gap-1 py-3 border-b border-dashed border-gray-100 group">
            <span className="text-sm text-stone-800 font-medium">{title}</span>
            <div className="flex items-center gap-4 text-stone-300 mt-1 opacity-60 group-hover:opacity-100 transition-opacity">
                <button className="hover:text-stone-800 transition-colors"><Eye size={14} /></button>
                <button className="hover:text-stone-800 transition-colors"><Pencil size={14} /></button>
                <button className="hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
            </div>
        </div>
    );
}
