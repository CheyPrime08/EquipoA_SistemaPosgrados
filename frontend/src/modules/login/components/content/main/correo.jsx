import { Link } from "react-router-dom";
import Fondo from "../../animation/fondo";
import { ButtoMail, ButtonRegresar } from "../../buttons/buttons";
import { Titulo } from "../titulo/titulos";
import { Descripccion } from "../descripccion/descripcciones";
import { Inputs } from "../../inputs/inputs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validacionCorreo } from "@/lib/validacionesInputs";

export default function Correo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(validacionCorreo) });

  const enviarCorreo = (data) => {
    console.log("Enviando correo a:", data.email);
    // enviar a bd
  };

  return (
    <main className="flex flex-col items-center justify-center px-4 md:px-0">
      <Fondo src="https://lottie.host/c14eff85-5690-4991-86fb-94cb1eeb49e4/lgrAYDBTrU.lottie" />
      <div className="flex flex-col items-center text-center mt-2 md:mt-0">
        <Titulo texto="Verifica tu correo electrónico" />
        <Descripccion
          texto="Ingresa tu correo electrónico registrado en el sistema, "
          texto2="te enviaremos un codigo para verificar tu correo y poder recuperar tu contraseña."
        />
      </div>

      {/* Aqui esta toda la parte donde ingre los datos el usuario y pa mandarlo a la base de datos*/}
      <form onSubmit={handleSubmit(enviarCorreo)}>
        <div className="flex gap-4 md:gap-5 mt-6 md:mt-7 w-full justify-center lg:flex-row md:flex-row sm:flex-col flex-col items-center">
          <Inputs
            {...register("email")}
            className="bg-[#F9F8F6] border-2 border-[#c9b59c] h-auto min-h-[48px] py-2 px-4 w-full max-w-[280px] sm:max-w-[300px] md:max-w-none md:w-80 rounded-2xl text-black gap-2 text-[13px] md:text-base leading-tight outline-none"
            placeholder="ej. juanPedro@gmail.com"
            type="email"
          />
          {errors.email && (
            <span className="text-red-500 text-xs mt-1 ml-2 text-left">
              {errors.email.message}
            </span>
          )}
          <ButtoMail
            type="submit"
            className="bg-[#9f876f] h-auto min-h-[48px] py-2 px-4 w-full max-w-[280px] sm:max-w-[300px] md:max-w-none md:w-50 rounded-2xl text-white font-bold cursor-pointer hover:bg-[#ad9b83]
            flex items-center justify-center gap-2 text-[13px] md:text-base text-center leading-tight"
            texto="Enviar correo"
          />
        </div>
      </form>

      <div className="flex justify-center w-full mt-6">
        <Link to="/recuPasswotd">
          <ButtonRegresar />
        </Link>
      </div>
    </main>
  );
}
