import * as React from "react"
import { Button } from "@/components/ui/button"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"

export function CoordModalActions({ 
  onConfirm, 
  confirmLabel = "Añadir", 
  cancelLabel = "Cancelar",
  isLoading = false 
}) {
  return (
    <DialogFooter className="mt-4">
      <DialogClose asChild>
        <Button variant="ghost" type="button">
          {cancelLabel}
        </Button>
      </DialogClose>
      <Button 
        type="submit" 
        onClick={onConfirm} 
        disabled={isLoading}
      >
        {isLoading ? "Procesando..." : confirmLabel}
      </Button>
    </DialogFooter>
  )
}
