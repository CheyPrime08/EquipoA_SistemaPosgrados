import { Route, Routes } from "react-router-dom";
import Login from "@/pages/login/login";
import RecuPasswotd from "@/pages/login/password/recuPasswotd";
import RediPreregistro from "@/pages/aspirante/rediPreregistro";
import InicioCoord from "@/pages/coordinador/inicio/InicioCoord";
import ArchivoCoord from "@/pages/coordinador/inicio/ArchivoCoord";
import ConvocatoriaCoord from "@/pages/coordinador/convocatoria/ConvocatoriaCoord";
import CicloCoord from "@/pages/coordinador/ciclo/CicloCoord";
import AgendaCoord from "@/pages/coordinador/inicio/AgendaCoord";
import PendientesCoord from "@/pages/coordinador/inicio/PendientesCoord";
import AjustesCoord from "@/pages/coordinador/inicio/AjustesCoord";

const routesLogin = [
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
    path: "/archivo",
    element: <ArchivoCoord />,
  },
  {
    path: "/convocatoria",
    element: <ConvocatoriaCoord />,
  },
  {
    path: "/ciclo",
    element: <CicloCoord />,
  },
  {
    path: "/agenda",
    element: <AgendaCoord />,
  },
  {
    path: "/pendientes",
    element: <PendientesCoord />,
  },
  {
    path: "/ajustes",
    element: <AjustesCoord />,
  },
];

export default function Rutas() {
  return (
    <Routes>
      {routesLogin.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
      {routesCoordinador.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}
