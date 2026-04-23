import React from "react";
import Navbar from "@/components/Navbar";
import {
  ShieldCheck,
  Database,
  Lock,
  Users,
  FileText,
  Cookie,
  RefreshCcw,
  Mail
} from "lucide-react";
import Footer from "@/components/Footer";

const policies = [
  {
    icon: Database,
    title: "Information We Collect",
    desc: "We collect personal, financial, and KYC details like Name, Phone, Email, PAN, Aadhaar, income & bank details to process your loan securely."
  },
  {
    icon: Users,
    title: "How We Use Data",
    desc: "Your data is used for loan approval, identity verification, improving services, and sending important updates related to your account."
  },
  {
    icon: ShieldCheck,
    title: "Data Sharing",
    desc: "We do not sell your data. It is only shared with trusted NBFC partners, credit bureaus, or authorities if required by law."
  },
  {
    icon: Lock,
    title: "Data Security",
    desc: "We use advanced encryption and secure systems to protect your personal and financial data from unauthorized access."
  },
  {
    icon: Cookie,
    title: "Cookies Usage",
    desc: "We use cookies to enhance your browsing experience, analyze traffic, and improve our website performance."
  },
  {
    icon: FileText,
    title: "Your Rights",
    desc: "You can request access, correction, or deletion of your data and opt-out from marketing communications anytime."
  },
  {
    icon: RefreshCcw,
    title: "Policy Updates",
    desc: "We may update this policy occasionally. All updates will be reflected on this page for transparency."
  },
  {
    icon: Mail,
    title: "Contact Us",
    desc: "For any privacy concerns, reach out to us at support@geetpay.in"
  }
];

export default function Policies() {
  return (
    <>
      <Navbar />

      <section className="bg-background  dark:bg-slate-900 py-20 px-4">

        {/* HERO */}
        <div className="max-w-4xl pt-20 mx-auto text-center mb-20">
          
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
             Your Privacy, <span className="text-primary"> Our Responsibility </span>
            </h2>

          <p className="mt-4 text-lg text-muted-foreground">
           
            we ensure your personal and financial data <br /> stays safe with bank-level security.
          </p>

         
        </div>

        {/* CARDS */}
        <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {policies.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative group bg-white/60 backdrop-blur-xl border border-purple-100 dark:border-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all duration-300"
              >
            

                {/* Icon */}
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 text-white mb-5 group-hover:scale-110 transition">
                  <Icon size={26} />
                </div>

                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                  {item.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* TIMELINE */}
        <div className="max-w-4xl mx-auto mt-24">
          <h2 className="text-2xl font-bold text-center mb-10 text-purple-600">
            How We Handle Your Data
          </h2>

          {policies.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex gap-6 mb-10">
                <div className="flex flex-col items-center">
                  <div className="bg-purple-500 text-white p-3 rounded-full shadow">
                    <Icon size={18} />
                  </div>
                  <div className="w-1 bg-purple-200 flex-1"></div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg text-gray-800 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <h2 className="text-2xl font-bold mb-4 text-purple-600">
            Need Help With Your Loan?
          </h2>

          <p className="text-gray-600 mb-6">
            Our support team is always ready to assist you.
          </p>

          <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:opacity-90 hover:scale-105 transition shadow-lg">
            Contact Support
          </button>
        </div>

        {/* Footer Note */}
        <div className="max-w-3xl mx-auto text-center mt-12">
          <p className="text-gray-500 text-sm">
            By using GeetPay, you agree to our privacy practices and policies.
          </p>
        </div>

      </section>
      <Footer/>
    </>
  );
}