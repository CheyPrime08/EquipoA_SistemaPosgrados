import { useState } from "react";
import { LayoutAdmin } from "@/modules/admin/LayoutAdmin";
import { Button } from "@/components/ui/button";
import InputsAdmin from "@/modules/admin/components/inputs/inputs";
import InputsAdmin2 from "@/modules/admin/components/inputs/inputs2";
import InputsAdmin3 from "@/modules/admin/components/inputs/inputs3";
import { agregarPosgrado } from "@/api/posgrados.api";

function Agregar() {
  const [form, setForm] = useState({
    posgrado: "",
    cordinador: "",
    codigo: "",
    correo: "",
    telefono: "",
    preregistro: "Cerrado",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async () => {
    console.log("Datos del formulario:", form); // agrega esta línea
    if (!form.posgrado || !form.cordinador || !form.codigo) {
      alert("Por favor llena los campos obligatorios: Nombre, Coordinador y Código");
      return;
    }
    await agregarPosgrado(form);
    alert("Posgrado agregado correctamente");
    setForm({ posgrado: "", cordinador: "", codigo: "", correo: "", telefono: "", preregistro: "Cerrado" });
  };

  return (
    <LayoutAdmin>
      {/* Contenido */}
      <div className="flex-1 p-10">
        <div className="w-full text-right">
          <h2 className="text-3xl text-muted-foreground">Administrar Posgrados</h2>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 shadow-md h-full">
          <div className="bg-muted border border-border rounded-md p-6 flex flex-col gap-4 h-full">
            <div className="w-full text-right">
              <h3 className="text-2xl text-muted-foreground">Agregar Posgrado</h3>
            </div>

            <InputsAdmin
              type="text"
              placeholder="Nombre del Posgrado"
              name="posgrado"
              value={form.posgrado}
              onChange={handleChange}
            />

            <InputsAdmin
              type="text"
              placeholder="Nombre del Coordinador"
              name="cordinador"
              value={form.cordinador}
              onChange={handleChange}
            />

            <div className="flex gap-4">
              <InputsAdmin2
                type="text"
                placeholder="Código"
                name="codigo"
                value={form.codigo}
                onChange={handleChange}
              />
              <InputsAdmin2
                type="email"
                placeholder="Correo"
                name="correo"
                value={form.correo}
                onChange={handleChange}
              />
            </div>

            <InputsAdmin3
              type="tel"
              placeholder="Teléfono"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
            />

            <div className="flex justify-end mt-4">
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/80"
                onClick={handleSubmit}
              >
                Agregar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}

export default Agregar;