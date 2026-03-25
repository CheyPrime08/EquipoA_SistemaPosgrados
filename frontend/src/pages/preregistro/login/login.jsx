import { Link, useNavigate } from "react-router-dom";
import {
  Fondo,
  LogoUDG,
  decoIzquierda,
  decoDerecha,
} from "../../../assets/preregistro/acces";

import Inputs from "../../../components/preregistro/inputs/inputs";

function Login() {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Aqui extraemos los datos del formulario automáticamente
    const formData = new FormData(e.target);
    const credentials = Object.fromEntries(formData);

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
        localStorage.setItem("token", data.token);
        if (data.rol === "alumno") {
          navigate("/alumnos");
        } else if (data.rol === "coordinacion") {
          navigate("/coordinacion");
        } else {
          navigate("/admin");
        }
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

  return (
    <div className="bg-[#F9F8F6] relative min-h-screen">
      <img
        src={Fondo}
        className="absolute w-full h-full object-cover object-[0_-110px]"
      />
      <div className="relative z-10 flex flex-col pt-5 justify-start items-center h-screen">
        <div>
          <img src={LogoUDG} alt="" />
        </div>
        <div className="text-center">
          <p className="text-[64px] font-black">UDG CUALTOS</p>
          <p className="text-[20px] font-semibold italic">
            Portal de Gestión de Posgrados
          </p>
        </div>
        <div className="flex flex-col mt-10">
          <form
            onSubmit={handleLogin}
            className="flex flex-col justify-center items-center gap-11.25"
          >
            <Inputs type="text" placeholder="Código..." name="codigo" />
            <Inputs
              type="password"
              placeholder="Contraseña..."
              name="password"
            />

            <div className="flex gap-2 items-center w-full justify-between">
              <div>
                <img className="flex-1" src={decoIzquierda} alt="" />
              </div>
              <a href="">
                <p className="italic font-extrabold text-[#89754fc2]">
                  ¿Has olvidado tu Contraseña?
                </p>
              </a>
              <div>
                <img className="flex-1" src={decoDerecha} alt="" />
              </div>
            </div>
            <div className="flex-1 flex justify-center items-center">
              <button
                type="submit"
                className="h-15.75 w-95 bg-[#c9b59c9c] backdrop-blur-[20px] text-white font-black text-[24px] 
              rounded-2xl cursor-pointer transition-transform duration-300 hover:bg-[#a1845fa2] hover:scale-105"
              >
                INICIAR SESIÓN
              </button>
            </div>
          </form>

          <div className="flex flex-1 justify-center items-center mt-10 ">
            <div className="rounded-2xl px-5 py-2 text-[#846c50] font-bold flex gap-2">
              <p>¿No eres Alumno?</p>
              <Link
                to="/preregistro"
                className="bg-[#c9b59c] px-3 rounded-[5px] 
                transition-transform duration-300 hover:bg-[#a1845fa2] hover:scale-105 shadow-lg/20"
              >
                <p className="text-[#ffffff]"> Preregístrate</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
