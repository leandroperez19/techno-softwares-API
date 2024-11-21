import { z } from "zod";

export const userRegisterSchema = z.object({
    userName: z
        .string({
            required_error: "Username is required",
        })
        .min(3, "Username must have at least 3 characters")
        .trim(),
    email: z
        .string({
            required_error: "Email is required",
        })
        .email("Email format is wrong"),
    password: z
        .string({
            required_error: "Password is required",
        })
        .min(8, "Password must contain at least 8 characters"),
});

export const userLoginSchema = z.object({
    email: z
        .string({
            required_error: "Email is required",
        })
        .email("Email format is wrong"),
    password: z
        .string({
            required_error: "Password is required",
        })
        .min(8, "Password must contain at least 8 characters"),
});
