import express from "express";
import cors from "cors";
import loanRoutes from "./routes/loan.routes.js";
import otpRoutes from "./routes/otp.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import panRoutes from "./routes/pan.route.js";
import aadhaarRoutes from "./routes/aadhaar.routes.js";
import reactAadhaarRoutes from "./routes/reactAadhaar.routes.js";

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
app.use("/api/auth", authRoutes);
app.use("/api/pan", panRoutes);
app.use("/api/aadhaar", aadhaarRoutes);
app.use("/api/react-aadhaar", reactAadhaarRoutes);

app.use(errorHandler);

export default app;
