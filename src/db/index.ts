import { connectMongo } from "./mongo";
import { connectMySQL, sequelize } from "./mySQL";

async function connectDatabases() {
    try {
        await connectMongo();
        console.log("Connected to MongoDB");

        await connectMySQL();
    } catch (error) {
        console.error("Failed to connect to databases:", error);
        process.exit(1);
    }
}

export { sequelize, connectDatabases };
