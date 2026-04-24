import db from "../configs/db.js";

const badRequest = (message) => {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
};

export const createApplication = async (data) => {
  const { employment, salary, phone, pan, termsAccepted } = data;

  if (!employment || salary == null || !phone || !pan) {
    throw badRequest("All fields required");
  }

  if (!termsAccepted) {
    throw badRequest("Terms must be accepted");
  }

  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  const phoneRegex = /^[6-9]\d{9}$/;

  if (!panRegex.test(pan)) {
    throw badRequest("Invalid PAN");
  }

  if (!phoneRegex.test(phone)) {
    throw badRequest("Invalid Phone");
  }

  const [result] = await db.execute(
    "INSERT INTO applications (employment, salary, phone, pan, termsAccepted) VALUES (?, ?, ?, ?, ?)",
    [employment, salary, phone, pan, termsAccepted]
  );

  return {
    id: result.insertId,
    employment,
    salary,
    phone,
    pan,
  };
};
