import { z } from "zod";

export const paginationSchema = z.object({
    page: z
        .string()
        .optional()
        .refine((val) => !val || (!isNaN(Number(val)) && Number(val) > 0), {
            message: "Page must be a positive number",
        })
        .transform((val) => (val ? Number(val) : 1)),
    limit: z
        .string()
        .optional()
        .refine((val) => !val || (!isNaN(Number(val)) && Number(val) > 0), {
            message: "Limit must be a positive number",
        })
        .transform((val) => (val ? Number(val) : 10)),
});
