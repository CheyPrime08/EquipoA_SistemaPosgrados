import React from "react";
import { InputText, TextArea, ElegirPosgrado } from "../inputs/inputsGenerales";

//#############################################################################################
//#############################################################################################

export function TituloColumna({ paso, titulo }) {
  return (
    <div>
      <p className="text-[14px] font-semibold italic text-[#74695a]">{paso}</p>
      <h2 className="text-[20px] font-bold tracking-wider text-[#74695a]">
        {titulo}
      </h2>
      <hr
        className="mt-3 h-[2px] border-t-0 bg-transparent bg-linear-to-r
      from-transparent via-[#cdbca3] to-transparent opacity-100"
      />
    </div>
  );
}

// Componentes específicos para cada paso
const PasoDatosPersonales = ({ formData, handleInputChange }) => (
  <>
    <InputText
      p="Nombre/s"
      placeholder="Ingrese su Nombre..."
      type="text"
      name="nombre"
      value={formData.nombre}
      onChange={handleInputChange}
    />
    <InputText
      p="Apellido Paterno"
      placeholder="Ingrese su Apellido Paterno..."
      type="text"
      name="apellidoPaterno"
      value={formData.apellidoPaterno}
      onChange={handleInputChange}
    />
    <InputText
      p="Apellido Materno"
      placeholder="Ingrese su Apellido Materno..."
      type="text"
      name="apellidoMaterno"
      value={formData.apellidoMaterno}
      onChange={handleInputChange}
    />
  </>
);

const PasoContacto = ({ formData, handleInputChange }) => (
  <>
    <InputText
      p="Correo Electrónico"
      placeholder="usuario@ejemplo.com"
      type="email"
      name="correo"
      value={formData.correo}
      onChange={handleInputChange}
    />
    <InputText
      p="Teléfono Celular"
      placeholder="Ingrese su número de teléfono..."
      type="tel"
      name="telefono"
      value={formData.telefono}
      onChange={handleInputChange}
    />
  </>
);

const PasoPosgrados = ({ formData, handleInputChange }) => (
  <>
    <InputText
      p="Nombre de tu Licenciatura"
      placeholder="ej. Ingeniería en Computación"
      type="text"
      name="nombreLicenciatura"
      value={formData.nombreLicenciatura}
      onChange={handleInputChange}
    />
    <ElegirPosgrado
      p="Posgrado de Interés"
      placeholder="Escriba el posgrado deseado..."
      type="text"
      name="posgrado"
      value={formData.posgrado}
      onChange={handleInputChange}
    />
    <TextArea
      p="¿Por qué te interesa este posgrado?"
      placeholder="Escribe tus motivos..."
      type="text"
      name="porQueTeInteresa"
      value={formData.porQueTeInteresa}
      onChange={handleInputChange}
    />
  </>
);

export function ColumnaIzquierda({
  currentStep,
  steps,
  next,
  prev,
  formData,
  handleInputChange,
}) {
  const titulos = [
    "DATOS PERSONALES",
    "INFORMACIÓN DE CONTACTO",
    "ELECCIÓN DE POSGRADOS",
  ];
  const subtituloPaso =
    currentStep === 0
      ? "¡Bienvenido!"
      : `Paso ${currentStep + 1} de ${steps.length}`;

  // esta cosa renderiza los inputs segun el paso en el que se encuentre
  const renderInputsPaso = () => {
    switch (currentStep) {
      case 0:
        return (
          <PasoDatosPersonales
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case 1:
        return (
          <PasoContacto
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      case 2:
        return (
          <PasoPosgrados
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
      default:
        return (
          <PasoDatosPersonales
            formData={formData}
            handleInputChange={handleInputChange}
          />
        );
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* El titulo dinamico */}
      <TituloColumna paso={subtituloPaso} titulo={titulos[currentStep]} />
      {/* Mando a llamar los tipos de renderizado que quiero al pasar con el boton */}
      <div className="mt-8 flex flex-col gap-6 w-full fade-in">
        {renderInputsPaso()}
      </div>
      {/* los botones */}
      <div className="flex flex-wrap sm:flex-nowrap gap-4 justify-between mt-auto pt-12">
        <button
          onClick={prev}
          disabled={currentStep === 0}
          className="bg-[#BFAC94] w-full sm:w-32 text-white font-bold py-2 px-4 rounded-lg h-12 cursor-pointer
        hover:bg-[#f3f3f3] hover:text-[#847666a9] text-[14px] tracking-wider transition-all duration-300 disabled:opacity-30"
          style={{ boxShadow: "6px 6px 10px #D9D4CF, -6px -6px 10px #FFFEF7" }}
        >
          Anterior
        </button>
        <button
          onClick={next}
          className="bg-[#BFAC94] w-full sm:w-32 text-white font-bold py-2 px-4 rounded-lg h-12 cursor-pointer
        hover:bg-[#f3f3f3] hover:text-[#847666a9] text-[14px] tracking-wider transition-all duration-300"
          style={{ boxShadow: "6px 6px 10px #D9D4CF, -6px -6px 10px #FFFEF7" }}
        >
          {currentStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
        </button>
      </div>
    </div>
  );
}
