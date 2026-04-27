import {
  PenSquare,
  Plus,
  GalleryVerticalEnd
} from "lucide-react";

export const sidebarRoutes = [
  {
    label: "Panel Principal",
    items: [
      { title: "Agregar", url: "/admin/agregar", icon: Plus },
      { title: "Modificar", url: "/admin/modificar", icon: PenSquare },
      { title: "Mostrar", url: "/admin/mostrar", icon: GalleryVerticalEnd },
    ],
  },
];

