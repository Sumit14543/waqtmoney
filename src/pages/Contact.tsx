import Navbar from "@/components/Navbar";
import React from "react";
import { MapPin, Phone, Mail, Clock, IndianRupee } from "lucide-react";
import Footer from "@/components/Footer";

const Contact = () => {
  return (
    <>
      <Navbar />
      <section className="bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 md:py-32 py-24" id="contact">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
              Contact <span className="text-primary">GeetPay</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
              Get instant payday loans with quick approval. Apply now and receive funds directly in your account.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">

            {/* Left Info Cards */}
            <div className="space-y-6">
              {/* Cards */}
              <div className="space-y-5">

                {/* Address */}
                <div className="flex items-start gap-4 p-5 rounded-xl bg-white dark:bg-slate-900 shadow-md hover:shadow-lg transition">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <MapPin className="text-blue-700 dark:text-blue-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Office Location</h3>
                    <p className="text-gray-600 dark:text-slate-400 text-sm">
                     H-15 BSI Business Park, H Block, Sector 63, Noida <br /> Uttar Pradesh, India
                    </p>
                  </div>
                </div>

                {/* Contact */}
                <div className="flex items-start gap-4 p-5 rounded-xl bg-white dark:bg-slate-900 shadow-md hover:shadow-lg transition">
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Phone className="text-green-700 dark:text-green-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Call Us</h3>
                    <p className="text-gray-600 dark:text-slate-400 text-sm">
                      +91 9821321534
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-5 rounded-xl bg-white dark:bg-slate-900 shadow-md hover:shadow-lg transition">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <Mail className="text-purple-700 dark:text-purple-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Email Support</h3>
                    <p className="text-gray-600 dark:text-slate-400 text-sm">
                      support@geetpay.com
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4 p-5 rounded-xl bg-white dark:bg-slate-900 shadow-md hover:shadow-lg transition">
                  <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                    <Clock className="text-orange-700 dark:text-orange-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Working Hours</h3>
                    <p className="text-gray-600 dark:text-slate-400 text-sm">
                      Mon - Sat: 9AM - 7PM <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Form */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 md:p-10">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Apply for Loan
              </h3>

              <form className="space-y-5">

                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-transparent"
                />

                <input
                  type="tel"
                  placeholder="Mobile Number"
                  className="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-transparent"
                />

                <div className="relative">
                  <IndianRupee className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="number"
                    placeholder="Loan Amount"
                    className="w-full pl-10 border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-transparent"
                  />
                </div>

                <textarea
                  rows="4"
                  placeholder="Your message (optional)"
                  className="w-full border border-gray-300 dark:border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-transparent"
                />

                <button
                  type="submit"
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition"
                >
                  Apply Now
                </button>

              </form>
            </div>

          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default Contact;