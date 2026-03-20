import { useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";

export function CoordHeader() {
  const { toggleSidebar } = useSidebar();
  const [pulsado, setPulsado] = useState(false);

  const handlePress = () => {
    setPulsado(true);
    setTimeout(() => setPulsado(false), 400);
  };

  return (
    <header className="h-18 bg-sidebar/95 flex shrink-0 items-center gap-4 px-4">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes borderPulseIn {
          0% { border-width: 0.5px; opacity: 0.1; }
          100% { border-width: 10px; opacity: 0.002; }
        }
        .animacion-click {
          animation: borderPulseIn 0.10s ease-out forwards;
        }
        .borde-base {
          position: absolute;
          inset: 0;
          border-radius: 360px;
          border-style: solid;
          border-color: hsl(var(--primary));
          pointer-events: none;
          z-index: 0;
          opacity: 0;
          transition: opacity 0s;
        }
      `,
        }}
      />
      <button
        onClick={toggleSidebar}
        onMouseDown={handlePress}
        className="ml-3 relative overflow-hidden flex items-center justify-center p-3 rounded-full hover:bg-black/5 transition-colors focus:outline-none cursor-pointer"
        aria-label="Alternar menú"
      >
        <span className={`borde-base ${pulsado ? "animacion-click" : ""}`} />
        <Menu className="h-5! w-5! shrink-0 transition-transform active:scale-95 z-10" />
      </button>
      <div className="flex items-center gap-2">
        <span className="text-xl font-semibold tracking-tight">
          SISTEMA GESTIÓN POSGRADOS
        </span>
      </div>
    </header>
  );
}
