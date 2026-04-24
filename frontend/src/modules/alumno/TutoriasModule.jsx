import React, { useState, useEffect, useRef } from 'react';
import { Search, Upload, FileText } from 'lucide-react';

export default function TutoriasModule() {
    const [archivo, setArchivo] = useState(null);
    const [reportes, setReportes] = useState([]);
    const [cargando, setCargando] = useState(false);
    const inputFileRef = useRef(null);

    const obtenerArchivos = async () => {
        setCargando(true);
        try {
            const res = await fetch("http://localhost:8000/api/tutorias/archivos");
            const data = await res.json();
            setReportes(data);
        } catch (error) { console.error(error); }
        finally { setCargando(false); }
    };

    useEffect(() => { obtenerArchivos(); }, []);

    const subirArchivo = async () => {
        if (!archivo) return;
        const formData = new FormData();
        formData.append("archivo", archivo);
        try {
            await fetch("http://localhost:8000/api/tutorias/upload", { method: "POST", body: formData });
            setArchivo(null);
            obtenerArchivos();
        } catch (error) { console.error(error); }
    };

    return (
        <main className="space-y-12">
            <h1 className="text-2xl font-bold text-stone-800">Tutorías</h1>
            
            {/* Sección de Carga */}
            <div className="bg-[#EBE3D5] p-8 rounded-[40px] max-w-3xl shadow-sm border border-stone-200">
                <h2 className="text-xl font-semibold mb-4 text-stone-700">Avance de Tutorías</h2>
                
                
                <input type="file" accept=".pdf" ref={inputFileRef} className="hidden" onChange={(e) => setArchivo(e.target.files[0])} />
                
                <div className="bg-white border border-stone-300 h-10 rounded-xl mb-6 flex items-center px-4 text-sm text-stone-600 shadow-inner">
                    {archivo ? archivo.name : "Ningún archivo seleccionado"}
                </div>
                
                <div className="flex gap-4">
                    <button onClick={() => inputFileRef.current.click()} className="flex items-center gap-2 px-5 py-2.5 bg-[#C9B29B] text-stone-800 rounded-xl text-sm font-semibold hover:bg-[#bda58d] transition-colors shadow-sm">
                        <Search size={18} /> Seleccionar
                    </button>
                    <button onClick={subirArchivo} className="flex items-center gap-2 px-5 py-2.5 bg-[#C9B29B] text-stone-800 rounded-xl text-sm font-semibold shadow-md hover:bg-[#bda58d] transition-all">
                        <Upload size={18} /> Subir 
                    </button>
                </div>
            </div>

            {/* Historial de Reportes */}
            <div className="bg-[#EBE3D5] p-8 rounded-[40px] shadow-sm border border-stone-200">
                <h2 className="text-xl font-semibold mb-6 text-stone-700 border-b border-stone-300 pb-2">Archivos de Reportes</h2>
                <div className="bg-white/50 rounded-[30px] p-10 flex gap-12 justify-start items-center flex-wrap min-h-[200px]">
                    {cargando ? (
                        <p className="text-stone-500 animate-pulse">Cargando...</p>
                    ) : reportes.length === 0 ? (
                        <p className="text-sm italic text-stone-500">No hay reportes registrados.</p>
                    ) : (
                        reportes.map((archivo, index) => (
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
        <a href={url} target="_blank" rel="noopener noreferrer" 
           className="group flex flex-col items-center gap-2 w-24 p-3 rounded-2xl hover:bg-white transition-all shadow-none hover:shadow-md">
            <FileText size={60} className="text-stone-600 group-hover:text-amber-700" strokeWidth={1.5} />
            <span className="text-[10px] font-bold text-center uppercase text-stone-500">{displayName}</span>
        </a>
    );
}
    );
}
