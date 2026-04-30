import React from "react";
import { cn } from "@/lib/utils";

export const UserInfo = ({ userType = "Usuario", className, hideOnCollapse = false }) => {
  return (
    <div className={cn(
      "flex flex-col justify-center", 
      hideOnCollapse && "group-data-[collapsible=icon]:hidden",
      className
    )}>
      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider leading-tight">
        Bienvenido
      </span>
      <span className="text-[12px] font-bold text-stone-700 uppercase tracking-tight leading-tight">
        {userType}
      </span>
    </div>
  );
};

UserInfo.displayName = "UserInfo";
