import React from 'react';
import leonLogo from '@/components/ui/leon-logo.png';
import {
    Home, Users, Settings, LogOut,
    Search, ChevronDown, LayoutGrid, Bell,
    BookOpen, BookAIcon, ContactRound
} from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function Documentos() {
    const navigate = useNavigate();

    return (
        <div className="flex h-screen bg-[#FAF8F5] text-stone-800 font-sans">

            {/* Sidebar */}
            <aside className="w-64 border-r border-[#EBE3D5] flex flex-col justify-between py-8 px-6">
                <div>
                    <img src={leonLogo} className="w-24 h-24 absolute top-1 left-1" />

                    <nav className="space-y-1 mt-24 border-b border-[#EBE3D5] pb-4">
                        <NavItem icon={<Home size={18} />} label="Inicio" to="/" />
                        <NavItem icon={<BookOpen size={18} />} label="Tesis" to="/" />
                        <NavItem icon={<BookOpen size={18} />} label="Documentos" active to="/documentos" />
                        <NavItem icon={<Settings size={18} />} label="Configuración" />
                    </nav>
                </div>

                <NavItem icon={<LogOut size={18} />} label="Cerrar Sesión" />
            </aside>

            {/* Contenido */}
            <main className="flex-1 flex flex-col">

                {/* Header */}
                <header className="h-16 px-8 flex items-center justify-between border-b border-[#EBE3D5]">
                    <span className="text-sm text-stone-500">Sistema de Posgrados</span>

                    <div className="absolute left-1/2 -translate-x-1/2 bg-[#FAF8F5] border border-[#EBE3D5] rounded-b-2xl px-6 py-2 flex gap-2">
                        Ciclo Escolar 2026-A <ChevronDown size={16} />
                    </div>

                    <div className="flex gap-4 items-center">
                        <Search size={18} />
                        <LayoutGrid size={18} />
                        <Settings size={18} />
                        <Bell size={18} />
                        <div className="w-8 h-8 bg-[#C9B29B] rounded-full"></div>
                    </div>
                </header>

                {/* Contenido de Documentos */}
                <div className="p-8">
                    <h1 className="text-2xl font-medium mb-4">Documentos</h1>

                    <div className="bg-white p-6 rounded-xl border border-[#EBE3D5] shadow-sm">
                        Archivos de documentos
                    </div>
                </div>
            </main>
        </div>
    );
}

function NavItem({ icon, label, active, to }) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => to && navigate(to)}
            className={`flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer
            ${active ? 'bg-white shadow text-stone-800' : 'text-stone-600 hover:bg-[#F0EBE1]'}`}
        >
            {icon}
            <span className="text-sm">{label}</span>
        </div>
    );
}