import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Agregar from "./pages/admin/Agregar";
import Modificar from "./pages/admin/Modificar";
import Eliminar from "./pages/admin/Eliminar";

function Home() {
  return (
    <div>
      <h1>Menú Principal</h1>
      <nav>
        <Link to="/agregar">Ir a Agregar</Link>
        <Link to="/modificar">Ir a Modificar</Link>
        <Link to="/eliminar">Ir a Eliminar</Link>
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
