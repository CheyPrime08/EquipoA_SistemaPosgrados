import { BrowserRouter, Routes, Route } from "react-router-dom";
import Agregar from "./pages/admin/Agregar";
import Modificar from "./pages/admin/Modificar";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Agregar />} />
        <Route path="/agregar" element={<Agregar />} />
        <Route path="/modificar" element={<Modificar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
