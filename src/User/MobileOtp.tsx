import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // ✅ ADD
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MobileOtp = () => {
  const navigate = useNavigate(); // ✅ INIT

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleSubmit = () => {
    // ✅ DIRECT NAVIGATION (no validation as per your requirement)
    navigate("/user/loan");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#8048e2]/10 via-white to-[#bd56e4]/10 font-[Poppins]">

      <Navbar />

      <div className="flex flex-1 flex-col items-center justify-center px-4 py-24">

        <h1 className="text-2xl md:text-3xl font-semibold text-black mb-2">
          Verify Mobile Number
        </h1>

        <p className="text-sm md:text-base text-gray-700 text-center">
          A 6-digit code has been sent to your mobile number
        </p>

        <p className="text-[#8048e2] font-medium mt-1 mb-6">
          (+91XXXXXXXXXX)
        </p>

        <div className="flex gap-3 mb-4">
          {otp.map((value, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el!)}
              type="text"
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-12 h-12 md:w-14 md:h-14 text-center text-lg border-2 border-[#8048e2] rounded-md outline-none focus:ring-2 focus:ring-[#bd56e4]"
            />
          ))}
        </div>

        <div className="text-sm text-[#8048e2] self-end w-full max-w-xs mb-6">
          01:00
        </div>

        <button
          onClick={handleSubmit}
          className="px-8 py-3 rounded-md text-white font-medium bg-gradient-to-r from-[#8048e2] to-[#bd56e4] hover:opacity-90 transition"
        >
          Submit
        </button>

      </div>

      <Footer />
    </div>
  );
};

export default MobileOtp;