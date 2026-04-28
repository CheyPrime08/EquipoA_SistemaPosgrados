import Tabla from "@/modules/admin/components/Tabla";
import { LayoutAdmin } from "@/modules/admin/LayoutAdmin"

function Agregar() {
  return (

        <LayoutAdmin>
          {/* Contenido */}
          <div className="flex-1 p-10">
          <div className="w-full text-right"><h2 className="text-3xl text-muted-foreground">Administrar Posgrados</h2></div>
            <div className="bg-card border border-border rounded-lg p-6 shadow-md h-full">
                                <div className="w-full text-right"><h3 className="text-2xl text-muted-foreground">Listado de Postgrados</h3></div> 
              <div className="bg-muted border border-border rounded-md p-6 flex flex-col gap-4 h-full">

                      <Tabla></Tabla>
              </div>
            </div>
          </div>
        </LayoutAdmin>
  
   
  );
}

export default Agregar;