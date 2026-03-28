import * as React from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function CoordInput({ label, id, className, ...props }) {
  return (
    <div className={cn("grid gap-1.5", className)}>
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      )}
      <Input id={id} {...props} />
    </div>
  )
}
