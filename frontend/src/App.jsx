import TesisManager from "./pages/coordinacion/tesis/TesisManger";

function App() {
  return (
    <div className="flex h-screen w-full"> {/* Contenedor general principal */}
      
      {/* Rectángulo de la Izquierda (Sidebar) */}
      <div className="w-65 bg-red-300"> 
        {/* Aquí va tu Sidebar */}
      </div>

      {/* Contenedor Derecho */}
      <div className="flex-1 flex flex-col">
        
        {/* Rectángulo de Arriba (Header) */}
        <div className="h-25 bg-gray-400">
          {/* Aquí va tu Header */}
        </div>
        
        {/* Área del contenido */}
        <div className="flex-1 p-6 bg-gray-100">
          <TesisManager />
        </div>

      </div>
    </div>
  );
}

export default App;
