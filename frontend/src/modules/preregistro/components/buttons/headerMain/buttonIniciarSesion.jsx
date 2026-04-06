import React from "react";
import { Link } from "react-router-dom";

export default function ButtonIniciarSesion() {
  return (
    <Link to="/">
      <button
        className="bg-[#BFAC94] text-[#ffffff] font-semibold py-2 px-4 rounded-lg h-10 sm:h-11 cursor-pointer
        hover:bg-[#b2a28d] hover:text-[#ffffff] flex items-center justify-center gap-1 text-[15px]"
      >
        <svg
          className="w-5 h-5 text-[#ffffff] sm:hidden"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
          />
        </svg>
        <span className="hidden sm:block">Iniciar Sesion</span>
        <svg
          class="w-6 h-6 text-white dark:text-white hidden sm:block"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 12H5m14 0-4 4m4-4-4-4"
          />
        </svg>
      </button>
    </Link>
  );
}
