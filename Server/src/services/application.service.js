import db from "../configs/db.js";

const APPLICATION_TABLE = "waqt_money_loan_applications";
const HERO_LEADS_TABLE = "waqt_money_hero_leads";
const CONTACT_QUERIES_TABLE = "waqt_money_contact_queries";

const badRequest = (message) => {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
};

const ensureColumns = async (columns) => {
  const [existingColumns] = await db.execute(
    `SELECT COLUMN_NAME
     FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = ?`,
    [APPLICATION_TABLE]
  );

  const existingNames = new Set(existingColumns.map((column) => column.COLUMN_NAME));

  for (const [name, definition] of columns) {
    if (!existingNames.has(name)) {
      await db.execute(`ALTER TABLE ${APPLICATION_TABLE} ADD COLUMN ${name} ${definition}`);
    }
  }
};

export const updateApplication = async (id, data) => {
  if (!id) throw badRequest("Application ID is required for update");

  if (Object.prototype.hasOwnProperty.call(data, "video_kyc")) {
    await ensureColumns([["video_kyc", "varchar(255) NULL"]]);
  }

  if (Object.prototype.hasOwnProperty.call(data, "selfie_photo")) {
    await ensureColumns([["selfie_photo", "varchar(255) NULL"]]);
  }

  const fieldMap = {
    employment: "employment_status",
    salary: "monthly_income",
    phone: "mobile",
    pan: "pan_number",
    email: "email",
    name: "full_name",
    fullName: "full_name",
    dob: "dob",
    pincode: "pincode",
    city: "city",
  };

  const entries = Object.entries(data)
    .filter(([field]) => field !== "termsAccepted")
    .map(([field, value]) => [fieldMap[field] || field, value]);

  if (entries.length === 0) return null;

  const setClause = entries.map(([field]) => `${field} = ?`).join(", ");
  const values = [...entries.map(([, value]) => value), id];

  const [result] = await db.execute(
    `UPDATE ${APPLICATION_TABLE} SET ${setClause}, last_activity_at = NOW() WHERE id = ?`,
    values
  );

  return result;
};

export const getApplicationById = async (id) => {
  if (!id) throw badRequest("Application ID is required");

  const [rows] = await db.execute(
    `SELECT *
     FROM ${APPLICATION_TABLE}
     WHERE id = ? OR application_id = ?
     LIMIT 1`,
    [id, id]
  );

  return rows[0] || null;
};

export const createHeroLead = async (data) => {
  const mobile = String(data.mobile || data.phone || "").replace(/\D/g, "");

  if (!/^[6-9]\d{9}$/.test(mobile)) {
    throw badRequest("Invalid mobile number");
  }

  await db.execute(
    `CREATE TABLE IF NOT EXISTS ${HERO_LEADS_TABLE} (
      id INT AUTO_INCREMENT PRIMARY KEY,
      mobile VARCHAR(15) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
  );

  const [result] = await db.execute(
    `INSERT INTO ${HERO_LEADS_TABLE} (mobile) VALUES (?)`,
    [mobile]
  );

  return {
    id: result.insertId,
    mobile,
  };
};

export const createContactQuery = async (data) => {
  const fullName = String(data.fullName || data.name || "").trim();
  const mobile = String(data.mobile || data.phone || "").replace(/\D/g, "");
  const email = String(data.email || "").trim().toLowerCase();
  const message = String(data.message || "").trim();

  if (!fullName) throw badRequest("Full name is required");
  if (!/^[6-9]\d{9}$/.test(mobile)) throw badRequest("Invalid mobile number");
  if (!/^\S+@\S+\.\S+$/.test(email)) throw badRequest("Valid email is required");

  await db.execute(
    `CREATE TABLE IF NOT EXISTS ${CONTACT_QUERIES_TABLE} (
      id INT AUTO_INCREMENT PRIMARY KEY,
      full_name VARCHAR(255) NOT NULL,
      mobile VARCHAR(15) NOT NULL,
      email VARCHAR(255) NOT NULL,
      message TEXT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
  );

  const [columns] = await db.execute(
    `SELECT COLUMN_NAME
     FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = ?
       AND COLUMN_NAME = 'email'`,
    [CONTACT_QUERIES_TABLE]
  );

  if (columns.length === 0) {
    await db.execute(
      `ALTER TABLE ${CONTACT_QUERIES_TABLE}
       ADD COLUMN email VARCHAR(255) NOT NULL AFTER mobile`
    );
  }

  const [result] = await db.execute(
    `INSERT INTO ${CONTACT_QUERIES_TABLE}
      (full_name, mobile, email, message)
     VALUES (?, ?, ?, ?)`,
    [fullName, mobile, email, message || null]
  );

  return {
    id: result.insertId,
    fullName,
    mobile,
    email,
  };
};

export const updateWorkDetails = async (id, data) => {
  if (!id) throw badRequest("Application ID is required for update");

  await ensureColumns([
    ["company_name", "varchar(255) NULL"],
    ["designation", "varchar(255) NULL"],
    ["office_email", "varchar(255) NULL"],
    ["salary_day", "int NULL"],
    ["office_address", "text NULL"],
    ["office_pincode", "varchar(10) NULL"],
    ["education", "varchar(100) NULL"],
    ["experience_years", "int NULL"],
  ]);

  const company = String(data.company || data.company_name || "").trim();
  const designation = String(data.designation || "").trim();
  const officeEmail = String(data.email || data.office_email || "").trim();
  const salaryDay = Number(data.salaryDay || data.salary_day || data.salaryDate);
  const officeAddress = String(data.address || data.office_address || "").trim();
  const officePincode = String(data.pincode || data.office_pincode || "").replace(/\D/g, "").slice(0, 6);
  const education = String(data.education || "").trim();
  const experienceYears = Number(data.experience || data.experience_years);

  if (!company) throw badRequest("Company name is required");
  if (!designation) throw badRequest("Designation is required");
  if (officeEmail && !/^\S+@\S+\.\S+$/.test(officeEmail)) throw badRequest("Valid office email is required");
  if (!Number.isInteger(salaryDay) || salaryDay < 1 || salaryDay > 31) {
    throw badRequest("Salary day must be between 1 and 31");
  }
  if (!officeAddress) throw badRequest("Office address is required");
  if (!/^\d{6}$/.test(officePincode)) throw badRequest("Valid office pincode is required");
  if (!education) throw badRequest("Education is required");
  if (!Number.isFinite(experienceYears) || experienceYears < 0 || experienceYears > 50) {
    throw badRequest("Experience must be between 0 and 50 years");
  }

  const [result] = await db.execute(
    `UPDATE ${APPLICATION_TABLE}
     SET company_name = ?,
         designation = ?,
         office_email = ?,
         salary_day = ?,
         office_address = ?,
         office_pincode = ?,
         education = ?,
         experience_years = ?,
         current_step = 'bank_details',
         last_activity_at = NOW()
     WHERE id = ? OR application_id = ?`,
    [
      company,
      designation,
      officeEmail,
      salaryDay,
      officeAddress,
      officePincode,
      education,
      experienceYears,
      id,
      id,
    ]
  );

  if (result.affectedRows === 0) {
    throw badRequest("Application not found");
  }

  return result;
};

export const updateBankDetails = async (id, data) => {
  if (!id) throw badRequest("Application ID is required for update");

  const ifsc = String(data.ifsc || data.ifsc_code || "").trim().toUpperCase();
  const bankName = String(data.bankName || data.bank_name || "").trim();
  const branchName = String(data.branchName || data.branch_name || "").trim();
  const accountHolder = String(data.holderName || data.account_holder || "").trim();
  const accountNumber = String(data.accountNumber || data.account_number || "").replace(/\D/g, "");

  if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc)) throw badRequest("Invalid IFSC format");
  if (!bankName) throw badRequest("Bank name is required");
  if (!branchName) throw badRequest("Branch name is required");
  if (!accountHolder) throw badRequest("Account holder name is required");
  if (!/^[A-Za-z\s]+$/.test(accountHolder)) throw badRequest("Only alphabets allowed in holder name");
  if (!/^\d{9,18}$/.test(accountNumber)) throw badRequest("Enter 9-18 digit valid account number");

  const [result] = await db.execute(
    `UPDATE ${APPLICATION_TABLE}
     SET bank_name = ?,
         branch_name = ?,
         account_holder = ?,
         account_number = ?,
         ifsc_code = ?,
         current_step = 'references',
         last_activity_at = NOW()
     WHERE id = ? OR application_id = ?`,
    [bankName, branchName, accountHolder, accountNumber, ifsc, id, id]
  );

  if (result.affectedRows === 0) {
    throw badRequest("Application not found");
  }

  return result;
};

export const updateReferenceDetails = async (id, data) => {
  if (!id) throw badRequest("Application ID is required for update");

  await ensureColumns([
    ["reference1_name", "varchar(255) NULL"],
    ["reference1_mobile", "varchar(15) NULL"],
    ["reference1_relation", "varchar(100) NULL"],
    ["reference2_name", "varchar(255) NULL"],
    ["reference2_mobile", "varchar(15) NULL"],
    ["reference2_relation", "varchar(100) NULL"],
  ]);

  const reference1Name = String(data.reference1Name || data.reference1_name || "").trim();
  const reference1Mobile = String(data.reference1Mobile || data.reference1_mobile || "").replace(/\D/g, "");
  const reference1Relation = String(data.reference1Relation || data.reference1_relation || "").trim();
  const reference2Name = String(data.reference2Name || data.reference2_name || "").trim();
  const reference2Mobile = String(data.reference2Mobile || data.reference2_mobile || "").replace(/\D/g, "");
  const reference2Relation = String(data.reference2Relation || data.reference2_relation || "").trim();

  if (!reference1Name) throw badRequest("Reference 1 name is required");
  if (!/^[6-9]\d{9}$/.test(reference1Mobile)) throw badRequest("Reference 1 mobile number is invalid");
  if (!reference1Relation) throw badRequest("Reference 1 relation is required");
  if (!reference2Name) throw badRequest("Reference 2 name is required");
  if (!/^[6-9]\d{9}$/.test(reference2Mobile)) throw badRequest("Reference 2 mobile number is invalid");
  if (!reference2Relation) throw badRequest("Reference 2 relation is required");

  const [result] = await db.execute(
    `UPDATE ${APPLICATION_TABLE}
     SET reference1_name = ?,
         reference1_mobile = ?,
         reference1_relation = ?,
         reference2_name = ?,
         reference2_mobile = ?,
         reference2_relation = ?,
         current_step = 'upload_docs',
         last_activity_at = NOW()
     WHERE id = ? OR application_id = ?`,
    [
      reference1Name,
      reference1Mobile,
      reference1Relation,
      reference2Name,
      reference2Mobile,
      reference2Relation,
      id,
      id,
    ]
  );

  if (result.affectedRows === 0) {
    throw badRequest("Application not found");
  }

  return result;
};

export const createApplication = async (data) => {
  const employment = data.employment || data.employment_status;
  const salary = data.salary ?? data.monthly_income;
  const phone = data.phone || data.mobile;
  const pan = data.pan || data.pan_number;
  const email = data.email;
  const termsAccepted = data.termsAccepted ?? data.terms_accepted;

  const missingFields = [];
  if (!employment) missingFields.push("employment");
  if (salary == null || salary === "") missingFields.push("salary");
  if (!phone) missingFields.push("phone");

  if (missingFields.length > 0) {
    throw badRequest(`Missing required fields: ${missingFields.join(", ")}`);
  }

  if (!termsAccepted) {
    throw badRequest("Terms must be accepted");
  }

  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  const phoneRegex = /^[6-9]\d{9}$/;

  if (pan && !panRegex.test(pan)) {
    throw badRequest("Invalid PAN");
  }

  if (!phoneRegex.test(phone)) {
    throw badRequest("Invalid Phone");
  }

  const applicationId = `WM${Date.now().toString().slice(-10)}${Math.floor(Math.random() * 90 + 10)}`;

  const [result] = await db.execute(
    `INSERT INTO ${APPLICATION_TABLE}
      (application_id, loan_type, mobile, email, pan_number, employment_status, monthly_income, current_step, last_activity_at)
     VALUES (?, 'payday', ?, ?, ?, ?, ?, 'basic_details', NOW())`,
    [applicationId, phone, email || null, pan || null, employment, salary]
  );

  return {
    id: result.insertId,
    applicationId,
    employment,
    salary,
    phone,
    pan: pan || null,
  };
};
