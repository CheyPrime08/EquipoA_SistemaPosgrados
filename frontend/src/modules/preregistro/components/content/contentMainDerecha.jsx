//#############################################################################################
//#############################################################################################
//Componentes para la parte de la derecha
import React from "react";
import { CardAyuda } from "../cards/cardsAyuda";
import Stepper from "../stepper/stepper";
import { TituloColumna } from "./contentMainIzquierda";

const NotaAyudaPaso1 = () => {
  return (
    <CardAyuda
      texto1="Ten a mano una identificacion que avale tu nombre completo e ingresa los datos tal cual aparecen en ella."
      texto2="Tus datos están protegidos bajo la Ley Federal de Datos Personales."
    />
  );
};

const NotaAyudaPaso2 = () => {
  return (
    <CardAyuda
      texto1="Verifica que tu correo electrónico sea correcto, al igual que tu número de teléfono, ya que por medio de estos nos comunicaremos contigo."
      texto2="Tus datos están protegidos bajo la Ley Federal de Datos Personales."
    />
  );
};

const NotaAyudaPaso3 = () => {
  return (
    <CardAyuda
      texto1="Investiga los planes de estudio de los posgrados que te interesan y elige el que mejor se adapte a tus necesidades."
      texto2="Tus datos están protegidos bajo la Ley Federal de Datos Personales."
    />
  );
};

export function ColumnaDerecha({ currentStep, steps }) {
  const subtituloPaso = `Paso ${currentStep + 1} de ${steps.length}`;

  const renderNotaAyuda = () => {
    switch (currentStep) {
      case 0:
        return <NotaAyudaPaso1 />;
      case 1:
        return <NotaAyudaPaso2 />;
      case 2:
        return <NotaAyudaPaso3 />;
      default:
        return <NotaAyudaPaso1 />;
    }
  };
  return (
    <div className="flex flex-col h-full">
      <TituloColumna paso={subtituloPaso} titulo="Progreso del registro" />
      <Stepper currentStep={currentStep} steps={steps} />
      {renderNotaAyuda()}
    </div>
  );
}
