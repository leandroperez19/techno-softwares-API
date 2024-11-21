import { PORT } from "./config";
import app from "./app";
import { connectDatabases } from "./db";
import "./models/relations";

async function main() {
    try {
        await connectDatabases();

        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
        });
    } catch (error) {
        console.error("Application failed to start:", error);
        process.exit(1);
    }
}

main();
