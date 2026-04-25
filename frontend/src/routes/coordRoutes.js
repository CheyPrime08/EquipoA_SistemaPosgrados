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
    label: "Panel principal",
    items: [
      { title: "Inicio", url: "/inicioCoord", icon: Home },
      { title: "Agenda", url: "/agenda", icon: Calendar },
      { title: "Pendientes", url: "/pendientes", icon: ListTodo },
      { title: "Archivo", url: "/archivo", icon: Archive },
      { title: "Tesis", url: "/tesis-global", icon: FileText },
      { title: "Ajustes", url: "/ajustes", icon: Settings },
    ],
  },
];

export const allRoutes = [
  ...sidebarRoutes,
  {
    label: "Gestión",
    items: [
      { title: "Ciclo escolar", url: "/ciclo" },
      { title: "Convocatoria", url: "/convocatoria" },
    ],
  },
];
