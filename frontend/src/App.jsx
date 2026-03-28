import { BrowserRouter, Routes, Route } from "react-router-dom";
import InicioCoord from "@/pages/coordinador/inicio/InicioCoord";
import ArchivoCoord from "@/pages/coordinador/archivo/ArchivoCoord";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InicioCoord />} />
        <Route path="/agenda" element={<InicioCoord />} />
        <Route path="/pendientes" element={<InicioCoord />} />
        <Route path="/archivo" element={<ArchivoCoord />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
