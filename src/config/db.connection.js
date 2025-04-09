require("reflect-metadata");
const { DataSource } = require("typeorm");
require("dotenv").config();

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

const DbConnection = async () => {
    try {
        await AppDataSource.initialize();
        console.log(" Database connected successfully!");
    } catch (error) {
        console.error("Database connection error:", error);
    }
};

module.exports = { DbConnection, AppDataSource };
