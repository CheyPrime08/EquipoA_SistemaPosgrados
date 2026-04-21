import { LayoutAdmin } from "@/modules/admin/LayoutAdmin";
import { Button } from "@/components/ui/button";
import InputsAdmin from "@/modules/admin/components/inputs/inputs";

const Modificar = () => {
  return (
    <LayoutAdmin>
    
        {/* Contenido */}
        <div className="flex-1 p-10">
         <div className="w-full text-right"><h2 className="text-3xl text-muted-foreground">Administrar Posgrados</h2></div>

          <div className="bg-card border border-border rounded-lg p-6 shadow-md h-full">
            <div className="bg-muted border border-border rounded-md p-6 flex flex-col gap-4 h-full">
              <div className="w-full text-right"><h3 className="text-2xl text-muted-foreground">Modificar Posgrado</h3></div> 
              {/* Búsqueda */}
              <div className="flex gap-4 items-center">
                <InputsAdmin
                  type="text"
                  placeholder="Nombre del Posgrado a Modificar"
                  className="flex-1 rounded-lg border border-border bg-card p-2"
                />
                <Button type="button" className="bg-secondary text-secondary-foreground hover:bg-secondary/80">
                  Buscar
                </Button>
              </div>

              <InputsAdmin type="text" placeholder="Nombre del Posgrado"
                className="w-full rounded-lg border border-border bg-card p-2" />
              <InputsAdmin type="text" placeholder="Nombre del Coordinador"
                className="w-full rounded-lg border border-border bg-card p-2" />
              <InputsAdmin type="text" placeholder="Código"
                className="w-full rounded-lg border border-border bg-card p-2" />
              <InputsAdmin type="email" placeholder="Correo"
                className="w-full rounded-lg border border-border bg-card p-2" />
              <InputsAdmin type="tel" placeholder="Teléfono"
                className="w-full rounded-lg border border-border bg-card p-2" />

              <div className="flex justify-end mt-4">
                <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/80">
                  Modificar
                </Button>
              </div>
            </div>
          </div>
        </div>
    </LayoutAdmin>
  );
};

export default Modificar;