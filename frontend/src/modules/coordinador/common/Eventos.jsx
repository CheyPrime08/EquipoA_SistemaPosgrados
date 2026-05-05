import React, { useState } from "react";
import { useEffect } from "react";
import { getConvocatorias, createConvocatoria } from "@/api/convocatorias.api";
import { FileText, Calendar, MoreVertical, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModalEventos } from "../eventos/ModalEventos";
import { AddEventos } from "../eventos/AddEventos";
import { EventosAside } from "../eventos/EventosAside";

const Eventos = ({ search = "" }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [tareaEnEdicion, setTareaEnEdicion] = useState(null);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);

  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    const fetchConvocatorias = async () => {
      try {
        const data = await getConvocatorias();
        setTareas(
          data.map((item) => ({
            ...item,
            id: item.id ?? item._id ?? Math.random(),
            fecha: item.fecha ?? item.entrega ?? "",
          })),
        );
      } catch (error) {
        console.error("Error al cargar convocatorias:", error);
      }
    };
    fetchConvocatorias();
  }, []);

  const filteredTareas = React.useMemo(() => {
    return tareas.filter((tarea) =>
      tarea.titulo.toLowerCase().includes(search.toLowerCase()),
    );
  }, [tareas, search]);

  const handleEliminar = (id) => {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
    if (eventoSeleccionado?.id === id) setEventoSeleccionado(null);
  };

  const handleEditar = (tarea) => {
    setTareaEnEdicion(tarea);
    setModalOpen(true);
  };

  const handleAbrirNuevo = () => {
    setTareaEnEdicion(null);
    setModalOpen(true);
  };

  const handleGuardar = async (formData) => {
    if (!formData?.titulo) return;

    if (tareaEnEdicion) {
      const tareaActualizada = {
        ...tareaEnEdicion,
        ...formData,
        fecha: formData.entrega,
        titulo: formData.titulo,
      };
      setTareas(tareas.map((t) => t.id === tareaEnEdicion.id ? tareaActualizada : t));
      if (eventoSeleccionado?.id === tareaEnEdicion.id) setEventoSeleccionado(tareaActualizada);
    } else {
      const nuevaTarea = {
        titulo: formData.titulo,
        entrega: formData.entrega,
        fecha: formData.entrega,
        estado: formData.entrega ? "Programada" : "Borrador",
        instrucciones: formData.instrucciones,
        para: formData.para,
        tema: formData.tema,
      };

      try {
        const res = await createConvocatoria(nuevaTarea);
        const createdId = res?.data?.id ?? res?.data?._id ?? res?.id ?? res?._id;
        setTareas([{ ...nuevaTarea, id: createdId ?? Date.now() }, ...tareas]);
      } catch (error) {
        console.error("Error al guardar:", error);
      }
    }
  };

  return (
    <div className="flex h-full overflow-hidden w-full">
      <div className={`flex-1 px-6 py-2 max-w-6xl mx-auto relative overflow-y-auto custom-scrollbar transition-all duration-300 ${eventoSeleccionado ? "pr-4" : ""}`}>
        <div className="fixed bottom-15 right-15 z-50">
          <AddEventos onClick={handleAbrirNuevo} label="Crear evento" />
        </div>

        <ModalEventos
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleGuardar}
          tareaEnEdicion={tareaEnEdicion}
        />

        <div className="space-y-4">
          {filteredTareas.map((tarea) => (
            <div
              key={tarea.id}
              onClick={() => setEventoSeleccionado(tarea)}
              className={`group flex items-center justify-between p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer ${
                eventoSeleccionado?.id === tarea.id 
                ? "border-[#c5b49a] ring-1 ring-[#c5b49a]/30" 
                : "border-gray-200 hover:border-[#c5b49a]/30"
              }`}
            >
              <div className="flex items-center gap-5">
                <div className={`p-3 rounded-full transition-colors ${
                  eventoSeleccionado?.id === tarea.id 
                  ? "bg-[#c5b49a] text-white" 
                  : "bg-[#f5f1ed] text-[#8a7a63] group-hover:bg-[#c5b49a] group-hover:text-white"
                }`}>
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className={`font-semibold transition-colors ${
                    eventoSeleccionado?.id === tarea.id ? "text-[#8a7a63]" : "text-gray-900 group-hover:text-[#8a7a63]"
                  }`}>
                    {tarea.titulo}
                  </h3>
                  {tarea.fecha && (
                    <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-0.5">
                      <Calendar size={14} className="text-gray-400" />
                      Entrega: {tarea.fecha}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-6">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 text-gray-400 hover:text-[#8a7a63] hover:bg-gray-100 rounded-full transition-colors outline-none"
                    >
                      <MoreVertical size={20} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-40 bg-white border border-gray-100 shadow-lg rounded-xl p-1"
                  >
                    <DropdownMenuItem
                      className="flex items-center gap-2 text-gray-700 focus:bg-[#f5f1ed] focus:text-[#8a7a63] cursor-pointer py-2.5 px-3 rounded-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditar(tarea);
                      }}
                    >
                      <Pencil size={16} />
                      <span className="text-sm font-medium">Editar</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex items-center gap-2 text-red-600 focus:bg-red-50 focus:text-red-700 cursor-pointer py-2.5 px-3 rounded-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEliminar(tarea.id);
                      }}
                    >
                      <Trash2 size={16} />
                      <span className="text-sm font-medium">Eliminar</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
          {filteredTareas.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <p className="text-gray-400">No se encontraron eventos</p>
            </div>
          )}
        </div>
      </div>

      {eventoSeleccionado && (
        <EventosAside 
          event={eventoSeleccionado} 
          onClose={() => setEventoSeleccionado(null)} 
        />
      )}
    </div>
  );
};

export default Eventos;
