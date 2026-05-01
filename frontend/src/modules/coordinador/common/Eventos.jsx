import React, { useState, useEffect } from 'react';
import { Plus, FileText, Calendar, MoreVertical, Pencil, Trash2, AlignLeft, Send, Users, Tag } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CoordButton } from './CoordButton';

const Eventos = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [tareaEnEdicion, setTareaEnEdicion] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    instrucciones: '',
    para: 'Todos los alumnos',
    entrega: '',
    tema: 'Sin tema'
  });

  const [tareas, setTareas] = useState([
    { id: 1, titulo: 'Recepción de Documentos', fecha: '2026-04-21', estado: 'Asignada', instrucciones: '', para: 'Todos los alumnos', tema: 'Sin tema' },
    { id: 2, titulo: 'Entrevistas con Aspirantes', fecha: '2026-04-25', estado: 'Borrador', instrucciones: '', para: 'Todos los alumnos', tema: 'Sin tema' },
    { id: 3, titulo: 'Publicación de Resultados', fecha: '2026-04-28', estado: 'Programada', instrucciones: '', para: 'Todos los alumnos', tema: 'Sin tema' },
  ]);

  const statusBadgeStyle = "bg-[#f5f1ed] text-[#8a7a63] border border-[#c5b49a]/20";

  const handleEliminar = (id) => {
    setTareas(tareas.filter(tarea => tarea.id !== id));
  };

  const handleEditar = (tarea) => {
    setTareaEnEdicion(tarea);
    setFormData({
      titulo: tarea.titulo,
      instrucciones: tarea.instrucciones || '',
      para: tarea.para || 'Todos los alumnos',
      entrega: tarea.fecha || '',
      tema: tarea.tema || 'Sin tema'
    });
    setFormOpen(true);
  };

  const resetForm = () => {
    setTareaEnEdicion(null);
    setFormData({ titulo: '', instrucciones: '', para: 'Todos los alumnos', entrega: '', tema: 'Sin tema' });
    setFormOpen(false);
  };

  const handleGuardar = () => {
    if (!formData.titulo) return;

    if (tareaEnEdicion) {
      setTareas(tareas.map(t => t.id === tareaEnEdicion.id ? { ...t, ...formData, fecha: formData.entrega, titulo: formData.titulo } : t));
    } else {
      const nuevaTarea = {
        id: Date.now(),
        titulo: formData.titulo,
        fecha: formData.entrega,
        estado: formData.entrega ? 'Programada' : 'Borrador',
        instrucciones: formData.instrucciones,
        para: formData.para,
        tema: formData.tema
      };
      setTareas([nuevaTarea, ...tareas]);
    }
    resetForm();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Botón con Formulario Flotante */}
      <div className="flex justify-end items-center mb-8 border-b border-gray-200 pb-4">
        <DropdownMenu open={formOpen} onOpenChange={(open) => { if(!open) resetForm(); setFormOpen(open); }}>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer">
              <CoordButton className="px-5 py-2">
                <Plus size={18} />
                <span className="text-sm font-semibold text-stone-800">Crear</span>
              </CoordButton>
            </div>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent 
            align="end" 
            sideOffset={12}
            className="w-[420px] bg-white border border-gray-100 shadow-2xl rounded-2xl p-6 z-50 animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                <h4 className="text-sm font-bold text-[#8a7a63]">
                  {tareaEnEdicion ? 'Editar evento' : 'Nuevo evento'}
                </h4>
                <FileText size={16} className="text-[#c5b49a]" />
              </div>
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-400">Título</label>
                  <input 
                    type="text" 
                    value={formData.titulo}
                    onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                    placeholder="Título del evento..." 
                    className="w-full bg-[#f8f9fa] p-3 rounded-lg border border-gray-100 outline-none focus:border-[#c5b49a]/50 transition-all text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-400">Instrucciones</label>
                  <div className="flex items-start gap-2 bg-[#f8f9fa] p-3 rounded-lg border border-gray-100 focus-within:border-[#c5b49a]/50 transition-all">
                    <AlignLeft size={16} className="text-gray-400 mt-1" />
                    <textarea 
                      value={formData.instrucciones}
                      onChange={(e) => setFormData({...formData, instrucciones: e.target.value})}
                      placeholder="Instrucciones (opcional)..." 
                      rows="3"
                      className="w-full bg-transparent outline-none text-sm text-gray-700 resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-400 flex items-center gap-2">
                    <Users size={12} className="text-[#c5b49a]" /> Para
                  </label>
                  <select 
                    value={formData.para}
                    onChange={(e) => setFormData({...formData, para: e.target.value})}
                    className="w-full bg-[#f8f9fa] p-2 rounded-lg border border-gray-100 outline-none text-xs cursor-pointer"
                  >
                    <option>Todos los alumnos</option>
                    <option>Alumnos de Maestría</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-400 flex items-center gap-2">
                    <Calendar size={12} className="text-[#c5b49a]" /> Entrega
                  </label>
                  <input 
                    type="date" 
                    value={formData.entrega}
                    onChange={(e) => setFormData({...formData, entrega: e.target.value})}
                    className="w-full bg-[#f8f9fa] p-2 rounded-lg border border-gray-100 outline-none text-xs cursor-pointer" 
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-400 flex items-center gap-2">
                    <Tag size={12} className="text-[#c5b49a]" /> Tema
                  </label>
                  <select 
                    value={formData.tema}
                    onChange={(e) => setFormData({...formData, tema: e.target.value})}
                    className="w-full bg-[#f8f9fa] p-2 rounded-lg border border-gray-100 outline-none text-xs cursor-pointer"
                  >
                    <option>Sin tema</option>
                    <option>Capítulo 1</option>
                    <option>Capítulo 2</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-50">
                <CoordButton 
                  onClick={handleGuardar}
                  className="px-8 py-2.5"
                >
                  <Send size={16} />
                  <span className="text-sm font-semibold text-stone-800">
                    {tareaEnEdicion ? 'Actualizar' : 'Agendar'}
                  </span>
                </CoordButton>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-4">
        {tareas.map((tarea) => (
          <div 
            key={tarea.id} 
            className="group flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-[#c5b49a]/30 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-5">
              <div className="p-3 bg-[#f5f1ed] text-[#8a7a63] rounded-full group-hover:bg-[#c5b49a] group-hover:text-white transition-colors">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-[#8a7a63] transition-colors">{tarea.titulo}</h3>
                {tarea.estado !== 'Borrador' && (
                  <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-0.5">
                    <Calendar size={14} className="text-gray-400" />
                    {tarea.estado === 'Programada' ? 'Programado para: ' : 'Publicado el: '}
                    {tarea.fecha}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-6">
              <span className={`text-xs font-bold px-4 py-1.5 rounded-full ${statusBadgeStyle}`}>
                {tarea.estado}
              </span>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button 
                    onClick={(e) => e.stopPropagation()} 
                    className="p-2 text-gray-400 hover:text-[#8a7a63] hover:bg-gray-100 rounded-full transition-colors outline-none"
                  >
                    <MoreVertical size={20} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40 bg-white border border-gray-100 shadow-lg rounded-xl p-1">
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
        {tareas.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-400">No hay eventos asignados</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Eventos;
