import { BrowserRouter, Route, Routes } from "react-router-dom";
import RediPreregistro from "../pages/aspirante/rediPreregistro";
import Login from "../pages/login/login";

const routesAspirante = [
  {
    path: "/rediPreregistro",
    element: <RediPreregistro />,
  },
  {
    path: "/",
    element: <Login />,
  },
];

export default function RoutesAspirante() {
  return (
    <Routes>
      {routesAspirante.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}
