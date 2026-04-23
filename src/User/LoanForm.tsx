import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type ErrorsType = {
  amount?: string;
  purpose?: string;
  hasLoan?: string;
};

const LoanForm = () => {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [hasLoan, setHasLoan] = useState("");
  const [errors, setErrors] = useState<ErrorsType>({});
  const [loading, setLoading] = useState(false);

  // FORMAT
  const formatAmount = (value: string) => {
    if (!value) return "";
    return new Intl.NumberFormat("en-IN").format(Number(value));
  };

  const parseAmount = (value: string) => value.replace(/,/g, "");

  // VALIDATE
  const validate = () => {
    let newErrors: ErrorsType = {};
    const numericAmount = Number(parseAmount(amount));

    if (!amount) {
      newErrors.amount = "Loan amount is required";
    } else if (numericAmount < 1000) {
      newErrors.amount = "Minimum amount should be ₹1000";
    }

    if (!purpose) {
      newErrors.purpose = "Please select loan purpose";
    }

    if (!hasLoan) {
      newErrors.hasLoan = "Please select an option";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // SUBMIT
  const handleSubmit = async () => {
    if (loading) return;
    if (!validate()) return;

    setLoading(true);

    const data = {
      amount: Number(parseAmount(amount)),
      purpose,
      hasLoan,
    };

    try {
      const res = await fetch("http://localhost:5000/api/loan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // 🔥 IMPORTANT FIX
      const text = await res.text();
      console.log("RAW RESPONSE:", text);

      let result;
      try {
        result = JSON.parse(text);
      } catch {
        throw new Error("Server returned HTML instead of JSON");
      }

      if (!res.ok) {
        throw new Error(result.message || "Request failed");
      }

      // SUCCESS
      alert("Loan applied successfully!");
      navigate("/user/basic-details");

    } catch (err: any) {
      console.error(err);
      alert(err.message || "Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex flex-1 justify-center items-center px-4 py-20">
        <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow">

          <h2 className="text-3xl font-semibold text-center text-[#7e47e2] mb-6">
            Apply for a Loan
          </h2>

          {/* Amount */}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              How much money you want to borrow?
            </label>

            <div className="flex items-center border rounded-lg h-11">
              <span className="px-3 text-gray-400 border-r">₹</span>
              <input
                type="tel"
                inputMode="numeric"
                value={amount}
                onChange={(e) => {
                  const raw = parseAmount(e.target.value);
                  if (!/^\d*$/.test(raw)) return;
                  setAmount(formatAmount(raw));
                }}
                placeholder="Enter amount"
                className="w-full px-3 outline-none"
              />
            </div>

            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
            )}
          </div>

          {/* Purpose */}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Purpose of Loan?
            </label>

            <select
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Select Purpose</option>
              <option value="marriage">Marriage</option>
              <option value="education">Education</option>
              <option value="business">Business</option>
              <option value="medical">Medical</option>
            </select>

            {errors.purpose && (
              <p className="text-red-500 text-sm mt-1">{errors.purpose}</p>
            )}
          </div>

          {/* Loan */}
          <div className="mb-6">
            <label className="block mb-3 text-sm font-medium text-gray-700">
              Do you have any running loan?
            </label>

            <div className="flex gap-10">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="loan"
                  value="yes"
                  checked={hasLoan === "yes"}
                  onChange={(e) => setHasLoan(e.target.value)}
                />
                Yes
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="loan"
                  value="no"
                  checked={hasLoan === "no"}
                  onChange={(e) => setHasLoan(e.target.value)}
                />
                No
              </label>
            </div>

            {errors.hasLoan && (
              <p className="text-red-500 text-sm mt-1">{errors.hasLoan}</p>
            )}
          </div>

          {/* Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[#8048e2] to-[#bd56e4] text-white font-medium rounded-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Continue"}
          </button>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoanForm;