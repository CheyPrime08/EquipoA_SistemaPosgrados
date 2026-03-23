import { Routes, Route, Navigate } from "react-router-dom";
import HomeCoord from "./pages/coordinacion/agenda/HomeCoord";
import Prerregistro from "./pages/prerregistro/Prerregistro";
import RevAlumnos from "./pages/coordinacion/alumnos/rev-alumnos";

function App() {
  return (
    <Routes>
      {/* Route to the newly formatted Prerregistro by default or via path */}
      <Route path="/prerregistro" element={<Prerregistro />} />
      <Route path="/rev-alumnos" element={<RevAlumnos />} />
      <Route path="/home-coord" element={<HomeCoord />} />
      
      {/* Fallback routing to Prerregistro right now as requested */}
      <Route path="*" element={<Navigate to="/prerregistro" replace />} />
    </Routes>
  );
}

export default App;
