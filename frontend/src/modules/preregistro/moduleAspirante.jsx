import React, { useState } from "react";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import HeaderSidebar from "./components/header/headerSidebar";
import ContentSidebar from "./components/content/contentSidebar";
import FooterSidebar from "./components/footerSidebar/footerSidebar";
import ContentAspirante from "./content/contentAspirante";

export default function ModuleAspirante() {
  // este es para cambiar de estado conectado a los switchs del sidebar
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full p-2 bg-[#F9F8F6] items-stretch">
        {/* Contenedor opcional para layout */}
        <Sidebar
          collapsible="icon"
          variant="floating"
          style={{ "--sidebar": "#EFE9E3" }}
        >
          {/* #######################################################################################*/}
          {/* EL Componente del header del sidebar */}
          <HeaderSidebar />
          {/* EL Componente del contenido del sidebar */}
          <ContentSidebar
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
          {/* La parte del footer del sidebar */}
          <FooterSidebar />
          {/* #######################################################################################*/}
        </Sidebar>
        {/* #######################################################################################*/}
        {/* EL Componente del contenido principal good */}
        <ContentAspirante
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
        {/* #######################################################################################*/}
      </div>
    </SidebarProvider>
  );
}
