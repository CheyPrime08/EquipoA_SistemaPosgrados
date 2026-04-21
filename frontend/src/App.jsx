import { Routes, Route } from "react-router-dom";
import Agregar from "./pages/admin/Agregar";
import Modificar from "./pages/admin/Modificar";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Agregar />} />
      <Route path="/agregar" element={<Agregar />} />
      <Route path="/modificar" element={<Modificar />} />
    </Routes>
  );
}

export default App;
