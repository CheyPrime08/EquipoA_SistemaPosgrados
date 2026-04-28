import React from "react";
import Header from "./header/header";
import Correo from "./main/correo";

export default function ContentCorreo() {
  return (
    <>
      <div className="w-full min-h-screen  bg-[#F9F8F6] overflow-x-hidden">
        <Header />
        <Correo />
      </div>
    </>
  );
}
