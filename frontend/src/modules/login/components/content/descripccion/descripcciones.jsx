import React from "react";

export function Descripccion({ texto, texto2 }) {
  return (
    <p className="text-[13px] md:text-[14px] font-normal text-center mt-2 px-2 md:px-0">
      {texto}
      <br className="hidden md:block" />
      {texto2}
    </p>
  );
}
