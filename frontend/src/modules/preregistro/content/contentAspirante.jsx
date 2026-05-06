import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderMain from "../components/header/headerMain";
import { ColumnaIzquierda } from "../components/content/contentMainIzquierda";
import { ColumnaDerecha } from "../components/content/contentMainDerecha";

// Aqui hace la cosa de los pasos y lo renderiza, un componenten de esta area
export default function ContentAspirante({ currentStep, setCurrentStep }) {
  const steps = ["Datos Personales", "Contacto", "Eleccion de Posgrados"];
  const navigate = useNavigate();

  // Se crea un estado para guardar los datos del formulario para no perderlo cuando se cambia de paso
  const [formData, setFormData] = useState({
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    correo: "",
    telefono: "",
    licenciatura: "",
    posgrado: "",
    interes: "",
  });

  const next = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };
  const prev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:8000/api/preregistro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("¡Prerregistro enviado exitosamente!");
        // Redirigir a la pantalla de login
        navigate("/");
      } else {
        const errorData = await response.json();
        let errorMsg = "Hubo un problema al enviar el prerregistro";
        
        // FastAPI devuelve un arreglo en "detail" cuando hay errores de validación (422)
        if (errorData.detail) {
          if (Array.isArray(errorData.detail)) {
            errorMsg = errorData.detail.map(err => `- ${err.loc[err.loc.length - 1]}: ${err.msg}`).join("\n");
          } else {
            errorMsg = errorData.detail;
          }
        }
        alert(`Error de validación:\n${errorMsg}`);
      }
    } catch (error) {
      console.error("Error enviando prerregistro:", error);
      alert("Error de conexión con el servidor");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full flex-1">
      <HeaderMain />
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
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
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
