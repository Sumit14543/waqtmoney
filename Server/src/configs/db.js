import mysql from "mysql2/promise";
import "./env.js";

const rawDbPassword = process.env.DB_PASSWORD ?? process.env.DB_PASS ?? "";
const dbPassword =
  rawDbPassword === "" || rawDbPassword.toLowerCase() === "null"
    ? undefined
    : rawDbPassword;

const poolConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  database: process.env.DB_NAME || "salaryseva",
  port: Number.parseInt(process.env.DB_PORT || "3306", 10),
  waitForConnections: true,
  connectionLimit: 10,
};

if (dbPassword !== undefined) {
  poolConfig.password = dbPassword;
}

const db = mysql.createPool(poolConfig);

// Test the database connection
(async () => {
  try {
    const connection = await db.getConnection();
    console.log("✅ MySQL connection established successfully.");
    connection.release();
  } catch (error) {
    console.error("❌ MySQL connection failed:", error.message);
  }
})();

export default db;
