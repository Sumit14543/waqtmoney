import Navbar from "@/components/Navbar";
import HeroSection from "@/Components/HeroSection";
// import StatsSection from "@/components/StatsSection";
import FeaturesSection from "@/components/FeaturesSection";
import LoanProductsSection from "@/components/LoanProductsSection";
import StorySection from "@/components/StorySection";
import StepsSection from "@/components/StepsSection";
import EligibilitySection from "@/components/EligibilitySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TrustSection from "@/components/TrustSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import LoanCalculator from "@/Components/LoanCalculator";
import BorrowSection from "@/Components/BorrowSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      {/* <StatsSection /> */}
      <StepsSection />
      <EligibilitySection />
      <LoanCalculator/>
      <BorrowSection/>
      <FeaturesSection />
      <LoanProductsSection />
      <StorySection />
      <TestimonialsSection />
      <TrustSection />
      <FAQSection />
      
      <Footer />
    </div>
  );
};

export default Index;
