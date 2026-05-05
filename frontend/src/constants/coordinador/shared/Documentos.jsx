import React, { useState, useEffect, useRef } from 'react';
import { Users, ChevronDown, FileText, Search, Upload, GraduationCap, LogOut } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import {
    Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu,
    SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, SidebarInset
} from "@/components/ui/sidebar";

export default function Documentos() {
    const navigate = useNavigate();
    const [archivoAcademico, setArchivoAcademico] = useState(null);
    const [archivoPersonal, setArchivoPersonal] = useState(null);
    const [documentos, setDocumentos] = useState([]);
    const inputAcademicoRef = useRef(null);
    const inputPersonalRef = useRef(null);

    const obtenerDocumentos = async () => {
        try {
            const res = await fetch("http://localhost:5001/api/documentos");
            const json = await res.json();
            setDocumentos(json.data || json);
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
            await fetch("http://localhost:5001/api/documentos/upload", { method: "POST", body: formData });
            tipo === 'Academico' ? setArchivoAcademico(null) : setArchivoPersonal(null);
            obtenerDocumentos();
        } catch (error) { console.error(error); }
    };

    return (
        <SidebarProvider>
            <div className="flex h-screen w-full bg-[#F2EDE4] text-stone-800 font-sans">
                <Sidebar collapsible="icon" className="border-r border-stone-200 bg-[#F2EDE4]">
                    <SidebarHeader className="py-8 px-6">
                        <div className="flex items-center gap-3">
                            <span className="font-bold text-lg truncate group-data-[collapsible=icon]:hidden">POSGRADOS</span>
                        </div>
                    </SidebarHeader>
                    <SidebarContent className="px-4">
                        <SidebarMenu>
                            <NavItem icon={<GraduationCap size={20} />} label="Tesis" to="/tesis" />
                            <NavItem icon={<FileText size={20} />} label="Documentos" active to="/documentos" />
                            <NavItem icon={<Users size={18} />} label="Tutorías" to="/tutorias" />
                        </SidebarMenu>
                    </SidebarContent>
                    <SidebarFooter className="p-4">
                        <SidebarMenu><NavItem icon={<LogOut size={18} />} label="Cerrar Sesión" to="/login" /></SidebarMenu>
                    </SidebarFooter>
                </Sidebar>

                <SidebarInset className="bg-transparent flex flex-col overflow-hidden">
                    <header className="h-16 px-8 flex items-center justify-between border-b border-stone-200 bg-[#F2EDE4]/50 backdrop-blur-sm">
                        <div className="flex items-center gap-4">
                            <SidebarTrigger className="text-stone-600" />
                            <span className="font-semibold text-stone-600 uppercase tracking-wider text-sm">Sistema Gestión Posgrados</span>
                        </div>
                        <div className="hidden md:flex bg-white border border-stone-300 rounded-full px-4 py-1 items-center text-sm">Ciclo Escolar 2026-A <ChevronDown size={14} /></div>
                    </header>

                    <main className="flex-1 overflow-y-auto p-10 space-y-12">
                        <h1 className="text-2xl font-bold text-stone-800">Documentos</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <DocBox title="Documentos académicos" file={archivoAcademico} inputRef={inputAcademicoRef} onSelect={(e) => setArchivoAcademico(e.target.files[0])} onUpload={() => subirArchivo('Academico')} />
                            <DocBox title="Documentos personales" file={archivoPersonal} inputRef={inputPersonalRef} onSelect={(e) => setArchivoPersonal(e.target.files[0])} onUpload={() => subirArchivo('Personal')} />
                        </div>
                        <div className="bg-[#EBE3D5] p-8 rounded-[40px] shadow-sm">
                            <h2 className="text-xl font-semibold mb-6 text-stone-700 border-b border-stone-300 pb-2">Historial de Documentos</h2>
                            <div className="bg-white/50 rounded-[30px] p-10 flex gap-12 justify-start items-center flex-wrap">
                                {documentos.map((doc, i) => <FileIcon key={i} label={doc.nombre_archivo} url={doc.url_descarga} />)}
                            </div>
                        </div>
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}

function DocBox({ title, file, inputRef, onSelect, onUpload }) {
    return (
        <div className="bg-[#EBE3D5] p-8 rounded-[40px] shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-stone-700">{title}</h2>
            <input type="file" ref={inputRef} className="hidden" onChange={onSelect} />
            <div className="bg-white border border-stone-400 h-10 rounded-xl mb-6 flex items-center px-4 text-sm text-stone-600">{file ? file.name : "Ningún archivo seleccionado"}</div>
            <div className="flex gap-4">
                <button onClick={() => inputRef.current.click()} className="flex-1 py-2.5 bg-[#C9B29B] rounded-xl text-sm font-semibold shadow-sm hover:bg-[#bda58d]"><Search size={18} className="inline mr-2"/>Seleccionar</button>
                <button onClick={onUpload} className="flex-1 py-2.5 bg-[#C9B29B] text-stone-800 rounded-xl text-sm font-semibold shadow-md hover:bg-stone-700"><Upload size={18} className="inline mr-2"/>Subir</button>
            </div>
        </div>
    );
}

function FileIcon({ label, url, tipo }) {
    return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 w-28 hover:scale-105 transition-transform">
            <FileText size={50} className="text-stone-700" strokeWidth={1.5} />
            <span className="text-[10px] font-bold text-center uppercase break-all">{label}</span>
            <span className="text-[8px] bg-stone-200 px-2 py-0.5 rounded-full text-stone-600">{tipo}</span>
        </a>
    );
}

function NavItem({ icon, label, active, to }) {
    const navigate = useNavigate();
    return (
        <SidebarMenuItem>
            <SidebarMenuButton onClick={() => navigate(to)} isActive={active}
                className={`w-full flex items-center gap-3 px-4 py-6 rounded-xl transition-all
                ${active ? 'bg-[#EBE3D5] text-stone-900 font-bold shadow-sm' : 'text-stone-600 hover:bg-[#EBE3D5]/50'}`}>
                {icon} <span className="text-sm font-medium">{label}</span>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}