import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function About() {
  return (
    <>
      <Navbar />

      <section className="w-full bg-gradient-to-b from-white to-indigo-50 py-20 md:py-28">
        
        {/* Heading */}
        <div className="text-center mb-16 px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800">
            About <span className="text-indigo-600">GeetPay</span>
          </h2>
          <div className="w-20 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>

          <p className="mt-5 text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            Your trusted partner for quick and hassle-free payday loans when you need instant cash support.
          </p>
        </div>

        {/* Main Section */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 px-4">
          
          {/* Image */}
          <div className="relative w-full max-w-md lg:max-w-lg">
            <img
              className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover rounded-3xl shadow-xl"
              src="https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?q=80&w=600"
              alt="GeetPay Payday Loan"
            />

            {/* Floating Card */}
            <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto bg-white p-4 rounded-xl shadow-lg flex items-center gap-3">
              
              <div className="flex -space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
                  className="w-9 h-9 rounded-full border-2 border-white"
                />
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
                  className="w-9 h-9 rounded-full border-2 border-white"
                />
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200"
                  className="w-9 h-9 rounded-full border-2 border-white"
                />
                <div className="flex items-center justify-center text-xs text-white w-9 h-9 rounded-full bg-indigo-600 border-2 border-white">
                  50K+
                </div>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-slate-700">
                Trusted by 50,000+ professionals
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-xl text-center lg:text-left">
            <h1 className="text-2xl md:text-4xl font-bold text-slate-800 leading-tight">
              Instant Payday Loans for Your Short-Term Needs
            </h1>

            <div className="w-24 h-1 mt-4 mx-auto lg:mx-0 rounded-full bg-gradient-to-r from-indigo-600 to-purple-400"></div>

            <p className="mt-6 text-sm md:text-lg text-slate-600 leading-relaxed">
              GeetPay provides quick and easy payday loans to salaried individuals across India.
              Whether it's an emergency expense or a temporary cash shortage, we help you get funds instantly.
            </p>

            <p className="mt-4 text-sm md:text-lg text-slate-600 leading-relaxed">
              With a simple online process, minimal documentation, and fast approvals,
              you can access funds within hours—no long waiting, no complicated paperwork.
            </p>

            <p className="mt-4 text-sm md:text-lg text-slate-600 leading-relaxed">
              Our goal is to make borrowing simple, transparent, and stress-free
              so you can focus on what matters most.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
              <a
                href="#"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full text-sm font-medium shadow-md transition text-center"
              >
                Apply Now
              </a>

              <a
                href="#"
                className="border border-slate-300 px-6 py-3 rounded-full text-sm font-medium hover:bg-slate-100 transition text-center"
              >
                Check Eligibility
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}