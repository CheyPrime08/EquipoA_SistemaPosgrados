import React from "react";
import { ColumnaIzquierda, ColumnaDerecha } from "./contentColumnas";

export default function ContentMain() {
  return (
    <>
      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        <ColumnaIzquierda />
        <ColumnaDerecha />
      </div>
    </>
  );
}
