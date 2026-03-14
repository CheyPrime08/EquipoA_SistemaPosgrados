import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CoordSidebar } from "@/components/coordinacion/shared/CoordSidebar";

function App() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <CoordSidebar />

        <main className="flex-1 p-4">
          <SidebarTrigger />

          <div className="mb-6 border-b pb-4">
            <p className="text-black">Hola mundo</p> <Button>prueba</Button>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

export default App;
