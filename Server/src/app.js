import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import loanRoutes from "./routes/loan.routes.js";
import otpRoutes from "./routes/otp.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
dotenv.config()
const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("Request:", req.method, req.url);
  next();
});

app.get("/", (req, res) => {
  res.send("Server is working");
});

app.use("/api/loan", loanRoutes);
app.use("/api/application", applicationRoutes);
app.use("/api/otp", otpRoutes);

console.log("SMTP_USER:", process.env.SMTP_USER);
console.log("SMTP_PASS:", process.env.SMTP_PASS ? "EXISTS" : "MISSING");
console.log("SMTP_HOST:", process.env.SMTP_HOST);
console.log("SMTP_PORT:", process.env.SMTP_PORT);

app.use(errorHandler);

export default app;
