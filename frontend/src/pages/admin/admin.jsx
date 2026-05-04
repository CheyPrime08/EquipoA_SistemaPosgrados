import { Link } from "react-router-dom";

function Admin() {
  return (
    <div className="min-h-screen bg-[#F9F8F6] flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Panel de Administración</h1>
      <p className="text-xl italic mb-8">Ruta simulada</p>
      <Link 
        to="/" 
        className="bg-[#c9b59c] text-white px-6 py-2 rounded-lg font-bold hover:scale-105 transition-transform"
      >
        Cerrar Sesión
      </Link>
    </div>
  );
}

export default Admin;
