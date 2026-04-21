import React, { useState, useEffect, useRef } from 'react';
import { 
    Users, 
    ChevronDown, 
    FileText, 
    Search, 
    Upload, 
    GraduationCap, 
    LogOut 
} from 'lucide-react';
import { useNavigate } from "react-router-dom";

// Componentes de UI de Shadcn
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
    SidebarInset
} from "@/components/ui/sidebar";

export default function Tutorias() {
    const navigate = useNavigate();
    const [archivo, setArchivo] = useState(null);
    const [reportes, setReportes] = useState([]);
    const [cargando, setCargando] = useState(false);
    const inputFileRef = useRef(null);

    const seleccionarArchivo = (e) => {
        setArchivo(e.target.files[0]);
    };

    const subirArchivo = async () => {
        if (!archivo) {
            alert("Selecciona un archivo primero");
            return;
        }

        const formData = new FormData();
        formData.append("archivo", archivo);

        try {
            await fetch("http://localhost:8000/api/tutorias/upload", {
                method: "POST",
                body: formData
            });
            alert("Archivo subido correctamente");
            setArchivo(null);
            obtenerArchivos();
        } catch (error) {
            console.error(error);
        }
    };

    const obtenerArchivos = async () => {
        setCargando(true);
        try {
            const res = await fetch("http://localhost:8000/api/tutorias/archivos");
            const data = await res.json();
            setReportes(data);
        } catch (error) {
            console.error(error);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        obtenerArchivos();
    }, []);

    return (
        <SidebarProvider>
            <div className="flex h-screen w-full bg-[#F2EDE4] text-stone-800 font-sans">
                
                {/* --- SIDEBAR REACTIVO --- */}
                <Sidebar collapsible="icon" className="border-r border-stone-200 bg-[#F2EDE4]">
                    <SidebarHeader className="py-8 px-6">
                        <div className="flex items-center gap-3">
                            <span className="font-bold text-lg truncate group-data-[collapsible=icon]:hidden">
                                POSGRADOS
                            </span>
                        </div>
                    </SidebarHeader>

                    <SidebarContent className="px-4">
                        <SidebarMenu>
                            <NavItem icon={<GraduationCap size={20} />} label="Tesis" to="/tesis" />
                            <NavItem icon={<FileText size={20} />} label="Documentos" to="/documentos" />
                            <NavItem icon={<Users size={18} />} label="Tutorías" active to="/tutorias" />
                        </SidebarMenu>
                    </SidebarContent>

                    <SidebarFooter className="p-4">
                        <SidebarMenu>
                            <NavItem icon={<LogOut size={18} />} label="Cerrar Sesión" to="/login" />
                        </SidebarMenu>
                    </SidebarFooter>
                </Sidebar>

                <SidebarInset className="bg-transparent flex flex-col overflow-hidden">
                    <header className="h-16 px-8 flex items-center justify-between border-b border-stone-200 bg-[#F2EDE4]/50 backdrop-blur-sm">
                        <div className="flex items-center gap-4">
                            <SidebarTrigger className="text-stone-600 hover:bg-stone-200" />
                            <span className="font-semibold text-stone-600 uppercase tracking-wider text-sm">
                                Sistema Gestión Posgrados
                            </span>
                        </div>
                        <div className="hidden md:flex bg-white border border-stone-300 rounded-full px-4 py-1 flex items-center gap-2 text-sm shadow-sm">
                            Ciclo Escolar 2026-A <ChevronDown size={14} />
                        </div>
                    </header>

                    <main className="flex-1 overflow-y-auto p-10 space-y-12">
                        <h1 className="text-2xl font-bold text-stone-800">Tutorías</h1>

                        {/* Sección Tutorías */}
                        <div className="bg-[#EBE3D5] p-8 rounded-[40px] max-w-3xl shadow-sm">
                            <h2 className="text-xl font-semibold mb-4 text-stone-700">Avance de Tutorías</h2>
                            <input type="file" ref={inputFileRef} style={{ display: "none" }} onChange={seleccionarArchivo} />
                            <div className="bg-white border border-stone-400 h-10 rounded-xl mb-6 w-full flex items-center px-4 text-sm text-stone-600">
                                {archivo ? archivo.name : "Ningún archivo seleccionado"}
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => inputFileRef.current.click()}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-[#C9B29B] text-stone-800 rounded-xl text-sm font-semibold shadow-sm hover:bg-[#bda58d]"
                                >
                                    <Search size={18} /> Seleccionar
                                </button>
                                <button
                                    onClick={subirArchivo}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-[#C9B29B] text-stone-800 rounded-xl text-sm font-semibold shadow-md hover:bg-stone-700 transition-colors"
                                >
                                    <Upload size={18} /> Subir 
                                </button>
                            </div>
                        </div>

                        {/* Historial */}
                        <div className="bg-[#EBE3D5] p-8 rounded-[40px] shadow-sm">
                            <h2 className="text-xl font-semibold mb-6 text-stone-700 border-b border-stone-300 pb-2">Archivos de Reportes</h2>
                            <div className="bg-white/50 rounded-[30px] p-10 flex gap-12 justify-start items-center flex-wrap min-h-[200px]">
                                {cargando ? (
                                    <p className="text-stone-500 animate-pulse">Cargando reportes...</p>
                                ) : reportes.length === 0 ? (
                                    <p className="text-stone-500 italic text-sm">No hay reportes registrados.</p>
                                ) : (
                                    reportes.map((archivo, index) => (
                                        <FileIcon key={index} label={archivo.nombre_archivo} url={archivo.url_descarga} />
                                    ))
                                )}
                            </div>
                        </div>
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}

// Sub-componentes compartidos
function FileIcon({ label, url }) {
    const displayName = label.length > 15 ? label.substring(0, 12) + "..." : label;
    return (
        <a href={url} target="_blank" rel="noopener noreferrer" 
           className="group flex flex-col items-center gap-2 w-24 p-3 rounded-2xl hover:bg-white hover:shadow-md transition-all">
            <div className="text-stone-600 group-hover:text-amber-700 transition-colors">
                <FileText size={60} strokeWidth={1.5} />
            </div>
            <span className="text-[10px] font-bold text-center uppercase leading-tight text-stone-500">
                {displayName}
            </span>
        </a>
    );
}

function NavItem({ icon, label, active, to }) {
    const navigate = useNavigate();
    return (
        <SidebarMenuItem>
            <SidebarMenuButton 
                onClick={() => navigate(to)}
                isActive={active}
                className={`w-full flex items-center gap-3 px-4 py-6 rounded-xl transition-all
                ${active ? 'bg-[#EBE3D5] text-stone-900 font-bold shadow-sm' : 'text-stone-600 hover:bg-[#EBE3D5]/50'}`}
            >
                {icon}
                <span className="text-sm font-medium">{label}</span>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}