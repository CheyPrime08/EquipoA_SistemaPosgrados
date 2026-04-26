import React from "react";
import Header from "./header/header";
import Telefono from "./main/telefono";

export default function ContentTelefono() {
  return (
    <>
      <div className="w-full min-h-screen  bg-[#F9F8F6] overflow-x-hidden">
        <Header />
        <Telefono />
      </div>
    </>
  );
}
