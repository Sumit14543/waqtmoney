import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "salaryseva",
  waitForConnections: true,
  connectionLimit: 10,
});

console.log("✅ MySQL Pool Created");


export default db;