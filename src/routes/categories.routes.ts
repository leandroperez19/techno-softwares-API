import { Router } from "express";
import { authRequired } from "../middlewares/validateToken";
import { validateSchema } from "../middlewares/validator";
import { createCategorySchema } from "../schemas/categories.schema";
import {
    createCategory,
    getCategories,
} from "../controllers/categories.controller";

const router = Router();

router.post(
    "/create-category",
    authRequired,
    validateSchema(createCategorySchema),
    createCategory,
);

router.get("/get-categories", authRequired, getCategories);

export default router;
