import React, { useState, useEffect, useRef } from 'react';
import leonLogo from '@/components/ui/leon-logo.png';
import { Users, ChevronDown, FileText, Search, Upload, GraduationCap, LogOut } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function Documentos() {
    const navigate = useNavigate();

    // Estados para cada tipo de archivo
    const [archivoAcademico, setArchivoAcademico] = useState(null);
    const [archivoPersonal, setArchivoPersonal] = useState(null);
    const [documentos, setDocumentos] = useState([]);

   
    const inputAcademicoRef = useRef(null);
    const inputPersonalRef = useRef(null);

    // Funciones de selección
    const seleccionarArchivoAcademico = (e) => setArchivoAcademico(e.target.files[0]);
    const seleccionarArchivoPersonal = (e) => setArchivoPersonal(e.target.files[0]);

    // Funcion general para subir archivo (recibe el tipo como parámetro)
    const subirArchivo = async (tipo) => {
        const archivo = tipo === 'Academico' ? archivoAcademico : archivoPersonal;

        if (!archivo) {
            alert(`Selecciona un documento ${tipo.toLowerCase()} primero`);
            return;
        }

        const formData = new FormData();
        formData.append("archivo", archivo);
        formData.append("tipo", tipo); // Le decimos al backend qué tipo de doc es

        try {
            await fetch("http://localhost:8000/api/documentos/upload", {
                method: "POST",
                body: formData
            });

            alert(`Documento ${tipo.toLowerCase()} subido correctamente`);
            
            // Limpiamos el input
            if (tipo === 'Academico') setArchivoAcademico(null);
            else setArchivoPersonal(null);

            obtenerDocumentos(); // Refrescamos la lista

        } catch (error) {
            console.error(error);
        }
    };

    // Funcion para obtener todos los documentos
    const obtenerDocumentos = async () => {
        try {
            const res = await fetch("http://localhost:8000/api/documentos/archivos");
            const data = await res.json();
            setDocumentos(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        obtenerDocumentos();
    }, []);

    // Separamos los documentos por tipo para mostrarlos en sus respectivos cuadritos blancos
    const docsAcademicos = documentos.filter(doc => doc.tipo === 'Academico');
    const docsPersonales = documentos.filter(doc => doc.tipo === 'Personal');

    return (
        <div className="flex h-screen bg-[#F2EDE4] text-stone-800 font-sans">
            {/* Sidebar */}
            <aside className="w-64 border-r border-stone-200 flex flex-col justify-between py-8 px-6 bg-[#F2EDE4]">
                <div>
                    <img src={leonLogo} className="w-20 h-20 mb-12" alt="Logo" />
                    <nav className="space-y-4">
                        <NavItem icon={<GraduationCap size={20} />} label="Tesis" to="/tesis" />
                        <NavItem icon={<FileText size={20} />} label="Documentos" active to="/documentos" />
                        <NavItem icon={<Users size={18} />} label="Tutorías" to="/tutorias" />
                    </nav>
                </div>
                <div>
                    <NavItem icon={<LogOut size={18} />} label="Cerrar Sesión" to="/login" />
                </div>
            </aside>

            {/* Contenido Principal */}
            <main className="flex-1 flex flex-col overflow-y-auto">
                <header className="h-16 px-8 flex items-center justify-between relative border-b border-stone-200 flex-shrink-0">
                    <span className="font-semibold text-stone-600 uppercase tracking-wider text-sm">
                        Sistema Gestión Posgrados
                    </span>
                    <div className="absolute left-1/2 -translate-x-1/2 bg-white border border-stone-300 rounded-full px-4 py-1 flex items-center gap-2 text-sm shadow-sm">
                        Ciclo Escolar 2026-A <ChevronDown size={14} />
                    </div>
                </header>

                <div className="p-10 space-y-12">
                    <h1 className="text-2xl font-bold text-stone-800">Documentos</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* Sección Documentos Académicos */}
                        <div className="bg-[#EBE3D5] p-8 rounded-[40px] flex flex-col">
                            <h2 className="text-xl font-semibold mb-4 text-stone-700">Documentos académicos</h2>
                            
                            <input type="file" ref={inputAcademicoRef} style={{ display: "none" }} onChange={seleccionarArchivoAcademico} />
                            
                            <div className="bg-white border border-stone-400 h-10 rounded-md mb-6 w-full flex items-center px-4 text-sm truncate">
                                {archivoAcademico ? archivoAcademico.name : "Ningún archivo seleccionado"}
                            </div>
                            
                            <div className="flex gap-4 mb-6">
                                <button onClick={() => inputAcademicoRef.current.click()} className="flex items-center gap-2 px-4 py-2 bg-[#C9B29B] text-stone-800 rounded-xl text-sm font-medium shadow-sm hover:bg-[#bda58d]">
                                    <Search size={16} /> Selección de archivos
                                </button>
                                <button onClick={() => subirArchivo('Academico')} className="flex items-center gap-2 px-4 py-2 bg-[#C9B29B] text-stone-800 rounded-xl text-sm font-medium shadow-sm hover:bg-[#bda58d]">
                                    <Upload size={16} /> Subir archivo
                                </button>
                            </div>

                            {/* Historial rápido */}
                            <div className="bg-white rounded-[30px] h-40 border border-stone-300 p-4 overflow-y-auto flex gap-4 flex-wrap">
                                {docsAcademicos.map((doc, idx) => (
                                    <MiniFileIcon key={idx} label={doc.nombre_archivo} url={doc.url_descarga} />
                                ))}
                            </div>
                        </div>

                        {/* Seccion Documentos Personales */}
                        <div className="bg-[#EBE3D5] p-8 rounded-[40px] flex flex-col">
                            <h2 className="text-xl font-semibold mb-4 text-stone-700">Documentos personales</h2>
                            
                            <input type="file" ref={inputPersonalRef} style={{ display: "none" }} onChange={seleccionarArchivoPersonal} />
                            
                            <div className="bg-white border border-stone-400 h-10 rounded-md mb-6 w-full flex items-center px-4 text-sm truncate">
                                {archivoPersonal ? archivoPersonal.name : "Ningún archivo seleccionado"}
                            </div>
                            
                            <div className="flex gap-4 mb-6">
                                <button onClick={() => inputPersonalRef.current.click()} className="flex items-center gap-2 px-4 py-2 bg-[#C9B29B] text-stone-800 rounded-xl text-sm font-medium shadow-sm hover:bg-[#bda58d]">
                                    <Search size={16} /> Selección de archivos
                                </button>
                                <button onClick={() => subirArchivo('Personal')} className="flex items-center gap-2 px-4 py-2 bg-[#C9B29B] text-stone-800 rounded-xl text-sm font-medium shadow-sm hover:bg-[#bda58d]">
                                    <Upload size={16} /> Subir archivo
                                </button>
                            </div>

                            {/* Historial rápido (Opcional) */}
                            <div className="bg-white rounded-[30px] h-40 border border-stone-300 p-4 overflow-y-auto flex gap-4 flex-wrap">
                                {docsPersonales.map((doc, idx) => (
                                    <MiniFileIcon key={idx} label={doc.nombre_archivo} url={doc.url_descarga} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sección inferior de historial completo */}
                    <div className="bg-[#EBE3D5] p-8 rounded-[40px]">
                        <h2 className="text-xl font-semibold mb-6 text-stone-700">Todos los Archivos de Documentos</h2>
                        <div className="bg-white rounded-[30px] p-8 flex gap-10 justify-start items-center flex-wrap">
                            {documentos.length > 0 ? (
                                documentos.map((archivo, index) => (
                                    <FileIcon key={index} label={archivo.nombre_archivo} url={archivo.url_descarga} tipo={archivo.tipo} />
                                ))
                            ) : (
                                <p className="text-sm text-stone-500">Aún no hay documentos subidos.</p>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

// Icono Grande 
function FileIcon({ label, url, tipo }) {
    return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 w-28 flex-shrink-0 hover:scale-105 transition-transform">
            <div className="text-stone-700">
                <FileText size={60} strokeWidth={1.5} />
            </div>
            <span className="text-[10px] font-bold text-center uppercase leading-tight whitespace-normal break-all">{label}</span>
            <span className="text-[9px] bg-stone-200 px-2 py-0.5 rounded-full text-stone-600">{tipo}</span>
        </a>
    );
}

// Icono Pequeño 
function MiniFileIcon({ label, url }) {
    return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 w-16 hover:scale-105 transition-transform">
            <div className="text-stone-600">
                <FileText size={30} strokeWidth={1.5} />
            </div>
            <span className="text-[8px] font-medium text-center leading-tight truncate w-full" title={label}>{label}</span>
        </a>
    );
}

function NavItem({ icon, label, active, to }) {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => to && navigate(to)}
            className={`flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer transition-all
            ${active ? 'bg-[#EBE3D5] shadow-sm text-stone-900 font-bold' : 'text-stone-600 hover:bg-[#EBE3D5]/50'}`}
        >
            {icon}
            <span className="text-sm">{label}</span>
        </div>
    );
}
