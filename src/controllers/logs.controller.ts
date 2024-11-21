import { Request, Response } from "express";
import { Log } from "../models/log.model";

export const getLogs = async (req: Request, res: Response) => {
    const { page = 1, limit = 10, module } = req.query;

    try {
        const pageNumber = Math.max(1, parseInt(page as string));
        const pageSize = Math.max(1, parseInt(limit as string));

        const query = module ? { module } : {};

        const totalLogs = await Log.countDocuments(query);
        const logs = await Log.find(query)
            .sort({ createdAt: -1 })
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize);

        const totalPages = Math.ceil(totalLogs / pageSize);

        res.json({
            total: totalLogs,
            page: pageNumber,
            pages: totalPages,
            canPrev: pageNumber > 1,
            canNext: pageNumber < totalPages,
            logs,
        });
    } catch (error) {
        console.error("Error fetching logs:", error);
        res.status(500).json({
            code: "error",
            message: "Internal server error",
        });
    }
};
