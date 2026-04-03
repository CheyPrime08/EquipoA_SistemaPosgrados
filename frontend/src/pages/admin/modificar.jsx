import { Link } from "react-router-dom";
import Button from "../../components/ui/button.jsx";
import leonLogo from "../../components/ui/leon-logo.png";

const Modificar = () => {
  return (
    <div className="p-6">
      <aside className="fixed top-0 left-0 w-56 h-full bg-sidebar flex flex-col gap-4 p-6">
        <Link to="/agregar" className="menu-opcion">Agregar</Link>
        <Link to="/modificar" className="menu-opcion">Modificar</Link>
        <Link to="/eliminar" className="menu-opcion">Eliminar</Link>
      </aside>

      <main className="ml-60">
        <img src={leonLogo} alt="Logo León" className="w-32 mb-4" />
        <h1 className="text-2xl font-bold mb-2">SISTEMA GESTIÓN POSGRADOS</h1>
        <h2 className="text-xl text-muted-foreground mb-4">Administrar Posgrados</h2>
        <h3 className="text-lg text-primary mb-6">Modificar Posgrado</h3>

        <form className="flex flex-col gap-4 max-w-md">
          <input type="text" placeholder="Buscar Posgrado" className="border border-border rounded-md p-2" />
          <input type="text" placeholder="Nombre del Posgrado" className="border border-border rounded-md p-2" />
          <input type="text" placeholder="Nombre del Coordinador" className="border border-border rounded-md p-2" />
          <input type="email" placeholder="Correo" className="border border-border rounded-md p-2" />
          <input type="text" placeholder="Código" className="border border-border rounded-md p-2" />
          <input type="tel" placeholder="Teléfono" className="border border-border rounded-md p-2" />

          <div className="flex gap-4">
            <Button type="button">Buscar</Button>
            <Button type="submit">Modificar</Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Modificar;
