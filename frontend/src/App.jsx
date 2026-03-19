import { Routes, Route, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import RevAlumnos from "./pages/coordinacion/alumnos/rev-alumnos";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <p className="text-black">Hola mundo</p>
      </div>
      <div>
        <Button>prueba</Button>
      </div>
      <div>
        <Button onClick={() => navigate("/rev-alumnos")}>Alumnos</Button>
      </div>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rev-alumnos" element={<RevAlumnos />} />
    </Routes>
  );
}

export default App;
