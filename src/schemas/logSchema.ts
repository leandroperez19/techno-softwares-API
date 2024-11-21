import { z } from "zod";
import { paginationSchema } from "./pagination.schema";

export const logSchema = z.object({
    description: z
        .string()
        .min(1, "Description is required")
        .max(255, "Description must not exceed 255 characters"),
    module: z
        .string()
        .min(1, "Module is required")
        .max(50, "Module name must not exceed 50 characters"),
    userId: z
        .number()
        .positive("User ID must be a positive number")
        .int("User ID must be an integer"),
});

export type LogData = z.infer<typeof logSchema>;

export const getLogsQueriesSchema = paginationSchema.extend({
    module: z.enum(["Sales", "Auth"]).optional(),
});
