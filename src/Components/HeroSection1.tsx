import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/Components/ui/button";
import heroPerson from "../../assets/hero-person.png";

const HeroSection = () => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              ✨ Trusted by 10,000+ customers
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Unlock Financial Freedom{" "}
              <span className="text-gradient">Your Path Begins Here.</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Empower your today and tomorrow with quick, instant loan solutions.
              Enjoy a 100% digital, fast experience at your fingertips.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-hero-gradient text-primary-foreground hover:opacity-90 text-base px-8 h-12">
                Apply Now <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="text-base h-12">
                Learn More
              </Button>
            </div>

            <div className="flex items-center gap-6 mt-10">
              <div>
                <p className="font-display text-2xl font-bold text-foreground">₹50Cr+</p>
                <p className="text-sm text-muted-foreground">Loans Disbursed</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <p className="font-display text-2xl font-bold text-foreground">4.8★</p>
                <p className="text-sm text-muted-foreground">Customer Rating</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <p className="font-display text-2xl font-bold text-foreground">24hr</p>
                <p className="text-sm text-muted-foreground">Disbursement</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="absolute inset-0 bg-hero-gradient rounded-full blur-3xl opacity-10 scale-75" />
            <img src={heroPerson} alt="Happy customer with loan approval" width={500} height={562} className="relative z-10 shadow-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
