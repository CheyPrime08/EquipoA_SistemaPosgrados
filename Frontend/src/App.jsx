import { useState } from "react";
import {
  Fondo,
  LogoUDG,
  decoIzquierda,
  decoDerecha,
} from "./assets/img/Preregistro/acces";

import Inputs from "./components/Preregistro/inputs/inputs";

function App() {
  // estados para guardar los datos
  const [codigo, setCodigo] = useState("");
  const [password, setPassword] = useState("");

  // funcion para ya comunicar python
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Aqui segun deberia ir la ruta real del back
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Aqui en teoria envio el código y password a Python/MongoDB
        body: JSON.stringify({ codigo, password }),
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
          {/* mando a llamar la funcion principal al formulario */}
          <form
            onSubmit={handleLogin}
            className="flex flex-col justify-center items-center gap-11.25"
          >
            {/* paso los estados a sus inputs */}
            <Inputs
              type="text"
              placeholder="Código..."
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
            />
            <Inputs
              type="password"
              placeholder="Contraseña..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
        </div>
      </div>
    </div>
  );
}

export default App;
