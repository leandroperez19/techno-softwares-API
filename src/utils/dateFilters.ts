import { Op } from "sequelize";
import { DATE_CONSTANTS } from "../constants/dates";

export const dateFilters = {
    month: { [Op.gte]: DATE_CONSTANTS.ONE_MONTH_AGO },
    semester: { [Op.gte]: DATE_CONSTANTS.SIX_MONTHS_AGO },
    year: { [Op.gte]: DATE_CONSTANTS.ONE_YEAR_AGO },
    today: { [Op.gte]: DATE_CONSTANTS.START_OF_TODAY },
} as const;

export const getDateFilter = (period: string) => {
    return dateFilters[period] ?? dateFilters["today"];
};
