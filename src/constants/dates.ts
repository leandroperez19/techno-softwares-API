export const ayear = 31536000000;

export const oneDay = 24 * 60 * 60 * 1000;

export const today = new Date().getTime();

export const DATE_CONSTANTS = {
    ONE_MONTH_AGO: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    SIX_MONTHS_AGO: new Date(new Date().setMonth(new Date().getMonth() - 6)),
    ONE_YEAR_AGO: new Date(
        new Date().setFullYear(new Date().getFullYear() - 1),
    ),
    START_OF_TODAY: new Date(new Date().setHours(0, 0, 0, 0)),
};
