import React from "react";
import {
  InputText,
  TextArea,
  ElegirPosgrado,
} from "../../inputs/inputsGenerales";
import Uploads from "../../inputs/aspirante/uploaps";

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
const EstatusLegal = ({ formData, handleFileChange }) => (
  <>
    <Uploads
      p="Acta de nacimiento"
      texto="Haga click para subir su archivo o arrastre y suelte"
      name="actaNacimiento"
      currentFile={formData.actaNacimiento}
      onFileChange={handleFileChange}
    />
    <Uploads
      p="CURP (Clave Única de Registro de Población)"
      texto="Haga click para subir su archivo o arrastre y suelte"
      name="curp"
      currentFile={formData.curp}
      onFileChange={handleFileChange}
    />
    <Uploads
      p="Identificación oficial (INE)"
      texto="Haga click para subir su archivo o arrastre y suelte"
      name="ine"
      currentFile={formData.ine}
      onFileChange={handleFileChange}
    />
    <Uploads
      p="Cédula profesional"
      texto="Haga click para subir su archivo o arrastre y suelte"
      name="cedula"
      currentFile={formData.cedula}
      onFileChange={handleFileChange}
    />
    <Uploads
      p="Pasaporte"
      texto="Haga click para subir su archivo o arrastre y suelte"
      name="pasaporte"
      currentFile={formData.pasaporte}
      onFileChange={handleFileChange}
    />
    <Uploads
      p="Visa"
      texto="Haga click para subir su archivo o arrastre y suelte"
      name="visa"
      currentFile={formData.visa}
      onFileChange={handleFileChange}
    />
  </>
);

const TrayectoriaAcademica = ({ formData, handleFileChange }) => (
  <>
    <Uploads
      p="Título profesional"
      texto="Haga click para subir su archivo o arrastre y suelte"
      name="tituloProfesional"
      currentFile={formData.tituloProfesional}
      onFileChange={handleFileChange}
    />
    <Uploads
      p="Certificado de estudios (promedio mínimo)"
      texto="Haga click para subir su archivo o arrastre y suelte"
      name="certificadoEstudios"
      currentFile={formData.certificadoEstudios}
      onFileChange={handleFileChange}
    />
    <Uploads
      p="Constancia de nivel de inglés"
      texto="Haga click para subir su archivo o arrastre y suelte"
      name="constanciaIngles"
      currentFile={formData.constanciaIngles}
      onFileChange={handleFileChange}
    />
  </>
);

const PerfilDeIngreso = ({ formData, handleFileChange }) => (
  <>
    <Uploads
      p="Carta de motivos:"
      texto="Haga click para subir su archivo o arrastre y suelte"
      name="cartaMotivos"
      currentFile={formData.cartaMotivos}
      onFileChange={handleFileChange}
    />
    <Uploads
      p="Carta de recomendación"
      texto="Haga click para subir su archivo o arrastre y suelte"
      name="cartaRecomendacion"
      currentFile={formData.cartaRecomendacion}
      onFileChange={handleFileChange}
    />
    <Uploads
      p="Anteproyecto de tesis"
      texto="Haga click para subir su archivo o arrastre y suelte"
      name="anteproyectoTesis"
      currentFile={formData.anteproyectoTesis}
      onFileChange={handleFileChange}
    />
  </>
);

export function ColumnaIzquierda({
  currentStep,
  steps,
  next,
  prev,
  formData,
  handleFileChange,
  onFinalizar,
}) {
  const titulos = [
    "ESTATUS LEGAL",
    "TRAYECTORIA ACADÉMICA",
    "PERFIL DE INGRESO",
  ];
  const subtituloPaso =
    currentStep === 0
      ? "¡Bienvenido! Suba sus archivos para seguir el proceso"
      : `Paso ${currentStep + 1} de ${steps.length}`;

  // esta cosa renderiza los inputs segun el paso en el que se encuentre
  const renderInputsPaso = () => {
    switch (currentStep) {
      case 0:
        return (
          <EstatusLegal
            formData={formData}
            handleFileChange={handleFileChange}
          />
        );
      case 1:
        return (
          <TrayectoriaAcademica
            formData={formData}
            handleFileChange={handleFileChange}
          />
        );
      case 2:
        return (
          <PerfilDeIngreso
            formData={formData}
            handleFileChange={handleFileChange}
          />
        );
      default:
        return (
          <TrayectoriaAcademica
            formData={formData}
            handleFileChange={handleFileChange}
          />
        );
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* El titulo dinamico */}
      <TituloColumna paso={subtituloPaso} titulo={titulos[currentStep]} />
      {/* Mando a llamar los tipos de renderizado que quiero al pasar con el boton */}
      <div className="mt-8  gap-6 w-full fade-in grid lg:grid-cols-2 grid-rows-2">
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
          onClick={currentStep === steps.length - 1 ? onFinalizar : next}
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
