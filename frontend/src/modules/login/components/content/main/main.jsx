import React from "react";
import Fondo from "../../animation/fondo";
import { ButtoMail, ButtonPhone } from "../../buttons/buttons";

export default function Main() {
  return (
    <main className="flex flex-col items-center justify-center px-4 md:px-0">
      <Fondo />
      <div className="flex flex-col items-center text-center mt-2 md:mt-0">
        <h2 className="text-[24px] md:text-[30px] font-bold leading-tight">
          Verificación por correo electrónico
        </h2>
        <p className="text-[13px] md:text-[14px] font-normal text-center mt-2 px-2 md:px-0">
          Ingresa tu correo electrónico y te enviaremos un enlace para
          restablecer tu contraseña. <br className="hidden md:block" />O en el caso contrario, ingrese
          mediante numero telefono.
        </p>
      </div>
      <div className="flex flex-col gap-4 md:gap-5 mt-6 md:mt-7 w-full justify-center items-center">
        <ButtoMail />
        <ButtonPhone />
      </div>
    </main>
  );
}
