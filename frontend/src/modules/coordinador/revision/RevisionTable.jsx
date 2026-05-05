import React, { useState, useMemo } from "react";
import { CoordTable } from "../common/CoordTable";
import { RevisionRow } from "./RevisionRow";
import { ExpedientesAside } from "./ExpedientesAside";
import { TesisModal } from "./TesisModal";
import { TutoriaModal } from "./TutoriaModal";

const MOCK_REVISIONS = [
  {
    id: 1,
    student: "Juan Pérez García",
    code: "219784563",
    thesis: "Implementación de IA en Sistemas Posgrados",
    tutor: "Dr. Roberto Hernández",
    posgrado: "Maestría en Sistemas",
    year: "2024",
    status: false,
    reportes: ["Reporte_1.pdf", "Avance_Junio.pdf"],
  },
  {
    id: 2,
    student: "María Rodríguez López",
    code: "218456321",
    thesis: "Análisis de Datos en Tiempo Real",
    tutor: "Dra. Elena Martínez",
    posgrado: "Doctorado en Ciencias",
    year: "2023",
    status: true,
    reportes: ["Reporte_Final.pdf"],
  },
  {
    id: 3,
    student: "Carlos Sánchez Ruiz",
    code: "220123456",
    thesis: "Seguridad en Aplicaciones Web Modernas",
    tutor: "Mtro. Ricardo Gomez",
    posgrado: "Maestría en IA",
    year: "2024",
    status: false,
    reportes: [],
  },
];

export const RevisionTable = ({
  statusFilter = "all",
  searchQuery = "",
  yearFilter = "all",
}) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedThesis, setSelectedThesis] = useState(null);
  const [selectedTutoria, setSelectedTutoria] = useState(null);

  const headers = [
    { label: "", sortable: false },
    { label: "Alumno" },
    { label: "Tesis" },
    { label: "Tutor" },
  ];

  const filteredRevisions = useMemo(() => {
    return MOCK_REVISIONS.filter((rev) => {
      // Filtro de estado
      if (statusFilter !== "all") {
        const isRevisado = rev.status === true;
        if (statusFilter === "revisado" && !isRevisado) return false;
        if (statusFilter === "pendiente" && isRevisado) return false;
      }

      // Filtro de año
      if (yearFilter !== "all" && rev.year !== yearFilter) {
        return false;
      }

      // Filtro de búsqueda
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          rev.student.toLowerCase().includes(query) ||
          rev.thesis.toLowerCase().includes(query) ||
          rev.tutor.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [statusFilter, yearFilter, searchQuery]);

  return (
    <div className="flex h-full overflow-hidden">
      <section className="flex-1 flex flex-col overflow-hidden">
        <CoordTable headers={headers}>
          {filteredRevisions.map((revision) => (
            <RevisionRow
              key={revision.id}
              revision={revision}
              onClickStudent={() =>
                setSelectedStudent({
                  name: revision.student,
                  code: revision.code,
                })
              }
              onClickThesis={() =>
                setSelectedThesis({
                  student: revision.student,
                  code: revision.code,
                  title: revision.thesis,
                  status: revision.status,
                  year: revision.year,
                })
              }
              onClickTutor={() =>
                setSelectedTutoria({
                  student: revision.student,
                  code: revision.code,
                  posgrado: revision.posgrado,
                  tutor: revision.tutor,
                  reportes: revision.reportes,
                })
              }
            />
          ))}
        </CoordTable>
      </section>

      {/* Panel lateral del Alumno (Expediente) */}
      {selectedStudent && (
        <ExpedientesAside
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}

      {/* Modal de Tesis */}
      <TesisModal
        isOpen={!!selectedThesis}
        onClose={() => setSelectedThesis(null)}
        thesis={selectedThesis}
      />

      {/* Modal de Tutoría */}
      <TutoriaModal
        isOpen={!!selectedTutoria}
        onClose={() => setSelectedTutoria(null)}
        tutoria={selectedTutoria}
        reportes={selectedTutoria?.reportes}
      />
    </div>
  );
};
