import React from "react";

export function Titulo({ texto }) {
  return (
    <h2 className="text-[24px] md:text-[30px] font-bold leading-tight">
      {texto}
    </h2>
  );
}
