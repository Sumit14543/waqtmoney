import db from "../config/db.js";

export const createLoan = async (data) => {
  const { amount, purpose, hasLoan } = data;

  const [result] = await db.execute(
    "INSERT INTO loans (amount, purpose, hasLoan) VALUES (?, ?, ?)",
    [amount, purpose, hasLoan]
  );

  return result;
};