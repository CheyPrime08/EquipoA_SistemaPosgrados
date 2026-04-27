import React, { useState, useRef } from "react";
import { User, Camera, Check } from "lucide-react";
import { CoordInput } from "@/modules/coordinador/common/CoordInput";
import { CoordButton } from "@/modules/coordinador/common/CoordButton";

export function PerfilAjustes() {
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [profilePic, setProfilePic] = useState(localStorage.getItem("profilePicture"));
    const fileInputRef = useRef(null);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        }, 800);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setProfilePic(base64String);
                localStorage.setItem("profilePicture", base64String);
                window.dispatchEvent(new Event("profilePictureUpdated"));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="p-8 md:p-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-xl font-medium text-stone-800 mb-6">Información Personal</h2>
            
            <div className="flex items-center gap-6 mb-8">
                <div className="relative group">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#EFE9E0] to-[#E6D5C5] border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                        {profilePic ? (
                            <img src={profilePic} alt="Perfil" className="w-full h-full object-cover" />
                        ) : (
                            <User size={32} className="text-[#C9B29B]" />
                        )}
                    </div>
                    <button 
                        className="absolute bottom-0 right-0 p-2 bg-white rounded-full border border-[#EBE3D5] shadow-sm text-stone-500 hover:text-stone-800 hover:scale-105 transition-all"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Camera size={16} />
                    </button>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        accept="image/png, image/jpeg, image/gif"
                        className="hidden" 
                    />
                </div>
                <div>
                    <h3 className="font-medium text-stone-800">Foto de Perfil</h3>
                    <p className="text-xs text-stone-500 mt-1">JPG, GIF o PNG. Tamaño máximo de 2MB.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <CoordInput label="Nombre Completo" id="nombre" defaultValue="Dr. Alejandro Valdés" disabled />
                <CoordInput label="Cargo Académico" id="cargo" defaultValue="Coordinador de Posgrado" disabled />
                <CoordInput label="Correo Electrónico" id="email" type="email" defaultValue="alejandro.valdes@posgrado.edu.mx" />
                <CoordInput label="Teléfono de Contacto" id="telefono" type="tel" defaultValue="+52 33 1234 5678" />
            </div>
            
            <div className="border-t border-[#EBE3D5] pt-6 flex justify-end">
                <CoordButton onClick={handleSave} disabled={isSaving}>
                    {isSaving ? "Guardando..." : saved ? <><Check size={16}/> Guardado</> : "Guardar Cambios"}
                </CoordButton>
            </div>
        </div>
    );
}
