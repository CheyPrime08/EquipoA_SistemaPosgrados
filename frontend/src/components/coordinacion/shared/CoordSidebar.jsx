import React, { useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronRight,
  ListTodo,
  Calendar,
  SquareUserRound,
  Users,
  Folder,
  BookMarked,
  MessageCircleQuestion,
} from "lucide-react";

const rutas = [
  {
    title: "Agenda",
    url: "/agenda",
    icon: Calendar,
  },
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
  {
    title: "Aspirantes",
    url: "/aspirantes",
    icon: SquareUserRound,
  },
];

export function CoordSidebar() {
  const location = useLocation();
  const { setOpen, open } = useSidebar();
  const [pulsado, setPulsado] = useState(null);
  const openedByHover = useRef(false);

  const handlePress = (id) => {
    setPulsado(id);
    setTimeout(() => setPulsado(null), 400);
  };

  const handleMouseEnter = () => {
    // Solo actúa si el sidebar está cerrado (no fue abierto manualmente)
    if (!open) {
      openedByHover.current = true;
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    // Solo cierra si fue el hover quien lo abrió
    if (openedByHover.current) {
      openedByHover.current = false;
      setOpen(false);
    }
  };

  return (
    <Sidebar
      collapsible="icon"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="top-18 border-none shadow-none items-center transition-[width] duration-300 ease-in-out"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes borderPulseIn {
          0% { border-width: 0.5px; opacity: 0.1; }
          100% { border-width: 10px; opacity: 0.0009; }
        }
        
        .animacion-click {
          animation: borderPulseIn 0.10s ease-out forwards;
        }

        .borde-base {
          position: absolute;
          inset: 0;
          border-radius: 360px;
          border-style: solid;
          border-color: hsl(var(--primary));
          pointer-events: none;
          z-index: 0;
          opacity: 0;
          transition: opacity 0s;
        }

        /* Quita transition-[width,height,padding] del botón — causa el deslizamiento */
        [data-sidebar="menu-button"],
        [data-sidebar="menu-sub-button"] {
          transition: background-color 0.15s ease, color 0.15s ease !important;
        }
        /* Ningún hijo del botón debe transicionar */
        [data-sidebar="menu-button"] *,
        [data-sidebar="menu-sub-button"] * {
          transition: none !important;
        }
        /* Excepción: el chevron sí rota */
        [data-sidebar="menu-button"] .chevron-icon {
          transition: transform 0.2s ease !important;
        }
      `,
        }}
      />
      <SidebarContent className="pt-2">
        <SidebarGroup>
          <SidebarMenu>
            {rutas.map((ruta) => {
              if (ruta.subItems) {
                const isSubMenuOpen = ruta.subItems.some(
                  (sub) => location.pathname === sub.url,
                );

                return (
                  <SidebarMenuItem key={ruta.title} className="mx-3">
                    <Collapsible
                      className="group/collapsible"
                      defaultOpen={isSubMenuOpen}
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className="py-6 relative overflow-hidden pl-7"
                          onMouseDown={() => handlePress(ruta.title)}
                        >
                          <span
                            className={`borde-base ${pulsado === ruta.title ? "animacion-click" : ""}`}
                          />
                          <ruta.icon
                            className="h-5! w-5! shrink-0 z-10"
                            style={{ transition: "none" }}
                          />
                          <span className="text-sm ml-3 truncate z-10 group-data-[collapsible=icon]:hidden">
                            {ruta.title}
                          </span>
                          <ChevronRight className="chevron-icon h-4 w-4 ml-1 transition-transform duration-200 group-data-[state=closed]/collapsible:rotate-90 group-data-[collapsible=icon]:hidden z-10" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <SidebarMenuSub className="group-data-[collapsible=icon]:hidden">
                          {ruta.subItems.map((subRuta) => {
                            const isSubActive =
                              location.pathname === subRuta.url;
                            return (
                              <SidebarMenuSubItem key={subRuta.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={location.pathname === subRuta.url}
                                  className="py-6 relative overflow-hidden"
                                  onMouseDown={() => handlePress(subRuta.title)}
                                >
                                  <Link
                                    to={subRuta.url}
                                    className="flex items-center w-full"
                                  >
                                    <span
                                      className={`borde-base ${pulsado === subRuta.title ? "animacion-click" : ""}`}
                                    />
                                    <subRuta.icon
                                      className="h-5! w-5! mr-3 ml-5 shrink-0 z-10"
                                      style={{ transition: "none" }}
                                    />
                                    <span className="text-sm truncate z-10">
                                      {subRuta.title}
                                    </span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  </SidebarMenuItem>
                );
              }

              const isActive = location.pathname === ruta.url;
              return (
                <SidebarMenuItem key={ruta.title} className="mx-3">
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    onMouseDown={() => handlePress(ruta.title)}
                    className="py-6 relative overflow-hidden select-none pl-7"
                  >
                    <Link to={ruta.url} className="flex items-center w-full">
                      <span
                        className={`borde-base ${pulsado === ruta.title ? "animacion-click" : ""}`}
                      />
                      <ruta.icon
                        className="h-5! w-5! shrink-0 z-10"
                        style={{ transition: "none" }}
                      />
                      <span className="text-sm ml-3 truncate z-10 group-data-[collapsible=icon]:hidden">
                        {ruta.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
