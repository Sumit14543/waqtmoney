import db from "../configs/db.js";
export const verifyPan = async (req, res) => {
  console.log("verifyPan route hit");
  console.log("REQ BODY:", req.body);

  const findValueByKeys = (source, keys) => {
    if (!source || typeof source !== "object") return "";

    const normalizeKey = (key) => String(key).toLowerCase().replace(/[^a-z0-9]/g, "");
    const normalizedKeys = keys.map(normalizeKey);

    for (const key of keys) {
      if (source[key]) return source[key];
    }

    for (const [key, value] of Object.entries(source)) {
      if (normalizedKeys.includes(normalizeKey(key)) && value) return value;
    }

    for (const value of Object.values(source)) {
      const nestedValue = findValueByKeys(value, keys);
      if (nestedValue) return nestedValue;
    }

    return "";
  };

  const formatDate = (date) => {
    if (!date) return "";

    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) {
      return String(date).slice(0, 10);
    }

    return parsedDate.toISOString().split("T")[0];
  };

  const maskAadhaar = (value) => {
    const compact = String(value || "").replace(/\s/g, "");
    const digits = compact.replace(/\D/g, "");

    if (/^\d{12}$/.test(digits)) return `XXXXXXXX${digits.slice(-4)}`;
    if (/^X{8,}\d{4}$/i.test(compact)) return `XXXXXXXX${compact.slice(-4)}`;
    if (/^\d{2}X{8}\d{2}$/i.test(compact)) return `${compact.slice(0, 2)}XXXXXXXX${compact.slice(-2)}`;
    if (/^\d+X+\d{1,3}$/i.test(compact)) {
      const lastDigits = compact.match(/\d{1,3}$/)?.[0] || "";
      return compact.length >= 4 && lastDigits.length === 2
        ? `${compact.slice(0, 2)}XXXXXXXX${lastDigits}`
        : "";
    }

    const trailingDigits = compact.match(/\d{4}$/);
    if (trailingDigits) return `XXXXXXXX${trailingDigits[0]}`;

    return "";
  };

  const PAN_Number = String(req.body.PAN_Number || req.body.pan || "").toUpperCase();
  const applicationId = req.body.applicationId || req.body.id || null;

  if (!PAN_Number) {
    return res.status(400).json({ message: "PAN is required" });
  }

  if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(PAN_Number)) {
    return res.status(400).json({ message: "Invalid PAN format" });
  }

  try {
    const apiRes = await fetch("https://bifrost.unifers.ai/enrich/get-pan-details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${process.env.BIFROST_API_TOKEN || process.env.PAN_API_KEY || ""}`,
      },
      body: JSON.stringify({
        PAN_Number,
        Concent_Text:
          "We confirm and undertake that valid end-user consent has been obtained for fetching PAN DETAILS using PAN NUMBER, and that such consent remains active and unrevoked at the time of this request.",
        Concent: "Y",
      }),
    });

    const text = await apiRes.text();
    console.log("RAW PAN API RESPONSE:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return res.status(500).json({ message: "Invalid JSON from PAN API" });
    }

    if (!apiRes.ok || data?.error === true) {
      return res.status(apiRes.ok ? 502 : apiRes.status).json({
        message: data?.message || "PAN API failed",
      });
    }

    const result = data?.data?.result || {};
    const fullName = result.full_name || result.fullName || "";
    const dob = formatDate(result.dob);
    const fatherNameKeys = [
      "father_name",
      "fatherName",
      "fathers_name",
      "fathersName",
      "father_full_name",
      "fatherFullName",
      "father",
      "fatherNameOnPan",
      "father_name_on_pan",
      "father_or_spouse_name",
      "fatherOrSpouseName",
      "parent_name",
      "parentName",
      "guardian_name",
      "guardianName",
    ];
    const fatherName = findValueByKeys(result, fatherNameKeys) || findValueByKeys(data, fatherNameKeys);
    const gender =
      findValueByKeys(result, ["gender", "gender_name", "genderName", "sex"]) ||
      findValueByKeys(data, ["gender", "gender_name", "genderName", "sex"]);
    const aadhaarKeys = [
      "aadhaar",
      "aadhar",
      "aadhaar_number",
      "aadhar_number",
      "aadhaarNumber",
      "aadharNumber",
      "masked_aadhaar",
      "masked_aadhar",
      "aadhaar_masked",
      "aadhar_masked",
      "maskedAadhaar",
      "maskedAadhar",
      "uid",
      "uidai",
    ];
    const aadhaarMasked = maskAadhaar(
      findValueByKeys(result, aadhaarKeys) || findValueByKeys(data, aadhaarKeys)
    );

    console.log("PAN extracted fields:", {
      resultKeys: Object.keys(result),
      hasFatherName: Boolean(fatherName),
      hasGender: Boolean(gender),
      hasAadhaarMasked: Boolean(aadhaarMasked),
      gender: gender || null,
    });

    if (!fullName || !dob) {
      return res.status(502).json({ message: "PAN details not found" });
    }

    if (applicationId) {
      await db.execute(
        `UPDATE waqt_money_loan_applications
         SET pan_number = ?, full_name = ?, dob = ?, current_step = 'pan_verify', last_activity_at = NOW()
         WHERE id = ?`,
        [PAN_Number, fullName, dob, applicationId]
      );
    }

    return res.json({
      success: true,
      status: "success",
      pan: PAN_Number,
      name: fullName,
      full_name: fullName,
      dob,
      father_name: fatherName,
      fatherName,
      gender,
      aadhaarMasked,
      aadhaar_masked: aadhaarMasked,
    });
  } catch (error) {
    console.error("PAN API Error:", error);
    return res.status(500).json({ message: "PAN verification failed" });
  }
};

export const getCityByPincode = async (req, res) => {
  const { pincode } = req.body;
  if (!pincode) {
    return res.status(400).json({ message: "Pincode is required" });
  }

  try {
    const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    const data = await response.json();

    if (data && data[0] && data[0].Status === "Success") {
      const postOffice = data[0].PostOffice[0];
      return res.json({
        success: true,
        city: postOffice.District || postOffice.Block || postOffice.Region,
        state: postOffice.State
      });
    } else {
      return res.status(404).json({ message: "Invalid pincode" });
    }
  } catch (error) {
    console.error("Pincode API Error:", error);
    return res.status(500).json({ message: "Failed to fetch city details" });
  }
};
