import React, { useState } from "react";
import { Lock, Check } from "lucide-react";
import { CoordInput } from "@/modules/coordinador/common/CoordInput";
import { CoordButton } from "@/modules/coordinador/common/CoordButton";

export function SeguridadAjustes() {
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        }, 800);
    };

    return (
        <div className="p-8 md:p-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-xl font-medium text-stone-800 mb-6">Seguridad y Accesos</h2>
            
            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#EBE3D5] mb-8">
                <div className="flex items-center gap-3 mb-6">
                    <Lock size={20} className="text-[#C9B29B]" />
                    <h3 className="font-medium text-stone-800">Cambiar Contraseña</h3>
                </div>
                <div className="space-y-4">
                    <CoordInput label="Contraseña Actual" id="pass_actual" type="password" placeholder="••••••••" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <CoordInput label="Nueva Contraseña" id="pass_nueva" type="password" placeholder="••••••••" />
                        <CoordInput label="Confirmar Nueva Contraseña" id="pass_conf" type="password" placeholder="••••••••" />
                    </div>
                </div>
            </div>

            <div className="border-t border-[#EBE3D5] pt-6 flex justify-end">
                <CoordButton variant="primary" onClick={handleSave} disabled={isSaving}>
                    {isSaving ? "Actualizando..." : saved ? <><Check size={16}/> Actualizada</> : "Actualizar Contraseña"}
                </CoordButton>
            </div>
        </div>
    );
}
