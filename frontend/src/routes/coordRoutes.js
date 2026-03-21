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
  { title: "Agenda", url: "/", icon: Calendar },
  { title: "Pendientes", url: "/pendientes", icon: ListTodo },
  {
    title: "Alumnos",
    icon: Users,
    subItems: [
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
];
