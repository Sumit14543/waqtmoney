import "./src/configs/env.js";
import app from "./src/app.js";
import express from "express";
import transporter from "./src/configs/mailer.js";
import panRoutes from "./src/routes/pan.route.js";
const PORT = Number.parseInt(process.env.PORT ?? "5000", 10);
app.use(express.json());
app.use("/api/pan", panRoutes);
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  transporter
    .verify()
    .then(() => {
      console.log("SMTP transport verified.");
    })
    .catch((error) => {
      console.error("SMTP verification failed:", error.message);
    });
};

startServer();
