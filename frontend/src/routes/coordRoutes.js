import {
  Home,
  Calendar,
  ListTodo,
  Archive,
  Settings,
} from "lucide-react";

export const sidebarRoutes = [
  {
    label: "Panel Principal",
    items: [
      { title: "Inicio", url: "/", icon: Home },
      { title: "Agenda", url: "/agenda", icon: Calendar },
      { title: "Pendientes", url: "/pendientes", icon: ListTodo },
      { title: "Archivo", url: "/archivo", icon: Archive },
      { title: "Ajustes", url: "/ajustes", icon: Settings },
    ],
  },
];

export const allRoutes = [
  ...sidebarRoutes,
  {
    label: "Gestión",
    items: [
      { title: "Ciclo Escolar", url: "/ciclo" },
      { title: "Convocatoria", url: "/convocatoria" },
    ],
  },
];
