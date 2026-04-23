import { ArrowRight, Shield, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "4.9/5", label: "Average Rating" },
  { value: "50K+", label: "Happy Customers" },
  { value: "₹100Cr+", label: "Loans Disbursed" },
  { value: "99.2%", label: "Satisfaction Rate" },
];

const HeroSection = () => {
  return (
    <section className="relative pt-24 pb-10 lg:pt-32 lg:pb-16 bg-gradient-hero overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              RBI Registered NBFC
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-4">
              Fast Approvals{" "}
              <span className="text-gradient">Money in Minutes.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
              Instant personal loans with zero paperwork, no hidden charges. Apply in 2 minutes. Funds disbursed within 5 minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white border border-gray-200 rounded-2xl sm:rounded-full p-2 max-w-md w-full mb-8 shadow-md hover:shadow-lg transition-all gap-2 sm:gap-0">

              {/* Input */}
              <input
                type="text"
                placeholder="Enter your mobile number"
                className="flex-1 px-5 py-3 bg-transparent outline-none text-sm text-gray-700 placeholder-black"
              />

              {/* Button */}
              <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl sm:rounded-full font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-all w-full sm:w-auto">
                Apply Now
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-primary" />No collateral</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" />5 min approval</span>
            </div>
          </div>

          <div className="relative animate-slide-right hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-3xl" />
              <img
                src="hero-person.jpg"
                alt="Happy customer"
                width={512}
                height={512}
                className="relative rounded-3xl shadow-elevated w-full max-w-md mx-auto object-cover"
              />
              <div className="absolute -right-4 top-8 bg-card rounded-2xl shadow-2xl p-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <p className="font-heading font-bold text-2xl text-foreground">₹100Cr+</p>
                <p className="text-xs text-muted-foreground">Loans Disbursed</p>
              </div>
              <div className="absolute -left-4 bottom-12 bg-primary text-primary-foreground rounded-2xl shadow-glow p-4 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <p className="font-semibold text-sm">Get Approved Fast.</p>
                <p className="font-bold">Get Funded Faster.</p>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-border">
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-center animate-count" style={{ animationDelay: `${i * 0.1}s` }}>
              <p className="font-heading text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default HeroSection;
