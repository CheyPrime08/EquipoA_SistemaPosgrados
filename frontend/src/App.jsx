import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Agregar from "./pages/admin/agregar";
import Modificar from "./pages/admin/modificar";
import Eliminar from "./pages/admin/eliminar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agregar" element={<Agregar />} />
        <Route path="/modificar" element={<Modificar />} />
        <Route path="/eliminar" element={<Eliminar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
