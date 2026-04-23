import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const SalarySlip = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 👉 direct next page
    navigate("/user/loan-status");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* NAVBAR */}
      <Navbar />

      {/* MAIN */}
      <div className="flex-1 flex justify-center px-4 py-10">

        <div className="w-full max-w-md p-6 rounded-xl">

          {/* TITLE */}
          <h2 className="text-2xl font-bold text-center text-[#8048e2] mt-10">
            Salary Slip
          </h2>

          <p className="text-sm text-center text-gray-500 mb-6">
            Upload Required Documents
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="text-sm font-medium">Upload Current Month Salary Slip</label>
              <input type="file" className="w-full mt-2 p-2 border-2 border-[#8048e2] rounded-md" />
            </div>

            <div>
              <label className="text-sm font-medium">Upload Previous Month Salary Slip</label>
              <input type="file" className="w-full mt-2 p-2 border-2 border-[#8048e2] rounded-md" />
            </div>

            <div>
              <label className="text-sm font-medium">Upload 2 Months Before Salary Slip</label>
              <input type="file" className="w-full mt-2 p-2 border-2 border-[#8048e2] rounded-md" />
            </div>

            <div>
              <label className="text-sm font-medium">Upload Company ID Card</label>
              <input type="file" className="w-full mt-2 p-2 border-2 border-[#8048e2] rounded-md" />
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-4 text-white font-semibold rounded-md bg-gradient-to-r from-[#8048e2] to-[#bd56e4] hover:opacity-90 transition"
            >
              Submit
            </button>

          </form>

        </div>
      </div>

      {/* FOOTER */}
      <Footer />

    </div>
  );
};

export default SalarySlip;