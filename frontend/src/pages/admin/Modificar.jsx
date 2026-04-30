import { useState } from "react";
import { LayoutAdmin } from "@/modules/admin/LayoutAdmin";
import { Button } from "@/components/ui/button";
import InputsAdmin from "@/modules/admin/components/inputs/inputs";
import { buscarPosgrado, modificarPosgrado } from "@/api/posgrados.api";

const Modificar = () => {
  const [busqueda, setBusqueda] = useState("");
  const [nombreDb, setNombreDb] = useState("");
  const [form, setForm] = useState({
    posgrado: "",
    cordinador: "",
    codigo: "",
    correo: "",
    telefono: "",
  });

const handleBuscar = async () => {
    console.log("Buscando:", busqueda);
    const nombre_db = busqueda.trim().replace(/ /g, "_");
    const datos = await buscarPosgrado(nombre_db);
    console.log("Datos recibidos:", datos);
    if (datos.error) {
      alert("Posgrado no encontrado");
      return;
    }
    setNombreDb(datos.nombre_db);
    setForm({
      posgrado: datos.posgrado || "",
      cordinador: datos.cordinador || "",
      codigo: datos.codigo || "",
      correo: datos.correo || "",
      telefono: datos.telefono || "",
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleModificar = async () => {
    if (!nombreDb) {
      alert("Primero busca un posgrado");
      return;
    }
    await modificarPosgrado(nombreDb, form);
    alert("Posgrado modificado correctamente");
  };

  return (
    <LayoutAdmin>
      <div className="flex-1 p-10">
        <div className="w-full text-right">
          <h2 className="text-3xl text-muted-foreground">Administrar Posgrados</h2>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 shadow-md h-full">
          <div className="bg-muted border border-border rounded-md p-6 flex flex-col gap-4 h-full">
            <div className="w-full text-right">
              <h3 className="text-2xl text-muted-foreground">Modificar Posgrado</h3>
            </div>

            {/* Búsqueda */}
            <div className="flex gap-4 items-center">
              <InputsAdmin
                type="text"
                placeholder="Nombre del Posgrado a Modificar"
                name="busqueda"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <Button
                type="button"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                onClick={handleBuscar}
              >
                Buscar
              </Button>
            </div>

            <InputsAdmin type="text" placeholder="Nombre del Posgrado"
              name="posgrado" value={form.posgrado} onChange={handleChange} />
            <InputsAdmin type="text" placeholder="Nombre del Coordinador"
              name="cordinador" value={form.cordinador} onChange={handleChange} />
            <InputsAdmin type="text" placeholder="Código"
              name="codigo" value={form.codigo} onChange={handleChange} />
            <InputsAdmin type="email" placeholder="Correo"
              name="correo" value={form.correo} onChange={handleChange} />
            <InputsAdmin type="tel" placeholder="Teléfono"
              name="telefono" value={form.telefono} onChange={handleChange} />

            <div className="flex justify-end mt-4">
              <Button
                type="button"
                className="bg-primary text-primary-foreground hover:bg-primary/80"
                onClick={handleModificar}
              >
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