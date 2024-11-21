import { Router } from "express";
import { authRequired } from "../middlewares/validateToken";
import { validateSchema } from "../middlewares/validator";
import { getLogsQueriesSchema } from "../schemas/logSchema";
import { getLogs } from "../controllers/logs.controller";

const router = Router();

router.get(
    "/get-logs",
    authRequired,
    validateSchema(getLogsQueriesSchema, {
        isQuery: true,
    }),
    getLogs,
);

export default router;
