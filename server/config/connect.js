import mysql2 from "mysql2";
import 'dotenv/config';

export const db = mysql2.createConnection({
    host: "localhost",
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})
