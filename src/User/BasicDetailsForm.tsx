import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BasicDetailsForm = () => {
  const navigate = useNavigate();

  const [employment, setEmployment] = useState("salaried");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [income, setIncome] = useState("");
  const [incomeType, setIncomeType] = useState("");
  const [errors, setErrors] = useState<any>({});

  // ✅ Allow only numbers (common handler)
  const handleNumberOnly = (value: string) => {
    return value.replace(/\D/g, ""); // remove non-digits
  };

  const validate = () => {
    let newErrors: any = {};

    // Pincode
    if (!pincode) {
      newErrors.pincode = "Pin code is required";
    } else if (pincode.length !== 6) {
      newErrors.pincode = "Pin code must be 6 digits";
    }

    // City
    if (!city.trim()) {
      newErrors.city = "City is required";
    }

    // Income
    if (!income) {
      newErrors.income = "Monthly income is required";
    } else if (Number(income) < 5000) {
      newErrors.income = "Minimum income should be ₹5000";
    }

    // Income Type
    if (!incomeType) {
      newErrors.incomeType = "Select income type";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      navigate("/user/pan-verification");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-1 flex justify-center px-4 mt-24 mb-10">
        <form
          onSubmit={handleSubmit}
          className="max-w-[580px] w-full rounded-xl p-6"
        >
          <h2 className="text-center text-[#8048e2] mb-1 text-2xl font-semibold">
            Submit Basic Details
          </h2>

          <div className="text-center text-sm text-gray-500 mb-5">
            Your Data is Completely Secure with us
          </div>

          {/* Pin Code */}
          <label className="text-sm text-gray-700 block mt-4 mb-1">
            Pin Code
          </label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={pincode}
            onChange={(e) =>
              setPincode(handleNumberOnly(e.target.value))
            }
            placeholder="Enter your pin code"
            className="w-full p-2.5 border rounded-md outline-none focus:border-[#8048e2]"
          />
          {errors.pincode && (
            <p className="text-red-500 text-sm">{errors.pincode}</p>
          )}

          {/* City */}
          <label className="text-sm text-gray-700 block mt-4 mb-1">
            City
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-2.5 border rounded-md outline-none focus:border-[#8048e2]"
          />
          {errors.city && (
            <p className="text-red-500 text-sm">{errors.city}</p>
          )}

          {/* Employment */}
          <label className="text-sm text-gray-700 block mt-4 mb-2">
            Employment Type
          </label>

          <div className="flex gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setEmployment("salaried")}
              className={`flex-1 p-2 border rounded-md ${
                employment === "salaried"
                  ? "bg-gradient-to-r from-[#8048e2] to-[#bd56e4] text-white"
                  : ""
              }`}
            >
              Salaried
            </button>

            <button
              type="button"
              onClick={() => setEmployment("self")}
              className={`flex-1 p-2 border rounded-md ${
                employment === "self"
                  ? "bg-gradient-to-r from-[#8048e2] to-[#bd56e4] text-white"
                  : ""
              }`}
            >
              Self-Employed
            </button>
          </div>

          {/* Income */}
          <label className="text-sm text-gray-700 block mt-4 mb-1">
            Monthly Income
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={income}
            onChange={(e) =>
              setIncome(handleNumberOnly(e.target.value))
            }
            placeholder="Enter your monthly income"
            className="w-full p-2.5 border rounded-md outline-none focus:border-[#8048e2]"
          />
          {errors.income && (
            <p className="text-red-500 text-sm">{errors.income}</p>
          )}

          {/* Income Type */}
          <label className="text-sm text-gray-700 block mt-4 mb-2">
            Income Received In
          </label>

          <div className="flex gap-2 flex-wrap">
            {["Account", "Cash", "Cheque"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setIncomeType(type)}
                className={`flex-1 p-2 border rounded-md ${
                  incomeType === type
                    ? "bg-gradient-to-r from-[#8048e2] to-[#bd56e4] text-white"
                    : ""
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {errors.incomeType && (
            <p className="text-red-500 text-sm mt-1">
              {errors.incomeType}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-5 p-3 text-white rounded-md text-lg bg-gradient-to-r from-[#8048e2] to-[#bd56e4]"
          >
            Continue
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default BasicDetailsForm;