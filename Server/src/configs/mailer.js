import "./env.js";
import nodemailer from "nodemailer";

const smtpHost = process.env.SMTP_HOST?.trim();
const smtpUser = (process.env.SMTP_USER || process.env.SMTP_USERNAME)?.trim();
const smtpPass = (process.env.SMTP_PASS || process.env.SMTP_PASSWORD)?.trim();
const smtpPort = Number.parseInt(process.env.SMTP_PORT ?? "587", 10);
const smtpSecure = (process.env.SMTP_SECURE || "").trim().toLowerCase();

if (!smtpHost || !smtpUser || !smtpPass || Number.isNaN(smtpPort)) {
  throw new Error(
    "Invalid SMTP configuration. Ensure SMTP_HOST, SMTP_PORT, SMTP_USER/SMTP_USERNAME, and SMTP_PASS/SMTP_PASSWORD are set.",
  );
}

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpSecure === "ssl" || smtpSecure === "true" || smtpPort === 465,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
  tls: {
    // This helps with Hostinger and other providers that might have self-signed certificates or strict Node.js TLS requirements
    rejectUnauthorized: false
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 20000,
});

export default transporter;
