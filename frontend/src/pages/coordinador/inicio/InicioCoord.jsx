import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutCoordinacion } from "@/modules/coordinador/common/LayoutCoordinacion";
import { CoordCard } from "@/modules/coordinador/common/card/CoordCard";
import { AddConvoc } from "@/modules/coordinador/inicio/AddConvoc";
import { getConvocatorias } from "@/api/convocatorias.api";

const InicioCoord = () => {
  const navigate = useNavigate();
  const [convocatorias, setConvocatorias] = useState([]);

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
    // Convertir fecha de inicio (ej. "2026-08-10") a Date.
    // Usamos split y Date() para evitar problemas de zona horaria con UTC.
    const [year, month, day] = conv.fecha_inicio.split('-');
    const fechaInicio = new Date(year, month - 1, day);
    
    // Si la fecha de inicio es en el futuro, es "Convocatoria", si ya pasó, es "Generación"
    const esConvocatoriaFutura = fechaInicio > today;

    return {
      variant: esConvocatoriaFutura ? "convocatoria" : undefined, // asume que sin variant usa el de "generacion"
      label: esConvocatoriaFutura ? "Convocatoria" : "Generación",
      generacion: conv.ciclo,
      descripcion: `Inicia: ${conv.fecha_inicio}`, // Puedes ajustar la descripción según tu preferencia
      onClick: () => navigate(esConvocatoriaFutura ? "/convocatoria" : "/ciclo"),
      onContact: esConvocatoriaFutura ? undefined : () => navigate("/ciclo?tab=Alumnos")
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
    </LayoutCoordinacion>
  );
};

export default InicioCoord;
