import React from 'react';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { CoordTable } from '../common/CoordTable';

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
  const headers = [
    { label: "Código Aspirante" },
    { label: "Nombre Completo" },
    { label: "Programa" },
    { label: "Fecha Solicitud" },
    { label: "Estado" },
    { label: "Acciones", sortable: false }
  ];

  return (
    <CoordTable headers={headers}>
      {data.length > 0 ? (
        data.map((row, index) => <TableRow key={index} {...row} />)
      ) : (
        <>
          <TableRow code="ASP1234" name="Juan Gutierrez" program="Maestría en IA" date="15 Mar 2026" status="En Revisión" statusColor="bg-[#FADE70]" />
          <TableRow code="ASP5678" name="Vivi Navarro" program="Doctorado en Ciencias computacionales" date="10 Mar 2026" status="Aceptado" statusColor="bg-[#ACFA91]" />
          <TableRow code="ASP9012" name="Diego Josuan" program="Maestría en IA" date="18 Mar 2026" status="Pendiente" statusColor="bg-[#F58971]" />
        </>
      )}
    </CoordTable>
  );
};
