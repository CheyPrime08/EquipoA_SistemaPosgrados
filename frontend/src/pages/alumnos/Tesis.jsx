import React from 'react';
import leonLogo from '@/components/ui/leon-logo.png';
import { ChevronDown, FileText, Search, Upload } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function Tesis() {
    const navigate = useNavigate();

    return (
        <div className="flex h-screen bg-[#F2EDE4] text-stone-800 font-sans">
            {/* Sidebar */}
            <aside className="w-64 border-r border-stone-200 flex flex-col py-8 px-6 bg-[#F2EDE4]">
                <img src={leonLogo} className="w-20 h-20 mb-12" />
                <nav className="space-y-4">
                    <NavItem icon={<FileText size={20} />} label="Tesis" active to="/" />
                    <NavItem icon={<FileText size={20} />} label="Documentos" to="/documentos" />
                </nav>
            </aside>

            {/* Contenido */}
            <main className="flex-1 flex flex-col">
                <header className="h-16 px-8 flex items-center justify-between">
                    <span className="font-semibold text-stone-600 uppercase tracking-wider">Sistema Gestión Posgrados</span>
                    <div className="flex items-center gap-4">
                        <div className="bg-white border border-stone-300 rounded-full px-4 py-1 flex items-center gap-2 text-sm">
                            Ciclo Escolar 2026-A <ChevronDown size={14} />
                        </div>
                        <div className="w-10 h-10 bg-[#C9B29B] rounded-full"></div>
                    </div>
                </header>

                <div className="p-10 space-y-12">
                    <h1 className="text-2xl font-bold text-stone-800">Tesis</h1>

                    {/* Sección Avance */}
                    <div className="bg-[#EBE3D5] p-8 rounded-[40px] max-w-3xl">
                        <h2 className="text-xl font-semibold mb-4 text-stone-700">Avance de Tesis</h2>
                        <div className="bg-white border border-stone-400 h-10 rounded-md mb-6 w-full"></div>
                        <div className="flex gap-4">
                            <button className="flex items-center gap-2 px-4 py-2 bg-[#C9B29B] text-stone-800 rounded-xl text-sm font-medium shadow-sm hover:bg-[#bda58d]">
                                <Search size={16} /> Selección de archivos
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-[#C9B29B] text-stone-800 rounded-xl text-sm font-medium shadow-sm hover:bg-[#bda58d]">
                                <FileText size={16} /> Subir avance
                            </button>
                        </div>
                    </div>

                    {/* Sección Archivos */}
                    <div className="bg-[#EBE3D5] p-8 rounded-[40px]">
                        <h2 className="text-xl font-semibold mb-6 text-stone-700">Archivos de Tesis</h2>
                        <div className="bg-white rounded-[30px] p-10 flex gap-12 justify-start items-center">
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