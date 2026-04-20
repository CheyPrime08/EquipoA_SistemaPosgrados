import { LayoutCoordinacion } from "@/modules/coordinador/common/LayoutCoordinacion";

export default function AgendaCoord() {
  return (
    <LayoutCoordinacion>
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        <p className="text-lg">Sección de Agenda — próximamente</p>
      </div>
    </LayoutCoordinacion>
  );
}
