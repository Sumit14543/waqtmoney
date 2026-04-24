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
  const [loading, setLoading] = useState(false);

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

  const validate = () => {
    if (!salary || Number(salary) < 5000) {
      return "Enter valid salary (min Rs 5000)";
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      return "Enter valid 10-digit phone number";
    }

    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan)) {
      return "Enter valid PAN (ABCDE1234F)";
    }

    if (!agree) {
      return "Please accept Terms & Privacy Policy";
    }

    return "";
  };

  const readJsonResponse = async (res: Response) => {
    const text = await res.text();

    if (!text) {
      return {};
    }

    try {
      return JSON.parse(text);
    } catch {
      return { message: "Server returned an invalid response" };
    }
  };

  const handleSubmit = async () => {
    if (loading) return;

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    const data = {
      employment,
      salary: Number(salary),
      phone,
      pan: pan.toUpperCase(),
      termsAccepted: agree,
    };

    try {
      const otpRes = await fetch("http://localhost:5000/api/otp/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: "test@gmail.com" }),
      });

      const otpResult = await readJsonResponse(otpRes);

      if (!otpRes.ok) {
        setError(otpResult.message || "Failed to send OTP");
        return;
      }

      const appRes = await fetch("http://localhost:5000/api/application/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const appResult = await readJsonResponse(appRes);

      if (!appRes.ok) {
        setError(appResult.message || "Application failed");
        return;
      }

      sessionStorage.setItem("applyPhone", phone);
      navigate("/user/otp");
    } catch (fetchError) {
      console.error("Fetch error:", fetchError);
      setError("Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex flex-1 md:mt-20 items-center justify-center px-4 py-20">
        <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-lg">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#8048e2]/10">
            <Lock className="h-6 w-6 text-[#8048e2]" />
          </div>

          <h2 className="mt-4 text-center text-xl font-semibold text-gray-900">
            Payday Loan Application
          </h2>

          <p className="mb-6 text-center text-sm text-gray-500">
            Complete your application in just a few steps
          </p>

          {error && <p className="mb-4 text-center text-sm text-red-500">{error}</p>}

          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-gray-700">
                Employment Status *
              </label>

              <div className="mt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setEmployment("salaried")}
                  className={`flex-1 rounded-lg border py-2 text-sm ${
                    employment === "salaried"
                      ? "border-none bg-[#8048e2] text-white"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  Salaried
                </button>

                <button
                  type="button"
                  onClick={() => setEmployment("self")}
                  className={`flex-1 rounded-lg border py-2 text-sm ${
                    employment === "self"
                      ? "border-none bg-[#8048e2] text-white"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  Self Employed
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">
                Monthly Salary *
              </label>

              <div className="mt-1 flex h-11 items-center rounded-lg border">
                <span className="border-r px-3 text-gray-400">Rs</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={salary}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, "");
                    setSalary(raw);
                  }}
                  placeholder="Enter amount"
                  className="w-full px-3 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Phone *</label>

              <div className="mt-1 flex h-11 items-center rounded-lg border">
                <span className="border-r px-2 text-gray-400">+91</span>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="Enter number"
                  className="w-full px-2 outline-none"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-gray-700">PAN Card *</label>

              <input
                type="text"
                value={pan}
                onChange={handlePanChange}
                placeholder="ABCDE1234F"
                className="mt-1 h-11 w-full rounded-lg border px-3 outline-none"
              />
            </div>
          </div>

          <div className="mt-5 flex items-start gap-2 text-sm text-gray-500">
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

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-gradient-to-r from-[#8048e2] to-[#bd56e4] py-3 text-sm font-medium text-white disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Apply;
