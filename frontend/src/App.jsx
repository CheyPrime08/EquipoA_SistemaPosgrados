import { BrowserRouter, Routes, Route } from "react-router-dom";
import TesisManager from "./pages/coordinacion/tesis/TesisManger";
import HomeCoord from "./pages/coordinacion/agenda/HomeCoord";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeCoord />} />
        <Route path="/alumnos/tesis" element={<TesisManager />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
