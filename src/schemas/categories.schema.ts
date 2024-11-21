import { z } from "zod";

export const createCategorySchema = z.object({
    name: z
        .string({
            required_error: "Category name is required",
        })
        .max(50, "Category can't have more than 60 characters")
        .min(2, "Category name must contain at least 2 characters"),
    description: z
        .string()
        .max(255, "Category description can't contain more than 255 characters")
        .optional(),
});
