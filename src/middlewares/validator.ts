import { NextFunction, Request, Response } from "express";
import { ZodError, ZodObject } from "zod";

interface validatorOptions {
    isQuery?: boolean;
}

export const validateSchema =
    (schema: ZodObject<any>, options?: validatorOptions) =>
    (req: Request, res: Response, next: NextFunction): void => {
        const { isQuery = false } = options || {};
        try {
            isQuery ? schema.parse(req.query) : schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({
                    code: "error",
                    message: error.errors.map((err) => err.message)[0],
                });
                return;
            }
            next(error);
        }
    };

// export const validatePagination = (
//     req: Request,
//     res: Response,
//     next: NextFunction,
// ) => {
//     try {
//         const validatedQuery = paginationSchema.parse(req.query);
//         req.query = {
//             page: validatedQuery.page.toString(),
//             limit: validatedQuery.limit.toString(),
//         };
//         next();
//     } catch (error) {
//         if (error instanceof ZodError) {
//             res.status(400).json({
//                 code: "error",
//                 message: error.errors[0].message,
//             });
//             return;
//         }
//         next(error);
//     }
// };
