import dotenv from "dotenv";
dotenv.config();

export const MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://localhost:27017";
export const PORT = process.env.PORT || 4000;
export const TOKEN_SECRET = process.env.TOKEN_SECRET || "secret";
export const FRONT_URL = process.env.FRONT_URL || "http://localhost:5173";
export const MYSQL_HOST = process.env.MYSQL_HOST || "localhost";
export const MYSQL_USER = process.env.MYSQL_USER || "root";
export const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || "root";
export const MYSQL_DB = process.env.MYSQL_DB || "techno-test";
