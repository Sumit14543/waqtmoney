import express from "express";
import {
  handleAadhaarCallback,
  saveAadhaarDetails,
} from "../controllers/aadhaar.controller.js";

const router = express.Router();

router.post("/save", saveAadhaarDetails);
router.get("/callback", handleAadhaarCallback);

export default router;
