import React from "react";
import { AspirantesTable } from "@/modules/coordinador/aspirantes/AspirantesTable";

const AspirantesPage = ({ search = "", estado = "all" }) => {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <AspirantesTable search={search} estado={estado} />
    </div>
  );
};

export default AspirantesPage;
