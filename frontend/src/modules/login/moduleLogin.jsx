import { Link, useNavigate } from "react-router-dom";
import {
  Fondo,
  decoIzquierda,
  decoDerecha,
} from "../../assets/images/login/accesLogin";
//######################################
// las Imagenes y logos
import { LogoUDG } from "../../assets/logos/acceslogo";
//######################################
import { useState } from "react";
//######################################
// este son los Imports de componentes
import Inputs from "../../modules/preregistro/components/inputs/inputs";
//######################################
// aqui los Imports de constantes
import { COORDINADOR_ROL, ADMIN_ROL, RUTAS } from "../../constants/login/roles";
//######################################

export default function Login() {
  const [resultado, setResultado] = useState("");
  const navigate = useNavigate();

  //######################################
  //En teoria aqui maneja para mandar a la base de datos
  const handleLogin = async (e) => {
    e.preventDefault();

    // Aqui extraemos los datos del formulario automáticamente
    const formData = new FormData(e.target);
    const credentials = Object.fromEntries(formData);
    const { codigo, password } = Object.fromEntries(formData);

    //  aqui valida el coordinador
    //Luego hay que modificar esto, deberia ir a la base de datos
    if (
      codigo === COORDINADOR_ROL.CODIGO &&
      password === COORDINADOR_ROL.PASSWORD
    ) {
      setResultado("Acceso permitido como Coordinador");
      navigate(RUTAS.COORDINADOR_ROL);
      return;
    }

    //  aqui valida el administrador
    if (codigo === ADMIN_ROL.CODIGO && password === ADMIN_ROL.PASSWORD) {
      setResultado("Acceso permitido como Administrador");
      navigate(RUTAS.ADMIN_ROL);
      return;
    }

    console.log("Enviando credenciales a Python:", credentials);

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // enviar el jason
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("¡Inicio de sesión exitoso!", data);
        // localStorage.setItem("token", data.token);
        // Y rediriges al usuario a otra pantalla
      } else {
        console.error(
          "Error devuelto por el servidor:",
          data.error || "Credenciales incorrectas",
        );
      }
    } catch (error) {
      console.error("Error de conexión (fetch):", error);
    }
  };
  //######################################

  return (
    <div className="bg-[#F9F8F6] relative min-h-screen">
      <img
        src={Fondo}
        className="absolute hidden lg:block w-full h-full object-cover object-center"
        alt="Fondo"
      />
      <div className="relative z-10 flex flex-col pt-10 md:pt-5 justify-start items-center min-h-screen px-4 md:px-0 w-full overflow-x-hidden">
        <div className="w-30 sm:w-40 md:w-auto">
          <img src={LogoUDG} alt="" className="w-full h-auto" />
        </div>
        <div className="text-center mt-4 md:mt-0">
          <p className="text-4xl md:text-[64px] font-black leading-tight text-[#333] md:text-inherit">
            UDG CUALTOS
          </p>
          <p className="text-lg md:text-[20px] font-semibold italic mt-2 md:mt-0 text-[#555] md:text-inherit">
            Portal de Gestión de Posgrados
          </p>
        </div>
        <div className="flex flex-col mt-8 md:mt-10 w-full max-w-md md:max-w-xl">
          <form
            onSubmit={handleLogin}
            className="flex flex-col justify-center items-center gap-6 md:gap-11.25 w-full"
          >
            {resultado && (
              <div
                className={`p-3 rounded-lg text-sm font-bold ${resultado.includes("Acceso") || resultado.includes("exitoso") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
              >
                {resultado}
              </div>
            )}
            <Inputs type="text" placeholder="Código..." name="codigo" />
            <Inputs
              type="password"
              placeholder="Contraseña..."
              name="password"
            />

            <div className="flex gap-2 items-center w-full justify-center md:justify-between px-2">
              <div className="hidden md:block">
                <img
                  className="flex-1 w-24 lg:w-auto"
                  src={decoIzquierda}
                  alt=""
                />
              </div>
              <Link to="/recuPasswotd" className="text-center group">
                <p className="italic font-extrabold text-[#89754fc2] text-sm hover:underline hover:text-[#7a6442]">
                  ¿Has olvidado tu Contraseña?
                </p>
              </Link>
              <div className="hidden md:block">
                <img
                  className="flex-1 w-24 lg:w-auto"
                  src={decoDerecha}
                  alt=""
                />
              </div>
            </div>
            <div className="flex-1 flex justify-center items-center w-full">
              <button
                id="BotonInicio"
                type="submit"
                className="h-14 md:h-15.75 w-full sm:w-95 bg-[#c9b59c9c] backdrop-blur-[20px] text-white font-black text-xl md:text-[24px] 
              rounded-2xl cursor-pointer transition-transform duration-300 hover:bg-[#a1845fa2] hover:scale-105 shadow-md"
              >
                INICIAR SESIÓN
              </button>
            </div>
          </form>

          <div className="flex flex-col sm:flex-row flex-1 justify-center items-center mt-8 md:mt-10 mb-8 w-full">
            <div className="rounded-2xl px-4 sm:px-5 py-3 sm:py-2 text-[#846c50] font-bold flex flex-col sm:flex-row gap-3 sm:gap-2 items-center text-center">
              <p className="text-sm md:text-base">¿No eres Alumno?</p>
              <Link
                to="/rediPreregistro"
                className="bg-[#c9b59c] px-4 py-2 sm:px-3 sm:py-1 rounded-[5px] 
                transition-transform duration-300 hover:bg-[#a1845fa2] hover:scale-105 shadow-lg/20 w-full sm:w-auto"
              >
                <p className="text-[#ffffff] text-sm md:text-base">
                  Preregístrate
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
