import React, { useState } from 'react';

const TesisManager = () => {
  const [theses, setTheses] = useState([
    { id: 1, student: 'Juan Carlos', code: '219583058', title: 'Inteligencia Artificial en Medicina', status: true },
    { id: 2, student: 'Gerardo', code: '000000000', title: 'Desarrollo web con React', status: false },
    { id: 3, student: 'Diego Josuan', code: '111111111', title: 'Ciberseguridad en IoT', status: true },
    { id: 4, student: 'Viviana', code: '222222222', title: 'Machine Learning para finanzas', status: false },
    { id: 5, student: 'Sergio', code: '333333333', title: 'Postgrades software', status: false },
    { id: 6, student: 'Claudia', code: '444444444', title: 'Ux Desing', status: true },
  ]);

  const handleToggleStatus = (id) => {
    const updatedTheses = theses.map((thesis) => {
      if (thesis.id === id) {
        return { ...thesis, status: !thesis.status };
      }
      return thesis;
    });
    setTheses(updatedTheses);
  };

  return (
    <div className="m-8 w-full max-w-5xl mx-auto text-gray-800">
      
      <h1 className="text-2xl font-normal mb-6 text-gray-900">Tesis</h1>

      {/* Tarjeta principal */}
      <div className="bg-[#f9f8f6] rounded-xl p-8 shadow-xl border border-[#e5e0d8]">
        
        {/* Cabecera y buscador */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-normal text-gray-800">Gestion de tesis</h2>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Buscar alumno..." 
              className="pl-4 pr-10 py-1.5 border border-[#d9cfc7] rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-[#c9b59c] w-48 bg-white"
            />
            <svg className="w-4 h-4 absolute right-3 top-2 text-[#c9b59c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>

        {/* CONTENEDOR DE LA TABLA COMPLETA */}
        <div className="border border-[#d9cfc7] rounded-lg shadow-sm bg-white overflow-hidden">
          
          {/*fija (fecha limite)*/}
          <div className="bg-[#efe9e3] px-6 py-4 flex justify-between items-center border-b border-[#d9cfc7]">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Fecha limite</label>
              <div className="bg-white rounded-md px-3 py-1.5 flex items-center gap-3 w-max border border-[#d9cfc7]">
                <span className="text-sm text-gray-700">17 Mar 2026</span>
                <svg className="w-4 h-4 text-[#c9b59c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
            </div>
            <button className="text-gray-500 hover:text-[#c9b59c] transition-colors font-bold tracking-widest leading-none">
              ...
            </button>
          </div>
          {/* zona scroll variable */}
          <div className="max-h-[400px] overflow-y-auto bg-white">
            {theses.map((thesis) => (
              <div 
                key={thesis.id} 
                className="grid grid-cols-[3rem_8rem_1fr_10rem_2rem] gap-4 items-center px-6 py-5 border-b border-[#d9cfc7] last:border-b-0 hover:bg-[#f9f8f6] transition-colors"
              >
                {/* Icono */}
                <div className="w-8 h-8 rounded-full bg-[#f9f8f6] flex items-center justify-center border border-[#d9cfc7] text-[#c9b59c]">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                  </svg>
                </div>

                {/* Info del alumno */}
                <div className="flex flex-col">
                  <span className="text-sm text-gray-800">{thesis.student}</span>
                  <span className="text-sm text-gray-500">{thesis.code}</span>
                </div>

                {/* Título de la tesis */}
                <div className="text-sm text-gray-700 font-medium truncate pr-4">
                  {thesis.title}
                </div>

                {/* Toggle Status */}
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-800">estado</span>
                    <span className="text-xs text-[#c9b59c]">
                      {thesis.status ? "revisado" : "pendiente"}
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer ml-2">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={thesis.status} 
                      onChange={() => handleToggleStatus(thesis.id)} 
                    />
                    <div className="w-10 h-5 bg-[#d9cfc7] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#d9cfc7] after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#c9b59c]"></div>
                  </label>
                </div>

                {/* Opciones */}
                <div className="text-right">
                  <button className="text-gray-400 hover:text-[#c9b59c] transition-colors font-bold tracking-widest leading-none">
                    ...
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default TesisManager;