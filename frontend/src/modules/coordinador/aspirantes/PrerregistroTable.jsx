import React from 'react';
import { Edit2, MoreHorizontal, ChevronsUpDown } from 'lucide-react';

const Th = ({ children, sortable = true }) => {
    return (
        <th className="py-4 px-6 font-medium text-sm text-stone-600">
            <div className="flex items-center gap-2">
                {children}
                {sortable && <ChevronsUpDown size={14} className="text-stone-400" />}
            </div>
        </th>
    );
};

const TableRow = ({ code, name, program, date, status, statusColor }) => {
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
};

export const PrerregistroTable = ({ data = [] }) => {
  return (
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
          {data.map((row, index) => (
            <TableRow key={index} {...row} />
          ))}
          {data.length === 0 && (
             <TableRow code="ASP1234" name="Juan Gutierrez" program="Maestría en IA" date="15 Mar 2026" status="En Revisión" statusColor="bg-[#FADE70]" />
          )}
          {data.length === 0 && (
             <TableRow code="ASP5678" name="Vivi Navarro" program="Doctorado en Ciencias computacionales" date="10 Mar 2026" status="Aceptado" statusColor="bg-[#ACFA91]" />
          )}
          {data.length === 0 && (
             <TableRow code="ASP9012" name="Diego Josuan" program="Maestría en IA" date="18 Mar 2026" status="Pendiente" statusColor="bg-[#F58971]" />
          )}
        </tbody>
      </table>
    </div>
  );
};
