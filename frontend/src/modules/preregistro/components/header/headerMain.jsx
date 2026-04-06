import React from "react";
import ButtonIniciarSesion from "../buttons/headerMain/buttonIniciarSesion";

export default function HeaderMain() {
  return (
    <div className="col-span-full lg:col-span-2 bg-[#EFE9E3] min-h-[86px] rounded-lg flex items-center">
      <div className="grid grid-cols-2 grid-rows-2 gap-3 w-full h-full items-center">
        <div className="row-span-2">
          <div className="flex w-full gap-2 justify-between items-center px-4 sm:px-5 py-3">
            <div>
              <p className="text-xs sm:text-sm text-[#9a8b7a] italic">
                Universidad de Guadalajara
              </p>
              <h2 className="text-base sm:text-lg font-bold tracking-wider text-[#74695a] leading-tight">
                PORTAL DE PRE-REGISTRO
              </h2>
            </div>
          </div>
        </div>
        <div className="row-span-2">
          <div className="flex justify-end px-4 sm:px-5 py-3">
            {/* Boton de iniciar sesion */}
            <ButtonIniciarSesion />
          </div>
        </div>
      </div>
    </div>
  );
}
