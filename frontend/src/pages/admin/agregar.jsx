import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import grupitoA from "../../components/ui/personas.png";
import grupitoM from "../../components/ui/personas.png";
import grupitoE from "../../components/ui/personas.png";
import leonLogo from "../../components/ui/leon-logo.png";

function Agregar() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="w-56 h-full bg-sidebar flex flex-col gap-6 p-6">
        <img src={leonLogo} alt="Logo León" className="w-32 mx-auto mb-8" />

        <div className="flex items-center gap-2">
          <img src={grupitoA} alt="Grupito A" className="w-6 h-6" />
          <Link to="/agregar" className="hover:text-primary">Agregar</Link>
        </div>
        <div className="flex items-center gap-2">
          <img src={grupitoM} alt="Grupito M" className="w-6 h-6" />
          <Link to="/modificar" className="hover:text-primary">Modificar</Link>
        </div>
        <div className="flex items-center gap-2">
          <img src={grupitoE} alt="Grupito E" className="w-6 h-6" />
          <Link to="/eliminar" className="hover:text-primary">Eliminar</Link>
        </div>
      </aside>

      <main className="flex-1 p-10 relative">
        <div className="absolute top-0 left-56 w-full h-32 bg-muted rounded-md" />

        <h1 className="text-2xl font-bold mb-2 relative z-10">SISTEMA GESTIÓN POSGRADOS</h1>
        <h2 className="text-xl text-muted-foreground mb-4 relative z-10">Administrar Posgrados</h2>
        <h3 className="text-lg text-primary mb-6 relative z-10">Agregar Posgrado</h3>

        <div className="bg-card border border-border rounded-lg p-6 shadow-md relative z-10">
          <div className="bg-muted border border-border rounded-md p-6 flex flex-col gap-4">
            <input
              type="text"
              placeholder="Nombre del Posgrado"
              className="w-full rounded-lg border border-border bg-card p-2"
            />
            <input
              type="text"
              placeholder="Nombre del Coordinador"
              className="w-full rounded-lg border border-border bg-card p-2"
            />
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Código"
                className="flex-1 rounded-lg border border-border bg-card p-2"
              />
              <input
                type="email"
                placeholder="Correo"
                className="flex-1 rounded-lg border border-border bg-card p-2"
              />
            </div>
            <input
              type="tel"
              placeholder="Teléfono"
              className="w-1/3 rounded-lg border border-border bg-card p-2"
            />

            <div className="flex justify-end mt-4">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/80">
                Agregar
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Agregar;
