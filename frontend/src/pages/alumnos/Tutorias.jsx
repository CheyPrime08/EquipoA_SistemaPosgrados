import React from 'react';
import leonLogo from '@/components/ui/leon-logo.png';
import { Users, ChevronDown, FileText, Search, Upload, GraduationCap, LogOut } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function Tesis() {
    const navigate = useNavigate();

    return (
        <div className="flex h-screen bg-[#F2EDE4] text-stone-800 font-sans">
            {/* Sidebar */}
            <aside className="w-64 border-r border-stone-200 flex flex-col justify-between py-8 px-6 bg-[#F2EDE4]">
                {/* Superior: Logo y Navegación */}
                <div>
                    <img src={leonLogo} className="w-20 h-20 mb-12" alt="Logo" />
                    <nav className="space-y-4">
                        <NavItem icon={<GraduationCap size={20} />} label="Tesis" to="/tesis" />
                        <NavItem icon={<FileText size={20} />} label="Documentos" to="/documentos" />
                        <NavItem icon={<Users size={18} />} label="Tutorías" active to="/tutorias" />
                    </nav>
                </div>

                {/* Inferior: Cerrar Sesión */}
                <div>
                    <NavItem icon={<LogOut size={18} />} label="Cerrar Sesión" to="/login" />
                </div>
            </aside>

            {/* Contenido Principal */}
            <main className="flex-1 flex flex-col">
                <header className="h-16 px-8 flex items-center justify-between relative border-b border-stone-200">
                    {/* Título a la izquierda */}
                    <span className="font-semibold text-stone-600 uppercase tracking-wider text-sm">
                        Sistema Gestión Posgrados
                    </span>
                    {/* Ciclo Escolar */}
                    <div className="absolute left-1/2 -translate-x-1/2 bg-white border border-stone-300 rounded-full px-4 py-1 flex items-center gap-2 text-sm shadow-sm">
                        Ciclo Escolar 2026-A <ChevronDown size={14} />
                    </div>
                </header>

                <div className="p-10 space-y-12">
                    <h1 className="text-2xl font-bold text-stone-800">Tutorías</h1>

                    {/* Sección Tutorías */}
                    <div className="bg-[#EBE3D5] p-8 rounded-[40px] max-w-3xl">
                        <h2 className="text-xl font-semibold mb-4 text-stone-700">Avance de Tesis</h2>
                        <div className="bg-white border border-stone-400 h-10 rounded-md mb-6 w-full"></div>
                        <div className="flex gap-4">
                            <button className="flex items-center gap-2 px-4 py-2 bg-[#C9B29B] text-stone-800 rounded-xl text-sm font-medium shadow-sm hover:bg-[#bda58d]">
                                <Search size={16} /> Selección de archivos
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-[#C9B29B] text-stone-800 rounded-xl text-sm font-medium shadow-sm hover:bg-[#bda58d]">
                                <Upload size={16} /> Subir reporte
                            </button>
                        </div>
                    </div>

                    {/* Sección inferior de historial */}
                    <div className="bg-[#EBE3D5] p-8 rounded-[40px]">
                        <h2 className="text-xl font-semibold mb-6 text-stone-700">Archivos de Reportes</h2>
                        <div className="bg-white rounded-[30px] p-10 flex gap-12 justify-start items-center">
                            {/* Aquí van archivos */}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function FileIcon({ label }) {
    return (
        <div className="flex flex-col items-center gap-2 w-24">
            <div className="text-stone-700">
                <FileText size={60} strokeWidth={1.5} />
            </div>
            <span className="text-[10px] font-bold text-center uppercase leading-tight">{label}</span>
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