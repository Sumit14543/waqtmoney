import db from "../configs/db.js";

const APPLICATION_TABLE = "waqt_money_loan_applications";

export const createLoan = async (data) => {
  const { id, amount, purpose, hasLoan } = data;

  if (id) {
    const [result] = await db.execute(
      `UPDATE ${APPLICATION_TABLE}
       SET loan_amount = ?, loan_purpose = ?, has_running_loan = ?, current_step = 'loan_requirement', last_activity_at = NOW()
       WHERE id = ?`,
      [amount, purpose, hasLoan === "yes" || hasLoan === true ? 1 : 0, id]
    );
    return result;
  }

  const [result] = await db.execute(
    `INSERT INTO ${APPLICATION_TABLE}
      (application_id, mobile, loan_amount, loan_purpose, has_running_loan, current_step, last_activity_at)
     VALUES (?, ?, ?, ?, ?, 'loan_requirement', NOW())`,
    [
      `WM${Date.now().toString().slice(-10)}${Math.floor(Math.random() * 90 + 10)}`,
      data.phone || "",
      amount,
      purpose,
      hasLoan === "yes" || hasLoan === true ? 1 : 0,
    ]
  );

  return result;
};
