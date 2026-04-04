import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Agregar from "./pages/admin/Agregar";
import Modificar from "./pages/admin/Modificar";
import Eliminar from "./pages/admin/Eliminar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/Agregar" />} />
        <Route path="/agregar" element={<Agregar />} />
        <Route path="/modificar" element={<Modificar />} />
        <Route path="/eliminar" element={<Eliminar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
