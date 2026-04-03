import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Agregar from "./pages/admin/agregar.jsx";
import Modificar from "./pages/admin/modificar.jsx";
import Eliminar from "./pages/admin/eliminar.jsx";
import "./index.css";

function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Menú Principal</h1>
      <nav className="flex flex-col gap-4">
        <Link to="/agregar" className="menu-opcion">Ir a Agregar</Link>
        <Link to="/modificar" className="menu-opcion">Ir a Modificar</Link>
        <Link to="/eliminar" className="menu-opcion">Ir a Eliminar</Link>
      </nav>
    </div>
  );
}

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
