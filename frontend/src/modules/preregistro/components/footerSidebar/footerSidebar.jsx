import React from "react";
import { SidebarFooter } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  ButtonIniciarSesionFooter,
  ButtonRegistrarseFooter,
  ButtonCollapseRegistrarse,
  ButtonCollapseIniciarSesion,
} from "@/modules/preregistro/components/buttons/footer/buttonFooter";

export default function FooterSidebar() {
  return (
    <SidebarFooter>
      <Separator className="bg-[#a5937ea9] mt-4" />
      <div className="flex flex-col gap-5 pb-10 text-[18px] mt-6 group-data-[collapsible=icon]:hidden">
        <ButtonRegistrarseFooter />
        <ButtonIniciarSesionFooter />
      </div>

      {/* #######################################################################################*/}
      {/* aqui es la parte cuadno este collapsado*/}

      <div className="hidden flex-col items-center justify-center gap-5 pb-10 text-[18px] mt-6 group-data-[collapsible=icon]:flex">
        <ButtonCollapseRegistrarse />
        <ButtonCollapseIniciarSesion />
      </div>
      {/* #######################################################################################*/}
    </SidebarFooter>
  );
}
