import { z } from "zod";

export const createSaleSchema = z.object({
    categoryId: z
        .number({
            required_error: "Category is required",
        })
        .positive("Category Id must be a positive number"),
    amount: z
        .number({ required_error: "Amount is required" })
        .positive("Amount must be a positive number"),
    currency: z.enum(["USD", "EUR", "GBP"], {
        required_error: "Currency is required",
    }),

    itemType: z.enum(
        [
            "Electronics",
            "Clothing",
            "Groceries",
            "Books",
            "Furniture",
            "Toys",
            "Accessories",
            "Other",
        ],
        {
            required_error: "Item type is required",
        },
    ),
    itemName: z
        .string({ required_error: "Item name is required" })
        .min(1, "Item name must not be empty")
        .max(120, "Item name is too long"),
    description: z
        .string({ required_error: "Item description is required" })
        .min(1, "Item description must not be empty")
        .max(255, "Item description is too long"),
    date: z.coerce.date({
        required_error: "Date is required",
    }),
});

export const getByCurrencySchema = z.object({
    date: z.enum(["month", "today", "semester", "year"]).optional(),
});
