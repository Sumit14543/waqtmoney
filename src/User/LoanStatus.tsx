import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LoanStatus = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* NAVBAR */}
      <Navbar />

      {/* MAIN */}
      <div className="flex-1 flex justify-center px-4 py-10">

        <div className="w-full max-w-md">

          {/* TITLE */}
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Loan Application
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Track your loan status
            </p>
          </div>

          {/* STATUS CARD */}
          <div className="bg-white rounded-xl shadow-sm p-4 mt-4">

            {/* Row 1 */}
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 flex items-center justify-center rounded-full bg-green-500 text-white text-xs">
                  ✓
                </div>
                <span className="text-sm font-medium text-gray-800">
                  Application Submitted
                </span>
              </div>
              <span className="text-xs text-gray-500">18 Mar 2026</span>
            </div>

            {/* Row 2 */}
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 flex items-center justify-center rounded-full bg-yellow-500 text-white text-xs">
                  ⏳
                </div>
                <span className="text-sm font-medium text-gray-800">
                  Under Review
                </span>
              </div>
              <span className="text-xs text-gray-500">Processing</span>
            </div>

            {/* Row 3 */}
            <div className="flex justify-between items-center py-3">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-300 text-gray-700 text-xs">
                  ₹
                </div>
                <span className="text-sm font-medium text-gray-800">
                  Approval & Disbursement
                </span>
              </div>
              <span className="text-xs text-gray-500">Pending</span>
            </div>

          </div>

          {/* SUCCESS CARD */}
          <div className="bg-white rounded-xl shadow-sm p-4 mt-4">

            <h3 className="text-base font-semibold text-gray-800">
              🎉 Application Submitted Successfully!
            </h3>

            <p className="text-xs text-gray-500 mt-2">
              For faster approval, email your documents to{" "}
              <span className="text-[#8048e2] font-medium">
                care@finance.com
              </span>
            </p>

            <p className="text-xs text-gray-500 mt-2">
              Please note: Without documents, your application cannot proceed.
            </p>

            {/* LIST */}
            <div className="mt-4 space-y-2 text-sm text-gray-700">

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#8048e2] text-white flex items-center justify-center text-xs">
                  ✓
                </div>
                Photo ID: PAN Card
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#8048e2] text-white flex items-center justify-center text-xs">
                  ✓
                </div>
                Address Proof: Aadhaar / DL / Passport / Voter ID
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#8048e2] text-white flex items-center justify-center text-xs">
                  ✓
                </div>
                Last 3 Months Salary Slip
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#8048e2] text-white flex items-center justify-center text-xs">
                  ✓
                </div>
                3 Months Bank Statement
              </div>

            </div>

            {/* WARNING */}
            <div className="mt-4 bg-orange-50 border border-orange-100 p-3 rounded-lg text-xs text-orange-700">
              <b>⚠ Important</b> <br />
              Tampering with documents may lead to legal action.
            </div>

          </div>

          {/* HELP CARD */}
          <div className="bg-white rounded-xl shadow-sm p-4 mt-4 text-center">

            <h3 className="text-sm font-semibold text-gray-800">
              Need Help?
            </h3>

            <p className="text-xs text-gray-500 mt-1">
              Our support team is here to assist you
            </p>

            <div className="flex gap-2 mt-3">

              <button className="flex-1 py-2 rounded-lg text-white bg-[#8048e2] hover:bg-[#bd56e4] transition text-sm">
                Call
              </button>

              <button className="flex-1 py-2 rounded-lg border border-[#bd56e4] text-[#bd56e4] hover:bg-[#bd56e4] hover:text-white transition text-sm">
                Email
              </button>

            </div>

            <p className="text-[11px] text-gray-400 mt-3">
              🔒 Your application is secure and encrypted
            </p>

          </div>

        </div>
      </div>

      {/* FOOTER */}
      <Footer />

    </div>
  );
};

export default LoanStatus;