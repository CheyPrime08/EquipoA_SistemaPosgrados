import React from "react";
import Fondo from "../animation/fondo";

export function ColumnaIzquierda() {
  return (
    <div className="row-span-2">
      <Fondo />
    </div>
  );
}

export function ColumnaDerecha() {
  return (
    <div className="row-span-2">
      <div
        className="bg-[#EFE9E3] h-screen w-full flex justify-center items-center
      rounded-l-[7%]"
      >
        2
      </div>
    </div>
  );
}
