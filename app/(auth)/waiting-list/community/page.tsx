"use client";
import CustomBadge from "@/components/shared/SharedBadge";
import React, { useState } from "react";
import WaitingHeader from "../WaitingHeader";
import WaitingHeroSection from "../WaitingHeroSection";

// --- Internal Reusable UI Components (simulating shadcn/ui) ---

const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({
  className,
  ...props
}) => (
  <label
    className={`text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 ${
      className || ""
    }`}
    {...props}
  />
);

const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "outline" | "ghost";
  }
> = ({ className, variant = "primary", ...props }) => {
  const baseStyles =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  let variantStyles = "";
  switch (variant) {
    case "primary":
      variantStyles = "bg-[#d97706] text-white hover:bg-[#b45309]"; // Orange
      break;
    case "outline":
      variantStyles =
        "border border-[#065f46] text-white hover:bg-[#065f46] hover:text-white";
      break;
    case "ghost":
      variantStyles = "hover:bg-gray-100 text-gray-900";
      break;
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className || ""}`}
      {...props}
    />
  );
};

// Custom Toggle Component (Yes/No Pills)
const YesNoToggle = ({
  value,
  onChange,
}: {
  value: boolean | null;
  onChange: (val: boolean) => void;
}) => {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(true)}
        className={`px-8 py-2 rounded-full border text-base transition-colors ${
          value === true
            ? "border-[#065f46] text-[#065f46] font-medium"
            : "border-gray-300 text-gray-500 hover:border-gray-400"
        }`}
      >
        Yes
      </button>
      <span className="text-gray-500 text-lg">or</span>
      <button
        type="button"
        onClick={() => onChange(false)}
        className={`px-8 py-2 rounded-full border text-base transition-colors ${
          value === false
            ? "border-[#065f46] text-[#065f46] font-medium"
            : "border-gray-300 text-gray-500 hover:border-gray-400"
        }`}
      >
        No
      </button>
    </div>
  );
};

// --- Main Application Component ---

export default function page() {
  const [formData, setFormData] = useState({
    isRoleTitle: null as boolean | null,
    isAvailable: null as boolean | null,
    agreedToTerms: false,
  });

  const handleToggleChange = (field: keyof typeof formData, val: boolean) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, agreedToTerms: e.target.checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Form submitted! Check console for data.");
  };

  return (
    <div className="text-gray-900 selection:bg-green-100 max-w-7xl mx-auto px-4 lg:px-0">
      {/* Navbar */}
      <WaitingHeader />

      {/* Main Content */}
      <section className="py-8 ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-16 items-start">
          {/* Left Column: Green Card */}
          <WaitingHeroSection />

          {/* Right Column: Form */}
          <div className="lg:col-span-8 pt-4 lg:pl-4">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="mb-6">
                <CustomBadge>Database</CustomBadge>
              </div>

              {/* Headlines */}
              <h1 className="text-primary-color text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-[1.1] mb-6">
                Join the Database of African Builders, Architects & Designers
              </h1>

              <p className="text-gray-600 text-lg mb-12 font-light leading-relaxed max-w-2xl">
                We are soon launching a portfolio of Indigenous African
                architecture designs, signup to stay update
              </p>

              {/* Form Section */}
              <div className="space-y-8">
                <h3 className="text-primary-color text-2xl font-bold">
                  Community & Availability
                </h3>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Role/Title Toggle */}
                  <div className="space-y-4">
                    <Label>
                      Role/Title (Builder, Architect, Designer, Student, Other)
                    </Label>
                    <YesNoToggle
                      value={formData.isRoleTitle}
                      onChange={(val) => handleToggleChange("isRoleTitle", val)}
                    />
                  </div>

                  {/* Availability Toggle */}
                  <div className="space-y-4">
                    <Label>Available for mentorship or training?</Label>
                    <YesNoToggle
                      value={formData.isAvailable}
                      onChange={(val) => handleToggleChange("isAvailable", val)}
                    />
                  </div>

                  {/* Checkbox */}
                  <div className="flex items-start space-x-3 pt-2">
                    <input
                      type="checkbox"
                      id="agreedToTerms"
                      checked={formData.agreedToTerms}
                      onChange={handleCheckboxChange}
                      className="mt-1 h-5 w-5 rounded border-gray-300 text-[#d97706] focus:ring-[#d97706]"
                    />
                    <label
                      htmlFor="agreedToTerms"
                      className="text-gray-600 text-base leading-tight"
                    >
                      I agree to be listed in the public database and contacted
                      about opportunities.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold h-12 rounded-lg text-sm shadow-md transition-all uppercase tracking-wide"
                    >
                      NEXT
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
