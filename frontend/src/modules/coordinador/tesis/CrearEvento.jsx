import React, { useState } from 'react';
import { X, AlignLeft, Paperclip, Plus, Calendar, Users, Award, Tag, Check } from 'lucide-react';
import GuiaEvaluacion from './GuiaEvaluacion';

const CrearEvento = ({ onBack }) => {
  const [mostrandoGuia, setMostrandoGuia] = useState(false);
  const [guiaGuardada, setGuiaGuardada] = useState(null);

  const handleSaveGuia = (criterios) => {
    setGuiaGuardada(criterios);
    setMostrandoGuia(false);
  };

  if (mostrandoGuia) {
    return <GuiaEvaluacion onBack={() => setMostrandoGuia(false)} onSave={handleSaveGuia} />;
  }

  return (
    <div className="bg-[#fcfaf8] min-h-screen">
      {/* Header del Formulario */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6 bg-white px-6 py-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
          <h2 className="text-lg font-medium text-gray-700">Nueva Tarea</h2>
        </div>
        <div className="flex gap-3">
            <button 
                onClick={onBack}
                className="text-[#8a7a63] px-6 py-2 rounded-md font-semibold hover:bg-[#f5f1ed] transition-colors"
            >
                Cancelar
            </button>
            <button className="bg-[#c5b49a] text-white px-8 py-2 rounded-md font-semibold hover:bg-[#b3a288] transition-colors shadow-sm">
                Asignar
            </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto px-6 pb-12">
        {/* Columna Izquierda: Contenido Principal */}
        <div className="flex-1 space-y-6">
          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            {/* Input de Título */}
            <div className="relative mb-8">
              <input 
                type="text" 
                placeholder="Título de la tarea" 
                className="w-full text-2xl border-b-2 border-gray-100 focus:border-[#c5b49a] outline-none py-3 transition-colors bg-transparent font-medium"
              />
            </div>

            {/* Input de Instrucciones */}
            <div className="relative mb-8 text-gray-400 focus-within:text-[#c5b49a]">
              <div className="flex items-start gap-3 bg-[#f9f9f9] p-5 rounded-lg border border-transparent focus-within:border-[#c5b49a]/30 transition-all">
                <AlignLeft size={22} className="mt-1" />
                <textarea 
                  placeholder="Instrucciones (opcional)" 
                  rows="8"
                  className="w-full bg-transparent outline-none text-gray-700 resize-none text-base"
                />
              </div>
            </div>

            {/* Botones de Adjuntos */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button className="flex items-center gap-2 border border-gray-200 px-5 py-2.5 rounded-lg text-[#8a7a63] hover:bg-[#f5f1ed] hover:border-[#c5b49a]/50 transition-all text-sm font-semibold bg-white shadow-sm">
                <Paperclip size={18} />
                Adjuntar archivo
              </button>
              <button className="flex items-center gap-2 border border-gray-200 px-5 py-2.5 rounded-lg text-[#8a7a63] hover:bg-[#f5f1ed] hover:border-[#c5b49a]/50 transition-all text-sm font-semibold bg-white shadow-sm">
                <Plus size={18} />
                Crear nuevo
              </button>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Configuración / Sidebar */}
        <div className="w-full lg:w-80 space-y-6">
          {/* Card de Configuración */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-8 text-sm sticky top-28">
            
            {/* Para (Alumnos) */}
            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase flex items-center gap-2 mb-3 tracking-wider">
                <Users size={14} className="text-[#c5b49a]" /> Para
              </label>
              <select className="w-full bg-[#f8f9fa] p-3 rounded-lg border border-gray-100 outline-none focus:border-[#c5b49a]/50 transition-all cursor-pointer">
                <option>Todos los alumnos</option>
                <option>Alumnos de Maestría</option>
                <option>Alumnos de Doctorado</option>
              </select>
            </div>

            {/* Puntos */}
            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase flex items-center gap-2 mb-3 tracking-wider">
                <Award size={14} className="text-[#c5b49a]" /> Calificación
              </label>
              <input 
                type="number" 
                defaultValue="100" 
                className="w-full bg-[#f8f9fa] p-3 rounded-lg border border-gray-100 outline-none focus:border-[#c5b49a]/50 transition-all" 
              />
            </div>

            {/* Fecha de Entrega */}
            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase flex items-center gap-2 mb-3 tracking-wider">
                <Calendar size={14} className="text-[#c5b49a]" /> Fecha límite
              </label>
              <input 
                type="date" 
                className="w-full bg-[#f8f9fa] p-3 rounded-lg border border-gray-100 outline-none focus:border-[#c5b49a]/50 transition-all text-gray-600 cursor-pointer" 
              />
            </div>

            {/* Tema */}
            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase flex items-center gap-2 mb-3 tracking-wider">
                <Tag size={14} className="text-[#c5b49a]" /> Categoría / Tema
              </label>
              <select className="w-full bg-[#f8f9fa] p-3 rounded-lg border border-gray-100 outline-none focus:border-[#c5b49a]/50 transition-all cursor-pointer">
                <option>Sin tema</option>
                <option>Capítulo 1: Introducción</option>
                <option>Capítulo 2: Marco Teórico</option>
                <option>Capítulo 3: Metodología</option>
              </select>
            </div>

            <hr className="border-gray-50" />

            {/* Rúbrica */}
            <button 
              onClick={() => setMostrandoGuia(true)}
              className={`w-full flex items-center justify-center gap-2 p-3 rounded-xl transition-all border border-dashed font-semibold group ${
                guiaGuardada 
                ? 'bg-[#f5f1ed] border-[#c5b49a] text-[#8a7a63]' 
                : 'bg-white border-[#c5b49a] text-[#8a7a63] hover:bg-[#f5f1ed]'
              }`}
            >
              {guiaGuardada ? (
                <>
                  <Check size={18} className="text-green-600" />
                  <span>Guía de Evaluación Guardada</span>
                </>
              ) : (
                <>
                  <Plus size={18} className="group-hover:scale-110 transition-transform" />
                  <span>Agregar Guía de Evaluación</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearEvento;
