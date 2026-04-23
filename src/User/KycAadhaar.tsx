import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const KycAadhaar = () => {
  const [aadhaar, setAadhaar] = useState("");

  const navigate = useNavigate();

  // format: 1234 5678 9012
  const formatAadhaar = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 12);

    const parts = cleaned.match(/.{1,4}/g);
    return parts ? parts.join(" ") : "";
  };

  const handleChange = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 12);
    setAadhaar(cleaned);
  };

  const handleSubmit = () => {
    if (aadhaar.length === 12) {
      navigate("/user/company-details");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-xl p-6 text-center mt-20">

          <h2 className="text-2xl font-semibold text-[#8048e2]">
            Complete Your KYC
          </h2>

          <p className="text-sm text-gray-500 mt-1 mb-4">
            Your data is completely secure with us
          </p>

          <img
            src="/aadhar-img.png"
            alt="Aadhaar Preview"
            className="w-full h-40 object-cover rounded-lg mb-3"
          />

          <p className="text-xs text-gray-400 mb-4">
            Example Aadhaar Number: 1234 5678 9012
          </p>

          {/* INPUT */}
          <div className="text-left">
            <label className="text-sm font-medium text-gray-700">
              Enter Aadhaar Number
            </label>

            <input
              type="text"
              value={formatAadhaar(aadhaar)}
              onChange={(e) => handleChange(e.target.value)}
              maxLength={14} // includes spaces
              placeholder="1234 5678 9012"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg outline-none focus:border-[#8048e2]"
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            className="w-full mt-5 py-3 text-white rounded-lg font-medium bg-gradient-to-r from-[#8048e2] to-[#bd56e4] hover:opacity-90 transition"
          >
            Continue
          </button>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default KycAadhaar;