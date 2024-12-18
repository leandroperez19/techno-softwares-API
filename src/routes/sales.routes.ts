import { Router } from "express";
import { authRequired } from "../middlewares/validateToken";
import {
    createSale,
    getSales,
    getSalesByCategory,
    getSalesByCurrency,
    getSalesOverTime,
} from "../controllers/sales.controller";
import { validateSchema } from "../middlewares/validator";
import { createSaleSchema, getByCurrencySchema } from "../schemas/sales.schema";
import { paginationSchema } from "../schemas/pagination.schema";

const router = Router();

router.get(
    "/get-sales",
    validateSchema(paginationSchema, { isQuery: true }),
    authRequired,
    getSales,
);
router.get(
    "/sales-by-currency",
    validateSchema(getByCurrencySchema, { isQuery: true }),
    authRequired,
    getSalesByCurrency,
);
router.get(
    "/sales-by-category",
    validateSchema(getByCurrencySchema, { isQuery: true }),
    authRequired,
    getSalesByCategory,
);
router.get(
    "/sales-overtime",
    validateSchema(getByCurrencySchema, { isQuery: true }),
    authRequired,
    getSalesOverTime,
);
router.post(
    "/create-sale",
    validateSchema(createSaleSchema),
    authRequired,
    createSale,
);

export default router;
