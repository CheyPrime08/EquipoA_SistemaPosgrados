import React from "react";
import Fondo from "../../animation/fondo";
import { ButtoMail, ButtonPhone } from "../../buttons/buttons";
import { Titulo } from "../titulo/titulos";
import { Descripccion } from "../descripccion/descripcciones";
import { Link } from "react-router-dom";

export default function Main() {
  return (
    <main className="flex flex-col items-center justify-center px-4 md:px-0">
      <Fondo src="https://lottie.host/eafa480f-5921-4b02-b332-8fb666dafd93/1klykMXFU5.lottie" />
      <div className="flex flex-col items-center text-center mt-2 md:mt-0">
        <Titulo texto="Recupera tu contraseña" />
        <Descripccion
          texto="Bienvenido al sistema de recuperacion de contraseña, "
          texto2="ingrese algunas de las opciones para poder recuperar su contraseña o cambiarla."
        />
      </div>
      <div className="flex flex-col gap-4 md:gap-5 mt-6 md:mt-7 w-full justify-center items-center">
        <Link to="/correo">
          <ButtoMail
            className="bg-[#9f876f] h-auto min-h-[48px] py-2 px-4 w-full max-w-[340px] sm:max-w-[400px] md:max-w-none md:w-150 rounded-2xl text-white font-bold cursor-pointer hover:bg-[#ad9b83]
            flex items-center justify-center gap-2 text-[13px] md:text-base text-center leading-tight"
            texto="Ingresa mediante correo electronico"
          />
        </Link>
        <Link to="/telefono">
          <ButtonPhone
            className="bg-[#F9F8F6] border-2 border-[#c9b59c] h-auto min-h-[48px] py-2 px-4 w-full max-w-[340px] sm:max-w-[400px] md:max-w-none md:w-150 rounded-2xl text-black font-semibold cursor-pointer
            hover:bg-[#edece9] flex items-center justify-center gap-2 text-[13px] md:text-base text-center leading-tight"
            texto="Ingresar mediante número de teléfono"
          />
        </Link>
      </div>
    </main>
  );
}
