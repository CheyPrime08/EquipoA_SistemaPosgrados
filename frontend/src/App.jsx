import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Tesis from "./pages/alumno/Tesis";
import Documentos from "./pages/alumno/Documentos";
import Tutorias from "./pages/alumno/Tutorias";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/tesis" />} />
        <Route path="/tesis" element={<Tesis />} /> 
        <Route path="/documentos" element={<Documentos />} />
        <Route path="/tutorias" element={<Tutorias />} />
      </Routes>
  );
}

export default App;