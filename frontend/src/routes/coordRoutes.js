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
    label: "Ocultas",
    items: [
      { title: "Revisión del Alumnado", url: "/alumnos", icon: ListTodo },
      { title: "Revisión del Alumnado", url: "/rev-alumnos", icon: ListTodo },
      { title: "Tesis", url: "/tesis", icon: ListTodo },
      { title: "Pre-Registro", url: "/prerregistro", icon: ListTodo },
    ],
  },
];
