import { Home, Calendar, ListTodo, Archive } from "lucide-react";

export const coordRoutes = [
  {
    label: "Panel Principal",
    items: [
      { title: "Inicio", url: "/", icon: Home },
      { title: "Agenda", url: "/agenda", icon: Calendar },
      { title: "Archivo", url: "/archivo", icon: Archive },
    ],
  },
];
