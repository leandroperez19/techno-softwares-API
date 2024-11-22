import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import salesRoutes from "./routes/sales.routes";
import categoriesRoute from "./routes/categories.routes";
import logsRoutes from "./routes/logs.routes";
import cookieParser from "cookie-parser";
import { FRONT_URL } from "./config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: FRONT_URL,
        methods: ["GET", "PUT", "POST", "DELETE"],
        credentials: true,
        allowedHeaders: ["Content-Type"],
    }),
);

app.use(cookieParser());
app.use("/api", authRoutes);
app.use("/api", salesRoutes);
app.use("/api", categoriesRoute);
app.use("/api", logsRoutes);

export default app;
