import Login from "./pages/preregistro/login/login";
import Preregistro from "./pages/preregistro/preregistro";
import Admin from "./pages/admin/Modificar/index";
import Alumnos from "./pages/alumnos/Tesis";
import Coordinacion from "./pages/coordinacion/coordinacion";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/preregistro" element={<Preregistro />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/alumnos" element={<Alumnos />} />
        <Route path="/coordinacion" element={<Coordinacion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
