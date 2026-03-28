import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function AppTooltip({ children, etiqueta, side = "top", align = "center" }) {
  if (!etiqueta) return children;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side} align={align}>
        <p>{etiqueta}</p>
      </TooltipContent>
    </Tooltip>
  );
}

