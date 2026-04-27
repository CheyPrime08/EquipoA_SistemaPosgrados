import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CoordModal } from '@/modules/coordinador/common/CoordModal';
import { CoordButton } from '@/modules/coordinador/common/CoordButton';
import { GanttHeader } from './GanttHeader';
import { GanttTimeline } from './GanttTimeline';
import { getTotalDays, getPosition, getWidth } from './utils/gantt-utils';

const MOCK_EVENTS = [
  {
    id: 1,
    title: "Prerregistro de Aspirantes",
    description: "Periodo en el cual los aspirantes pueden realizar su registro inicial al programa de posgrado.",
    startDate: "2026-01-15",
    endDate: "2026-03-15",
    color: "bg-blue-100 border-blue-200 text-blue-700",
    url: "/coordinador/aspirantes",
    category: "Admisión"
  },
  {
    id: 2,
    title: "Entrega de Documentación",
    description: "Carga de documentos oficiales por parte de los aspirantes aceptados en la fase inicial.",
    startDate: "2026-03-10",
    endDate: "2026-04-05",
    color: "bg-amber-100 border-amber-200 text-amber-700",
    url: "/coordinador/archivo",
    category: "Documentación"
  },
  {
    id: 3,
    title: "Evaluación de Expedientes",
    description: "Revisión técnica y académica de los expedientes de los aspirantes.",
    startDate: "2026-04-01",
    endDate: "2026-04-20",
    color: "bg-emerald-100 border-emerald-200 text-emerald-700",
    url: "/coordinador/aspirantes",
    category: "Evaluación"
  },
  {
    id: 4,
    title: "Entrevistas",
    description: "Entrevistas personalizadas con el comité académico para la selección final.",
    startDate: "2026-04-25",
    endDate: "2026-05-10",
    color: "bg-purple-100 border-purple-200 text-purple-700",
    url: "/coordinador/agenda",
    category: "Entrevistas"
  },
  {
    id: 5,
    title: "Seguimiento de Tesis I",
    description: "Primera revisión semestral de avances de tesis para alumnos regulares.",
    startDate: "2026-05-15",
    endDate: "2026-06-30",
    color: "bg-rose-100 border-rose-200 text-rose-700",
    url: "/coordinador/tesis",
    category: "Académico"
  },
  {
    id: 6,
    title: "Cierre de Ciclo",
    description: "Trámites finales y entrega de actas del ciclo escolar actual.",
    startDate: "2026-06-20",
    endDate: "2026-07-15",
    color: "bg-slate-100 border-slate-200 text-slate-700",
    url: "/coordinador/ciclo",
    category: "Administrativo"
  }
];

export const AgendaGantt = () => {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentYear] = useState(2026);
  
  const startMonth = 0;
  const endMonth = 6;
  
  const semesterMonths = useMemo(() => {
    return Array.from({ length: endMonth - startMonth + 1 }, (_, i) => startMonth + i);
  }, [startMonth, endMonth]);

  const totalDays = useMemo(() => {
    return getTotalDays(startMonth, endMonth, currentYear);
  }, [semesterMonths, currentYear]);

  const calculatePosition = (dateStr) => getPosition(dateStr, startMonth, endMonth, currentYear, totalDays);
  const calculateWidth = (start, end) => getWidth(start, end, totalDays);
  
  const todayPosition = useMemo(() => {
    return calculatePosition(new Date().toISOString().split('T')[0]);
  }, [totalDays]);

  return (
    <div className="flex flex-col h-full bg-[#FAF8F5] rounded-2xl border border-[#EBE3D5] overflow-hidden">
      <GanttHeader 
        currentYear={currentYear} 
        semesterMonths={semesterMonths} 
        totalDays={totalDays} 
      />

      <div className="flex-1 flex flex-col min-h-0">
        <GanttTimeline 
          events={MOCK_EVENTS}
          todayPosition={todayPosition}
          onEventClick={setSelectedEvent}
          calculatePosition={calculatePosition}
          calculateWidth={calculateWidth}
        />
      </div>

      <CoordModal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        title={selectedEvent?.title}
        footer={
          <div className="flex w-full gap-3">
            <CoordButton 
              variant="secondary" 
              className="flex-1" 
              onClick={() => setSelectedEvent(null)}
            >
              Cerrar
            </CoordButton>
            <CoordButton 
              variant="primary"
              className="flex-1"
              onClick={() => {
                if (selectedEvent?.url) navigate(selectedEvent.url);
              }}
            >
              Ir a evento
            </CoordButton>
          </div>
        }
      >
        <div className="space-y-5">
          <div className="space-y-1.5">
            <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Descripción</h4>
            <p className="text-sm text-stone-600 leading-relaxed bg-[#FAF8F5] p-4 rounded-xl border border-[#EBE3D5]">{selectedEvent?.description}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Inicia</h4>
              <div className="bg-[#FAF8F5] px-4 py-3 rounded-xl border border-[#EBE3D5] text-sm font-semibold text-stone-700">
                {selectedEvent?.startDate}
              </div>
            </div>
            <div className="space-y-1.5">
              <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Termina</h4>
              <div className="bg-[#FAF8F5] px-4 py-3 rounded-xl border border-[#EBE3D5] text-sm font-semibold text-stone-700">
                {selectedEvent?.endDate}
              </div>
            </div>
          </div>
        </div>
      </CoordModal>
    </div>
  );
};
