import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tesis from "./pages/alumnos/Tesis";
import Documentos from "./pages/alumnos/Documentos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Tesis />} />
        <Route path="/documentos" element={<Documentos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
