import React, { useState, useEffect } from 'react';
import { Search, Upload, FileText } from 'lucide-react';

export default function TesisModule() {
    const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);
    const [listaArchivos, setListaArchivos] = useState([]);
    const [cargando, setCargando] = useState(false);

    useEffect(() => { obtenerArchivos(); }, []);

    const obtenerArchivos = async () => {
        setCargando(true);
        try {
            const respuesta = await fetch("http://127.0.0.1:8000/api/tesis/archivos");
            const data = await respuesta.json();
            setListaArchivos(data);
        } catch (error) { console.error("Error:", error); }
        finally { setCargando(false); }
    };

    const handleSubirAvance = async () => {
        if (!archivoSeleccionado) return;
        const formData = new FormData();
        formData.append("archivo", archivoSeleccionado);
        try {
            const respuesta = await fetch("http://127.0.0.1:8000/api/tesis/upload", { 
                method: "POST", 
                body: formData 
            });
            if (respuesta.ok) { 
                setArchivoSeleccionado(null); 
                obtenerArchivos(); 
            }
        } catch (error) { console.error(error); }
    };

    return (
        <main className="space-y-12">
            <h1 className="text-2xl font-bold text-stone-800">Tesis</h1>
            
            {/* Cuadro de Carga */}
            <div className="bg-[#EBE3D5] p-8 rounded-[40px] max-w-3xl shadow-sm border border-stone-200">
                <h2 className="text-xl font-semibold mb-4 text-stone-700">Avance de Tesis</h2>
                <div className="bg-white border border-stone-300 h-10 rounded-xl mb-6 w-full flex items-center px-4 text-sm text-stone-600">
                    {archivoSeleccionado ? archivoSeleccionado.name : "Ningún archivo seleccionado"}
                </div>
                <div className="flex gap-4">
                    <label className="flex items-center gap-2 px-5 py-2.5 bg-[#C9B29B] text-stone-800 rounded-xl text-sm font-semibold cursor-pointer shadow-sm hover:bg-[#bda58d] transition-colors">
                        <Search size={18} /> Seleccionar
                        <input type="file" accept=".pdf" className="hidden" onChange={(e) => setArchivoSeleccionado(e.target.files[0])} />
                    </label>
                    <button onClick={handleSubirAvance} className="flex items-center gap-2 px-5 py-2.5 bg-[#C9B29B] text-stone-800 rounded-xl text-sm font-semibold shadow-md hover:bg-[#bda58d] transition-all">
                        <Upload size={18} /> Subir
                    </button>
                </div>
            </div>

            {/* Historial */}
            <div className="bg-[#EBE3D5] p-8 rounded-[40px] shadow-sm border border-stone-200">
                <h2 className="text-xl font-semibold mb-6 text-stone-700 border-b border-stone-300 pb-2">Historial de Tesis</h2>
                <div className="bg-white/50 rounded-[30px] p-10 flex gap-12 justify-start items-center flex-wrap min-h-[200px]">
                    {cargando ? (
                        <p className="animate-pulse text-stone-500">Cargando archivos...</p>
                    ) : listaArchivos.length === 0 ? (
                        <p className="text-sm italic text-stone-500">No hay archivos registrados.</p>
                    ) : (
                        listaArchivos.map((archivo, index) => (
                            <FileIcon key={index} label={archivo.nombre_archivo} url={archivo.url_descarga} />
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}

function FileIcon({ label, url }) {
    const displayName = label.length > 15 ? label.substring(0, 12) + "..." : label;
    return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2 w-24 p-3 rounded-2xl hover:bg-white transition-all">
            <FileText size={60} className="text-stone-600 group-hover:text-stone-900" strokeWidth={1.5} />
            <span className="text-[10px] font-bold text-center uppercase text-stone-500">{displayName}</span>
        </a>
    );
}