import { TOKEN_SECRET } from "../config";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { createAccessToken } from "../libs/jwt";
import { oneDay, today } from "../constants/dates";
import { User } from "../models/user.model";
import { saveLogService } from "../services/logService";

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, userName } = req.body;
        const userFound = await User.findOne({ where: { email } });
        if (userFound) {
            res.status(400).json({
                code: "error",
                message: "This user is already registered",
            });
            return;
        }

        const newUser = { email, password, userName };
        const hashedPassword = await bcrypt.hash(password, 10);
        newUser.password = hashedPassword;

        const savedUser = await User.create(newUser);
        const token = await createAccessToken({ id: savedUser.get("id") });

        const expirationDate = new Date(today + oneDay);

        res.cookie("token", token, {
            expires: expirationDate,
            sameSite: "none",
            httpOnly: false,
            secure: true,
        });

        res.status(201).json({
            message: "User created successfully",
            user: {
                userName: savedUser.get("userName"),
                email: savedUser.get("email"),
                createdAt: savedUser.get("createdAt"),
                updatedAt: savedUser.get("updatedAt"),
                id: savedUser.get("id"),
            },
        });

        saveLogService({
            description: `${savedUser.get("userName")} Just signed up`,
            module: "Auth",
            userId: savedUser.get("id") as number,
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            code: "error",
            message: "Server internal error",
        });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const userFound = await User.findOne({ where: { email } });

        if (!userFound) {
            res.status(400).json({ code: "error", message: "User not found" });
            return;
        }

        const isMatch = await bcrypt.compare(
            password,
            userFound.get("password") as string,
        );
        if (!isMatch) {
            res.status(400).json({
                code: "error",
                message: "Sorry, this credentials are invalid",
            });
            return;
        }

        const token = await createAccessToken({ id: userFound.get("id") });

        const expirationDate = new Date(today + oneDay);

        res.cookie("token", token, {
            expires: expirationDate,
            sameSite: "none",
            httpOnly: false,
            secure: true,
        });

        res.status(200).json({
            message: "Logged in successfully",
            user: {
                userName: userFound.get("userName"),
                email: userFound.get("email"),
                createdAt: userFound.get("createdAt"),
                updatedAt: userFound.get("updatedAt"),
                id: userFound.get("id"),
            },
        });

        saveLogService({
            description: `${userFound.get("userName")} Just logged In`,
            module: "Auth",
            userId: userFound.get("id") as number,
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            code: "error",
            message: "Server internal error",
        });
    }
};

export const logout = (req: Request, res: Response) => {
    try {
        res.cookie("token", "", {
            expires: new Date(0),
            sameSite: "none",
            httpOnly: false,
            secure: true,
        });
        res.status(200).json({
            code: "success",
            message: "Logged out successfully",
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            code: "error",
            message: "Server internal error",
        });
    }
};

export const verifyToken = async (req: Request, res: Response) => {
    const { token } = req.cookies;

    try {
        if (!token) {
            res.status(401).json({ code: "error", message: "Unauthorized" });
            return;
        }

        jwt.verify(token, TOKEN_SECRET, async (err, user) => {
            if (err) {
                res.status(401).json({
                    code: "error",
                    message: "Unauthorized",
                });
                return;
            }

            const userFound = await User.findOne({ where: { id: user.id } });
            if (!userFound) {
                res.status(401).json({
                    code: "error",
                    message: "Unauthorized",
                });
                return;
            }

            res.status(200).json({
                message: "Logged in successfully",
                user: {
                    userName: userFound.get("userName"),
                    email: userFound.get("email"),
                    createdAt: userFound.get("createdAt"),
                    updatedAt: userFound.get("updatedAt"),
                    id: userFound.get("id"),
                },
            });
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            code: "error",
            message: "Server internal error",
        });
    }
};
