import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config";

export const authRequired = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { token } = req.cookies;

    if (!token) {
        res.status(401).json({ code: "error", message: "Unauthorized" });
        return;
    }
    jwt.verify(token, TOKEN_SECRET, async (err: unknown, decoded) => {
        if (err)
            return res
                .status(403)
                .json({ code: "error", message: "Forbidden" });
        if (!decoded)
            return res.status(400).json({
                code: "error",
                message: "Server internal error",
            });

        req.body = { ...req.body, userId: decoded.id };
        next();
    });
};
