import React, { useState, useEffect } from 'react';
import leonLogo from '@/components/ui/leon-logo.png';
import { Users, ChevronDown, FileText, Search, Upload, GraduationCap, LogOut } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function Tutorias() { 
    const navigate = useNavigate();
    
    // --- NUEVOS ESTADOS ---
    const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);
    const [listaArchivos, setListaArchivos] = useState([]);
    const [mensaje, setMensaje] = useState("");

    // --- CARGAR ARCHIVOS AL ENTRAR A LA PÁGINA ---
    useEffect(() => {
        obtenerArchivos();
    }, []);

    const obtenerArchivos = async () => {
        try {
            // Asegúrate de que este puerto coincida con tu backend (ej. 8000)
            const respuesta = await fetch("http://127.0.0.1:8000/api/tesis/archivos");
            const data = await respuesta.json();
            setListaArchivos(data);
        } catch (error) {
            console.error("Error al obtener archivos:", error);
        }
    };

    // --- MANEJAR SELECCIÓN DE ARCHIVO ---
    const handleSeleccionArchivo = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            setArchivoSeleccionado(file);
            setMensaje("");
        } else {
            setMensaje("Por favor, selecciona un archivo PDF válido.");
            setArchivoSeleccionado(null);
        }
    };

    // --- SUBIR EL ARCHIVO AL BACKEND ---
    const handleSubirAvance = async () => {
        if (!archivoSeleccionado) {
            setMensaje("Primero debes seleccionar un archivo.");
            return;
        }

        const formData = new FormData();
        formData.append("archivo", archivoSeleccionado);

        try {
            const respuesta = await fetch("http://127.0.0.1:8000/api/tesis/upload", {
                method: "POST",
                body: formData,
            });

            if (respuesta.ok) {
                setMensaje("¡Archivo subido con éxito!");
                setArchivoSeleccionado(null);
                obtenerArchivos(); // Recargar la lista visual
            } else {
                setMensaje("Error al subir el archivo.");
            }
        } catch (error) {
            console.error("Error en la petición:", error);
            setMensaje("Error de conexión con el servidor.");
        }
    };

    return (
        <div className="flex h-screen bg-[#F2EDE4] text-stone-800 font-sans">
            {/* Sidebar se mantiene igual */}
            <aside className="w-64 border-r border-stone-200 flex flex-col justify-between py-8 px-6 bg-[#F2EDE4]">
                <div>
                    <img src={leonLogo} className="w-20 h-20 mb-12" alt="Logo" />
                    <nav className="space-y-4">
                        <NavItem icon={<GraduationCap size={20} />} label="Tesis" active to="/tesis" />
                        <NavItem icon={<FileText size={20} />} label="Documentos" to="/documentos" />
                        <NavItem icon={<Users size={18} />} label="Tutorías" to="/tutorias" />
                    </nav>
                </div>
                <div>
                    <NavItem icon={<LogOut size={18} />} label="Cerrar Sesión" to="/login" />
                </div>
            </aside>

            <main className="flex-1 flex flex-col">
                <header className="h-16 px-8 flex items-center justify-between relative border-b border-stone-200">
                    <span className="font-semibold text-stone-600 uppercase tracking-wider text-sm">
                        Sistema Gestión Posgrados
                    </span>
                    <div className="absolute left-1/2 -translate-x-1/2 bg-white border border-stone-300 rounded-full px-4 py-1 flex items-center gap-2 text-sm shadow-sm">
                        Ciclo Escolar 2026-A <ChevronDown size={14} />
                    </div>
                </header>

                <div className="p-10 space-y-12">
                    <h1 className="text-2xl font-bold text-stone-800">Tesis</h1>

                    <div className="bg-[#EBE3D5] p-8 rounded-[40px] max-w-3xl">
                        <h2 className="text-xl font-semibold mb-4 text-stone-700">Avance de Tesis</h2>
                        
                        {/* Mostrar mensaje de estado o el nombre del archivo */}
                        <div className="bg-white border border-stone-400 h-10 rounded-md mb-6 w-full flex items-center px-4 text-sm text-stone-600">
                            {archivoSeleccionado ? archivoSeleccionado.name : "Ningún archivo seleccionado..."}
                        </div>
                        
                        {mensaje && <p className="text-sm text-red-600 mb-4">{mensaje}</p>}

                        <div className="flex gap-4">
                            {/* Convertimos el botón en un label que activa un input oculto */}
                            <label className="flex items-center gap-2 px-4 py-2 bg-[#C9B29B] text-stone-800 rounded-xl text-sm font-medium shadow-sm hover:bg-[#bda58d] cursor-pointer">
                                <Search size={16} /> Selección de archivos
                                <input 
                                    type="file" 
                                    accept=".pdf" 
                                    className="hidden" 
                                    onChange={handleSeleccionArchivo} 
                                />
                            </label>

                            <button 
                                onClick={handleSubirAvance}
                                className="flex items-center gap-2 px-4 py-2 bg-[#C9B29B] text-stone-800 rounded-xl text-sm font-medium shadow-sm hover:bg-[#bda58d]"
                            >
                                <Upload size={16} /> Subir avance
                            </button>
                        </div>
                    </div>
                    
                    <div className="bg-[#EBE3D5] p-8 rounded-[40px]">
                        <h2 className="text-xl font-semibold mb-6 text-stone-700">Archivos de Tesis</h2>
                        <div className="bg-white rounded-[30px] p-10 flex gap-12 justify-start items-center flex-wrap">
                            
                            {/* Renderizar dinámicamente los archivos obtenidos de la base de datos */}
                            {listaArchivos.length === 0 ? (
                                <p className="text-stone-500 text-sm">Aún no hay archivos subidos.</p>
                            ) : (
                                listaArchivos.map((archivo, index) => (
                                    <FileIcon key={index} label={archivo.nombre_archivo} />
                                ))
                            )}

                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function FileIcon({ label }) {
    // Truncar el nombre si es muy largo para que no rompa el diseño
    const displayName = label.length > 15 ? label.substring(0, 15) + "..." : label;
    
    return (
        <div className="flex flex-col items-center gap-2 w-24">
            <div className="text-stone-700">
                <FileText size={60} strokeWidth={1.5} />
            </div>
            <span className="text-[10px] font-bold text-center uppercase leading-tight" title={label}>
                {displayName}
            </span>
        </div>
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