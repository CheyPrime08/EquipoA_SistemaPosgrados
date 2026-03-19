import React from 'react';
import { 
  Search, 
  Download, 
  Edit2, 
  MoreHorizontal,
  Calendar,
  BookOpen
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

const Prerregistro = () => {
  return (
    <div className="flex min-h-screen bg-[#F8F6F2] font-sans text-gray-700">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <Header 
          title="Pre-Registro" 
          subtitle="Gestión y seguimiento de aspirantes al posgrado" 
        />

        {/* Filters & Table Card */}
        <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100/50">
          <div className="flex flex-wrap gap-4 mb-8 items-end">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Buscar por nombre o código..." 
                className="w-full pl-12 pr-4 py-3 border-none rounded-2xl bg-gray-50 focus:ring-2 ring-[#EFE9E3] outline-none transition-all placeholder:text-gray-400"
              />
            </div>
            <FilterSelect label="Programa" placeholder="Todos los Programas" />
            <FilterSelect label="Estado" placeholder="En Revisión" />
            <button className="bg-[#CDBBA7] text-white px-8 py-3 rounded-2xl hover:bg-[#b8a692] transition-all shadow-md shadow-stone-200 flex items-center gap-2 font-medium">
              <Download size={18} />
              Exportar Lista
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50">
                  <th className="pb-4 px-4">Código Aspirante</th>
                  <th className="pb-4 px-4">Nombre Completo</th>
                  <th className="pb-4 px-4">Programa</th>
                  <th className="pb-4 px-4">Fecha Solicitud</th>
                  <th className="pb-4 px-4">Estado</th>
                  <th className="pb-4 px-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-600">
                <TableRow code="ASP1234" name="Ana García" program="Maestría en IA" date="15 Mar 2026" status="En Revisión" statusColor="bg-orange-100 text-orange-700" />
                <TableRow code="ASP5678" name="Pedro López" program="Doctorado en Ciencias" date="10 Mar 2026" status="Aceptado" statusColor="bg-green-100 text-green-700" />
                <TableRow code="ASP9012" name="Laura Ramírez" program="Maestría en IA" date="18 Mar 2026" status="Pendiente" statusColor="bg-stone-100 text-stone-600" />
              </tbody>
            </table>
          </div>

          <div className="mt-16 border-t border-gray-50 pt-10">
            <h3 className="font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Calendar size={18} className="text-[#CDBBA7]" />
              Fechas límite y periodos del semestre
            </h3>
            <div className="bg-gray-50 rounded-[2rem] p-10 flex flex-col items-center justify-center text-gray-400 border-dashed border-2 border-gray-200 min-h-[180px]">
              <div className="bg-white p-4 rounded-full shadow-sm mb-3">
                <BookOpen size={24} className="text-gray-300" />
              </div>
              <p className="text-sm font-medium">El diagrama de Gantt de este periodo se encuentra en construcción</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

const FilterSelect = ({ label, placeholder }) => (
  <div className="flex flex-col gap-1.5 min-w-[160px]">
    <span className="text-[10px] font-bold text-gray-400 ml-1 uppercase tracking-widest">{label}</span>
    <select className="border-none rounded-xl px-4 py-3 bg-gray-50 text-sm outline-none font-medium text-gray-600 cursor-pointer focus:ring-2 ring-[#EFE9E3]">
      <option>{placeholder}</option>
    </select>
  </div>
);

const TableRow = ({ code, name, program, date, status, statusColor }) => (
  <tr className="group border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
    <td className="py-5 px-4 font-mono text-xs text-gray-400">{code}</td>
    <td className="py-5 px-4 font-medium text-gray-800">{name}</td>
    <td className="py-5 px-4">{program}</td>
    <td className="py-5 px-4 text-gray-400">{date}</td>
    <td className="py-5 px-4">
      <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm ${statusColor}`}>
        {status}
      </span>
    </td>
    <td className="py-5 px-4">
      <div className="flex justify-center gap-3 text-gray-300 opacity-50 group-hover:opacity-100 transition-opacity">
        <Edit2 size={16} className="cursor-pointer hover:text-[#CDBBA7]" title="Editar" />
        <MoreHorizontal size={18} className="cursor-pointer hover:text-gray-600" title="Más opciones" />
      </div>
    </td>
  </tr>
);

export default Prerregistro;
