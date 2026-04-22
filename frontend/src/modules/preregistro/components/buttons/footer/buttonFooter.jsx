import React from "react";
import { Link } from "react-router-dom";

//Parte de cuando no esta colapsado el sidebar - es el boton de iniciar sesion
export function ButtonIniciarSesionFooter() {
  return (
    <Link to="/" className="w-full flex">
      <button
        className="w-full bg-[#ffffff] text-[#847666a9] font-bold py-2 px-4 rounded-lg h-14 cursor-pointer
        hover:bg-[#f3f3f3] hover:text-[#847666a9] text-[14px] tracking-wider"
        style={{ boxShadow: "inset 3px 3px 9px #B0ABA7" }}
      >
        Iniciar Sesión
      </button>
    </Link>
  );
}

//Parte de cuando no esta colapsado el sidebar - es el boton de registrarse
export function ButtonRegistrarseFooter() {
  return (
    <button
      className="bg-[#a5937ea9] text-white font-bold py-2 px-4 rounded-lg h-14 cursor-pointer
        hover:bg-[#948573a9] text-[14px] tracking-wider"
      style={{ boxShadow: "inset 3px 3px 9px #2c2a287a" }}
    >
      Registrarse
    </button>
  );
}

//Parte de cuando esta colapsado el sidebar - es el boton de registrarse
export function ButtonCollapseRegistrarse() {
  return (
    <button
      className="bg-[#a5937ea9] text-white font-bold py-2 px-4 rounded-lg h-14 w-14 cursor-pointer
        hover:bg-[#948573a9] flex justify-center items-center"
      style={{ boxShadow: "inset 3px 3px 9px #2c2a287a" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        ariaHidden="true"
        className="w-6 h-6 text-[#ffffff] dark:text-white"
        viewBox="0 0 24 24"
      >
        <path
          fillRule="evenodd"
          d="M7 2a2 2 0 0 0-2 2v1a1 1 0 0 0 0 2v1a1 1 0 0 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm3 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0m-1 7a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3 1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1"
          clipRule="evenodd"
        ></path>
      </svg>
    </button>
  );
}

//Parte de cuando esta colapsado el sidebar - es el boton de iniciar sesion
export function ButtonCollapseIniciarSesion() {
  return (
    <Link to="/" className="w-full justify-center items-center flex">
      <button
        className="bg-[#ffffff] text-[#847666a9] font-bold py-2 px-4 rounded-lg h-14 w-14 cursor-pointer
        hover:bg-[#f3f3f3] hover:text-[#847666a9] justify-center items-center"
        style={{ boxShadow: "inset 3px 3px 9px #B0ABA7" }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
          ></path>
        </svg>
      </button>
    </Link>
  );
}
