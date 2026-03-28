import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Tesis from "./pages/alumnos/Tesis";
import Documentos from "./pages/alumnos/Documentos";
import Tutorias from "./pages/alumnos/Tutorias";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/tesis" />} />
        <Route path="/tesis" element={<Tesis />} /> 
        <Route path="/documentos" element={<Documentos />} />
        <Route path="/tutorias" element={<Tutorias />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;