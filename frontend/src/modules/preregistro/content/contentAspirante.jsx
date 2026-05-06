import React, { useState } from "react";
import HeaderMain from "../components/header/headerMain";
import { ColumnaIzquierda } from "../components/content/preregistro/contentMainIzquierda";
import { ColumnaDerecha } from "../components/content/preregistro/contentMainDerecha";

// Aqui hace la cosa de los pasos y lo renderiza, un componenten de esta area
export default function ContentAspirante({ currentStep, setCurrentStep }) {
  const steps = ["Datos Personales", "Contacto", "Eleccion de Posgrados"];

  // Se crea un estado para guardar los datos del formulario para no perderlo cuando se cambia de paso
  const [formData, setFormData] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    correo: "",
    telefono: "",
    nombreLicenciatura: "",
    posgrado: "",
    porQueTeInteresa: "",
  });

  const next = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };
  const prev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  // Esta funcion se encarga de guardar los datos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-6 w-full flex-1">
      <HeaderMain titulo="PORTAL DE ASPIRANTE" />
      <div className="flex-1 bg-[#EFE9E3] rounded-lg w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
          <div className="p-6 sm:p-8 h-full flex flex-col">
            <ColumnaIzquierda
              currentStep={currentStep}
              steps={steps}
              next={next}
              prev={prev}
              formData={formData}
              handleInputChange={handleInputChange}
            />
          </div>
          <div className="p-6 sm:p-8 h-full">
            <ColumnaDerecha currentStep={currentStep} steps={steps} />
          </div>
        </div>
      </div>
    </div>
  );
}
