import React from "react";
import { LogoLeon } from "@/assets/logos/acceslogo";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex sm:flex-row justify-between items-center px-4 py-4 sm:px-5 sm:py-2 gap-4 sm:gap-0">
      <div className="flex sm:flex-row items-center gap-2 text-center sm:text-left">
        <img
          src={LogoLeon}
          alt="Logo Leon"
          className="w-15 h-15 sm:w-18 sm:h-18"
        />
        <p className="hidden sm:text-[16px] md:block font-bold">
          Universidad de Guadalajara
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
        <p className="text-[14px] sm:text-[16px] font-semibold">
          ¿Ya tienes una cuenta?
        </p>
        <Link to="/">
          <p className="text-[#7a644a] text-[14px] sm:text-[16px] font-semibold cursor-pointer hover:underline hover:text-[#a27d5f]">
            Inicia sesión
          </p>
        </Link>
      </div>
    </header>
  );
}
