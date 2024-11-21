import { Request, Response } from "express";
import { Category } from "../models/category.model";

export const createCategory = async (req: Request, res: Response) => {
    const { name, description } = req.body;

    try {
        const savedCategory = await Category.create({
            name,
            description,
        });

        res.status(201).json({
            code: "success",
            category: savedCategory,
        });
    } catch (e) {
        if (e.name === "SequelizeUniqueConstraintError") {
            res.status(400).json({
                code: "error",
                message: "Category already exist",
            });
            return;
        }

        console.log(e);
        res.json(500).json({
            code: "error",
            message: "Internal server error",
        });
    }
};

export const getCategories = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const pageNumber = Math.max(1, parseInt(page as string));
        const pageSize = Math.max(1, parseInt(limit as string));

        const offset = (pageNumber - 1) * pageSize;

        const { count, rows } = await Category.findAndCountAll({
            offset,
            limit: pageSize,
            order: [["createdAt", "DESC"]],
        });

        const totalPages = Math.ceil(count / pageSize);

        res.json({
            total: count,
            page: pageNumber,
            pages: Math.ceil(count / pageSize),
            canPrev: pageNumber > 1,
            canNext: pageNumber < totalPages,
            categories: rows,
        });
    } catch (e) {
        console.log(e);
        res.json(500).json({
            code: "error",
            message: "Internal server error",
        });
    }
};
