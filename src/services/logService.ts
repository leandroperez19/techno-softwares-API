import { ZodError } from "zod";
import { Log } from "../models/log.model";
import { LogData, logSchema } from "../schemas/logSchema";
import { User } from "../models/user.model";

export const saveLogService = async (logData: LogData) => {
    try {
        const validData = logSchema.safeParse(logData);

        if (!validData.success) return;

        const userFound = await User.findOne({
            where: { id: validData.data.userId },
        });

        if (!userFound) return;

        const newLog = new Log({
            ...validData.data,
            userName: userFound.get("userName"),
        });
        await newLog.save();
    } catch (e) {
        if (e instanceof ZodError) {
            console.error("Validation error:", e.errors);
            return;
        }
        console.error("Failed to save log:", e);
    }
};
