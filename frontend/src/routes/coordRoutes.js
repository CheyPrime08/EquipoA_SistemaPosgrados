import {
  Calendar,
  ListTodo,
  Users,
  Folder,
  BookMarked,
  MessageCircleQuestion,
  SquareUserRound,
} from "lucide-react";

export const coordRoutes = [
  { title: "Agenda", url: "/home-coord", icon: Calendar },
  { title: "Pendientes", url: "/pendientes", icon: ListTodo },
  {
    title: "Alumnos",
    icon: Users,
    subItems: [
      { title: "Revisión", url: "/rev-alumnos", icon: ListTodo },
      { title: "Expedientes", url: "/alumnos/expedientes", icon: Folder },
      { title: "Tesis", url: "/alumnos/tesis", icon: BookMarked },
      {
        title: "Tutorías",
        url: "/alumnos/tutorias",
        icon: MessageCircleQuestion,
      },
    ],
  },
  { title: "Aspirantes", url: "/aspirantes", icon: SquareUserRound },
  { title: "Pre-Registro", url: "/prerregistro", icon: ListTodo },
];
