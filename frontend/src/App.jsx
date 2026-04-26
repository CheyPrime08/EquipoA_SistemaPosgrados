import { BrowserRouter, Routes, Route } from "react-router-dom";
import Agregar from "./pages/admin/Agregar";
import Modificar from "./pages/admin/Modificar";
import Mostrar from "./pages/admin/Mostrar";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Agregar />} />
      <Route path="/agregar" element={<Agregar />} />
      <Route path="/modificar" element={<Modificar />} />
      <Route path="/mostrar" element={<Mostrar />} />
    </Routes>
  );
}

export default App;
