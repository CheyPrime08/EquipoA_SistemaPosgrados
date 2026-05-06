import React from "react";
import { SidebarContent, SidebarGroup } from "@/components/ui/sidebar";
import { ItemsContenido } from "../../sidebarbotones";

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
