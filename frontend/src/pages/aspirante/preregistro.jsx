import {
  FondoPrere,
  Separacion,
} from "../../assets/images/aspirante/accesAspirante";
import { LogoUDG } from "../../assets/logos/acceslogo";

import NombreInputs from "../../modules/preregistro/components/inputs/inputsGenerales";
import Contacto from "../../modules/preregistro/components/inputs/Contactos";
import {
  Eleccion,
  ElegirPosgrado,
  InputExplicar,
  InputEsUDG,
} from "../../modules/preregistro/components/inputs/Eleccion";
import { Link } from "react-router-dom";

function Preregistro() {
  const handleRegistro = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const datosDelFormulario = Object.fromEntries(formData);

    datosDelFormulario.esUDG = datosDelFormulario.esUDG === "true";

    console.log("Enviando a Python:", datosDelFormulario);

    try {
      const response = await fetch("http://localhost:5001/api/preregistro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosDelFormulario),
      });

      if (response.ok) {
        console.log("¡Registro exitoso!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2 bg-[#F9F8F6] h-screen overflow-hidden">
      <div className="h-full w-full relative">
        <img
          src={FondoPrere}
          alt="Fondo de preregistro"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="h-full pr-6">
        <div className="flex flex-1 justify-between my-2 font-medium italic text-[16px]">
          <div className="flex gap-1 items-center">
            <img className="w-8.75" src={LogoUDG} alt="Logo UDG" />
            <p className="font-bold">Portal del Pre-registro</p>
          </div>
          <div className="flex gap-4 items-center">
            <p className="font-bold">Universidad de Guadalajara</p>
          </div>
          <div className="flex items-center justify-center">
            <Link
              to="/"
              className="bg-[#C9B59C] w-30 h-6 rounded-sm text-white font-semibold cursor-pointer
            transition-transform duration-300 hover:bg-[#b4a18b] hover:scale-105 text-center"
            >
              Iniciar Sesion
            </Link>
          </div>
        </div>

        <div className="mb-5">
          <img src={Separacion} alt="Separador" className="w-full" />
        </div>

        <form onSubmit={handleRegistro}>
          <div className="flex justify-between gap-2">
            <NombreInputs
              p="NOMBRE"
              type="text"
              placeholder="NOMBRE..."
              name="nombre"
            />
            <NombreInputs
              p="APELLIDO PATERNO"
              type="text"
              placeholder="PATERNO..."
              name="apellidoPaterno"
            />
            <NombreInputs
              p="APELLIDO MATERNO"
              type="text"
              placeholder="MATERNO..."
              name="apellidoMaterno"
            />
          </div>

          <div className="flex justify-between gap-2">
            <Contacto
              p="EMAIL"
              type="email"
              placeholder="EMAIL..."
              name="email"
            />
            <Contacto
              p="TELÉFONO"
              type="text"
              placeholder="TELÉFONO..."
              name="telefono"
            />
          </div>

          <div className="flex justify-between gap-2 mt-4">
            <Eleccion
              p="NOMBRE DE TU LICENCIATURA"
              type="text"
              placeholder="LICENCIATURA..."
              name="licenciatura"
            />
            <ElegirPosgrado name="posgrado" />
          </div>

          <div className="mt-9">
            <InputExplicar name="explicacion" />
          </div>

          <div className="mt-5">
            <p className="text-[16px] italic font-semibold text-gray-700">
              ¿PERTENECES A LA UDG?
            </p>
            <div className="flex justify-between mt-2 items-center">
              <InputEsUDG name="esUDG" />
              <button
                type="submit"
                className="text-[20px] bg-[#C9B59C] w-61.5 h-13.75 font-bold text-white 
                shadow-[0_6px_12px_rgba(60,40,20,0.15),0_12px_30px_rgba(60,40,20,0.08)] rounded-2xl 
                cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                REGISTRARSE
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Preregistro;
