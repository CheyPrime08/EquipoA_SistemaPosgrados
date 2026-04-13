import { Routes, Route } from "react-router-dom";
import InicioCoord from "@/pages/coordinador/inicio/InicioCoord";
import ArchivoCoord from "@/pages/coordinador/archivo/ArchivoCoord";
import RevAlumnos from "@/modules/coordinador/alumnos/RevAlumnos";

function App() {
  return (
    <Routes>
      <Route path="/" element={<InicioCoord />} />
      <Route path="/agenda" element={<InicioCoord />} />
      <Route path="/pendientes" element={<InicioCoord />} />
      <Route path="/archivo" element={<ArchivoCoord />} />
      <Route path="/rev-alumnos" element={<RevAlumnos />} />
    </Routes>
  );
}

export default App;
