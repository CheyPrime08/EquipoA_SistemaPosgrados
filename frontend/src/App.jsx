import { Routes, Route, Navigate } from "react-router-dom";
import InicioCoord from "@/pages/coordinador/inicio/InicioCoord";
import ArchivoCoord from "@/pages/coordinador/archivo/ArchivoCoord";
import ConvocatoriaCoord from "@/pages/coordinador/aspirante/ConvocatoriaCoord";
import CicloCoord from "@/pages/coordinador/ciclo/CicloCoord";
import AgendaCoord from "@/pages/coordinador/agenda/AgendaCoord";
import PendientesCoord from "@/pages/coordinador/inicio/PendientesCoord";
import AjustesCoord from "@/pages/coordinador/inicio/AjustesCoord";

function App() {
  return (
    <Routes>
      <Route path="/" element={<InicioCoord />} />
      <Route path="/agenda" element={<AgendaCoord />} />
      <Route path="/pendientes" element={<PendientesCoord />} />
      <Route path="/archivo" element={<ArchivoCoord />} />
      <Route path="/ciclo" element={<CicloCoord />} />
      <Route path="/convocatoria" element={<ConvocatoriaCoord />} />
      <Route path="/ajustes" element={<AjustesCoord />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
