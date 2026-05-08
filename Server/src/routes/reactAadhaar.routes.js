import express from "express";
import {
  handleReactAadhaarCallback,
  skipReactAadhaarVerification,
  startReactAadhaarVerification,
} from "../controllers/reactAadhaar.controller.js";

const router = express.Router();

router.post("/start", startReactAadhaarVerification);
router.post("/skip", skipReactAadhaarVerification);
router.get("/callback", handleReactAadhaarCallback);

export default router;
