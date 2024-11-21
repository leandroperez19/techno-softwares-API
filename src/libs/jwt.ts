import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config";

export const createAccessToken = (payload: string | object | Buffer) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET,
            {
                expiresIn: "1d",
            },
            (err, token) => {
                if (err) reject(err);
                resolve(token);
            },
        );
    });
};
