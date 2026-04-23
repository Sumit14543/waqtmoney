import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const PanVerification = () => {
  const [pan, setPan] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const navigate = useNavigate();

  // ✅ STRICT PAN FORMAT
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

  // 🔥 STRICT INPUT CONTROLLER
  const handlePanChange = (value: string) => {
    let input = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    input = input.slice(0, 10);

    let result = "";

    for (let i = 0; i < input.length; i++) {
      const char = input[i];

      if (i < 5) {
        // first 5 letters only
        if (/[A-Z]/.test(char)) result += char;
      } else if (i < 9) {
        // next 4 digits only
        if (/[0-9]/.test(char)) result += char;
      } else {
        // last letter only
        if (/[A-Z]/.test(char)) result += char;
      }
    }

    setPan(result);
  };

  const validate = () => {
    let err: any = {};

    // PAN
    if (!pan) {
      err.pan = "PAN number is required";
    } else if (!panRegex.test(pan)) {
      err.pan = "Invalid PAN format (ABCDE1234F)";
    }

    // Name
    if (!name.trim()) {
      err.name = "Name is required";
    } else if (name.trim().length < 3) {
      err.name = "Enter valid full name";
    }

    // DOB
    if (!dob) {
      err.dob = "Date of birth is required";
    }

    // Terms
    if (!terms) {
      err.terms = "Please accept terms & conditions";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      navigate("/user/kyc-aadhaar");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg rounded-xl p-6 text-center">

          <h2 className="text-2xl font-semibold text-[#8048e2]">
            PAN Verification
          </h2>

          <p className="text-sm text-gray-500 mt-1 mb-4">
            Your data is completely secure with us
          </p>

          <img
            src="/pan-card-img.jpg"
            alt="PAN Preview"
            className="w-full h-64 object-cover rounded-lg mb-3"
          />

          <p className="text-xs text-gray-400 mb-4">
            Example PAN: ABCDE1234F
          </p>

          {/* PAN INPUT */}
          <div className="text-left">
            <label className="text-sm font-medium text-gray-700">
              PAN Number
            </label>

            <input
              type="text"
              value={pan}
              onChange={(e) => handlePanChange(e.target.value)}
              maxLength={10}
              placeholder="ABCDE1234F"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg outline-none focus:border-[#8048e2]"
            />

            {errors.pan && (
              <p className="text-red-500 text-sm mt-1">{errors.pan}</p>
            )}
          </div>

          {/* NAME */}
          <div className="text-left mt-4">
            <label className="text-sm font-medium text-gray-700">
              Name (As per PAN)
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg outline-none focus:border-[#8048e2]"
            />

            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* DOB */}
          <div className="text-left mt-4">
            <label className="text-sm font-medium text-gray-700">
              Date of Birth
            </label>

            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg outline-none focus:border-[#8048e2]"
            />

            {errors.dob && (
              <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
            )}
          </div>

          {/* TERMS */}
          <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
            />
            <span>I accept Terms & Conditions</span>
          </div>

          {errors.terms && (
            <p className="text-red-500 text-sm mt-1 text-left">
              {errors.terms}
            </p>
          )}

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            className="w-full mt-5 py-3 text-white rounded-lg font-medium bg-gradient-to-r from-[#8048e2] to-[#bd56e4]"
          >
            Continue
          </button>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PanVerification;