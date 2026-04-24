import app from "./src/app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

console.log("SMTP_USER:", process.env.SMTP_USER);
console.log("SMTP_PASS:", process.env.SMTP_PASS ? "EXISTS" : "MISSING");
console.log("SMTP_HOST:", process.env.SMTP_HOST);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT} ok`);
  console.log("SMTP_PORT");
});