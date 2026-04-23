import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Services from "./pages/Services.tsx";
import About from "./pages/About-us.tsx";
import Faqs from "./pages/Faqs.tsx";
import Contact from "./pages/Contact.tsx";
import Policies from "./pages/Policies.tsx";
import Login from "./User/Login.tsx";
import Apply from "./User/Apply.tsx";
import MobileOtp from "./User/MobileOtp.tsx";
import LoanForm from "./User/LoanForm.tsx";
import BasicDetailsForm from "./User/BasicDetailsForm.tsx";
import PanVerification from "./User/PanVerification.tsx";
import KycAadhaar from "./User/KycAadhaar.tsx";
import CompanyDetails from "./User/CompanyDetails.tsx";
import BankDetails from "./User/BankDetails.tsx";
import SalarySlip from "./User/SalarySlip.tsx";
import LoanStatus from "./User/LoanStatus.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          <Route path="/services" element={<Services/>} />
          <Route path="/About" element={<About/>} />
          <Route path="/Faqs" element={<Faqs/>} />
          <Route path="/Contact" element={<Contact/>} />
          <Route path="/Policies" element={<Policies/>} />

          <Route path="/login" element={<Login />} />

            {/* USER FLOW */}
            <Route path="/user/apply" element={<Apply />} />
            <Route path="/user/otp" element={<MobileOtp />} />
            <Route path="/user/loan" element={<LoanForm />} />
            <Route path="/user/basic-details" element={<BasicDetailsForm/>} />

            {/* KYC FLOW */}
            <Route path="/user/pan-verification" element={<PanVerification />} />
            <Route path="/user/kyc-aadhaar" element={<KycAadhaar />} />
            <Route path="/user/company-details" element={<CompanyDetails/>} />
            <Route path="/user/bank-details" element={<BankDetails />} />
            <Route path="/user/salary-slip" element={<SalarySlip />} />

            {/* FINAL STATUS */}
            <Route path="/user/loan-status" element={<LoanStatus />} />

        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
