import { Routes, Route, Navigate } from "react-router-dom";
import InicioCoord from "@/pages/coordinador/inicio/InicioCoord";
import ArchivoCoord from "@/pages/coordinador/archivo/ArchivoCoord";
import RevAlumnos from "@/pages/coordinador/alumnos/RevAlumnos";
import Prerregistro from "./context/Prerregistro";

function App() {
  return (
    <Routes>
      <Route path="/" element={<InicioCoord />} />
      <Route path="/agenda" element={<InicioCoord />} />
      <Route path="/pendientes" element={<InicioCoord />} />
      <Route path="/archivo" element={<ArchivoCoord />} />
      <Route path="/alumnos" element={<RevAlumnos />} />
      <Route path="/home-coord" element={<InicioCoord />} />
      <Route path="/rev-alumnos" element={<RevAlumnos />} />
      <Route path="/prerregistro" element={<Prerregistro />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
