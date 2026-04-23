import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const BankDetails = () => {
  const [form, setForm] = useState({
    bankName: "",
    holderName: "",
    accountNumber: "",
    ifsc: "",
  });

  const [errors, setErrors] = useState<any>({});

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    let { name, value } = e.target;

    // restrict account number to digits only
    if (name === "accountNumber") {
      value = value.replace(/\D/g, "");
    }

    // uppercase IFSC
    if (name === "ifsc") {
      value = value.toUpperCase();
    }

    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    let newErrors: any = {};

    // Bank Name
    if (!form.bankName.trim()) {
      newErrors.bankName = "Bank name is required";
    } else if (!/^[A-Za-z\s]+$/.test(form.bankName)) {
      newErrors.bankName = "Only alphabets allowed";
    }

    // Holder Name
    if (!form.holderName.trim()) {
      newErrors.holderName = "Holder name is required";
    } else if (!/^[A-Za-z\s]+$/.test(form.holderName)) {
      newErrors.holderName = "Only alphabets allowed";
    }

    // Account Number
    if (!form.accountNumber) {
      newErrors.accountNumber = "Account number required";
    } else if (!/^\d{9,18}$/.test(form.accountNumber)) {
      newErrors.accountNumber = "Enter 9–18 digit valid account number";
    }

    // IFSC
    if (!form.ifsc) {
      newErrors.ifsc = "IFSC required";
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(form.ifsc)) {
      newErrors.ifsc = "Invalid IFSC format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (validate()) {
      navigate("/user/salary-slip");
    }
  };

  const inputClass =
    "w-full p-3 border-2 border-[#8048e2] rounded-md outline-none focus:border-[#bd56e4]";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <Navbar />

      <div className="flex-1">
        <div className="max-w-[520px] mx-auto mt-10 px-5 py-8 font-sans">

          <h1 className="text-center text-2xl font-bold text-[#8048e2] mt-14">
            Bank Details
          </h1>

          <p className="text-center text-sm text-gray-500 mb-6">
            Your Data is Completely Secure with us
          </p>

          <form onSubmit={handleSubmit}>

            {/* Bank Name */}
            <div className="mb-4">
              <label>Bank Name</label>
              <input name="bankName" onChange={handleChange} className={inputClass} />
              {errors.bankName && <p className="text-red-500 text-xs">{errors.bankName}</p>}
            </div>

            {/* Holder Name */}
            <div className="mb-4">
              <label>Account Holder Name</label>
              <input name="holderName" onChange={handleChange} className={inputClass} />
              {errors.holderName && <p className="text-red-500 text-xs">{errors.holderName}</p>}
            </div>

            {/* Account Number */}
            <div className="mb-4">
              <label>Account Number</label>
              <input
                name="accountNumber"
                value={form.accountNumber}
                onChange={handleChange}
                maxLength={18}
                className={inputClass}
                type="text"
                placeholder="Only digits"
              />
              {errors.accountNumber && <p className="text-red-500 text-xs">{errors.accountNumber}</p>}
            </div>

            {/* IFSC */}
            <div className="mb-4">
              <label>IFSC Code</label>
              <input
                name="ifsc"
                value={form.ifsc}
                onChange={handleChange}
                maxLength={11}
                className={inputClass}
                placeholder="e.g. SBIN0001234"
              />
              {errors.ifsc && <p className="text-red-500 text-xs">{errors.ifsc}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full text-white py-3 mt-3 font-semibold rounded-md bg-gradient-to-r from-[#8048e2] to-[#bd56e4] hover:opacity-90 transition"
            >
              Submit
            </button>

          </form>

        </div>
      </div>

      <Footer />

    </div>
  );
};

export default BankDetails;