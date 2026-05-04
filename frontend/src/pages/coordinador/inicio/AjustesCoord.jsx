import React, { useState } from "react";
import { LayoutCoordinacion } from "@/modules/coordinador/common/LayoutCoordinacion";
import { User, Bell, Shield, FileText } from "lucide-react";
import { PerfilAjustes } from "@/modules/coordinador/ajustes/PerfilAjustes";
import { NotificacionesAjustes } from "@/modules/coordinador/ajustes/NotificacionesAjustes";
import { SeguridadAjustes } from "@/modules/coordinador/ajustes/SeguridadAjustes";
import { PlantillasAjustes } from "@/modules/coordinador/ajustes/PlantillasAjustes";

export default function AjustesCoord() {
    const [activeTab, setActiveTab] = useState("perfil");

    const tabs = [
        { id: "perfil", label: "Perfil del Coordinador", icon: User },
        { id: "notificaciones", label: "Notificaciones", icon: Bell },
        { id: "plantillas", label: "Plantillas de Eventos", icon: FileText },
        { id: "seguridad", label: "Seguridad y Accesos", icon: Shield },
    ];

    return (
        <LayoutCoordinacion>
            <div className="flex-1 p-8 overflow-y-auto bg-[#FAF8F5]">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-semibold text-stone-800 tracking-tight">Ajustes del Sistema</h1>
                        <p className="text-stone-500 mt-2 text-sm">Gestiona tu información personal, preferencias y configuración de seguridad.</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Sidebar de ajustes */}
                        <div className="w-full md:w-64 flex flex-col gap-2 shrink-0">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                                        activeTab === tab.id 
                                        ? "bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-stone-800 border border-[#EBE3D5]" 
                                        : "text-stone-500 hover:bg-stone-100/50 hover:text-stone-700 border border-transparent"
                                    }`}
                                >
                                    <tab.icon size={18} className={activeTab === tab.id ? "text-[#C9B29B]" : "text-stone-400"} />
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Contenido principal */}
                        <div className="flex-1 bg-white border border-[#EBE3D5] rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.03)] overflow-hidden w-full">
                            {activeTab === "perfil" && <PerfilAjustes />}
                            {activeTab === "notificaciones" && <NotificacionesAjustes />}
                            {activeTab === "plantillas" && <PlantillasAjustes />}
                            {activeTab === "seguridad" && <SeguridadAjustes />}
                        </div>
                    </div>
                </div>
            </div>
        </LayoutCoordinacion>
    );
}
