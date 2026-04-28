import {
  GraduationCap,
  FileText,
  Users,
} from "lucide-react";

export const alumnoRoutes = [
  {
    label: "Panel Principal",
    items: [
      { title: "Tesis", url: "/tesis", icon: GraduationCap },
      { title: "Documentos", url: "/documentos", icon: FileText },
      { title: "Tutorías", url: "/tutorias", icon: Users },
    ],
  },
];
