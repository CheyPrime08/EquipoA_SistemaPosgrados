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
import TesisGlobalCoord from "@/pages/coordinador/tesis/TesisGlobalCoord";
import ContentCorreo from "@/modules/login/components/content/contentcorreo";
import ContentTelefono from "@/modules/login/components/content/contenttelefono";
import Agregar from "@/pages/admin/agregar";
import Modificar from "@/pages/admin/Modificar";
import Mostrar from "@/pages/admin/Mostrar";
import Tesis from "@/pages/alumno/Tesis";
import Documentos from "@/pages/alumno/Documentos";
import Tutorias from "@/pages/alumno/Tutorias";

const routesAdmin = [
  {
    path: "/agregar",
    element: <Agregar />,
  },
  {
    path: "/modificar",
    element: <Modificar />,
  },
  {
    path: "/mostrar",
    element: <Mostrar />,
  },
];

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
  {
    path: "/correo",
    element: <ContentCorreo />,
  },
  {
    path: "/telefono",
    element: <ContentTelefono />,
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
  {
    path: "/tesis-global",
    element: <TesisGlobalCoord />,
  },
];

const routesAlumno = [
  {
    path: "/tesis",
    element: <Tesis />,
  },
  {
    path: "/documentos",
    element: <Documentos />,
  },
  {
    path: "/tutorias",
    element: <Tutorias />,
  },
];

export default function Rutas() {
  return (
    <Routes>
      {routesAdmin.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
      {routesLogin.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
      {routesCoordinador.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
      {routesAlumno.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}
