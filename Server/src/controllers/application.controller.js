import db from "../config/db.js";

export const applyLoan = async (req, res, next) => {
  try {
    const { employment, salary, phone, pan, termsAccepted } = req.body;

    if (!employment || !salary || !phone || !pan || !termsAccepted) {
      return res.status(400).json({ message: "All fields required" });
    }

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!panRegex.test(pan)) {
      return res.status(400).json({ message: "Invalid PAN" });
    }

    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: "Invalid Phone" });
    }

    const [result] = await db.execute(
      "INSERT INTO applications (employment, salary, phone, pan, termsAccepted) VALUES (?, ?, ?, ?, ?)",
      [employment, salary, phone, pan, termsAccepted]
    );

    res.json({
      message: "Application submitted",
      id: result.insertId,
    });
  } catch (err) {
    next(err);
  }
};