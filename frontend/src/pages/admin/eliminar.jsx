import { Link } from "react-router-dom";
import Button from "../../components/ui/button.jsx";
import leonLogo from "../../components/ui/leon-logo.png";


const Eliminar = () => {
  return (
    <div className="p-6">
      {/* Menú lateral */}
      <aside className="fixed top-0 left-0 w-56 h-full bg-sidebar flex flex-col gap-4 p-6">
        <Link to="/agregar" className="menu-opcion">Agregar</Link>
        <Link to="/modificar" className="menu-opcion">Modificar</Link>
        <Link to="/eliminar" className="menu-opcion">Eliminar</Link>
      </aside>

      {/* Contenido principal */}
      <main className="ml-60">
        <img src={leonLogo} alt="Logo León" className="w-32 mb-4" />

        <h1 className="text-2xl font-bold text-foreground mb-2">SISTEMA GESTIÓN POSGRADOS</h1>
        <h2 className="text-xl text-muted-foreground mb-4">Administrar Posgrados</h2>
        <h3 className="text-lg text-primary mb-6">Eliminar Posgrado</h3>

        <form className="flex flex-col gap-4 max-w-md">
          <input type="text" placeholder="Código del Posgrado" className="border border-border rounded-md p-2" />
          <Button type="submit">Eliminar</Button>
        </form>
      </main>
    </div>
  );
};

