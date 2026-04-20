import { BrowserRouter, Route, Routes } from "react-router-dom";
import RediPreregistro from "../pages/aspirante/rediPreregistro";
import Login from "../pages/login/login";
import RecuPasswotd from "../pages/login/password/recuPasswotd";
import InicioCoord from "@/pages/coordinador/inicio/InicioCoord";
import ArchivoCoord from "@/pages/coordinador/archivo/ArchivoCoord";
import ConvocatoriaCoord from "@/pages/coordinador/aspirante/ConvocatoriaCoord";
import CicloCoord from "@/pages/coordinador/ciclo/CicloCoord";
import AgendaCoord from "@/pages/coordinador/agenda/AgendaCoord";
import PendientesCoord from "@/pages/coordinador/inicio/PendientesCoord";
import AjustesCoord from "@/pages/coordinador/inicio/AjustesCoord";

const routesAspirante = [
  {
    path: "/rediPreregistro",
    element: <RediPreregistro />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/recuPasswotd",
    element: <RecuPasswotd />,
  },
];

const routesCoordinador = [
  {
    path: "/inicioCoord",
    element: <InicioCoord />,
  },
  {
    path: "/archivoCoord",
    element: <ArchivoCoord />,
  },
  {
    path: "/convocatoriaCoord",
    element: <ConvocatoriaCoord />,
  },
  {
    path: "/cicloCoord",
    element: <CicloCoord />,
  },
  {
    path: "/agendaCoord",
    element: <AgendaCoord />,
  },
  {
    path: "/pendientesCoord",
    element: <PendientesCoord />,
  },
  {
    path: "/ajustesCoord",
    element: <AjustesCoord />,
  },
];

export default function Rutas() {
  return (
    <Routes>
      {routesAspirante.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
      {routesCoordinador.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}
