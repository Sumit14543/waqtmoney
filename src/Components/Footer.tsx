import { Facebook, Instagram, ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] text-white pt-16 pb-8 rounded-t-3xl">
      <div className="container mx-auto px-4">

        {/* TOP GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* BRAND */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              Geet<span className="text-purple-400">Pay</span>
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              A customer-centric NBFC making loans simple, fast & transparent.
            </p>

            {/* SOCIAL */}
            <div className="flex gap-3">
              {[Facebook, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-purple-500/20 border border-white/10 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* BORROW */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-gray-200 tracking-wide">
              BORROW
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {["Personal Loan", "Instant Loan"].map((item, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-white transition-all hover:pl-1">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-gray-200 tracking-wide">
              COMPANY
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {["Our Story", "FAQs", "Our Product", "Contact Us"].map((item, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-white transition-all hover:pl-1">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-gray-200 tracking-wide">
              Stay Updated
            </h4>

            <div className="flex items-center bg-white/5 border border-white/10 rounded-full overflow-hidden">
              <input
                type="text"
                placeholder="Enter email"
                className="flex-1 bg-transparent px-4 py-3 text-sm outline-none text-white placeholder-gray-400"
              />
              <button className="bg-purple-500 hover:bg-purple-600 px-4 py-4 transition-all">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-3">
              No spam. Only useful updates.
            </p>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">

          

          <div className="flex gap-5">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Sitemap</a>
          </div>

          <p>© 2026 GeetPay. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;