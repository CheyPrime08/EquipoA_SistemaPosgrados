import React, { useState, useEffect, useRef } from 'react';
import { Search, Upload, FileText } from 'lucide-react';

export default function DocumentosModule() {
    const [archivoAcademico, setArchivoAcademico] = useState(null);
    const [archivoPersonal, setArchivoPersonal] = useState(null);
    const [documentos, setDocumentos] = useState([]);
    const inputAcademicoRef = useRef(null);
    const inputPersonalRef = useRef(null);

    const obtenerDocumentos = async () => {
        try {
            const res = await fetch("http://localhost:8000/api/documentos/archivos");
            const data = await res.json();
            setDocumentos(data);
        } catch (error) { console.error(error); }
    };

    useEffect(() => { obtenerDocumentos(); }, []);

    const subirArchivo = async (tipo) => {
        const archivo = tipo === 'Academico' ? archivoAcademico : archivoPersonal;
        if (!archivo) return;
        const formData = new FormData();
        formData.append("archivo", archivo);
        formData.append("tipo", tipo);
        try {
            await fetch("http://localhost:8000/api/documentos/upload", { method: "POST", body: formData });
            tipo === 'Academico' ? setArchivoAcademico(null) : setArchivoPersonal(null);
            obtenerDocumentos();
        } catch (error) { console.error(error); }
    };

    return (
        <main className="flex-1 space-y-12">
            <h1 className="text-2xl font-bold text-stone-800">Documentos</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <DocBox 
                    title="Documentos académicos" 
                    file={archivoAcademico} 
                    inputRef={inputAcademicoRef} 
                    onSelect={(e) => setArchivoAcademico(e.target.files[0])} 
                    onUpload={() => subirArchivo('Academico')} 
                />
                <DocBox 
                    title="Documentos personales" 
                    file={archivoPersonal} 
                    inputRef={inputPersonalRef} 
                    onSelect={(e) => setArchivoPersonal(e.target.files[0])} 
                    onUpload={() => subirArchivo('Personal')} 
                />
            </div>

            <div className="bg-[#EBE3D5] p-8 rounded-[40px] shadow-sm">
                <h2 className="text-xl font-semibold mb-6 text-stone-700 border-b border-stone-300 pb-2">
                    Historial de documentos
                </h2>
                <div className="bg-white/50 rounded-[30px] p-10 flex gap-12 justify-start items-center flex-wrap">
                    {documentos.length === 0 ? (
                        <p className="text-stone-500 italic text-sm">No hay reportes registrados.</p>
                    ) : (
                        documentos.map((doc, i) => (
                            <FileIcon key={i} label={doc.nombre_archivo} url={doc.url_descarga} />
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}

// Sub-componentes internos del módulo
function DocBox({ title, file, inputRef, onSelect, onUpload }) {
    return (
        <div className="bg-[#EBE3D5] p-8 rounded-[40px] shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-stone-700">{title}</h2>
            
    
            <input type="file" accept=".pdf" ref={inputRef} className="hidden" onChange={onSelect} />
            
            <div className="bg-white border border-stone-400 h-10 rounded-xl mb-6 flex items-center px-4 text-sm text-stone-600">
                {file ? file.name : "Ningún archivo seleccionado"}
            </div>
            <div className="flex gap-4">
                <button onClick={() => inputRef.current.click()} className="flex-1 py-2.5 bg-[#C9B29B] rounded-xl text-sm font-semibold hover:bg-[#bda58d] flex items-center justify-center gap-2">
                    <Search size={18}/> Seleccionar
                </button>
                <button onClick={onUpload} className="flex-1 py-2.5 bg-[#C9B29B] text-stone-800 rounded-xl text-sm font-semibold shadow-md hover:bg-[#bda58d] transition-colors flex items-center justify-center gap-2">
                    <Upload size={18}/> Subir
                </button>
            </div>
        </div>
    );
}

function FileIcon({ label, url }) {
    return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 w-28 hover:scale-105 transition-transform">
            <FileText size={50} className="text-stone-700" strokeWidth={1.5} />
            <span className="text-[10px] font-bold text-center uppercase break-all">{label}</span>
        </a>
    );
}
