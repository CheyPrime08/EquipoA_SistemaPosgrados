import React from "react";
import { SidebarContent, SidebarGroup } from "@/components/ui/sidebar";

//hacemos un array de objetos para el map y no repetir codigo
const ItemsContenido = [
  {
    label: "Datos Personales",
    icon: (
      <path
        stroke="currentColor"
        strokeWidth="2"
        d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    ),
  },
  {
    label: "Contacto",
    icon: (
      <path
        stroke="currentColor"
        strokeWidth="2"
        d="M18.427 14.768 17.2 13.542a1.733 1.733 0 0 0-2.45 0l-.613.613a1.732 1.732 0 0 1-2.45 0l-1.838-1.84a1.735 1.735 0 0 1 0-2.452l.612-.613a1.735 1.735 0 0 0 0-2.452L9.237 5.572a1.6 1.6 0 0 0-2.45 0c-3.223 3.2-1.702 6.896 1.519 10.117 3.22 3.221 6.914 4.745 10.12 1.535a1.601 1.601 0 0 0 0-2.456Z"
      />
    ),
  },
  {
    label: "Elección de Posgrado",
    icon: (
      <path
        stroke="currentColor"
        strokeWidth="2"
        d="M12 6.03v13m0-13c-2.819-.831-4.715-1.076-8.029-1.023A.99.99 0 0 0 3 6v11c0 .563.466 1.014 1.03 1.007 3.122-.043 5.018.212 7.97 1.023m0-13c2.819-.831 4.715-1.076 8.029-1.023A.99.99 0 0 1 21 6v11c0 .563-.466 1.014-1.03 1.007-3.122-.043-5.018.212-7.97 1.023"
      />
    ),
  },
];

export default function ContentSidebar({ currentStep, setCurrentStep }) {
  return (
    <SidebarContent>
      <div className="flex flex-1 flex-col gap-5 p-3 group-data-[collapsible=icon]:hidden">
        {ItemsContenido.map((item, index) => (
          <SidebarGroup key={index}>
            <button
              onClick={() => setCurrentStep(index)}
              className={`flex gap-2 font-semibold text-[14px] items-center cursor-pointer 
                         h-16 w-full pl-4 rounded-lg italic transition-colors ${
                           currentStep === index
                             ? "bg-[#C4B6A6] text-white"
                             : "text-[#74695a] bg-[#e7e1da] hover:bg-[#dfdad3]"
                         }`}
              style={{ boxShadow: "inset 3px 3px 9px #B0ABA7" }}
            >
              <svg
                className="w-6 h-6 text-[#74695a] dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                {item.icon}
              </svg>
              {item.label}
            </button>
          </SidebarGroup>
        ))}
      </div>
      {/* aqui son los botones colpasados  */}
      <div className="hidden items-center flex-1 flex-col gap-5 p-3 group-data-[collapsible=icon]:flex">
        {ItemsContenido.map((item, index) => (
          <SidebarGroup
            key={index}
            className="flex items-center justify-center"
          >
            <button
              onClick={() => setCurrentStep(index)}
              className={`flex gap-2 font-semibold text-[17px] items-center cursor-pointer 
                         h-14 w-14 rounded-lg italic transition-colors justify-center ${
                           currentStep === index
                             ? "bg-[#C4B6A6] text-white"
                             : "text-[#74695a] bg-[#e7e1da] hover:bg-[#dfdad3]"
                         }`}
              style={{ boxShadow: "inset 3px 3px 9px #B0ABA7" }}
            >
              <svg
                className="w-6 h-6 text-[#74695a] dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                {item.icon}
              </svg>
            </button>
          </SidebarGroup>
        ))}
      </div>
    </SidebarContent>
  );
}
