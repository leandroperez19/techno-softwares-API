import { z } from "zod";

export const paginationSchema = z.object({
    page: z
        .string()
        .optional() // Permitir que no esté presente
        .refine((val) => !val || (!isNaN(Number(val)) && Number(val) > 0), {
            message: "Page must be a positive number",
        })
        .transform((val) => (val ? Number(val) : 1)), // Usar 1 como default

    limit: z
        .string()
        .optional() // Permitir que no esté presente
        .refine((val) => !val || (!isNaN(Number(val)) && Number(val) > 0), {
            message: "Limit must be a positive number",
        })
        .transform((val) => (val ? Number(val) : 10)), // Usar 10 como default
});
