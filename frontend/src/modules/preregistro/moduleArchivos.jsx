import React, { useState } from "react";
import ContentArchivos from "./content/contentArchivo";

export default function ModuleArchivos() {
  // este es para cambiar de estado conectado a los switchs del sidebar
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="flex min-h-screen w-full p-5 bg-[#F9F8F6] items-stretch">
      <ContentArchivos
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </div>
  );
}
