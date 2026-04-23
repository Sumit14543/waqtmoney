import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Apply = () => {
  const navigate = useNavigate();

  const [employment, setEmployment] = useState("salaried");
  const [salary, setSalary] = useState("");
  const [phone, setPhone] = useState("");
  const [pan, setPan] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  // ✅ PAN FORMAT CONTROL
  const handlePanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toUpperCase();
    value = value.replace(/[^A-Z0-9]/g, "");

    let formatted = "";

    for (let i = 0; i < value.length && i < 10; i++) {
      const char = value[i];

      if (i < 5 && /[A-Z]/.test(char)) formatted += char;
      else if (i >= 5 && i < 9 && /[0-9]/.test(char)) formatted += char;
      else if (i === 9 && /[A-Z]/.test(char)) formatted += char;
    }

    setPan(formatted);
  };

  // ✅ VALIDATION
  const validate = () => {
    if (!salary || Number(salary) < 5000)
      return "Enter valid salary (min ₹5000)";

    if (!/^[6-9]\d{9}$/.test(phone))
      return "Enter valid 10-digit phone number";

    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan))
      return "Enter valid PAN (ABCDE1234F)";

    if (!agree) return "Please accept Terms & Privacy Policy";

    return "";
  };

  // ✅ FINAL SUBMIT
  const handleSubmit = async () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    setError("");

    const data = {
      employment,
      salary: Number(salary),
      phone,
      pan: pan.toUpperCase(),
      termsAccepted: agree,
    };

    console.log("📤 Sending Data:", data);

    try {
      const res = await fetch("http://127.0.0.1:5000/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      console.log("📥 Response:", result);

      if (res.ok) {
        navigate("/user/otp");
      } else {
        setError(result.message || "Something went wrong");
      }
    } catch (error) {
      console.error("❌ Fetch Error:", error);
      setError("Server not reachable");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex flex-1 md:mt-20 items-center justify-center px-4 py-20">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">

          <div className="w-14 h-14 bg-[#8048e2]/10 rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6 text-[#8048e2]" />
          </div>

          <h2 className="text-center text-xl font-semibold mt-4 text-gray-900">
            Payday Loan Application
          </h2>

          <p className="text-center text-sm text-gray-500 mb-6">
            Complete your application in just a few steps
          </p>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          <div className="grid md:grid-cols-2 gap-4">

            {/* Employment */}
            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-gray-700">
                Employment Status *
              </label>

              <div className="flex gap-3 mt-2">
                <button type="button"
                  onClick={() => setEmployment("salaried")}
                  className={`flex-1 py-2 rounded-lg text-sm border ${
                    employment === "salaried"
                      ? "bg-[#8048e2] text-white border-none"
                      : "bg-white border-gray-200"
                  }`}
                >
                  Salaried
                </button>

                <button type="button"
                  onClick={() => setEmployment("self")}
                  className={`flex-1 py-2 rounded-lg text-sm border ${
                    employment === "self"
                      ? "bg-[#8048e2] text-white border-none"
                      : "bg-white border-gray-200"
                  }`}
                >
                  Self Employed
                </button>
              </div>
            </div>

            {/* Salary */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Monthly Salary *
              </label>

              <div className="flex items-center border rounded-lg mt-1 h-11">
                <span className="px-3 text-gray-400 border-r">₹</span>
                <input
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-3 outline-none"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Phone *
              </label>

              <div className="flex items-center border rounded-lg mt-1 h-11">
                <span className="px-2 text-gray-400 border-r">+91</span>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  placeholder="Enter number"
                  className="w-full px-2 outline-none"
                />
              </div>
            </div>

            {/* PAN */}
            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-gray-700">
                PAN Card *
              </label>

              <input
                type="text"
                value={pan}
                onChange={handlePanChange}
                placeholder="ABCDE1234F"
                className="w-full mt-1 h-11 border rounded-lg px-3 outline-none"
              />
            </div>
          </div>

          {/* Checkbox */}
          <div className="flex items-start gap-2 mt-5 text-sm text-gray-500">
            <input
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
              className="mt-1 accent-[#8048e2]"
            />
            <p>
              I accept the <span className="text-[#8048e2]">Terms</span> and{" "}
              <span className="text-[#8048e2]">Privacy Policy</span>
            </p>
          </div>

          {/* Submit */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full mt-6 py-3 rounded-lg text-sm font-medium bg-gradient-to-r from-[#8048e2] to-[#bd56e4] text-white"
          >
            Send OTP →
          </button>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Apply;