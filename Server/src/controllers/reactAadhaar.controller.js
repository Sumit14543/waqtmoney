import crypto from "crypto";
import db from "../configs/db.js";

const APPLICATION_TABLE = "waqt_money_loan_applications";
const CLIENT_BASE_URL = process.env.CLIENT_BASE_URL || "http://localhost:8080";
const SUCCESS_REDIRECT_PATH = "/user/work-details";

const badRequest = (message) => {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
};

const encryptData = (value) => {
  const secret = process.env.APP_SECRET_KEY || process.env.JWT_SECRET;

  if (!secret) {
    const error = new Error("APP_SECRET_KEY is not configured");
    error.statusCode = 500;
    throw error;
  }

  const key = crypto.createHash("sha256").update(secret).digest();
  const iv = crypto.createHash("sha256").update(secret).digest("hex").slice(0, 16);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  const encrypted = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);

  return encrypted.toString("base64");
};

const getBifrostToken = () =>
  process.env.BIFROST_REACT_API_TOKEN ||
  process.env.BIFROST_API_TOKEN ||
  process.env.PAN_API_KEY ||
  "";

const callBifrost = async (endpoint, payload) => {
  const token = getBifrostToken();

  if (!token) {
    const error = new Error("BIFROST_REACT_API_TOKEN is not configured");
    error.statusCode = 500;
    throw error;
  }

  const response = await fetch(`https://bifrost.unifers.ai/enrich/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(payload),
  });

  const text = await response.text();
  let data;

  try {
    data = JSON.parse(text);
  } catch {
    const error = new Error("Invalid response from Aadhaar verification service");
    error.statusCode = 502;
    throw error;
  }

  if (!response.ok || data?.error === true) {
    const error = new Error(data?.message || "Aadhaar API failed");
    error.statusCode = response.ok ? 502 : response.status;
    throw error;
  }

  return data;
};

export const startReactAadhaarVerification = async (req, res, next) => {
  try {
    const applicationId = req.body.applicationId || req.body.id;
    const aadhaar = String(req.body.aadhaar || "").replace(/\D/g, "");

    if (!applicationId) {
      throw badRequest("Application session not found. Please start again.");
    }

    if (!/^\d{12}$/.test(aadhaar)) {
      throw badRequest("Invalid Aadhaar number");
    }

    const masked = `XXXXXXXX${aadhaar.slice(-4)}`;
    const encryptedAadhaar = encryptData(aadhaar);
    const [result] = await db.execute(
      `UPDATE ${APPLICATION_TABLE}
       SET aadhaar_number = ?,
           aadhaar_masked = ?,
           aadhaar_verified = 0,
           current_step = 'react_aadhaar_verify',
           last_activity_at = NOW()
       WHERE id = ? OR application_id = ?`,
      [encryptedAadhaar, masked, applicationId, applicationId]
    );

    if (result.affectedRows === 0) {
      throw badRequest("Application not found");
    }

    const verification = await callBifrost("get-aadhaar-verification", {
      referenceId: `react-${applicationId}`,
    });

    const uniqueId = verification?.data?.uniqueId;
    const authorizationUrl = verification?.data?.authorizationUrl;

    if (!uniqueId || !authorizationUrl) {
      const error = new Error("Aadhaar API failed");
      error.statusCode = 502;
      throw error;
    }

    await db.execute(
      `UPDATE ${APPLICATION_TABLE}
       SET aadhaar_unique_id = ?,
           current_step = 'react_aadhaar_callback',
           last_activity_at = NOW()
       WHERE id = ? OR application_id = ?`,
      [String(uniqueId), applicationId, applicationId]
    );

    return res.json({
      success: true,
      status: "success",
      message: "Aadhaar verification initiated",
      data: {
        aadhaarMasked: masked,
        authorizationUrl,
        uniqueId: String(uniqueId),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const handleReactAadhaarCallback = async (req, res) => {
  try {
    const uniqueId = req.query.uniqueId || req.query.unique_id;

    if (!uniqueId) {
      return res.redirect(`${CLIENT_BASE_URL}/user/kyc-aadhaar?aadhaar=failed`);
    }

    const [rows] = await db.execute(
      `SELECT id FROM ${APPLICATION_TABLE} WHERE aadhaar_unique_id = ? LIMIT 1`,
      [String(uniqueId)]
    );

    const application = rows[0];

    if (!application) {
      return res.redirect(`${CLIENT_BASE_URL}/user/kyc-aadhaar?aadhaar=expired`);
    }

    await callBifrost("get-aadhaar-data", {
      uniqueId: String(uniqueId),
    });

    await db.execute(
      `UPDATE ${APPLICATION_TABLE}
       SET aadhaar_verified = 1,
           current_step = 'work_details',
           last_activity_at = NOW()
       WHERE id = ?`,
      [application.id]
    );

    return res.redirect(`${CLIENT_BASE_URL}${SUCCESS_REDIRECT_PATH}?aadhaar=verified`);
  } catch (error) {
    console.error("React Aadhaar callback error:", error);
    return res.redirect(`${CLIENT_BASE_URL}/user/kyc-aadhaar?aadhaar=failed`);
  }
};

export const skipReactAadhaarVerification = async (req, res, next) => {
  try {
    const applicationId = req.body.applicationId || req.body.id;

    if (!applicationId) {
      throw badRequest("Application session not found. Please start again.");
    }

    const [result] = await db.execute(
      `UPDATE ${APPLICATION_TABLE}
       SET aadhaar_verified = 0,
           current_step = 'work_details',
           last_activity_at = NOW()
       WHERE id = ? OR application_id = ?`,
      [applicationId, applicationId]
    );

    if (result.affectedRows === 0) {
      throw badRequest("Application not found");
    }

    return res.json({
      success: true,
      status: "success",
      message: "Aadhaar verification skipped temporarily",
      data: {
        nextPath: SUCCESS_REDIRECT_PATH,
      },
    });
  } catch (error) {
    next(error);
  }
};
