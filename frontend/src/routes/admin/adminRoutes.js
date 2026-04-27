import {
  PenSquare,
  Plus,
  GalleryVerticalEnd
} from "lucide-react";

export const sidebarRoutes = [
  {
    label: "Panel Principal",
    items: [
      { title: "Agregar", url: "/agregar", icon: Plus },
      { title: "Modificar", url: "/modificar", icon: PenSquare },
      { title: "Mostra", url: "/mostrar", icon: GalleryVerticalEnd },
    ],
  },
];

