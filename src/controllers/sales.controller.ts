import { Request, Response } from "express";
import { Sale } from "../models/sales.model";
import { User } from "../models/user.model";
import { col, fn, Op } from "sequelize";
import { Category } from "../models/category.model";
import { getDateFilter } from "../utils/dateFilters";
import { saveLogService } from "../services/logService";

export const getSales = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const pageNumber = Math.max(1, parseInt(page as string));
        const pageSize = Math.max(1, parseInt(limit as string));

        const offset = (pageNumber - 1) * pageSize;

        const { count, rows } = await Sale.findAndCountAll({
            offset,
            limit: pageSize,
            order: [["createdAt", "DESC"]],
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: ["userName", "id"],
                },
                {
                    model: Category,
                    as: "category",
                    attributes: ["name"],
                },
            ],
        });

        const totalPages = Math.ceil(count / pageSize);

        res.json({
            total: count,
            page: pageNumber,
            pages: Math.ceil(count / pageSize),
            canPrev: pageNumber > 1,
            canNext: pageNumber < totalPages,
            sales: rows,
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            code: "error",
            message: "Internal server error",
        });
    }
};

interface SalesByCurrency {
    totalAmount: number;
    currency: string;
}

export const getSalesByCurrency = async (req: Request, res: Response) => {
    const { period = "semester" } = req.query;
    const dateFilter = getDateFilter(period as string);

    try {
        const sales = (await Sale.findAll({
            attributes: [[fn("SUM", col("amount")), "totalAmount"], "currency"],
            where: {
                date: dateFilter,
            },
            group: ["currency"],
            raw: true,
        })) as unknown as SalesByCurrency[];

        const totalSales = sales.reduce(
            (sum, sale) => sum + sale.totalAmount,
            0,
        );

        const data = sales.map((sale) => ({
            value: (sale.totalAmount / totalSales) * 100,
            currency: sale.currency,
        }));

        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error al obtener las ventas por currency",
        });
    }
};

interface SalesByCategory {
    dataValues: {
        categoryId: number;
        totalSales: number;
        category: {
            id: number;
            name: string;
        };
    };
}

export const getSalesByCategory = async (req: Request, res: Response) => {
    const { period = "semester" } = req.query;

    const dateFilter = getDateFilter(period as string);

    try {
        const salesByCategory = (await Sale.findAll({
            attributes: [
                "categoryId",
                [fn("SUM", col("amount")), "totalSales"],
            ],
            where: {
                date: dateFilter,
            },
            group: ["categoryId"],
            order: [[fn("SUM", col("amount")), "DESC"]],
            include: [
                {
                    model: Category,
                    as: "category",
                    attributes: ["name", "id"],
                },
            ],
        })) as unknown as SalesByCategory[];

        const totalSales = salesByCategory.reduce((sum: number, sale) => {
            return sum + parseFloat(sale.dataValues.totalSales.toString());
        }, 0);

        const formattedData = salesByCategory.map((sale) => ({
            category: {
                id: sale.dataValues.category.id,
                name: sale.dataValues.category.name,
            },
            percentage: (
                (parseFloat(sale.dataValues.totalSales.toString()) /
                    totalSales) *
                100
            ).toFixed(2),
        }));

        res.status(200).json(formattedData);
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Internal server error",
            code: "error",
        });
    }
};

interface SaleOvertime {
    dataValues: {
        date: string;
        totalSales: number;
        currency: "USD" | "GBP" | "EUR";
    };
}

export const getSalesOverTime = async (req: Request, res: Response) => {
    const { period = "semester" } = req.query;

    const dateFilter = getDateFilter(period as string);

    try {
        const sales = (await Sale.findAll({
            attributes: [
                "date",
                "currency",
                [fn("SUM", col("amount")), "totalSales"],
            ],
            where: {
                date: dateFilter,
            },
            group: ["date", "currency"],
            order: [["date", "ASC"]],
        })) as unknown as SaleOvertime[];

        const formattedSales = sales.map((sale) => ({
            date: sale.dataValues.date,
            close: parseFloat(sale.dataValues.totalSales.toString()),
            currency: sale.dataValues.currency,
        }));

        res.status(200).json(formattedSales);
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Internal server error",
            code: "error",
        });
    }
};

export const createSale = async (req: Request, res: Response) => {
    const {
        userId,
        categoryId,
        amount,
        currency,
        itemType,
        itemName,
        description,
        date,
    } = req.body;

    try {
        const category = await Category.findByPk(categoryId);

        if (!category) {
            res.status(400).json({
                code: "error",
                message: `Category with ID ${categoryId} does not exist.`,
            });
            return;
        }

        const newSale = await Sale.create({
            userId,
            categoryId,
            amount,
            currency,
            itemType,
            itemName,
            description,
            date,
        });

        res.status(201).json({
            message: "Sale created successfully",
            sale: newSale,
        });

        saveLogService({
            description: `Sale created with ID: ${newSale.get("id")}`,
            module: "Sales",
            userId,
        });
    } catch (e) {
        console.log(e);
        res.json(500).json({
            code: "error",
            message: "Internal server error",
        });
    }
};
