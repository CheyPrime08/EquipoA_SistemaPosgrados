import {
  Home,
  Calendar,
  ListTodo,
  Archive,
  Settings,
  FileText,
} from "lucide-react";

export const sidebarRoutes = [
  {
    label: "Panel Principal",
    items: [
      { title: "Inicio", url: "/inicioCoord", icon: Home },
      { title: "Agenda", url: "/agenda", icon: Calendar },
      { title: "Tesis", url: "/tesis-global", icon: ListTodo },
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
      { title: "Generación", url: "/ciclo" },
      { title: "Convocatoria", url: "/convocatoria" },
    ],
  },
];
