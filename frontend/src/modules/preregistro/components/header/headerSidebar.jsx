import React from "react";
import { SidebarHeader, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export default function headerSidebar() {
  return (
    <SidebarHeader>
      <div className="flex flex-col gap-1 p-2 flex-1 group-data-[collapsible=icon]:items-center">
        <div className="flex items-center justify-between ">
          <p className="text-[10px] font-bold tracking-widest text-[#A89884] uppercase group-data-[collapsible=icon]:hidden">
            UNIVERSIDAD DE GUADALAJARA
          </p>
          <SidebarTrigger />
        </div>
        <div className="mt-4 flex flex-1 flex-col justify-center text-center group-data-[collapsible=icon]:hidden">
          <h2 className="font-bold text-[25px] text-[#7d7162]">Pre-Registro</h2>
          <p className="font-semibold text-[17px] italic text-[#8f8272]">
            Panel Aspirante
          </p>
        </div>
        <div className="hidden w-full mt-4 items-center justify-center group-data-[collapsible=icon]:flex">
          <img
            src="/src/assets/logos/aspirante/LogoLeonUDG.webp"
            alt="Logo Leon UDG"
            className="w-15 h-15"
          />
        </div>
        <Separator className="bg-[#a5937ea9] mt-4" />
      </div>
    </SidebarHeader>
  );
}
