import mysql from "mysql2/promise";
import { MYSQL_DB, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_USER } from "../config";
import { Sequelize } from "sequelize";

async function createDatabaseIfNotExists() {
    try {
        const connection = await mysql.createConnection({
            host: MYSQL_HOST,
            user: MYSQL_USER,
            password: MYSQL_PASSWORD,
        });

        const [databases] = await connection.query("SHOW DATABASES LIKE ?", [
            MYSQL_DB,
        ]);
        const databasesArray = databases as Array<unknown>;

        if (databasesArray.length === 0) {
            console.log(`Database "${MYSQL_DB}" does not exist. Creating...`);
            await connection.query(`CREATE DATABASE \`${MYSQL_DB}\`;`);
            console.log(`Database "${MYSQL_DB}" created successfully.`);
        } else {
            console.log(`Database "${MYSQL_DB}" already exists.`);
        }

        await connection.end();
    } catch (error) {
        console.error("Error checking or creating database:", error);
        throw error;
    }
}

const sequelize = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PASSWORD, {
    host: MYSQL_HOST,
    dialect: "mysql",
    logging: false,
});

async function connectMySQL() {
    try {
        await createDatabaseIfNotExists();
        await sequelize.authenticate();
        console.log("Connected to MySQL");
        await sequelize.sync();
    } catch (error) {
        console.error("Unable to connect to MySQL:", error);
        throw error;
    }
}

export { sequelize, connectMySQL };
