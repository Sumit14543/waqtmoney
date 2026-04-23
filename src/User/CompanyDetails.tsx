import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const CompanyDetails = () => {
  const [form, setForm] = useState({
    company: "",
    designation: "",
    email: "",
    salaryDate: "",
    address: "",
    education: "",
    experience: "",
  });

  const [errors, setErrors] = useState<any>({});

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors: any = {};

    if (!form.company.trim()) newErrors.company = "Company name is required";
    if (!form.designation.trim()) newErrors.designation = "Designation is required";

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.salaryDate) newErrors.salaryDate = "Salary date is required";

    if (!form.address.trim()) newErrors.address = "Address is required";

    if (!form.education) newErrors.education = "Select education";

    if (!form.experience.trim()) {
      newErrors.experience = "Experience is required";
    } else if (Number(form.experience) < 0 || Number(form.experience) > 50) {
      newErrors.experience = "Enter valid experience (0-50 years)";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (validate()) {
      navigate("/user/bank-details");
    }
  };

  const inputClass =
    "w-full p-3 border-2 border-[#8048e2] rounded-md outline-none focus:border-[#bd56e4]";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <Navbar />

      <div className="flex-1">

        <div className="max-w-[520px] mx-auto mt-10 px-5 py-8 font-sans">

          <h1 className="text-center text-2xl font-bold text-[#8048e2] mt-12">
            Company Details
          </h1>

          <p className="text-center text-sm text-gray-500 mb-6">
            Your Data is Completely Secure with us
          </p>

          <form onSubmit={handleSubmit}>

            {/* Company */}
            <div className="mb-4">
              <label>Company Name</label>
              <input name="company" onChange={handleChange} className={inputClass} />
              {errors.company && <p className="text-red-500 text-xs">{errors.company}</p>}
            </div>

            {/* Designation */}
            <div className="mb-4">
              <label>Designation</label>
              <input name="designation" onChange={handleChange} className={inputClass} />
              {errors.designation && <p className="text-red-500 text-xs">{errors.designation}</p>}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label>Office Email</label>
              <input name="email" type="email" onChange={handleChange} className={inputClass} />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>

            {/* Salary Date */}
            <div className="mb-4">
              <label>Salary Date</label>
              <input name="salaryDate" type="date" onChange={handleChange} className={inputClass} />
              {errors.salaryDate && <p className="text-red-500 text-xs">{errors.salaryDate}</p>}
            </div>

            {/* Address */}
            <div className="mb-4">
              <label>Office Address</label>
              <textarea name="address" rows={3} onChange={handleChange} className={inputClass} />
              {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
            </div>

            {/* Education */}
            <div className="mb-4">
              <label>Education</label>
              <select name="education" onChange={handleChange} className={inputClass}>
                <option value="">Select</option>
                <option>10th</option>
                <option>12th</option>
                <option>Graduate</option>
                <option>Post Graduate</option>
              </select>
              {errors.education && <p className="text-red-500 text-xs">{errors.education}</p>}
            </div>

            {/* Experience */}
            <div className="mb-4">
              <label>Experience (Years)</label>
              <input
                name="experience"
                type="number"
                onChange={handleChange}
                className={inputClass}
              />
              {errors.experience && <p className="text-red-500 text-xs">{errors.experience}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full text-white py-3 mt-3 font-semibold rounded-md bg-gradient-to-r from-[#8048e2] to-[#bd56e4] hover:opacity-90 transition"
            >
              Submit
            </button>

          </form>

        </div>
      </div>

      <Footer />

    </div>
  );
};

export default CompanyDetails;