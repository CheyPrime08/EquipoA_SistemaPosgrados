import React from 'react';
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function CoordModal({ 
  isOpen, 
  onClose, 
  title, 
  icon,
  children, 
  footer,
  className,
  contentClassName,
  maxWidth = "480px"
}) {
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay 
          className="fixed inset-0 z-50 bg-zinc-950/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" 
        />
        <DialogPrimitive.Content 
          className={cn(
            "fixed left-[50%] top-[50%] z-50 flex flex-col w-full max-h-[90vh] bg-white rounded-2xl shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 overflow-hidden border-none outline-none",
            className
          )}
          style={{ transform: 'translate(-50%, -50%)', maxWidth: maxWidth }}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#EBE3D5] shrink-0">
            <div className="flex items-center gap-3">
              {icon && <span className="shrink-0">{icon}</span>}
              <DialogPrimitive.Title className="font-medium text-stone-800 text-sm">
                {title}
              </DialogPrimitive.Title>
            </div>
            <DialogPrimitive.Close className="text-stone-400 hover:text-stone-700 transition-colors outline-none shrink-0">
              <X size={18} />
            </DialogPrimitive.Close>
          </div>

          <div className={cn("flex-1 overflow-y-auto p-6", contentClassName)}>
            {children}
          </div>

          {footer && (
            <div className="px-6 py-3 border-t border-[#EBE3D5] flex gap-3 justify-end shrink-0 bg-white">
              {footer}
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
