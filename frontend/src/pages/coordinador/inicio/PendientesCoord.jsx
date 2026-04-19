import { LayoutCoordinacion } from "@/modules/coordinador/common/LayoutCoordinacion";

export default function PendientesCoord() {
  return (
    <LayoutCoordinacion>
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        <p className="text-lg">Sección de Pendientes — próximamente</p>
      </div>
    </LayoutCoordinacion>
  );
}
