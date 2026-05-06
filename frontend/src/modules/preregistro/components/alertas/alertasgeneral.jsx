import { InfoIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function Alerta({ titulo, descripcion, variant, style }) {
  return (
    <Alert
      className="max-w-2xl backdrop-blur-sm bg-[#c0ae9ccc] text-white p-8 rounded-xl shadow-2xl border-none "
      variant={variant}
      style={style}
    >
      <div className=" flex gap-3 items-center">
        <InfoIcon className="size-6 text-white mb-2" />

        <AlertTitle className="text-2xl font-bold mb-2 uppercase tracking-wide">
          {titulo}
        </AlertTitle>
      </div>

      <Separator className="mb-3 bg-white" />
      <AlertDescription className="text-lg font-semibold flex text-start text-wrap opacity-90">
        {descripcion}
      </AlertDescription>
    </Alert>
  );
}
