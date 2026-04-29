import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, User, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppTooltip } from "@/components/common/AppTooltip";

export const UserButton = () => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(
    localStorage.getItem("profilePicture"),
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setProfilePic(localStorage.getItem("profilePicture"));
    };
    window.addEventListener("profilePictureUpdated", handleStorageChange);
    return () =>
      window.removeEventListener("profilePictureUpdated", handleStorageChange);
  }, []);

  return (
    <div className="flex items-center justify-center">
      <DropdownMenu>
        <AppTooltip etiqueta="Opciones de perfil" side="bottom" align="end">
          <DropdownMenuTrigger asChild>
            <div className="h-8 w-8 rounded-full border border-border bg-linear-to-tr from-[#EFE9E0] to-[#E6D5C5] cursor-pointer hover:ring-2 hover:ring-primary/30 transition-all duration-300 flex items-center justify-center overflow-hidden group">
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Perfil"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={16} className="text-[#C9B29B]" />
              )}
            </div>
          </DropdownMenuTrigger>
        </AppTooltip>

        <DropdownMenuContent className="w-45 mt-1 mr-5 p-1 rounded-2xl shadow-md bg-white backdrop-blur-xs animate-in fade-in zoom-in-95 duration-200 border border-border">
          <div className="flex flex-col gap-1">
            <DropdownMenuItem
              onClick={() => navigate("/ajustes")}
              className="flex items-center justify-center gap-2 py-3 rounded-full cursor-pointer border border-transparent text-stone-700 focus:bg-[#FAF8F5] focus:border-[#EBE3D5]"
            >
              <Settings className="!h-4 !w-4" />
              <span className="text-sm">Ajustes</span>
            </DropdownMenuItem>
            <Link to="/">
              <DropdownMenuItem className="flex items-center justify-center gap-2 py-3 rounded-full cursor-pointer border border-border text-stone-700 focus:bg-[#FAF8F5] focus:border focus:border-[#EBE3D5]">
                <LogOut className="!h-4 !w-4" />
                <span className="text-sm">Cerrar sesión</span>
              </DropdownMenuItem>
            </Link>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

UserButton.displayName = "UserButton";
