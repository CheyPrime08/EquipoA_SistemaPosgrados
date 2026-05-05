import { useRef } from "react";
import { ChevronRight } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { usePressAnimation } from "@/hooks/usePressAnimation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
import { UserButton } from "@/components/common/header/UserButton";
import { UserInfo } from "@/components/common/UserInfo";

export function AppSidebar({ rutas }) {
  const location = useLocation();
  const openedByHover = useRef(false);
  const { setOpen, open } = useSidebar();
  const { handlePress, isPressed } = usePressAnimation();

  const handleMouseEnter = () => {
    if (!open) {
      openedByHover.current = true;
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
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
      className="top-18 pb-18 border-none shadow-none items-center transition-[width] duration-300 ease-in-out"
    >
      <SidebarContent className="pt-2">
        {rutas.map((grupo) => (
          <SidebarGroup key={grupo.label}>
            <SidebarMenu>
              {grupo.items.map((ruta) => {
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
                              className={`borde-base ${isPressed(ruta.title) ? "animacion-click" : ""}`}
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
                              return (
                                <SidebarMenuSubItem key={subRuta.title}>
                                  <SidebarMenuSubButton
                                    asChild
                                    isActive={location.pathname === subRuta.url}
                                    className="py-6 relative overflow-hidden"
                                    onMouseDown={() =>
                                      handlePress(subRuta.title)
                                    }
                                  >
                                    <Link
                                      to={subRuta.url}
                                      className="flex items-center w-full"
                                    >
                                      <span
                                        className={`borde-base ${isPressed(subRuta.title) ? "animacion-click" : ""}`}
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
                          className={`borde-base ${isPressed(ruta.title) ? "animacion-click" : ""}`}
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
        ))}
      </SidebarContent>
      <SidebarFooter className="flex-row items-center gap-3 mb-6 pl-8">
        <UserButton />
        <UserInfo userType="Coordinador" hideOnCollapse />
      </SidebarFooter>
    </Sidebar>
  );
}
