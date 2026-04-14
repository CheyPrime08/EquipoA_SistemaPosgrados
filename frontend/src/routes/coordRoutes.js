import {
  Home,
  Calendar,
  ListTodo,
  SquareUserRound,
  Archive,
  Settings,
} from "lucide-react";

export const coordRoutes = [
  {
    label: "Panel Principal",
    items: [
      { title: "Inicio", url: "/", icon: Home },
      { title: "Agenda", url: "/agenda", icon: Calendar },
      { title: "Pendientes", url: "/pendientes", icon: ListTodo },
      { title: "Aspirantes", url: "/aspirantes", icon: SquareUserRound },
      { title: "Archivo", url: "/archivo", icon: Archive },
      { title: "Ajustes", url: "/ajustes", icon: Settings },
    ],
  },
];
