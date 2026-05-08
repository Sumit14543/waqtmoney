import React, { useState } from "react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { Mail, Lock, User, ShieldCheck, LogIn } from "lucide-react";

const Login = () => {
  const [moved, setMoved] = useState(false);

  const toggle = () => {
    setMoved(!moved);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white pt-20">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-3 py-8 sm:px-4 sm:py-10">
        {/* ✅ Responsive container */}
        <div className="flex min-h-0 w-full max-w-5xl flex-col overflow-hidden rounded-2xl border bg-white shadow-2xl md:min-h-[500px] md:flex-row">

          {/* LEFT SIDE */}
          <div className="flex w-full flex-col items-center justify-center bg-gradient-to-br from-purple-700 to-purple-500 p-6 text-center text-white sm:p-8 md:w-1/2">
            <ShieldCheck className="w-12 h-12 mb-4" />
            <h1 className="text-xl md:text-2xl font-bold">Paday Lona</h1>
            <p className="text-sm mt-1">Secure Login System</p>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-full md:w-1/2 overflow-hidden">

            {/* ✅ Slider only on desktop */}
            <div
              className={`hidden md:flex w-[200%] transition-transform duration-500 ${
                moved ? "-translate-x-1/2" : "translate-x-0"
              }`}
            >
              {/* LOGIN */}
              <div className="w-1/2 p-8 lg:p-10 flex flex-col justify-center">
                <h2 className="text-center text-lg md:text-xl font-semibold mb-5 flex items-center justify-center gap-2">
                  <LogIn className="w-5 h-5" />
                  Login
                </h2>

                <div className="relative mb-4">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Email"
                    className="w-full pl-10 p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="relative mb-4">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full pl-10 p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* ✅ BUTTON SAME AS YOURS */}
                <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-500 transition">
                  Login
                </button>

                <p onClick={toggle} className="text-center text-sm text-gray-500 mt-4 cursor-pointer">
                  Create account
                </p>
              </div>

              {/* SIGNUP */}
              <div className="w-1/2 p-8 lg:p-10 flex flex-col justify-center">
                <h2 className="text-center text-lg md:text-xl font-semibold mb-5 flex items-center justify-center gap-2">
                  <User className="w-5 h-5" />
                  Signup
                </h2>

                <div className="relative mb-4">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full pl-10 p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="relative mb-4">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full pl-10 p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="relative mb-4">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full pl-10 p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* ✅ BUTTON SAME */}
                <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-500 transition">
                  Signup
                </button>

                <p onClick={toggle} className="text-center text-sm text-gray-500 mt-4 cursor-pointer">
                  Login instead
                </p>
              </div>
            </div>

            {/* ✅ Mobile (no slider, clean UI) */}
            <div className="p-5 sm:p-6 md:hidden">
              {!moved ? (
                <>
                  <h2 className="text-center text-lg font-semibold mb-5 flex items-center justify-center gap-2">
                    <LogIn className="w-5 h-5" />
                    Login
                  </h2>

                  <div className="relative mb-4">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" placeholder="Email" className="w-full pl-10 p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>

                  <div className="relative mb-4">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="password" placeholder="Password" className="w-full pl-10 p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>

                  <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-500 transition">
                    Login
                  </button>

                  <p onClick={toggle} className="text-center text-sm text-gray-500 mt-4 cursor-pointer">
                    Create account
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-center text-lg font-semibold mb-5 flex items-center justify-center gap-2">
                    <User className="w-5 h-5" />
                    Signup
                  </h2>

                  <div className="relative mb-4">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" placeholder="Name" className="w-full pl-10 p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>

                  <div className="relative mb-4">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="email" placeholder="Email" className="w-full pl-10 p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>

                  <div className="relative mb-4">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="password" placeholder="Password" className="w-full pl-10 p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>

                  <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-500 transition">
                    Signup
                  </button>

                  <p onClick={toggle} className="text-center text-sm text-gray-500 mt-4 cursor-pointer">
                    Login instead
                  </p>
                </>
              )}
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
