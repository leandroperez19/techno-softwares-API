import { Router } from "express";
import { validateSchema } from "../middlewares/validator";
import { userLoginSchema, userRegisterSchema } from "../schemas/user.schema";
import {
    login,
    logout,
    register,
    verifyToken,
} from "../controllers/auth.controller";

const router = Router();

router.post("/sign-up", validateSchema(userRegisterSchema), register);
router.post("/sign-in", validateSchema(userLoginSchema), login);
router.get("/logout", logout);
router.get("/get-user", verifyToken);

export default router;
