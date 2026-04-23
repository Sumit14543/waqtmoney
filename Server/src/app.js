import express from "express";
import cors from "cors";
import loanRoutes from "./routes/loan.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/loan", loanRoutes);
app.use("/api/apply", applicationRoutes);

app.get("/", (req, res) => {
  res.send("🚀 API running...");
});

app.use(errorHandler);

export default app;