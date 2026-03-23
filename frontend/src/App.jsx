import { Routes, Route, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import RevAlumnos from "./pages/coordinacion/alumnos/rev-alumnos";
import Prerregistro from "./pages/prerregistro/Prerregistro";
import HomeCoord from "./pages/coordinacion/agenda/HomeCoord";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold">Sistema de Posgrados</h1>
      <div className="flex gap-2">
        <Button onClick={() => navigate("/rev-alumnos")}>Revisión Alumnos</Button>
        <Button onClick={() => navigate("/prerregistro")}>Prerregistro</Button>
        <Button onClick={() => navigate("/coordinacion")}>Coordinación</Button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rev-alumnos" element={<RevAlumnos />} />
      <Route path="/prerregistro" element={<Prerregistro />} />
      <Route path="/coordinacion" element={<HomeCoord />} />
    </Routes>
  );
}

export default App;
