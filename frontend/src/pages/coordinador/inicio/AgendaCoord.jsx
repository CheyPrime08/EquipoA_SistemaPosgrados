import { LayoutCoordinacion } from "@/modules/coordinador/common/LayoutCoordinacion";
import { AgendaGantt } from "@/modules/coordinador/agenda/AgendaGantt";

export default function AgendaCoord() {
  return (
    <LayoutCoordinacion>
      <div className="p-6 h-[calc(100vh-120px)]">
        <AgendaGantt />
      </div>
    </LayoutCoordinacion>
  );
}
