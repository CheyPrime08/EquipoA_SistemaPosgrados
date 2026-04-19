import { Routes, Route, Navigate } from "react-router-dom";
import InicioCoord from "@/pages/coordinador/inicio/InicioCoord";
import ArchivoCoord from "@/pages/coordinador/archivo/ArchivoCoord";
import RevAlumnos from "@/pages/coordinador/alumnos/RevAlumnos";
import Prerregistro from "./context/Prerregistro";
import CicloCoord from "@/pages/coordinador/ciclo/CicloCoord";
import TesisManger from "@/pages/coordinacion/tesis/TesisManger";

function App() {
  return (
    <Routes>
      <Route path="/" element={<InicioCoord />} />
      <Route path="/agenda" element={<InicioCoord />} />
      <Route path="/pendientes" element={<InicioCoord />} />
      <Route path="/archivo" element={<ArchivoCoord />} />
      <Route path="/ciclo/:cicloId" element={<CicloCoord />} />
      <Route path="/alumnos" element={<RevAlumnos />} />
      <Route path="/home-coord" element={<InicioCoord />} />
      <Route path="/rev-alumnos" element={<RevAlumnos />} />
      <Route path="/prerregistro" element={<Prerregistro />} />
      <Route path="/tesis" element={<CicloCoord />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
