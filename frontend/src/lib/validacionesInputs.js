import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

export const validacionContraseña = z.object({
    password: z.string()
        .min(1, "test")
});

export const validacionCorreo = z.object({
    email: z.string()
        .min(1, "test")
});

export const validacionTelefono = z.object({
    telefono: z.string()
        .min(1, "test")
        .refine((val) => isValidPhoneNumber(val || ""), {
            message: "test",
        })
});