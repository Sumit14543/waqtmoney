import express from "express";
import fs from "fs";
import multer from "multer";
import { fileURLToPath } from "url";
import {
  applyLoan,
  getIfscDetails,
  getApp,
  saveContactQuery,
  saveHeroLead,
  updateApp,
  updateBankDetailsApp,
  updateReferenceDetailsApp,
  updateWorkDetailsApp,
} from "../controllers/application.controller.js";

const router = express.Router();
const uploadDir = fileURLToPath(new URL("../../uploads/", import.meta.url));

fs.mkdirSync(uploadDir, { recursive: true });

// Multer Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const documentColumnMap = {
  selfie_photo: "selfie_photo",
  current_salary_slip: "salary_slip_current",
};

const fallbackDocumentColumns = [
  "selfie_photo",
  "salary_slip_current",
];

router.post("/apply", applyLoan);
router.post("/lead", saveHeroLead);
router.post("/contact", saveContactQuery);
router.get("/ifsc/:ifsc", getIfscDetails);
router.get("/:id", getApp);
router.put("/update", updateApp);
router.put("/work-details", updateWorkDetailsApp);
router.put("/bank-details", updateBankDetailsApp);
router.put("/reference-details", updateReferenceDetailsApp);

// Multi-file upload for docs
router.post("/upload-docs", upload.array("files", 10), (req, res, next) => {
  const parseDocumentTypes = () => {
    try {
      return JSON.parse(req.body.documentTypes || "[]");
    } catch {
      return [];
    }
  };

  if (req.files) {
    const documentTypes = parseDocumentTypes();

    req.files.forEach((file, index) => {
      const documentType = documentTypes[index] || {};
      const columnName = documentColumnMap[documentType.id] || fallbackDocumentColumns[index];

      if (columnName) {
        req.body[columnName] = `uploads/${file.filename}`;
      }
    });
  }

  delete req.body.documentTypes;
  req.body.current_step = req.body.current_step || "documents_uploaded";
  next();
}, updateApp);

router.post("/upload-video-kyc", upload.single("video"), (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Video file is required",
    });
  }

  req.body.video_kyc = `uploads/${req.file.filename}`;
  req.body.current_step = "video_kyc_completed";
  next();
}, updateApp);

export default router;
