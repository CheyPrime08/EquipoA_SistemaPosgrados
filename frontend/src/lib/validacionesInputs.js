import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

export const validacionContraseña = z.object({
    password: z.string()
        .min(1, "La contraseña es obligatoria")
});

export const validacionCorreo = z.object({
    email: z.string()
        .min(1, "El correo es obligatorio")
});

export const validacionTelefono = z.object({
    telefono: z.string()
        .min(1, "El telefono es obligatorio")
        .refine((val) => isValidPhoneNumber(val || ""), {
            message: "El número no coincide con los dígitos del país seleccionado",
        })
});