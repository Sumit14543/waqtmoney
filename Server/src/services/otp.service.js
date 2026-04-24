import transporter from "../configs/mailer.js";

let otpStore = {};

export const sendOTPService = async (email) => {
  if (!email) {
    const error = new Error("Email is required");
    error.statusCode = 400;
    throw error;
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  console.log("📩 OTP:", otp, "To:", email);

  otpStore[email] = {
    otp,
    expires: Date.now() + 5 * 60 * 1000,
  };

  await transporter.sendMail({
    from: `<${process.env.SMTP_USER}>`,
    to: email,
    subject: "OTP",
    html: `<h2>${otp}</h2>`,
  });
};

export const verifyOTPService = (email, otp) => {
  const record = otpStore[email];

  if (!record) {
    return false;
  }

  if (Date.now() > record.expires) {
    delete otpStore[email];
    return "expired";
  }

  const isValid = record.otp == otp;

  if (isValid) {
    delete otpStore[email];
  }

  return isValid;
};
