import mongoose from "mongoose";
import { MONGODB_URI } from "../config";

export async function connectMongo() {
    try {
        const db = await mongoose.connect(MONGODB_URI, {
            serverApi: { version: "1", strict: true, deprecationErrors: true },
        });
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log(
            "Pinged your deployment. You successfully connected to MongoDB!",
        );
        console.log("connected to", db.connection.name);
    } catch (error) {
        console.log(error);
    }
}
