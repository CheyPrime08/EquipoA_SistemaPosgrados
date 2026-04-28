import React, { useState } from 'react';
import { X, Plus, Trash2, ChevronDown, ChevronUp, AlignLeft } from 'lucide-react';

const GuiaEvaluacion = ({ onBack, onSave }) => {
  const [criterios, setCriterios] = useState([
    {
      id: 1,
      titulo: '',
      descripcion: '',
      niveles: [
        { id: 1, puntos: 0, titulo: '', descripcion: '' }
      ]
    }
  ]);

  const agregarCriterio = () => {
    const nuevoCriterio = {
      id: Date.now(),
      titulo: '',
      descripcion: '',
      niveles: [{ id: Date.now() + 1, puntos: 0, titulo: '', descripcion: '' }]
    };
    setCriterios([...criterios, nuevoCriterio]);
  };

  const eliminarCriterio = (id) => {
    setCriterios(criterios.filter(c => c.id !== id));
  };

  const agregarNivel = (criterioId) => {
    setCriterios(criterios.map(c => {
      if (c.id === criterioId) {
        return {
          ...c,
          niveles: [...c.niveles, { id: Date.now(), puntos: 0, titulo: '', descripcion: '' }]
        };
      }
      return c;
    }));
  };

  return (
    <div className="bg-[#fcfaf8] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6 bg-white px-6 py-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-colors">
            <X size={24} />
          </button>
          <h2 className="text-lg font-medium text-gray-700">Guía de evaluación</h2>
        </div>
        <div className="flex gap-3">
          <button onClick={onBack} className="text-[#8a7a63] px-6 py-2 rounded-md font-semibold hover:bg-[#f5f1ed] transition-colors">
            Cancelar
          </button>
          <button onClick={() => onSave(criterios)} className="bg-[#c5b49a] text-white px-8 py-2 rounded-md font-semibold hover:bg-[#b3a288] transition-colors shadow-sm">
            Guardar
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-20 space-y-8">
        {criterios.map((criterio, index) => (
          <div key={criterio.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Header del Criterio */}
            <div className="bg-[#f8f9fa] p-4 border-b border-gray-100 flex justify-between items-center">
              <span className="text-xs font-bold text-[#8a7a63] uppercase tracking-widest">Criterio {index + 1}</span>
              <button onClick={() => eliminarCriterio(criterio.id)} className="text-gray-400 hover:text-red-500 p-1 rounded-full transition-colors">
                <Trash2 size={18} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Título y Descripción del Criterio */}
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Título del criterio (obligatorio)" 
                  className="w-full text-lg border-b border-gray-100 focus:border-[#c5b49a] outline-none py-2 transition-colors font-medium"
                />
                <textarea 
                  placeholder="Descripción del criterio" 
                  rows="2"
                  className="w-full text-sm text-gray-600 border-b border-gray-100 focus:border-[#c5b49a] outline-none py-2 resize-none"
                />
              </div>

              {/* Niveles del Criterio */}
              <div className="space-y-4">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Niveles de puntuación</label>
                <div className="flex flex-wrap gap-4 items-start">
                  {criterio.niveles.map((nivel) => (
                    <div key={nivel.id} className="flex-1 min-w-[200px] border border-gray-100 rounded-lg p-4 bg-[#fcfaf8] relative group">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <input type="number" placeholder="Pts" className="w-16 p-2 rounded border border-gray-200 text-center text-sm font-bold focus:border-[#c5b49a] outline-none" />
                          <input type="text" placeholder="Título del nivel" className="flex-1 p-2 rounded border border-gray-200 text-sm focus:border-[#c5b49a] outline-none" />
                        </div>
                        <textarea placeholder="Descripción" rows="3" className="w-full p-2 rounded border border-gray-200 text-xs text-gray-500 focus:border-[#c5b49a] outline-none resize-none bg-white" />
                      </div>
                    </div>
                  ))}
                  
                  {/* Botón Añadir Nivel */}
                  <button 
                    onClick={() => agregarNivel(criterio.id)}
                    className="h-full min-h-[140px] flex-1 min-w-[100px] border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-[#c5b49a] hover:text-[#8a7a63] transition-all group"
                  >
                    <Plus size={32} className="group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold mt-2 uppercase">Añadir nivel</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Botón Añadir Criterio */}
        <button 
          onClick={agregarCriterio}
          className="w-full py-4 border-2 border-dashed border-[#c5b49a]/30 rounded-xl flex items-center justify-center gap-2 text-[#8a7a63] font-bold hover:bg-[#f5f1ed] transition-all uppercase tracking-widest text-sm"
        >
          <Plus size={20} />
          Añadir un criterio
        </button>
      </div>
    </div>
  );
};

export default GuiaEvaluacion;
