import { sendOTPService, verifyOTPService } from "../services/otp.service.js";

export const sendOTP = async (req, res, next) => {
  const { email, phone } = req.body;

  try {
    if (!email && !phone) {
      return res.status(400).json({ success: false, message: "Phone or email is required" });
    }

    const result = await sendOTPService({ email, phone });
    return res.status(200).json({ success: true, message: "OTP sent", data: result });
  } catch (err) {
    if (err.statusCode === 429) {
      return res.status(429).json({ success: false, message: err.message });
    }
    if (err.details) {
      return res.status(err.statusCode || 500).json({
        success: false,
        message: err.message,
        details: err.details,
      });
    }
    return next(err);
  }
};

export const verifyOTP = (req, res) => {
  const { email, phone, otp } = req.body;

  if ((!email && !phone) || !otp) {
    return res.status(400).json({ success: false, message: "Phone/email and OTP are required" });
  }

  const result = verifyOTPService({ email, phone, otp });

  if (result === true) {
    return res.status(200).json({ success: true, message: "OTP Verified" });
  }

  if (result === "expired") {
    return res.status(400).json({ success: false, message: "OTP Expired" });
  }

  return res.status(400).json({ success: false, message: "Invalid OTP" });
};
