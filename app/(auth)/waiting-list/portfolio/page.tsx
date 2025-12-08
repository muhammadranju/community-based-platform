"use client";
import CustomBadge from "@/components/shared/SharedBadge";
import React, { useState } from "react";
import WaitingHeader from "../WaitingHeader";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import WaitingHeroSection from "../WaitingHeroSection";

// --- Internal Reusable UI Components (simulating shadcn/ui) ---

const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({
  className,
  ...props
}) => (
  <label
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 ${
      className || ""
    }`}
    {...props}
  />
);

const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  className,
  ...props
}) => (
  <textarea
    className={`flex min-h-[120px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d97706] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
      className || ""
    }`}
    {...props}
  />
);

const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "outline" | "ghost" | "upload";
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
    case "upload":
      variantStyles =
        "bg-[#d97706] text-white hover:bg-[#b45309] rounded-full px-8 py-3 text-base";
      break;
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className || ""}`}
      {...props}
    />
  );
};

// --- Main Application Component ---

export default function page() {
  const [formData, setFormData] = useState({
    projectDescription: "",
  });

  const router = useRouter();
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    router.push("/waiting-list/community");
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
              <h1 className="text-teal-900 text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-[1.1] mb-6">
                Join the Database of African Builders, Architects & Designers
              </h1>

              <p className="text-gray-600 text-lg mb-12 font-light leading-relaxed max-w-2xl">
                We are soon launching a portfolio of Indigenous African
                architecture designs, signup to stay update
              </p>

              {/* Form Section */}
              <div className="space-y-8">
                <h3 className="text-teal-900 text-2xl font-bold">Portfolio</h3>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Upload Samples of Work */}
                  <div className="space-y-2">
                    <Label>Upload Samples of Work</Label>
                    <div className="border border-gray-300 rounded-lg p-12 flex justify-center items-center bg-white">
                      <Button type="button" variant="upload" className="gap-2">
                        <Upload className="w-5 h-5" />
                        UPLOAD
                      </Button>
                    </div>
                  </div>

                  {/* Project Description */}
                  <div className="space-y-2">
                    <Label htmlFor="projectDescription">
                      Briefly describe one project you’ve worked on (optional)
                    </Label>
                    <TextArea
                      id="projectDescription"
                      name="projectDescription"
                      value={formData.projectDescription}
                      onChange={handleInputChange}
                      placeholder="Write here"
                    />
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
