import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Agregar from "./pages/admin/agregar/index.jsx";
import Modificar from "./pages/admin/modificar/index.jsx";
import Eliminar from "./pages/admin/eliminar/index.jsx";
import "./index.css"; // estilos globales

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/agregar" element={<Agregar />} />
        <Route path="/admin/modificar" element={<Modificar />} />
        <Route path="/admin/eliminar" element={<Eliminar />} />
      </Routes>
    </Router>
  );
}

export default App;

