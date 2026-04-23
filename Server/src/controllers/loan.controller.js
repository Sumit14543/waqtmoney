import { createLoan } from "../services/loan.service.js";

export const addLoan = async (req, res, next) => {
  try {
    const { amount, purpose, hasLoan } = req.body;

    if (!amount || !purpose || !hasLoan) {
      return res.status(400).json({ message: "All fields required" });
    }

    const result = await createLoan(req.body);

    res.json({ message: "Loan saved", id: result.insertId });
  } catch (err) {
    next(err);
  }
};