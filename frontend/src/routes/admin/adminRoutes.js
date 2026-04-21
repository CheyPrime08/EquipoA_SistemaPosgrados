import {
  PenSquare,
  Plus,
} from "lucide-react";

export const sidebarRoutes = [
  {
    label: "Panel Principal",
    items: [
      { title: "Agregar", url: "/", icon: Plus },
      { title: "Modificar", url: "/modificar", icon: PenSquare },
    ],
  },
];

