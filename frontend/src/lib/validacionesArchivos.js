import { z } from "zod";

//esto es lo que quiero que valide
const ValidarArchivos = z.any().refine((file) => file !== null, "Este archivo es obligatorio");

//Aqui mas que nada de los campos que se van a validar
export const ValidacionArchivos = z.object({
  actaNacimiento: ValidarArchivos,
  curp: ValidarArchivos,
  ine: ValidarArchivos,
  cedula: ValidarArchivos,
  pasaporte: ValidarArchivos,
  visa: ValidarArchivos,
  tituloProfesional: ValidarArchivos,
  certificadoEstudios: ValidarArchivos,
  constanciaIngles: ValidarArchivos,
  cartaMotivos: ValidarArchivos,
  cartaRecomendacion: ValidarArchivos,
  anteproyectoTesis: ValidarArchivos,
});