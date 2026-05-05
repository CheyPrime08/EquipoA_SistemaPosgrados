import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutCoordinacion } from "@/modules/coordinador/common/LayoutCoordinacion";
import { CoordCard } from "@/modules/coordinador/common/card/CoordCard";
import { AddConvoc } from "@/modules/coordinador/inicio/AddConvoc";
import { ModalArchivar } from "@/modules/coordinador/inicio/ModalArchivar";
import { ModalCrearGen } from "@/modules/coordinador/inicio/ModalCrearGen";

const InicioCoord = () => {
  const navigate = useNavigate();
  const [modalArchivar, setModalArchivar] = useState({ isOpen: false, name: "" });
  const [modalCrearGen, setModalCrearGen] = useState({ isOpen: false, name: "" });

  const openArchivar = (name) => setModalArchivar({ isOpen: true, name });
  const openCrearGen = (name) => setModalCrearGen({ isOpen: true, name });

  return (
    <LayoutCoordinacion
      complementosFlotantes={
        <div className="absolute bottom-15 right-15 z-30">
          <AddConvoc onClick={() => {}} />
        </div>
      }
    >
      <div className="flex gap-4">
        <CoordCard
          label="generacion"
          generacion="2025-B"
          descripcion="Próxima entrega: Protocolo de investigación"
          onClick={() => navigate("/generacion")}
          onContact={() => navigate("/generacion?tab=Revisión")}
          onArchive={() => openArchivar("2025-B")}
        />
        <CoordCard
          label="generacion"
          generacion="2026-A"
          descripcion="Próxima entrega: Protocolo de investigación"
          onClick={() => navigate("/generacion")}
          onContact={() => navigate("/generacion?tab=Revisión")}
          onArchive={() => openArchivar("2026-A")}
        />
        <CoordCard
          label="generacion"
          generacion="2026-B"
          descripcion="Próxima entrega: Protocolo de investigación"
          onClick={() => navigate("/generacion")}
          onContact={() => navigate("/generacion?tab=Revisión")}
          onArchive={() => openArchivar("2026-B")}
        />
        <CoordCard
          variant="convocatoria"
          label="Convocatoria"
          generacion="2027-A"
          descripcion="Próxima entrega: Protocolo de investigación"
          onClick={() => navigate("/convocatoria")}
          onContact={() => navigate("/convocatoria?tab=Aspirantes")}
          onCreateGeneration={() => openCrearGen("2027-A")}
        />
      </div>

      <ModalArchivar 
        isOpen={modalArchivar.isOpen}
        onClose={() => setModalArchivar({ ...modalArchivar, isOpen: false })}
        generationName={modalArchivar.name}
      />

      <ModalCrearGen 
        isOpen={modalCrearGen.isOpen}
        onClose={() => setModalCrearGen({ ...modalCrearGen, isOpen: false })}
        convocatoriaName={modalCrearGen.name}
      />
    </LayoutCoordinacion>
  );
};

export default InicioCoord;
