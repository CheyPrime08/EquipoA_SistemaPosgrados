import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CoordButton({ 
  children, 
  className, 
  variant = "primary", 
  ...props 
}) {
  const variants = {
    primary: "bg-[#D8C4B6] hover:bg-[#C9B29B] text-stone-800 px-5 py-2 rounded-xl shadow-sm",
    secondary: "border border-[#EBE3D5] text-stone-600 hover:bg-[#FAF8F5] px-5 py-2 rounded-xl transition-colors bg-white",
    danger: "bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition-colors shadow-sm",
    ghost: "bg-transparent hover:bg-[#FAF8F5] text-stone-500 px-4 py-2 rounded-xl transition-colors"
  };

  const disabledStyles = variant === "primary" 
    ? "disabled:bg-[#EBE3D5] disabled:text-stone-400 disabled:cursor-not-allowed disabled:hover:bg-[#EBE3D5]"
    : "disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <Button
      variant="unstyled"
      className={cn(
        "h-auto inline-flex items-center justify-center gap-2 text-sm font-medium transition-all active:translate-y-px",
        variants[variant],
        disabledStyles,
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
