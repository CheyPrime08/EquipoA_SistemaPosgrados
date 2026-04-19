import { useState } from "react";
import {
  MoreHorizontal,
  CalendarDays,
} from "lucide-react";
import { CoordTable } from "@/modules/coordinador/common/CoordTable";
import { CoordSearch } from "@/modules/coordinador/common/CoordSearch";

const TesisContent = ({ cicloId }) => {
  const [theses, setTheses] = useState([
    { id: 1, student: "Juan Carlos", code: "219583058", title: "Inteligencia Artificial en Medicina", status: true },
    { id: 2, student: "Gerardo", code: "000000000", title: "Desarrollo web con React", status: false },
    { id: 3, student: "Diego Josuan", code: "111111111", title: "Ciberseguridad en IoT", status: true },
    { id: 4, student: "Viviana", code: "222222222", title: "Machine Learning para finanzas", status: false },
    { id: 5, student: "Sergio", code: "333333333", title: "Postgrades software", status: false },
    { id: 6, student: "Claudia", code: "444444444", title: "Ux Desing", status: true },
  ]);

  const handleToggleStatus = (id) => {
    setTheses((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: !t.status } : t))
    );
  };

  const headers = [
    { label: "", sortable: false },
    { label: "Alumno" },
    { label: "Título de Tesis" },
    { label: "Revisión" },
    { label: "Acciones", sortable: false, className: "text-right" }
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end shrink-0">
        <CoordSearch />
        <div className="flex flex-col items-end">
          <label className="text-xs text-stone-500 mb-1">Fecha límite</label>
          <div className="bg-white rounded-xl px-4 py-2 flex items-center gap-3 border border-[#EBE3D5] shadow-sm">
            <span className="text-sm font-medium text-stone-700">17 Mar 2026</span>
            <CalendarDays size={16} className="text-[#C9B29B]" />
          </div>
        </div>
      </div>

      <CoordTable headers={headers}>
        {theses.map((thesis) => (
          <TesisRow key={thesis.id} thesis={thesis} onToggle={handleToggleStatus} />
        ))}
      </CoordTable>
    </div>
  );
};

export default TesisContent;

function TesisRow({ thesis, onToggle }) {
  return (
    <tr className="hover:bg-white transition-colors cursor-pointer group">
      <td className="py-4 px-6 w-16">
        <div className="w-8 h-8 rounded-full bg-[#EFE9E0] flex items-center justify-center border border-[#EBE3D5] text-[#C9B29B]">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
      </td>
      <td className="py-4 px-6 text-sm">
        <div className="flex flex-col">
          <span className="text-stone-800 font-medium">{thesis.student}</span>
          <span className="text-stone-500">{thesis.code}</span>
        </div>
      </td>
      <td className="py-4 px-6 text-sm text-stone-700 font-medium">
        <div className="max-w-xs truncate" title={thesis.title}>
          {thesis.title}
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-sm text-stone-800">Estado</span>
            <span className="text-xs text-[#C9B29B] font-medium">
              {thesis.status ? "Revisado" : "Pendiente"}
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer ml-2">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={thesis.status}
              onChange={(e) => { e.stopPropagation(); onToggle(thesis.id); }}
            />
            <div className="w-10 h-5 bg-[#EBE3D5] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#EBE3D5] after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#C9B29B]" />
          </label>
        </div>
      </td>
      <td className="py-4 px-6 text-sm text-stone-400 text-right">
        <button className="hover:text-stone-800 transition-colors">
          <MoreHorizontal size={18} />
        </button>
      </td>
    </tr>
  );
}
