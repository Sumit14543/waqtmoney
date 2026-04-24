import { sendOTPService, verifyOTPService } from "../services/otp.service.js";

export const sendOTP = async (req, res, next) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    await sendOTPService(email);
    res.json({ success: true, message: "OTP Sent" });
  } catch (err) {
    // next(err);
    res.json({message: err.message})
  }
};

export const verifyOTP = (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  const result = verifyOTPService(email, otp);

  if (result === true) {
    return res.json({ message: "OTP Verified" });
  }

  if (result === "expired") {
    return res.status(400).json({ message: "OTP Expired" });
  }

  return res.status(400).json({ message: "Invalid OTP" });
};
