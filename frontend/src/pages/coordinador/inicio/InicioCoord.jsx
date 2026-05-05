import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutCoordinacion } from "@/modules/coordinador/common/LayoutCoordinacion";
import { CoordCard } from "@/modules/coordinador/common/card/CoordCard";
import { AddConvoc } from "@/modules/coordinador/inicio/AddConvoc";
import { getConvocatorias } from "@/api/convocatorias.api";
import { ModalArchivar } from "@/modules/coordinador/inicio/ModalArchivar";
import { ModalCrearGen } from "@/modules/coordinador/inicio/ModalCrearGen";

const InicioCoord = () => {
  const navigate = useNavigate();
  const [modalArchivar, setModalArchivar] = useState({ isOpen: false, name: "" });
  const [modalCrearGen, setModalCrearGen] = useState({ isOpen: false, name: "" });
  const [convocatorias, setConvocatorias] = useState([]);

  const openArchivar = (name) => setModalArchivar({ isOpen: true, name });
  const openCrearGen = (name) => setModalCrearGen({ isOpen: true, name });

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const data = await getConvocatorias();
        setConvocatorias(data);
      } catch (error) {
        console.error("Error al obtener convocatorias:", error);
      }
    };
    fetchDatos();
  }, []);

  const getCardProps = (conv) => {
    const today = new Date();
    const [year, month, day] = (conv.fecha_inicio || "").split("-");
    const fechaInicio =
      year && month && day ? new Date(year, month - 1, day) : new Date();
    const esConvocatoriaFutura = fechaInicio > today;

    return {
      variant: esConvocatoriaFutura ? "convocatoria" : "generacion",
      label: esConvocatoriaFutura ? "Convocatoria" : "Generación",
      generacion: conv.ciclo,
      descripcion: `Inicia: ${conv.fecha_inicio || "Por definir"}`,
      onClick: () => navigate(esConvocatoriaFutura ? "/convocatoria" : "/generacion"),
      onContact: () =>
        navigate(esConvocatoriaFutura ? "/convocatoria?tab=Aspirantes" : "/generacion?tab=Revisión"),
      onArchive: esConvocatoriaFutura ? undefined : () => openArchivar(conv.ciclo),
      onCreateGeneration: esConvocatoriaFutura ? () => openCrearGen(conv.ciclo) : undefined,
    };
  };

  return (
    <LayoutCoordinacion
      complementosFlotantes={
        <div className="absolute bottom-15 right-15 z-30">
          <AddConvoc onClick={() => {}} />
        </div>
      }
    >
      <div className="flex gap-4 flex-wrap">
        {convocatorias.length > 0 ? (
          convocatorias.map((conv, idx) => (
            <CoordCard key={idx} {...getCardProps(conv)} />
          ))
        ) : (
          <p className="text-gray-400 mt-10">No hay convocatorias ni generaciones activas.</p>
        )}
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
