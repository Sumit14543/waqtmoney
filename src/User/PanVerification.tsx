import React, { useState, useEffect } from "react";
import { CreditCard, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import UserProgress from "./UserProgress";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000/api";

const getApplicationId = () =>
  sessionStorage.getItem("applicationId") || localStorage.getItem("applicationId");

type PanErrors = {
  pan?: string;
  name?: string;
  dob?: string;
  submit?: string;
};

const PanVerification = () => {
  const [pan, setPan] = useState(() => sessionStorage.getItem("applyPan") ?? "");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [gender, setGender] = useState("");
  const [errors, setErrors] = useState<PanErrors>({});
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const navigate = useNavigate();

  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

  const formatDisplayDate = (date: string) => {
    if (!date) return "-";

    const [year, month, day] = date.split("-");
    if (year && month && day) return `${day}/${month}/${year}`;

    return date;
  };

  const findValueByKeys = (source: any, keys: string[]): string => {
    if (!source || typeof source !== "object") return "";

    const normalizeKey = (key: string) => key.toLowerCase().replace(/[^a-z0-9]/g, "");
    const normalizedKeys = keys.map(normalizeKey);

    for (const [key, value] of Object.entries(source)) {
      if (normalizedKeys.includes(normalizeKey(key)) && value) {
        return String(value);
      }
    }

    for (const value of Object.values(source)) {
      const nestedValue = findValueByKeys(value, keys);
      if (nestedValue) return nestedValue;
    }

    return "";
  };

  const getFatherNameFromResult = (result: any) =>
    findValueByKeys(result, [
      "father_name",
      "fatherName",
      "fathers_name",
      "father_full_name",
      "father",
      "fatherNameOnPan",
      "father_or_spouse_name",
      "parent_name",
      "guardian_name",
    ]);

  const getGenderFromResult = (result: any) =>
    findValueByKeys(result, ["gender", "gender_name", "genderName", "sex"]);

  useEffect(() => {
    if (pan.length === 10 && panRegex.test(pan)) {
      setLoading(true);
      setErrors({});
      fetch(`${API_BASE_URL}/pan/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pan,
          applicationId: getApplicationId(),
        }),
      })
        .then(async (res) => {
          const data = await res.json().catch(() => ({}));
          if (!res.ok) throw new Error(data.message || "PAN verification failed");
          return data;
        })
        .then((result) => {
          const verifiedName = result.full_name || result.name || "";
          const verifiedDob = result.dob || "";
          const verifiedFatherName = getFatherNameFromResult(result);
          const verifiedGender = getGenderFromResult(result);

          if (!verifiedName || !verifiedDob) {
            throw new Error("PAN details not received");
          }

          setName(verifiedName);
          setDob(verifiedDob);
          setFatherName(verifiedFatherName);
          setGender(verifiedGender);
          setIsVerified(true);
          setShowConfirmation(true);

          sessionStorage.setItem(
            "panVerification",
            JSON.stringify({
              pan,
              name: verifiedName,
              dob: verifiedDob,
              fatherName: verifiedFatherName,
              gender: verifiedGender,
            })
          );
        })
        .catch((error) => {
          console.error("PAN verification error:", error);
          setErrors((prev) => ({ ...prev, pan: error.message || "Server not reachable" }));
          setIsVerified(false);
          setShowConfirmation(false);
          setName("");
          setDob("");
          setFatherName("");
          setGender("");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [pan]);

  const handlePanChange = (value: string) => {
    let input = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    input = input.slice(0, 10);

    let result = "";

    for (let i = 0; i < input.length; i++) {
      const char = input[i];

      if (i < 5) {
        if (/[A-Z]/.test(char)) result += char;
      } else if (i < 9) {
        if (/[0-9]/.test(char)) result += char;
      } else if (/[A-Z]/.test(char)) {
        result += char;
      }
    }

    setPan(result);
    setIsVerified(false);
    setShowConfirmation(false);
    setName("");
    setDob("");
    setFatherName("");
    setGender("");
  };

  const validate = () => {
    const err: PanErrors = {};

    if (!pan) {
      err.pan = "PAN number is required";
    } else if (!panRegex.test(pan)) {
      err.pan = "Invalid PAN format (ABCDE1234F)";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleConfirmPan = () => {
    if (!validate()) return;
    navigate("/user/kyc-aadhaar");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f6fa]">
      <Navbar />

      <div className="flex-1 px-4 pb-16 pt-24 md:pt-28">
        <UserProgress activeStep={2} />

        <div className="flex items-center justify-center">
          <div className="w-full max-w-[560px] overflow-hidden rounded-2xl border border-[#dfe7f2] bg-white shadow-[0_18px_60px_rgba(32,56,85,0.10)]">
            <div className="border-b border-[#dfe7f2] px-6 py-7 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f3eaff]">
                <CreditCard className="h-7 w-7 text-[#8048e2]" />
              </div>

              <h2 className="mt-4 text-xl font-bold text-[#071d3a]">
                PAN Verification
              </h2>

              <p className="mt-2 text-sm font-medium text-[#52657d]">
                Confirm your PAN details to continue.
              </p>
            </div>

            <div className="px-5 py-7 sm:px-6 sm:py-8 md:px-8">
              <div className="mb-6 overflow-hidden rounded-xl border border-[#dfe7f2] bg-[#f8fafc]">
                <img
                  src="/pan-card-img.jpg"
                  alt="PAN Preview"
                  className="h-52 w-full object-cover"
                />
              </div>

              <div className="grid gap-5">
                <div>
                  <label className="text-sm font-bold text-[#071d3a]">
                    PAN Number <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    value={pan}
                    onChange={(e) => handlePanChange(e.target.value)}
                    maxLength={10}
                    placeholder="ABCDE1234F"
                    className="mt-2 h-[52px] w-full rounded-lg border border-[#d8c5ff] px-4 text-sm font-semibold uppercase text-[#071d3a] outline-none focus:border-[#8048e2]"
                    readOnly={loading}
                  />

                  {errors.pan && <p className="mt-1 text-sm text-red-500">{errors.pan}</p>}
                </div>

                <div>
                  <label className="text-sm font-bold text-[#071d3a]">
                    Name as per PAN <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    value={loading ? "Fetching..." : name}
                    readOnly
                    placeholder="Fetched after verification"
                    className={`mt-2 h-[52px] w-full rounded-lg border border-[#d8c5ff] px-4 text-sm font-semibold text-[#071d3a] outline-none ${loading ? "bg-[#f8fafc] text-[#a0aec0]" : "bg-[#f8fafc]"}`}
                  />

                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label className="text-sm font-bold text-[#071d3a]">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>

                  <input
                    type={loading ? "text" : "date"}
                    value={loading ? "Fetching..." : dob}
                    readOnly
                    className={`mt-2 h-[52px] w-full rounded-lg border border-[#d8c5ff] px-4 text-sm font-semibold text-[#071d3a] outline-none ${loading ? "bg-[#f8fafc] text-[#a0aec0]" : "bg-[#f8fafc]"}`}
                  />

                  {errors.dob && <p className="mt-1 text-sm text-red-500">{errors.dob}</p>}
                </div>
              </div>

              {errors.submit && <p className="mt-3 text-left text-sm text-red-500">{errors.submit}</p>}
            </div>

            <div className="flex items-center justify-center gap-2 border-t border-[#dfe7f2] bg-[#f8fafc] px-6 py-4 text-xs font-semibold text-[#52657d]">
              <ShieldCheck className="h-4 w-4 text-[#12b76a]" />
              Secure PAN verification
            </div>
          </div>
        </div>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center overflow-y-auto bg-black/35 px-0 font-sans backdrop-blur-[1px] sm:items-center sm:px-4 sm:py-6">
          <div className="max-h-[92vh] w-full max-w-[500px] overflow-y-auto rounded-t-[28px] bg-white px-4 pb-5 pt-5 shadow-xl sm:rounded-[28px] sm:px-6 sm:pb-7 sm:pt-6">
            <h1 className="mb-4 text-[20px] font-medium text-[#24242c] sm:mb-5 sm:text-[22px]">
              Is this information correct?
            </h1>

            <div className="relative overflow-hidden rounded-[16px] border border-[#d9dce8] bg-gradient-to-br from-[#f5f7ff] to-[#edf2ff] px-4 pb-4 pt-4 shadow-[0_3px_0_#9aa9ff] sm:px-5 sm:pb-5">
              <div className="absolute right-5 top-4 text-center opacity-80">
                <img
                  src="/ashoka4-pillers.png"
                  alt="Ashoka Pillar"
                  className="mx-auto h-[88px] w-[76px] object-contain"
                />
               
              </div>

              <div className="mb-5 pr-28">
                <p className="mb-1 text-[14px] font-medium text-[#777b8d]">Name</p>
                <h2 className="break-words text-[19px] font-extrabold tracking-wide text-[#2c2d36]">
                  {name || "-"}
                </h2>
              </div>

              <div className="mb-5 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2">
                <div>
                  <p className="mb-1 text-[14px] font-medium text-[#777b8d]">
                    PAN Number
                  </p>
                  <h3 className="text-[18px] font-extrabold text-[#2c2d36]">
                    {pan || "-"}
                  </h3>
                </div>

                <div className="text-left">
                  <p className="mb-1 text-[14px] font-medium text-[#777b8d]">
                    Date of Birth
                  </p>
                  <h3 className="text-[18px] font-extrabold text-[#2c2d36]">
                    {formatDisplayDate(dob)}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 border-t-2 border-dashed border-[#d2d6e3] pt-4 min-[420px]:grid-cols-2">
                <div>
                  <p className="mb-1 text-[14px] font-medium text-[#777b8d]">
                    Father Name
                  </p>
                  <h3 className="break-words text-[18px] font-extrabold text-[#2c2d36]">
                    {fatherName || "-"}
                  </h3>
                </div>

                <div>
                  <p className="mb-1 text-[14px] font-medium text-[#777b8d]">
                    Gender
                  </p>
                  <h3 className="text-[18px] font-extrabold text-[#2c2d36]">
                    {gender || "-"}
                  </h3>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:gap-4">
              <button
                type="button"
                onClick={() => setShowConfirmation(false)}
                className="h-[52px] w-full rounded-full border-2 border-[#23243d] bg-white text-[18px] font-bold text-[#23243d] min-[420px]:h-[58px] min-[420px]:w-[125px] min-[420px]:text-[20px]"
              >
                No
              </button>

              <button
                type="button"
                onClick={handleConfirmPan}
                className="h-[52px] flex-1 rounded-full bg-[#282b4b] text-[17px] font-bold text-white shadow-md min-[420px]:h-[58px] min-[420px]:text-[19px]"
              >
                Confirm and Proceed
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default PanVerification;
