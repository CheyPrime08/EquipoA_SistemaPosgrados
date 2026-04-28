import {
  PenSquare,
  Plus,
  GalleryVerticalEnd
} from "lucide-react";

export const sidebarRoutes = [
  {
    label: "Panel Principal",
    items: [
      { title: "Agregar", url: "/", icon: Plus },
      { title: "Modificar", url: "/modificar", icon: PenSquare },
      {title: "Mostrar", url: "/mostrar", icon: GalleryVerticalEnd },
    ],
  },
];

