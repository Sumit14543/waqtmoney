import express from "express";
import { verifyPan, getCityByPincode } from "../controllers/pan.controller.js";

const router = express.Router();

router.post("/verify", verifyPan);
router.post("/pincode", getCityByPincode);

export default router;