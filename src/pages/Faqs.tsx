import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react"
const Faqs = () => {
    const [openIndex, setOpenIndex] = React.useState(null);
    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    }

   const faqs = [
  {
    question: "What is a Payday Loan at GeetPay?",
    answer: "GeetPay provides short-term payday loans that help you access a portion of your upcoming salary before your payday. It is designed for salaried individuals who need quick funds for urgent expenses without lengthy paperwork or delays."
  },
  {
    question: "Who can apply for a GeetPay loan?",
    answer: "Any salaried employee aged between 21 to 60 years with a stable monthly income can apply. Applicants must have a valid bank account, PAN card, Aadhaar card, and a steady employment record."
  },
  {
    question: "How much loan amount can I get?",
    answer: "You can avail loans ranging from ₹5,000 to ₹2,00,000 depending on your salary, repayment capacity, and credit profile. GeetPay ensures flexible limits to suit your financial needs."
  },
  {
    question: "How quickly will I receive the loan?",
    answer: "Once your application is approved, the loan amount is usually disbursed within a few hours directly to your bank account. In some cases, it may take up to 24 hours."
  },
  {
    question: "What documents are required?",
    answer: "Basic documents include Aadhaar Card, PAN Card, recent salary slips, and bank statements. In most cases, the process is completely digital with minimal paperwork."
  },
  {
    question: "Is GeetPay safe and secure?",
    answer: "Yes, GeetPay uses advanced encryption and secure systems to protect your personal and financial data. Your information is never shared without consent."
  },
  {
    question: "What is the repayment tenure?",
    answer: "Repayment tenure typically ranges from a few days to one month, aligned with your next salary cycle. Some flexible repayment options may also be available."
  },
  {
    question: "Are there any hidden charges?",
    answer: "No, GeetPay maintains full transparency. All fees, interest rates, and charges are clearly communicated before loan approval."
  },
  {
    question: "What happens if I miss a repayment?",
    answer: "Missing a repayment may attract late fees and impact your credit score. We recommend repaying on time or contacting our support team for assistance in case of financial difficulty."
  },
  {
    question: "Can I apply multiple times?",
    answer: "Yes, you can apply again after successfully repaying your previous loan. GeetPay also rewards responsible borrowers with higher limits and better offers."
  },
  {
    question: "Is there any credit score requirement?",
    answer: "While a good credit score improves approval chances, GeetPay also considers other factors like income stability and repayment capacity."
  },
  {
    question: "How do I apply for a loan?",
    answer: "You can apply directly through the GeetPay website by filling out a simple online form. The process takes only a few minutes to complete."
  }

    ]

    return (
        <>
            <Navbar />
            <style>
                {`
                    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");
                    * {
                        font-family: "Poppins", sans-serif;
                    }
                `}
            </style>
            
            <section className='w-full flex flex-col items-center justify-center py-16 px-4'>
                <div className='w-full max-w-5xl my-24'>
                    <div className='mb-10'>
                        <h2 className='text-3xl font-semibold text-neutral-900 text-center md:text-start mb-4'>Most asked FAQ's</h2>
                        <p className='text-neutral-800 max-w-[416px] text-sm text-center md:text-start mx-auto md:mx-0'>We're here to help you and solve doubts. Find answers to the most common questions below.</p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4'>
                        {faqs.map((faq, index) => (
                            <div key={index} onClick={() => toggleFAQ(index)} className={`bg-slate-50 p-3.5 rounded-lg cursor-pointer transition-all duration-300 border border-slate-200 hover:bg-slate-100 ${openIndex === index ? 'row-span-2' : ''}`}>
                                <div className='flex items-center justify-between'>
                                    <span className='text-sm font-medium text-neutral-800'>{faq.question}</span>
                                    <div className={`text-slate-400 p-1 rounded transition-colors ${openIndex === index ? 'bg-slate-200 text-slate-500' : 'hover:bg-slate-300 hover:text-slate-500'}`}>
                                        {openIndex === index ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-minus"><path d="M5 12h14"/></svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                                        )}
                                    </div>
                                </div>
                                <div className={`grid transition-all duration-300 ease-in-out ${openIndex === index ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                                    <div className='overflow-hidden'>
                                        <p className='text-sm text-neutral-600 leading-relaxed'>
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Faqs;