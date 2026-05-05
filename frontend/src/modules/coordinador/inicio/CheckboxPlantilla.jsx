import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

export function CheckboxPlantilla({ checked, onChange, label }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <Checkbox
        id="use-template"
        type="button"
        checked={checked}
        onCheckedChange={(val) => onChange && onChange(!!val)}
        className="size-4 border-[#C9B29B] data-[state=checked]:bg-[#C9B29B] data-[state=checked]:border-[#C9B29B]"
      />
      <label
        htmlFor="use-template"
        className="text-sm font-medium text-stone-600 cursor-pointer select-none leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label || "Generar plantilla de eventos automática"}
      </label>
    </div>
  );
}
