import React, { useState, useEffect } from "react";
import HeaderMain from "../components/header/headerMain";
import { ColumnaIzquierda } from "../components/content/aspirante/contentAspiranteIzquierda";
import { ValidacionArchivos } from "../../../lib/validacionesArchivos";
import { Alerta } from "../components/alertas/alertasgeneral";

// Aqui hace la cosa de los pasos y lo renderiza, un componenten de esta area
export default function ContentArchivos({ currentStep, setCurrentStep }) {
  const steps = ["Datos Personales", "Contacto", "Eleccion de Posgrados"];
  const [alertInfo, setAlertInfo] = useState(null);

  // esta es para controlar la salida de la alerta
  useEffect(() => {
    if (alertInfo) {
      const timer = setTimeout(() => setAlertInfo(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [alertInfo]);

  // Se crea un estado para guardar los datos del formulario para no perderlo cuando se cambia de paso
  const [formData, setFormData] = useState({
    // La parte de estatus legal
    actaNacimiento: null,
    curp: null,
    ine: null,
    cedula: null,
    pasaporte: null,
    visa: null,
    // la parte de trayectoria academica
    tituloProfesional: null,
    certificadoEstudios: null,
    constanciaIngles: null,
    // la parte del perfil de ingreso
    cartaMotivos: null,
    cartaRecomendacion: null,
    anteproyectoTesis: null,
  });

  const next = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };
  const prev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  // Esta funcion se encarga de guardar los datos del formulario
  const handleFileChange = (name, file) => {
    setFormData((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  //Pa comprobar si funka y si esta todo validado
  const handleFinalizar = () => {
    const verificar = ValidacionArchivos.safeParse(formData);

    if (verificar.success) {
      console.log("Formulario Finalizado - Datos recolectados:", formData);
      setAlertInfo({
        titulo: "Completado",
        descripcion: "Todos los archivos han sido cargados correctamente.",
      });
      // Aqui deberia en teoria ir la peticion a la base de datos
    } else {
      setAlertInfo({
        titulo: "Error de Validación",
        descripcion:
          "Por favor, asegúrese de subir todos los archivos obligatorios antes de finalizar.",
      });
      console.error("Errores:", verificar.error.format());
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full flex-1">
      <HeaderMain titulo="PORTAL DE ASPIRANTE" />
      <div className="flex-1 bg-[#EFE9E3] rounded-lg w-full relative">
        {alertInfo && (
          <div className="fixed inset-0 flex items-center justify-center z-100  backdrop-blur-sm ">
            <div className="">
              <Alerta
                titulo={alertInfo.titulo}
                descripcion={alertInfo.descripcion}
                variant={"destructive"}
              />
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 h-full">
          <div className="p-6 sm:p-8 h-full flex flex-col">
            <ColumnaIzquierda
              currentStep={currentStep}
              steps={steps}
              next={next}
              prev={prev}
              formData={formData}
              handleFileChange={handleFileChange}
              //el evento para mandar los datos de todo el formulario
              onFinalizar={handleFinalizar}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
